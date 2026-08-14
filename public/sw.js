const CACHE_NAME = "exam-board-v3";
const OFFLINE_URL = "/offline.html";
const urlsToCache = ["/", OFFLINE_URL];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      // Cache-first with background update for same-origin assets
      if (cached) {
        if (event.request.mode === "navigate" && event.request.url.startsWith(self.location.origin)) {
          const fresh = fetch(event.request)
            .then((response) => {
              if (response && response.status === 200) {
                const clone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
              }
              return response;
            })
            .catch(() => cached);
          event.waitUntil(fresh.then(() => {}));
        }
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200) return response;
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => { cache.put(event.request, responseToCache); });
          return response;
        })
        .catch(() => {
          if (event.request.mode === "navigate") return caches.match(OFFLINE_URL);
        });
    })
  );
});
