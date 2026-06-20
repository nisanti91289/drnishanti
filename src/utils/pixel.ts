declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export interface PixelEventParams {
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
  [key: string]: any;
}

/**
 * Tracks a standard Meta Pixel event with properties
 */
export const trackPixelEvent = (
  eventName: "PageView" | "ViewContent" | "AddToCart" | "InitiateCheckout" | "Purchase",
  params?: PixelEventParams
) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params);
    console.log(`[Meta Pixel] Tracked ${eventName}:`, params);
  } else {
    console.log(`[Meta Pixel Offline] Attempted ${eventName} but fbq is not loaded:`, params);
  }
};
