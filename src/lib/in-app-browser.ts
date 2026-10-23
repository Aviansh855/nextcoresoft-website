/** In-app browsers (Instagram, Facebook, etc.) often break fixed UI and CSS animations. */
export function isInAppBrowser(): boolean {
  if (typeof navigator === "undefined") return false
  const ua = navigator.userAgent
  return /WebView|;\s*wv\)|FBAN|FBAV|Instagram|Line\/|LinkedInApp|Twitter|TikTok|Snapchat|BytedanceWebview/i.test(ua)
}
