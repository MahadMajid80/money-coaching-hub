// Google Consent Mode v2 scripts, run inline from the layout (server) before any tag loads.
// The banner itself is components/CookieConsent.tsx.

export const CONSENT_KEY = "mch-consent";

/**
 * Cookie banner switch. Off for now (at the owner's request, to measure ad traffic): no banner, and
 * Google/Meta get "granted" by default. To bring the banner back, set NEXT_PUBLIC_COOKIE_BANNER=on in
 * Vercel and redeploy. Visitors who already chose "Reject" on the banner keep their choice.
 */
export const COOKIE_BANNER = process.env.NEXT_PUBLIC_COOKIE_BANNER === "on";
export const CONSENT_OPEN_EVENT = "mch-open-cookie-settings";

/** Runs in <head> before any tag: the default consent state (denied with the banner, granted without), then the visitor's saved choice. */
const DEFAULT_STATE = COOKIE_BANNER ? "denied" : "granted";
export const consentDefaultScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=window.gtag||gtag;
gtag('consent','default',{ad_storage:'${DEFAULT_STATE}',ad_user_data:'${DEFAULT_STATE}',ad_personalization:'${DEFAULT_STATE}',analytics_storage:'${DEFAULT_STATE}',functionality_storage:'granted',security_storage:'granted'${COOKIE_BANNER ? ",wait_for_update:500" : ""}});
${COOKIE_BANNER ? "gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);" : ""}
try{var c=JSON.parse(localStorage.getItem('${CONSENT_KEY}')||'null');if(c&&c.v===1){var a=c.ads?'granted':'denied';gtag('consent','update',{ad_storage:a,ad_user_data:a,ad_personalization:a,analytics_storage:c.analytics?'granted':'denied'})}}catch(e){}`;

/** Meta Pixel: hold back until advertising cookies are accepted. Inserted before fbq('init'). */
export const pixelConsentSnippet = COOKIE_BANNER
  ? `try{var mc=JSON.parse(localStorage.getItem('${CONSENT_KEY}')||'null');fbq('consent',mc&&mc.ads?'grant':'revoke')}catch(e){fbq('consent','revoke')}`
  : `try{var mc=JSON.parse(localStorage.getItem('${CONSENT_KEY}')||'null');fbq('consent',mc&&!mc.ads?'revoke':'grant')}catch(e){fbq('consent','grant')}`;
