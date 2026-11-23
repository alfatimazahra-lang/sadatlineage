const CACHE_NAME = "sadat-lineage-v2";
const ASSETS = ["./", "./index.html", "./manifest.json"];

self.addEventListener("install", function(e) {
  e.waitUntil(caches.open(CACHE_NAME).then(function(cache) { return cache.addAll(ASSETS); }));
});

self.addEventListener("fetch", function(e) {
  if (e.request.url.indexOf("supabase.co") !== -1) return;
  e.respondWith(caches.match(e.request).then(function(cached) { return cached || fetch(e.request); }));
});
