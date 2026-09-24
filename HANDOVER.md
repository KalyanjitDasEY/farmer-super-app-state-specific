# Handover Manifest

## Included

- Next.js App Router application with strict TypeScript.
- Hindi and English cookie-selected content without locale URL segments.
- Public gateway, farmer login, three-step registration, dashboard, Service Hub, agency selector, scheme catalogue, PM-KISAN details/status, application draft, tracking, profile, More, and offline routes.
- Typed domain models, repository interfaces, service composition, explicit domain errors, and fictional mock adapters.
- CSS token-based responsive design and reference-derived local decorative assets.
- Installable manifest, 192/512/maskable icons, narrowly scoped service worker, offline fallback, install prompt, and update prompt.
- Unit, component, localization, navigation, accessibility, form, cache-policy, mobile browser, and desktop browser tests.
- Security headers and production source-map policy.
- Reproducible third-party dependency/license inventory.

## Excluded

- Real government APIs, OTP delivery, Jan Aadhaar/Aadhaar verification, SSO, authentication sessions, authorization, land-record lookup, payment data, document upload, notifications, AI, and production analytics.
- Approved legal scheme copy or official Hindi legal translations.
- Official government branding, emblem, privacy policy, terms, accessibility statement, grievance details, and production support contacts.
- Backend-enforced eligibility or application submission.
- Reference screenshots and `_internal_project_docs`.

## Supported extension points

- `SchemeRepository` for catalogue/detail APIs.
- `DashboardRepository` for authenticated summary APIs.
- `IdentityRepository` for OTP/identity APIs.
- `LocationRepository` for administrative master data and Khasra resolution.
- `BeneficiaryRepository` for private scheme status.
- Locale dictionaries for approved content providers or CMS adapters.
- `featureRegistry` for controlled module enablement.
- Service-worker sensitive-route matcher for future authenticated endpoints.
- Build-time `NEXT_PUBLIC_BASE_PATH` configuration for subpath deployment.
- Environment parser for server-only configuration.

## Integration requirements

- Replace mock repositories in the server-side composition root.
- Parse all external responses before returning domain models.
- Use secure HttpOnly cookies and backend authorization.
- Set private/personal responses to `Cache-Control: no-store`.
- Update CSP allowlists only for approved API, image, and telemetry origins.
- Keep identity, land, application, and beneficiary data out of local storage and service-worker caches.

## Known handover constraints

- All displayed identities, references, land values, dates, benefits, and payment rows are fictional.
- Demo OTP is `123456`.
- Browser tests require a locally installed Chrome channel.
- Production support and legal content require product-owner approval.
