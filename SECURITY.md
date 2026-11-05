# Security

How the website and the dashboard (/admin) are protected. Last reviewed 5 November 2026.

## Dashboard login
- **One admin account only.** No sign-up page, no "create first user" screen, no way to add or delete users.
- **Strong passwords required** (12+ characters, letters and numbers, not the email name or an obvious word).
- **Brute-force lockout:** 5 wrong passwords lock the login for 15 minutes.
- **Sessions:** stored server-side, end after 8 hours of inactivity, and logging out really ends them.
- **Cookie:** HttpOnly (scripts can't read it), Secure (HTTPS only), SameSite=Strict, and the token is never returned in API responses.
- **CSRF and CORS:** the login cookie is only accepted from the site's own addresses (`lib/security/origins.ts`), and other sites can't call the API from a browser.
- **Password reset by email** is switched off until SMTP is configured, so no reset tokens end up in logs.
- **Secret key:** `PAYLOAD_SECRET`, or derived from the private database token. The live site refuses to start with the development key.

## Data access
- **Private data:** enquiries, newsletter sign-ups, the user account, drafts, version history and the notification email can't be read without logging in. Everything else is the public website content.
- **Visitors' IP addresses are never stored**, only a salted one-way fingerprint used for rate limiting.

## Website
- **Content-Security-Policy with a fresh nonce on every request:** only the site's own scripts can run, so injected scripts can't. Other headers: HSTS (2 years, preload-ready), `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Cross-Origin-Opener-Policy`, and a locked-down `Permissions-Policy`.
- **Sanitising:** article and page HTML (including the WordPress import) is cleaned of scripts, event handlers, `javascript:` links and foreign iframes. Every link set in the dashboard is checked too, and structured data is escaped.
- **Uploads:** photos and PDFs only (no SVG), real file-type checks, and a 15 MB limit.
- **Forms:** JSON only, size-limited, and only accepted from this site. There's a honeypot, and a rate limit stored in the database (5 per 10 minutes, 20 per day) that survives restarts. Control characters are stripped, which stops email header injection.
- **Search engines:** the dashboard and API are marked noindex and blocked in robots.txt.
- **Contact for security reports:** `/.well-known/security.txt`.

## Dependencies
- Next.js 16.4.5 (November 2026 security release) and sharp 0.35.5, with dompurify and happy-dom overridden to patched versions.
- `npm audit --omit=dev` shows no high or critical issues. Remaining low/moderate items: `deepmerge` (no fix released yet) and an esbuild issue that only affects a local development server.

## Recommended for the owner
- Turn on two-factor login for the Vercel, GitHub and Turso accounts, since anyone with those accounts controls the site.
- Keep Vercel **Deployment Protection** on for preview deployments.
- Optional: add Vercel Firewall rate-limit rules for `/api/users/login` and `/api/contact`.
