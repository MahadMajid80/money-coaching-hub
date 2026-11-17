// Google Consent Mode v2 scripts, run inline from the layout (server) before any tag loads.
// The banner itself is components/CookieConsent.tsx.

export const CONSENT_KEY = "mch-consent";
export const CONSENT_OPEN_EVENT = "mch-open-cookie-settings";

/** Runs in <head> before any tag: everything denied until the visitor chooses (or their saved choice). */
export const consentDefaultScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=window.gtag||gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);
try{var c=JSON.parse(localStorage.getItem('${CONSENT_KEY}')||'null');if(c&&c.v===1){var a=c.ads?'granted':'denied';gtag('consent','update',{ad_storage:a,ad_user_data:a,ad_personalization:a,analytics_storage:c.analytics?'granted':'denied'})}}catch(e){}`;

/** Meta Pixel: hold back until advertising cookies are accepted. Inserted before fbq('init'). */
export const pixelConsentSnippet = `try{var mc=JSON.parse(localStorage.getItem('${CONSENT_KEY}')||'null');fbq('consent',mc&&mc.ads?'grant':'revoke')}catch(e){fbq('consent','revoke')}`;
