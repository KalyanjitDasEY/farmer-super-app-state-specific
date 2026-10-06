const CACHE_VERSION = "bihar-kisan-v1";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const PUBLIC_CACHE = `${CACHE_VERSION}-public`;
const SCOPE_PATH = new URL(self.registration.scope).pathname.replace(/\/$/, "");
const withBasePath = (path) => `${SCOPE_PATH}${path}`;
const OFFLINE_URL = withBasePath("/offline");
const PRECACHE = [
  OFFLINE_URL,
  withBasePath("/icons/icon-192.png"),
  withBasePath("/icons/icon-512.png"),
  withBasePath("/images/landing-farmer.png"),
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE)),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                (key.startsWith("raj-kisan-") ||
                  key.startsWith("bihar-kisan-")) &&
                !key.startsWith(CACHE_VERSION),
            )
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

const isSensitive = (url) =>
  /\/(login|register|profile|apply|track|home)(\/|$)/.test(url.pathname);

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || isSensitive(url)) return;

  if (url.pathname.startsWith("/icons/")) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        return response;
      }),
    );
    return;
  }

  if (request.mode === "navigate" || url.pathname.includes("/schemes")) {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          if (response.ok && !response.headers.get("set-cookie")) {
            const cache = await caches.open(PUBLIC_CACHE);
            await cache.put(request, response.clone());
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          return cached ?? (await caches.match(OFFLINE_URL));
        }),
    );
  }
});
