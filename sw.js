const CACHE_NAME = "sadat-lineage-v10";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Supabase API calls ko seedha internet se jaane dein, cache/intercept mat karein
  if (event.request.url.includes("supabase.co")) return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
