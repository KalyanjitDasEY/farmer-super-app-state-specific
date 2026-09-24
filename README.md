# Raj Kisan Suvidha

Frontend-only bilingual Progressive Web Application for Rajasthan farmer services.

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

The production server listens on port `3001`.

## Deployment

1. Copy `.env.production.example` to `.env.production`.
2. Confirm `NEXT_PUBLIC_BASE_PATH=/raj-kisan-suvidha` before building. The base path is compiled into the client bundle.
3. Make the deployment script executable and run it:

   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

   The script installs dependencies, creates a standalone production build,
   atomically deploys it to `/var/www/raj-kisan-suvidha`, starts or restarts
   the `raj-kisan-suvidha` PM2 process on `127.0.0.1:3001`, verifies
   `/raj-kisan-suvidha/`, and rolls back when deployment fails.

4. Add the locations from `deploy/nginx/raj-kisan-suvidha.conf.example` to the existing `eyaisahayak.in` Nginx server block.
5. Reload Nginx and open `https://eyaisahayak.in/raj-kisan-suvidha/`.
6. Serve over HTTPS so installation and service-worker features are available.

Nginx must preserve `/raj-kisan-suvidha` when proxying. Do not add a trailing slash to the `proxy_pass` upstream URL.

Deployment values can be overridden without editing the script:

```bash
APP_NAME=raj-kisan-suvidha \
DEPLOY_DIR=/var/www/raj-kisan-suvidha \
APP_HOST=127.0.0.1 \
PORT=3001 \
HEALTH_PATH=/raj-kisan-suvidha/ \
./deploy.sh
```

For a root-path Nginx proxy and a build with an empty
`NEXT_PUBLIC_BASE_PATH`, run the script with `HEALTH_PATH=/`.
