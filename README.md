# Money Coaching Hub

Homepage for [moneycoachinghub.com](https://moneycoachinghub.com), built with Next.js 15 (App Router) and deployed on Vercel.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where things live

| What | File |
| --- | --- |
| All copy, links, course dates, columns, reviews | `lib/content.ts` |
| Page layout | `app/page.tsx` |
| Styles | `app/globals.css` |
| Header and mobile menu | `components/Header.tsx` |
| Newsletter form | `components/NewsletterForm.tsx` |
| Images | `public/images/` |

To change the course date or price, or to add a new Times of Malta column, edit `lib/content.ts` only.

## Before going live

- **Course links:** `links.courseApply` and `links.courseDetails` in `lib/content.ts` point to the contact page for now. Replace them with the course page or application form.
- **Newsletter:** set `NEXT_PUBLIC_NEWSLETTER_ACTION` in Vercel (Settings → Environment Variables) to your email provider's form URL (for example Mailchimp or Brevo). Until it's set, the form doesn't send anywhere.
- **Logo:** an SVG or larger transparent PNG of the logo will look sharper than the current image.

## Deploy

Import the repo in Vercel. The framework preset is detected automatically, and no other settings are needed.
