const CACHE_NAME = "exam-board-v2";
const urlsToCache = ["/", "/offline"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
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
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200) return response;
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => { cache.put(event.request, responseToCache); });
        return response;
      });
    }).catch(() => {
      if (event.request.destination === "document") return caches.match("/offline");
    })
  );
});

// Push notification support
self.addEventListener("push", (event) => {
  if (!event.data) return;
  const data = event.data.json();
  const options = {
    body: data.body || "New government job notification!",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    vibrate: [200, 100, 200],
    data: { url: data.url || "/" },
    actions: [
      { action: "open", title: "View Now" },
      { action: "dismiss", title: "Dismiss" },
    ],
  };
  event.waitUntil(self.registration.showNotification(data.title || "Exam Notice Board", options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "dismiss") return;
  const url = event.notification.data?.url || "/";
  event.waitUntil(clients.openWindow(url));
});
