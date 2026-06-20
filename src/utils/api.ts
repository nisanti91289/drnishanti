/**
 * Helper utility to get the absolute or relative API URL.
 * Supports VITE_API_BASE_URL environment variable for cases where the frontend is deployed
 * on static hosts (like Netlify at drnishanti.netlify.app) and needs to point to a separate
 * self-hosted Express backend server on another provider (like Cloud Run, VPS, Render, etc.).
 */
export function getApiUrl(path: string): string {
  // Read VITE_API_BASE_URL environment variable
  let apiBase = import.meta.env.VITE_API_BASE_URL || "";
  
  // Smart fallback: If deployed on Netlify or a client domain and VITE_API_BASE_URL is not set,
  // point to the live Express server running on this container.
  if (!apiBase && typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
    const isSandboxDomain = hostname.includes("run.app");
    
    if (!isLocal && !isSandboxDomain) {
      // Only fallback to the temporary AI Studio sandbox if running on Netlify/static preview domains.
      // For monolith deployments (like Render or VPS), we keep apiBase empty to use relative paths.
      if (hostname.includes("netlify.app") || hostname.includes("webflow.io") || hostname.includes("github.io")) {
        apiBase = "https://ais-pre-gco5zc3ve2tikhojs5y2bo-527789709778.asia-southeast1.run.app";
      }
    }
  }
  
  if (!apiBase) {
    return path;
  }
  
  // Format clean base: remove any trailing slashes
  const cleanBase = apiBase.endsWith("/") ? apiBase.slice(0, -1) : apiBase;
  
  // Format clean path: ensure it starts with a slash
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  return `${cleanBase}${cleanPath}`;
}
