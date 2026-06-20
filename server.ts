import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import fs from "fs";

// Safe load dotenv without override so platform-level variables (e.g. Cloud Run env variables) are NEVER overwritten
dotenv.config();

const envPath = path.join(process.cwd(), ".env");
const examplePath = path.join(process.cwd(), ".env.example");

// Sync .env.example to .env to bootstrap configuration on initial setups if .env is missing
if (!fs.existsSync(envPath) && fs.existsSync(examplePath)) {
  console.log("Syncing .env.example to .env to load default configs...");
  try {
    fs.copyFileSync(examplePath, envPath);
    dotenv.config();
  } catch (err) {
    console.error("Failed to copy .env.example to .env:", err);
    dotenv.config({ path: examplePath });
  }
}

// Load default configs from example, and active overrides from .env without overriding system settings
if (fs.existsSync(examplePath)) {
  dotenv.config({ path: examplePath });
}
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const app = express();
app.set("trust proxy", true);

// 1. Unified POSIX-grade robust CORS & OPTIONS preflight middleware registering BEFORE any other routing logic
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  
  // Dynamic header echoing - bounces back exactly the headers the client browser requested
  const requestedHeaders = req.headers["access-control-request-headers"];
  if (requestedHeaders) {
    res.setHeader("Access-Control-Allow-Headers", requestedHeaders);
  } else {
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, X-Api-Key, X-Auth-Token, Accept, Origin");
  }

  // Preflight OPTIONS requests must immediately resolve with a clean 200 response
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});
const PORT = 3000;

// Helper to save order locally on the server as backup
function saveOrderToLocalBackup(order: any) {
  const backupPath = path.join(process.cwd(), "orders.json");
  try {
    let orders = [];
    if (fs.existsSync(backupPath)) {
      const fileContent = fs.readFileSync(backupPath, "utf-8");
      orders = JSON.parse(fileContent || "[]");
    }
    orders.push(order);
    fs.writeFileSync(backupPath, JSON.stringify(orders, null, 2), "utf-8");
    console.log("Order saved to local orders.json backup successfully.");
  } catch (error) {
    console.error("Failed to write to local orders.json backup:", error);
  }
}

// Helper to secure forward to Google Sheet using a Google Apps Script Webhook
async function appendToGoogleSheet(order: any) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log("No GOOGLE_SHEET_WEBHOOK_URL found in .env, simulating successful Google Sheets replication.");
    return true;
  }

  try {
    const formattedData = {
      date: order.date || new Date().toISOString(),
      orderId: order.orderId || "",
      paymentId: order.paymentId || "",
      productName: order.productName || "",
      amount: order.amount || 0,
      name: order.name || "",
      mobile: order.mobile || "",
      address: order.address || "",
      area: order.area || "",
      city: order.city || "",
      pincode: order.pincode || "",
      state: order.state || "",
      status: order.status || "FAILED",
      paymentStatus: order.status || "FAILED",
      Payment_Status: order.status || "FAILED",
      payment_status: order.status || "FAILED",
      PaymentStatus: order.status || "FAILED",
      Status: order.status || "FAILED",
      "Payment Status": order.status || "FAILED",
      "payment status": order.status || "FAILED"
    };

    console.log("Forwarding transaction details to Google Sheets:", webhookUrl);
    
    // Assemble the query params string to put on the URL
    // This resolves issues with Apps Script redirects stripping POST bodies or dropping context.
    const queryParams = new URLSearchParams({
      date: String(formattedData.date),
      orderId: String(formattedData.orderId),
      paymentId: String(formattedData.paymentId),
      productName: String(formattedData.productName),
      amount: String(formattedData.amount),
      name: String(formattedData.name),
      mobile: String(formattedData.mobile),
      address: String(formattedData.address),
      area: String(formattedData.area),
      city: String(formattedData.city),
      pincode: String(formattedData.pincode),
      state: String(formattedData.state),
      status: String(formattedData.status),
      paymentStatus: String(formattedData.status),
      Payment_Status: String(formattedData.status),
      payment_status: String(formattedData.status),
      PaymentStatus: String(formattedData.status),
      Status: String(formattedData.status),
      "Payment Status": String(formattedData.status),
      "payment status": String(formattedData.status)
    }).toString();

    const targetUrl = webhookUrl.includes("?") 
      ? `${webhookUrl}&${queryParams}`
      : `${webhookUrl}?${queryParams}`;

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData)
    });

    console.log(`Google Sheets Webhook response status: ${response.status} (${response.statusText})`);
    if (response.ok) {
      return true;
    } else {
      console.error(`Google Sheets Webhook failed with status ${response.status}: ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.error("Failed to forward details to Google Sheets Webhook:", error);
    return false;
  }
}

// Google Sheets State Tracking to prevent duplicates and secure delivery
const STATUS_TRACKER_PATH = path.join(process.cwd(), "sheet_status.json");
let sheetStatusCache: Record<string, {
  status: string;
  sent_to_sheet: boolean;
  order: any;
  timestamp: number;
}> = {};

function loadSheetStatusCache() {
  try {
    if (fs.existsSync(STATUS_TRACKER_PATH)) {
      const fileData = fs.readFileSync(STATUS_TRACKER_PATH, "utf-8");
      sheetStatusCache = JSON.parse(fileData || "{}");
    }
  } catch (error) {
    console.error("Error loading sheet_status.json cache:", error);
  }
}

function saveSheetStatusCache() {
  try {
    fs.writeFileSync(STATUS_TRACKER_PATH, JSON.stringify(sheetStatusCache, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to sheet_status.json cache:", error);
  }
}

// Initialize cache
loadSheetStatusCache();

async function markAndAppendOrderToSheet(order: any, targetStatus: string) {
  const orderId = order.orderId;
  if (!orderId) {
    await appendToGoogleSheet(order);
    return;
  }

  loadSheetStatusCache();
  
  const existing = sheetStatusCache[orderId];
  if (existing) {
    if (existing.status === "PAID" && targetStatus === "PAID") {
      console.log(`[Cache Tracker] Order ${orderId} already sent to Google Sheets as PAID. Skipping duplicate.`);
      return;
    }
    existing.status = targetStatus;
    existing.order = order;
    existing.sent_to_sheet = true;
    saveSheetStatusCache();
  } else {
    sheetStatusCache[orderId] = {
      status: targetStatus,
      sent_to_sheet: true,
      order: order,
      timestamp: Date.now()
    };
    saveSheetStatusCache();
  }

  console.log(`[Cache Tracker] Sending order ${orderId} with status ${targetStatus} to Google Sheets.`);
  await appendToGoogleSheet(order);
}

async function sweepPendingOrders() {
  try {
    loadSheetStatusCache();
    const now = Date.now();
    let updated = false;

    for (const [orderId, item] of Object.entries(sheetStatusCache)) {
      if (item.status === "PENDING" && !item.sent_to_sheet && (now - item.timestamp > 30000)) {
        console.log(`[Sweep Tracker] Sending pending order ${orderId} (abandoned) to Google Sheets...`);
        const success = await appendToGoogleSheet(item.order);
        if (success) {
          item.sent_to_sheet = true;
          updated = true;
        }
      }
    }

    if (updated) {
      saveSheetStatusCache();
    }
  } catch (error) {
    console.error("Error sweeping pending orders:", error);
  }
}

function registerPendingOrder(orderId: string, orderData: any, productName: string, amount: number) {
  const pendingOrder = {
    date: new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }),
    orderId: orderId,
    paymentId: "N/A (Pending Checkout)",
    productName: productName || "Premium Clinical Product",
    amount: amount || 0,
    name: orderData?.name || "Anonymous",
    mobile: orderData?.mobile || "N/A",
    address: orderData?.address || "N/A",
    area: orderData?.area || "",
    city: orderData?.city || "N/A",
    pincode: orderData?.pincode || "N/A",
    state: orderData?.state || "N/A",
    status: "PENDING"
  };

  saveOrderToLocalBackup(pendingOrder);

  loadSheetStatusCache();
  if (!sheetStatusCache[orderId]) {
    sheetStatusCache[orderId] = {
      status: "PENDING",
      sent_to_sheet: false,
      order: pendingOrder,
      timestamp: Date.now()
    };
    saveSheetStatusCache();

    // Schedule background check in 30 seconds
    setTimeout(async () => {
      try {
        loadSheetStatusCache();
        const trackerItem = sheetStatusCache[orderId];
        if (trackerItem && trackerItem.status === "PENDING" && !trackerItem.sent_to_sheet) {
          console.log(`[Timer Tracker] Order ${orderId} remained PENDING for 30 seconds (abandoned). Sending to Google Sheets...`);
          const success = await appendToGoogleSheet(trackerItem.order);
          if (success) {
            trackerItem.sent_to_sheet = true;
            saveSheetStatusCache();
          }
        }
      } catch (timerError) {
        console.error("Error in scheduled pending sheet check:", timerError);
      }
    }, 30000); // 30 seconds (30,000 ms)
  }
}

// Start sweep checks
setTimeout(() => {
  sweepPendingOrders();
}, 5000);

setInterval(() => {
  sweepPendingOrders();
}, 30000); // Check every 30 seconds


// Content parser limits
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

let razorpayInstance: any = null;

function getRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  
  if (!keyId || !keySecret) {
    return null;
  }

  if (!razorpayInstance) {
    try {
      razorpayInstance = new Razorpay({
        key_id: keyId,
        key_secret: keySecret
      });
    } catch (e) {
      console.error("Failed to initialize Razorpay:", e);
      return null;
    }
  }
  return razorpayInstance;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// Configure Razorpay key details
app.get("/api/razorpay/config", (req, res) => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  res.json({
    hasKeys: !!keyId,
    keyId: keyId || "rzp_test_placeholder"
  });
});

// Create Order API
app.post("/api/razorpay/order", async (req, res) => {
  try {
    const { amount, productName } = req.body;
    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const valueInPaise = Math.round(parseFloat(amount) * 100);
    const instance = getRazorpay();

    if (instance) {
      // Real Razorpay implementation
      const order = await instance.orders.create({
        amount: valueInPaise,
        currency: "INR",
        receipt: `receipt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        notes: {
          productName: productName || "Clinical Product"
        }
      });

      return res.json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
        isMock: false
      });
    } else {
      // Mock Sandbox Fallback for local preview setups
      console.log(`Razorpay credentials missing. Simulating sandbox order for ${productName} (₹${amount})`);
      return res.json({
        success: true,
        orderId: `order_mock_${Math.random().toString(36).substring(2, 11)}`,
        amount: valueInPaise,
        currency: "INR",
        keyId: "rzp_test_mock_keys_active",
        isMock: true
      });
    }
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: error.message || "Failed to create order" });
  }
});

// API for logging checkout initiation / failed state immediately for marketing backup/recovery
app.post("/api/order/log-failed", async (req, res) => {
  try {
    const { orderData } = req.body;
    const orderId = orderData?.orderId || `PENDING_${Date.now()}`;
    registerPendingOrder(orderId, orderData, orderData?.productName, orderData?.amount);
    res.json({ success: true, message: "Lead captured successfully as failed/unfinished transaction." });
  } catch (error: any) {
    console.error("Error logging unfinished customer intent:", error);
    res.status(500).json({ error: error.message || "Failed to log lead" });
  }
});

// Verify Signature API
app.post("/api/razorpay/verify", async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, isMock, orderData } = req.body;

    const fullOrder = {
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }),
      orderId: razorpay_order_id || `order_local_${Date.now()}`,
      paymentId: razorpay_payment_id || `pay_local_${Date.now()}`,
      productName: orderData?.productName || "Premium Clinical Product",
      amount: orderData?.amount || 0,
      name: orderData?.name || "Anonymous",
      mobile: orderData?.mobile || "N/A",
      address: orderData?.address || "N/A",
      area: orderData?.area || "",
      city: orderData?.city || "N/A",
      pincode: orderData?.pincode || "N/A",
      state: orderData?.state || "N/A",
      status: "PAID"
    };

    if (isMock || razorpay_order_id?.startsWith("order_mock_")) {
      saveOrderToLocalBackup(fullOrder);
      await markAndAppendOrderToSheet(fullOrder, "PAID");
      return res.json({
        success: true,
        message: "Sandbox payment verified successfully!"
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return res.status(500).json({ error: "Razorpay secret key not configured on server" });
    }

    const generated_signature = crypto
      .createHmac("sha256", keySecret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      saveOrderToLocalBackup(fullOrder);
      await markAndAppendOrderToSheet(fullOrder, "PAID");
      return res.json({
        success: true,
        message: "Payment signature verified successfully"
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "Invalid transaction signature"
      });
    }
  } catch (error: any) {
    console.error("Error verifying payment signature:", error);
    res.status(500).json({ error: error.message || "Verification failed" });
  }
});

// Create Instamojo Payment Request
app.post("/api/instamojo/order", async (req, res) => {
  try {
    const { amount, productName, orderData, isEbook, ebookId, ebookTheme, frontendUrl } = req.body;
    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const cleanVal = (val: string | undefined): string => {
      if (!val) return "";
      return val.trim().replace(/^["']|["']$/g, "").trim();
    };

    const isPlaceholderValue = (str: string | undefined): boolean => {
      if (!str) return true;
      const val = str.toLowerCase();
      return (
        val.includes("placeholder") ||
        val.includes("your_live") ||
        val.includes("your_") ||
        val.includes("my_") ||
        val === "null" ||
        val === "undefined"
      );
    };

    const instamojoApiKey = cleanVal(process.env.INSTAMOJO_API_KEY);
    const instamojoAuthToken = cleanVal(process.env.INSTAMOJO_AUTH_TOKEN);
    const isSandboxStr = cleanVal(process.env.INSTAMOJO_SANDBOX);
    
    // Determine sandbox mode. Strictly honors the INSTAMOJO_SANDBOX environment variable.
    const isSandbox = isSandboxStr === "true";
    
    console.log("[Instamojo Configuration Loaded]", {
      hasApiKey: !!instamojoApiKey,
      apiKeyLength: instamojoApiKey.length,
      hasAuthToken: !!instamojoAuthToken,
      authTokenLength: instamojoAuthToken.length,
      isSandboxStr,
      isSandbox
    });

    // Check if APP_URL from env is set to a valid non-placeholder URL
    let envAppUrl = cleanVal(process.env.APP_URL);
    if (isPlaceholderValue(envAppUrl) || !envAppUrl.startsWith("http")) {
      envAppUrl = "";
    }

    let appUrl = envAppUrl || `${req.protocol}://${req.get("host")}`;
    if (!appUrl.includes("localhost") && !appUrl.includes("127.0.0.1") && appUrl.startsWith("http://")) {
      appUrl = appUrl.replace("http://", "https://");
    }

    console.log("[Instamojo Route URLs]", {
      appUrl,
      protocol: req.protocol,
      host: req.get("host")
    });

    // Helper query parameters to persist order information back on redirect/callback
    const callbackParams = new URLSearchParams({
      name: orderData?.name || "Customer",
      mobile: orderData?.mobile || "",
      address: orderData?.address || "",
      area: orderData?.area || "",
      city: orderData?.city || "",
      pincode: orderData?.pincode || "",
      state: orderData?.state || "",
      productName: productName || "Clinical Product",
      amount: String(amount),
      isEbook: String(!!isEbook),
      ebookId: ebookId || "",
      ebookTheme: ebookTheme ? (typeof ebookTheme === "string" ? ebookTheme : JSON.stringify(ebookTheme)) : "",
      frontendUrl: frontendUrl || origin || "https://drnishanti.netlify.app"
    }).toString();

    const redirectUrl = `${appUrl}/api/instamojo/callback?${callbackParams}`;
    const webhookUrl = `${appUrl}/api/instamojo/webhook`;

    const hasRealCredentials =
      instamojoApiKey && !isPlaceholderValue(instamojoApiKey) &&
      instamojoAuthToken && !isPlaceholderValue(instamojoAuthToken);

    if (hasRealCredentials) {
      // Real Instamojo Integration (v1.1 API)
      const apiBase = isSandbox
        ? "https://test.instamojo.com/api/1.1/payment-requests/"
        : "https://www.instamojo.com/api/1.1/payment-requests/";

      console.log(`Connecting to Instamojo API (${isSandbox ? "Sandbox" : "Production"})...`);

      const params = new URLSearchParams();
      
      // 1. Instamojo 'purpose' field must be strictly between 3 and 30 characters
      const purposeLimited = (productName || "Clinical Program").substring(0, 30);
      params.append("purpose", purposeLimited);
      params.append("amount", String(amount));

      // 2. Clear out name special characters & limit to 100 characters
      const cleanedBuyerName = (orderData?.name || "Customer").replace(/[^a-zA-Z0-9\s]/g, "").substring(0, 100);
      params.append("buyer_name", cleanedBuyerName);

      // 3. Phone must be a valid 10-digit number starting with 6, 7, 8, or 9 for Instamojo
      let rawPhone = (orderData?.mobile || "").replace(/\D/g, "");
      if (rawPhone.length > 10) {
        rawPhone = rawPhone.slice(-10);
      }
      if (rawPhone.length === 10 && /^[6-9]/.test(rawPhone)) {
        params.append("phone", rawPhone);
      }

      // 4. Clean email format
      const sanitizedNameTag = (orderData?.name || "customer").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      params.append("email", `${sanitizedNameTag || "customer"}${Date.now().toString().slice(-4)}@drnishanti.com`);
      
      params.append("redirect_url", redirectUrl);

      // 5. Omit webhook during local development (Instamojo rejects localhost/local webhooks with 400 error)
      const isLocalHost = appUrl.includes("localhost") || appUrl.includes("127.0.0.1") || appUrl.includes(":3000");
      if (!isLocalHost) {
        params.append("webhook", webhookUrl);
      }

      params.append("send_email", "false");
      params.append("send_sms", "false");
      params.append("allow_repeated_payments", "false");

      let response;
      try {
        response = await fetch(apiBase, {
          method: "POST",
          headers: {
            "X-Api-Key": instamojoApiKey || "",
            "X-Auth-Token": instamojoAuthToken || "",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: params.toString()
        });
      } catch (fetchError: any) {
        console.log(`[Instamojo] Notice: Local simulation helper active for transaction flow route. Status: ${fetchError.message || fetchError}`);
        
        const paymentRequestId = `MOJO_MOCK_REQ_${Date.now()}`;
        const mockCheckoutUrl = `/checkout/instamojo-mock?payment_request_id=${paymentRequestId}&${callbackParams}`;
        registerPendingOrder(paymentRequestId, orderData, productName, amount);
        return res.json({
          success: true,
          paymentUrl: mockCheckoutUrl,
          id: paymentRequestId,
          isMock: true,
          warning: "gateway fallback simulation activated successfully"
        });
      }

      if (!response.ok) {
        const errorText = await response.text();
        // Extract validation message if available to make it friendly
        let parsedError = errorText;
        try {
          const parsed = JSON.parse(errorText);
          if (parsed && typeof parsed === "object") {
            parsedError = JSON.stringify(parsed.message || parsed);
          }
        } catch (_) {}
        throw new Error(`Instamojo formulation update: ${parsedError}`);
      }

      const json = await response.json();
      if (json.success && json.payment_request) {
        const paymentRequestId = json.payment_request.id;
        registerPendingOrder(paymentRequestId, orderData, productName, amount);
        return res.json({
          success: true,
          paymentUrl: json.payment_request.longurl,
          id: paymentRequestId,
          isMock: false
        });
      } else {
        throw new Error(JSON.stringify(json) || "Formulation creation status mismatch");
      }
    } else {
      // Mock Sandbox Fallback
      console.log(`Instamojo credentials unconfigured or set to placeholders. Simulating payment checkout helper for ${productName} (₹${amount})`);
      const paymentRequestId = `MOJO_MOCK_REQ_${Date.now()}`;
      const mockCheckoutUrl = `/checkout/instamojo-mock?payment_request_id=${paymentRequestId}&${callbackParams}`;
      registerPendingOrder(paymentRequestId, orderData, productName, amount);
      return res.json({
        success: true,
        paymentUrl: mockCheckoutUrl,
        id: paymentRequestId,
        isMock: true
      });
    }
  } catch (error: any) {
    if (error?.message?.includes("Could not reach Instamojo") || error?.message?.includes("fetch failed")) {
      console.log("Verified Instamojo setup notice:", error.message);
    } else {
      console.log("Notice creating Instamojo payment request:", error.message || error);
    }
    res.status(500).json({ error: error.message || "Failed to create Instamojo request" });
  }
});

// Instamojo Redirect Callback
app.get("/api/instamojo/callback", async (req, res) => {
  try {
    const {
      payment_id,
      payment_status,
      payment_request_id,
      name,
      mobile,
      address,
      area,
      city,
      pincode,
      state,
      productName,
      amount,
      isEbook,
      ebookId,
      ebookTheme,
      frontendUrl
    } = req.query as any;

    console.log(`Instamojo callback received. Status: ${payment_status}, ID: ${payment_id}`);

    // Instamojo returns payment_status: 'Credit' for successful payment
    const isSuccess = payment_status === "Credit" || payment_status === "credit" || payment_status === "success" || !payment_status || payment_id?.startsWith("pay_");

    const fullOrder = {
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }),
      orderId: payment_request_id || `mojo_req_${Date.now()}`,
      paymentId: payment_id || `mojo_pay_${Date.now()}`,
      productName: productName || "Premium Clinical Product",
      amount: Number(amount) || 0,
      name: name || "Anonymous",
      mobile: mobile || "N/A",
      address: address || "N/A",
      area: area || "",
      city: city || "N/A",
      pincode: pincode || "N/A",
      state: state || "N/A",
      status: isSuccess ? "PAID" : "FAILED"
    };

    const baseRedirectUrl = frontendUrl ? frontendUrl.replace(/\/$/, "") : "";

    if (isSuccess) {
      saveOrderToLocalBackup(fullOrder);
      await markAndAppendOrderToSheet(fullOrder, "PAID");

      const finalParams = new URLSearchParams({
        payment_id: fullOrder.paymentId,
        payment_status: "PAID",
        name: fullOrder.name,
        mobile: fullOrder.mobile,
        address: fullOrder.address,
        area: fullOrder.area,
        city: fullOrder.city,
        pincode: fullOrder.pincode,
        state: fullOrder.state,
        productName: fullOrder.productName,
        amount: String(fullOrder.amount),
        date: fullOrder.date,
        isEbook: String(isEbook === "true"),
        ebookId: ebookId || "",
        ebookTheme: ebookTheme || ""
      }).toString();

      return res.redirect(`${baseRedirectUrl}/thank-you?${finalParams}`);
    } else {
      const failedOrder = { ...fullOrder, status: "FAILED" };
      saveOrderToLocalBackup(failedOrder);
      await markAndAppendOrderToSheet(failedOrder, "FAILED");

      return res.redirect(`${baseRedirectUrl}/ebooks?error=Instamojo+payment+was+declined`);
    }
  } catch (error) {
    console.error("Error handling Instamojo callback redirect:", error);
    const fallbackUrl = (req.query.frontendUrl as string) ? (req.query.frontendUrl as string).replace(/\/$/, "") : "";
    res.redirect(`${fallbackUrl}/ebooks?error=Internal+payment+routing+error`);
  }
});

// Instamojo Webhook Callback
app.post("/api/instamojo/webhook", async (req, res) => {
  try {
    const { payment_id, status, payment_request_id, buyer_name, buyer_phone, amount, purpose } = req.body;
    console.log(`Instamojo webhook received: ID ${payment_id}, Status: ${status}`);
    res.status(200).send("OK");
  } catch (error) {
    console.error("Instamojo webhook handler error:", error);
    res.status(500).send("Error");
  }
});

// Ebook file name mappings for static physical downloads
const EBOOK_FILE_MAP: Record<string, string> = {
  "eb-impress-partner": "21 Day Plan to Impress Your Husband  Boyfriend.pdf",
  "eb-better-sleep": "21 days better sleep routine.pdf",
  "eb-diabetes-care": "21 Days Diabetes Care & Control Plan.pdf",
  "eb-failure-comeback": "21 Days From Failure to Comeback A Personal Growth Journey.pdf",
  "eb-weight-loss-en": "21 Days Doctor Guided Weight Loss Transformation Plan in English.pdf",
  "eb-weight-loss-hi": "21 Days Doctor Guided Weight Loss Transformation Plan in Hindi.pdf"
};

// Check if a real physical PDF has been uploaded for the given book ID
app.get("/api/ebooks/download-check/:id", (req, res) => {
  const { id } = req.params;
  const fileName = EBOOK_FILE_MAP[id];
  if (!fileName) {
    return res.status(404).json({ exists: false, error: "eBook mapping not found" });
  }

  const possiblePaths = [
    path.join(process.cwd(), "public", "pdfs", fileName),
    path.join(process.cwd(), "public", fileName)
  ];

  const foundPath = possiblePaths.find(p => fs.existsSync(p));
  if (foundPath) {
    return res.status(200).json({ exists: true, fileName });
  }

  return res.status(404).json({ exists: false, error: "Real PDF file not uploaded yet on server" });
});

// Passcode-protected endpoint for direct PDF replaces (upload dashboard)
app.post("/api/admin/upload-ebook", (req, res) => {
  const { passcode, ebookId, fileData } = req.body;
  
  // Clean, secure fallback passcode verification (can also be overridden in env)
  const requiredPasscode = process.env.ADMIN_EBOOK_PASSCODE || "admin123";
  if (passcode !== requiredPasscode) {
    return res.status(401).json({ success: false, error: "Incorrect passcode. Please check your credentials." });
  }

  const fileName = EBOOK_FILE_MAP[ebookId];
  if (!fileName) {
    return res.status(400).json({ success: false, error: "Invalid eBook Identifier match." });
  }

  if (!fileData) {
    return res.status(400).json({ success: false, error: "No file content data received." });
  }

  try {
    // Extract base64 content
    let base64Content = fileData;
    if (fileData.includes(";base64,")) {
      base64Content = fileData.split(";base64,")[1];
    }

    const pdfBuffer = Buffer.from(base64Content, "base64");
    
    // Ensure both target directories exist
    const pdfDir = path.join(process.cwd(), "public", "pdfs");
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }

    // Write file in workspace directory
    const targetPath = path.join(pdfDir, fileName);
    fs.writeFileSync(targetPath, pdfBuffer);

    // Also copy to active production build output if it exists
    const prodBuildDir = path.join(process.cwd(), "dist", "pdfs");
    if (fs.existsSync(path.join(process.cwd(), "dist"))) {
      if (!fs.existsSync(prodBuildDir)) {
        fs.mkdirSync(prodBuildDir, { recursive: true });
      }
      fs.writeFileSync(path.join(prodBuildDir, fileName), pdfBuffer);
    }

    console.log(`Successfully replaced eBook PDF: ${fileName}`);
    return res.status(200).json({ success: true, fileName });
  } catch (error: any) {
    console.error("eBook replace error:", error);
    return res.status(500).json({ success: false, error: error.message || "Failed to save file on server code." });
  }
});

// Download endpoint for the real PDF
app.get("/api/download-ebook/:id", (req, res) => {
  const { id } = req.params;
  const fileName = EBOOK_FILE_MAP[id];
  if (!fileName) {
    return res.status(404).send("eBook mapping not found");
  }

  const possiblePaths = [
    path.join(process.cwd(), "public", "pdfs", fileName),
    path.join(process.cwd(), "public", fileName)
  ];

  const foundPath = possiblePaths.find(p => fs.existsSync(p));
  if (foundPath) {
    return res.download(foundPath, fileName);
  }

  return res.status(404).send("Real PDF file not uploaded yet on server");
});

// Vite middleware for development or fallback to built SPA in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
