# Insightrix website

## Development

Use `npm install`, then `npm run dev`. `npm run typecheck` checks the TypeScript sources with the existing strict settings. `npm run build` runs this check, regenerates the static marketing pages and builds the nine Vite entry points into `dist/`.

- `src/site-config.js`, `src/site-config.d.ts`: shared product descriptions, navigation and development notice, with a typed public interface.
- `scripts/render-site.mjs`: home, three product pages, company, Contact, thanks and 404 generator. Edit this source rather than only generated HTML.
- `src/index.css`, `src/site.js`: marketing design and accessible tabs, mobile navigation, optional GIF playback.
- `src/components/SiteChrome.tsx`, `PricingSection.tsx`: matching React request page at `/app.html`.
- `public/demos/demo-data.js`: explicitly fictional sample data for 12 views.
- `public/demos/demo.js`, `demo.css`: menu changes, search, status filters, details and source-derived sample charts.
- `public/recordings/`: verified recordings of the current applications, with sample data and an explicit validation scope. Posters load first; GIFs only download after explicit play and can be stopped.
- `public/demos/media/`: legacy HTML illustrations. AccountingFlow and AuditFlow illustrations must not be presented as application recordings. The root-level legacy `*_demo.gif` files are unverified and must not be used for publication.
- `public/fonts/`: self-hosted Pretendard variable font and SIL OFL license.

All products remain in development and invite pilot participation inquiries through the existing Contact form. Pilot costs, schedule, eligibility and support terms have not been established by the website. No installer URLs, invented release dates, customer endorsements or performance claims are supplied. The Formspree destination and field names are preserved. Do not submit the live form during QA.

## Release checks

Build and check the nine pages at desktop and narrow mobile sizes. Verify product navigation, the retained OperationsFlow illustration, request links and recording play/stop. Keep a static image as the initial state for all users, including reduced-motion users. Publish application recordings only after comparing them to the validated source version. Keep company/private data and local screenshots/logs out of the repository; only reviewed public media belongs in `public/recordings/`.

The existing GitHub/Vercel deployment flow uses the review branch for Preview and `main` for Production. Check the remote head before updating either branch, then confirm the resulting deployment and public domain.

Existing payment API and the `WelcomePro` app-launch route are retained without changes; they are outside this marketing redesign and must not be exercised as a website QA step.
