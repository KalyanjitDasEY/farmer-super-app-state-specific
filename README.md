# Bihar Kisan Suvidha

Frontend-only bilingual Progressive Web Application demonstrating Bihar farmer services. This is not an official Bihar government portal: schemes, market prices, identities, applications, and contact details shown inside the app are illustrative and do not submit to government systems. For official services visit [Bihar Agriculture DBT](https://dbtagriculture.bihar.gov.in/).

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- Chrome or Edge for local end-to-end tests

## Installation

```powershell
npm install
```

Copy `.env.example` to `.env.local` when local environment overrides are required. Do not place secrets in variables prefixed with `NEXT_PUBLIC_`.

## Development

```powershell
npm run dev
```

Open `http://localhost:3001`. URLs do not contain locale segments; the selected Hindi or English language is stored in a cookie.

The authenticated farmer dashboard includes dedicated Mandi Bhav, Weather,
Advisories, Krishi Input Marketplace, NutriCheck, Crop Doctor, Leaf Colour
Check, Pest & Disease, Pashu Bazaar, My Farms, Farm Machinery, and Agri
Startups service modules. Each module includes its related detail flows and
remains available under the configured base path.

The accident-support walkthrough retains its existing `/mksy` URL for demo
compatibility; it is **not** presented as an official Bihar scheme or claim
portal. Bihar-localized locations, catalogue entries, and sample identifiers
are illustrative. Consult the [Bihar Agriculture Department](https://state.bihar.gov.in/krishi/CitizenHome.html)
and [Directorate of Horticulture](https://horticulture.bihar.gov.in/) for
current services and eligibility.

## Farmer imagery

The farmer photos are illustrative; the site does not claim every person pictured
is from Bihar. The scheme and login photographs are identified as Bihar scenes
by their Wikimedia Commons uploaders; the gateway and marketplace portrait has
no verified state of origin. Crops, resizing, and a horizontal flip are credited
on the bilingual `/image-credits` page, linked from the footer. The sample ID
uses an original illustrated avatar rather than a photograph of a real person.
No imagery was copied from the reference site.

## Testing and validation

```powershell
npm run format:check
npm run typecheck
npm run lint
npm test
npm run test:e2e
```

Playwright uses an installed stable Chrome channel. Root-mode tests run on port `3205`; production-base-path tests run on port `3206`.

Run all non-browser production checks together:

```powershell
npm run validate
```

Regenerate the dependency license inventory after changing dependencies:

```powershell
npm run licenses
```

## Production build

```powershell
npm run build
npm run start
```

`npm run start` listens on port `3001` locally. The deployment script starts
the Bihar PM2 process on port `3002` so the Rajasthan app can remain on `3001`.

## Deployment

1. Copy `.env.production.example` to `.env.production`, then review the values for your deployment.
2. Confirm `NEXT_PUBLIC_BASE_PATH=/bihar-kisan-suvidha` before building. The base path is compiled into the client bundle.
3. Make the deployment script executable and run it:

   ```bash
   chmod +x deploy.sh
   CLEAN_SOURCE_AFTER_DEPLOY=false ./deploy.sh
   ```

   The script installs dependencies, creates a standalone production build,
   atomically deploys it to `/var/www/bihar-kisan-suvidha`, starts or restarts
   the `bihar-kisan-suvidha` PM2 process on `127.0.0.1:3002`, verifies
   `/bihar-kisan-suvidha/login`, and rolls back when deployment fails.
   `CLEAN_SOURCE_AFTER_DEPLOY=false` preserves the source checkout.

4. Replace the existing Bihar locations in the `eyaisahayak.in` Nginx server block with those from `deploy/nginx/bihar-kisan-suvidha.conf.example`. Keep the Rajasthan locations on port `3001`; do not add a second copy of the Bihar locations.
5. Run `sudo nginx -t && sudo systemctl reload nginx`, then open `https://eyaisahayak.in/bihar-kisan-suvidha/login`.
6. Serve over HTTPS so installation and service-worker features are available.

Nginx must preserve `/bihar-kisan-suvidha` when proxying. Do not add a trailing
slash to the `proxy_pass` upstream URL. Proxy `/bihar-kisan-suvidha` directly:
redirecting it to `/bihar-kisan-suvidha/` can loop with Next.js's slashless
canonical URL. Both the Rajasthan and Bihar apps need separate PM2 processes
and ports. Confirm the Bihar build includes
`NEXT_PUBLIC_BASE_PATH=/bihar-kisan-suvidha` before deploying; this setting
cannot be changed by Nginx after the build.

Deployment values can be overridden without editing the script:

```bash
APP_NAME=bihar-kisan-suvidha \
DEPLOY_DIR=/var/www/bihar-kisan-suvidha \
APP_HOST=127.0.0.1 \
CLEAN_SOURCE_AFTER_DEPLOY=false \
PORT=3002 \
HEALTH_PATH=/bihar-kisan-suvidha/login \
./deploy.sh
```

For a root-path Nginx proxy and a build with an empty
`NEXT_PUBLIC_BASE_PATH`, run the script with `HEALTH_PATH=/`.
