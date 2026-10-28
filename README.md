# Insightrix website

## Development

Use `npm install`, then `npm run dev`. `npm run build` regenerates the static marketing pages and builds the nine Vite entry points into `dist/`.

- `src/site-config.js`: shared product descriptions, navigation and development notice.
- `scripts/render-site.mjs`: home, three product pages, company, Contact, thanks and 404 generator. Edit this source rather than only generated HTML.
- `src/index.css`, `src/site.js`: marketing design and accessible tabs, mobile navigation, optional GIF playback.
- `src/components/SiteChrome.jsx`, `PricingSection.tsx`: matching React request page at `/app.html`.
- `public/demos/demo-data.js`: explicitly fictional sample data for 12 views.
- `public/demos/demo.js`, `demo.css`: menu changes, search, status filters, details and source-derived sample charts.
- `public/demos/media/`: three HTML example recordings, each four frames over 22 seconds. Posters load first; GIFs only load after explicit play and can be stopped. These are not recordings of completed applications.
- `public/fonts/`: self-hosted Pretendard variable font and SIL OFL license.

All products remain in development and invite pilot participation inquiries through the existing Contact form. Pilot costs, schedule, eligibility and support terms have not been established by the website. No installer URLs, invented release dates, customer endorsements or performance claims are supplied. The Formspree destination and field names are preserved. Do not submit the live form during QA.

## Release checks

Build and check the nine pages at desktop and narrow mobile sizes. Verify all 12 demo menus, item details, search/no-results/reset, status filters, keyboard navigation, request links and GIF play/stop. Keep company/private data and local screenshots/logs out of the repository.

The existing GitHub/Vercel deployment flow uses the review branch for Preview and `main` for Production. Check the remote head before updating either branch, then confirm the resulting deployment and public domain.

Existing payment API and the `WelcomePro` app-launch route are retained without changes; they are outside this marketing redesign and must not be exercised as a website QA step.
