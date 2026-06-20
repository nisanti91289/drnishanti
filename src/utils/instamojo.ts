import { getApiUrl } from "./api";

export interface InstamojoCheckoutOptions {
  amount: number;
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
  isEbook?: boolean;
  ebookId?: string;
  ebookTheme?: any;
  onSuccess?: (paymentId: string) => void;
  onFailure: (errorMsg: string) => void;
}

export async function triggerInstamojoCheckout({
  amount,
  productName,
  orderData,
  isEbook = false,
  ebookId,
  ebookTheme,
  onFailure
}: InstamojoCheckoutOptions) {
  try {
    // 1. Contact secure payment request initiator first to get order/request ID
    const res = await fetch(getApiUrl("/api/instamojo/order"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        amount, 
        productName, 
        orderData,
        isEbook,
        ebookId,
        ebookTheme,
        frontendUrl: typeof window !== "undefined" ? window.location.origin : ""
      }),
    });

    if (!res.ok) {
      let errorMsg = `Failed to contact secure payment gateway (code ${res.status})`;
      try {
        const errJson = await res.json();
        if (errJson && errJson.error) {
          errorMsg = errJson.error;
        }
      } catch (e) {
        // Fallback to default
      }
      throw new Error(errorMsg);
    }

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || "Order creation failed on backend");
    }

    const orderId = data.id || `MOJO_MOCK_REQ_${Date.now()}`;

    // 2. Log lead with the real order ID immediately for marketing backup in case checkout is abandoned
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

    // 3. Simple redirect to Instamojo checkout URL (simulated or real sandbox/live link)
    if (data.paymentUrl) {
      const isInsideIframe = typeof window !== "undefined" && window.self !== window.top;
      if (isInsideIframe) {
        // If we are nested in an iframe (like the AI Studio builder preview),
        // we must open the payment URL in standard top-level window or a new window/tab
        // to bypass the iframe block (X-Frame-Options: deny / sameorigin)
        const win = window.open(data.paymentUrl, "_blank");
        if (!win) {
          // Fallback if popup is blocked
          window.location.href = data.paymentUrl;
        }
      } else {
        window.location.href = data.paymentUrl;
      }
    } else {
      throw new Error("Missing gateway redirect URL from secure backend");
    }

  } catch (error: any) {
    onFailure(error.message || "Something went wrong setting up Instamojo checkout.");
  }
}
