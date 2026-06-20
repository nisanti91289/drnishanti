import { CLINIC_LOGO_BASE64 } from "./logoBase64";
import { getApiUrl } from "./api";

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export interface CheckoutOptions {
  amount: number; // in Rupees, e.g. 649
  productName: string;
  orderData?: {
    name: string;
    mobile: string;
    address: string;
    area: string;
    city: string;
    pincode: string;
    state: string;
  };
  onSuccess: (paymentId: string) => void;
  onFailure: (errorMsg: string) => void;
}

export async function triggerRazorpayCheckout({ 
  amount, 
  productName, 
  orderData,
  onSuccess, 
  onFailure 
}: CheckoutOptions) {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    onFailure("Razorpay payment gateway failed to load. Please verify your internet connection.");
    return;
  }

  try {
    // Create secure Razorpay order on the backend first
    const res = await fetch(getApiUrl("/api/razorpay/order"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, productName }),
    });

    if (!res.ok) {
      throw new Error(`Failed to contact secure payment gateway (code ${res.status})`);
    }

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || "Order creation failed on backend");
    }

    const { orderId, amount: amountPaise, keyId, isMock } = data;

    // Log lead with the real orderId immediately for marketing backup in case checkout is abandoned
    if (orderData) {
      fetch(getApiUrl("/api/order/log-failed"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderData: {
            ...orderData,
            orderId,
            status: "PENDING",
            productName,
            amount
          }
        })
      }).catch(err => console.error("Leads background logging error:", err));
    }

    if (isMock) {
      console.log("Mock sandbox activated. Simulating payment process...");
      setTimeout(async () => {
        try {
          const verifyRes = await fetch(getApiUrl("/api/razorpay/verify"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_payment_id: `pay_mock_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
              razorpay_order_id: orderId,
              razorpay_signature: "mock_signature_approved",
              isMock: true,
              orderData: {
                ...orderData,
                productName,
                amount
              }
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            onSuccess(`pay_mock_${Date.now()}`);
          } else {
            onFailure(verifyData.error || "Payment validation signature failed.");
          }
        } catch (err: any) {
          onFailure(err.message || "Failed verifying sandbox signature on server.");
        }
      }, 1500);
      return;
    }

    const options = {
      key: keyId,
      amount: amountPaise,
      currency: "INR",
      name: "Dr. Nishanti's Skin Hair Ozone",
      description: `Premium Order: ${productName}`,
      image: CLINIC_LOGO_BASE64, // Dr. Nishanti's Skin Hair Ozone Clinic Logo base64
      order_id: orderId,
      handler: async function (response: any) {
        try {
          // Verify signature on backend alongside user details for Sheet integration
          const verifyRes = await fetch(getApiUrl("/api/razorpay/verify"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              isMock,
              orderData: {
                ...orderData,
                productName,
                amount
              }
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            onSuccess(response.razorpay_payment_id || `pay_mock_${Date.now()}`);
          } else {
            onFailure(verifyData.error || "Payment validation signature failed.");
          }
        } catch (err: any) {
          onFailure(err.message || "Failed verifying transaction signature on server.");
        }
      },
      prefill: {
        name: orderData?.name || "",
        email: orderData?.mobile ? `${orderData.mobile}@drnishanti.com` : "customer@drnishanti.com",
        contact: orderData?.mobile || ""
      },
      theme: {
        color: "#bf9243" // Gold brand accent color
      },
      modal: {
        ondismiss: function() {
          onFailure("Payment process cancelled by user.");
        }
      }
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();

  } catch (error: any) {
    onFailure(error.message || "Something went wrong setting up checkout.");
  }
}
