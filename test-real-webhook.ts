// Real-time integration check with Google Sheets Webhook
import dotenv from "dotenv";
dotenv.config();

async function checkRealWebhook() {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) {
    console.log("No webhook URL configured.");
    return;
  }

  console.log("Testing GOOGLE_SHEET_WEBHOOK_URL:", url);

  const testPayload = {
    date: "Testing " + new Date().toLocaleString(),
    orderId: "TEST_RELIABILITY_" + Math.floor(Math.random() * 100000),
    paymentId: "TEST_MOCK_PAYMENT",
    productName: "Debug Live Leads Pipeline",
    amount: 1,
    name: "Dr Nishanti Debugger",
    mobile: "9100000001",
    address: "Interactive Test Suite",
    area: "Automation Wing",
    city: "Cloud Hub",
    pincode: "110011",
    state: "Delhi",
    status: "PENDING"
  };

  try {
    const queryParams = new URLSearchParams({
      date: String(testPayload.date),
      orderId: String(testPayload.orderId),
      paymentId: String(testPayload.paymentId),
      productName: String(testPayload.productName),
      amount: String(testPayload.amount),
      name: String(testPayload.name),
      mobile: String(testPayload.mobile),
      address: String(testPayload.address),
      area: String(testPayload.area),
      city: String(testPayload.city),
      pincode: String(testPayload.pincode),
      state: String(testPayload.state),
      status: String(testPayload.status)
    }).toString();

    const targetUrl = url.includes("?") 
      ? `${url}&${queryParams}`
      : `${url}?${queryParams}`;

    console.log("Attempting fetch to:", targetUrl);

    const res = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(testPayload)
    });

    console.log("Fetch call completed.");
    console.log("Response Status:", res.status, res.statusText);
    console.log("Response Headers:", Array.from(res.headers.entries()));
    
    const bodyText = await res.text();
    console.log("Response Body (Truncated to 500 chars):", bodyText.slice(0, 500));
  } catch (error: any) {
    console.error("Fetch threw error:", error);
  }
}

checkRealWebhook();
