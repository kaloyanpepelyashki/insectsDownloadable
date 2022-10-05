const cacheName = "cache-insects";

// When browser reads this, caches all files mentioned in array
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(
      cacheName.then(function (cache) {
        return cache.addAll([
          "/insectDownloadable/",
          "/insectDownloadable/index.html",
          "/insectDownloadable/butterflies.jpg",
          "/insectDownloadable/dragonfly.jpg",
          "/insectDownloadable/butterfly",
        ]);
      })
    )
  );
});

// If the user request ressource (file, html, image etc) then look for it online
// If not available online, get file from cache
self.addEventListener("fetch", function (event) {
  event.respond(
    fetch(event.request).catch(() =>
      caches.open(cacheName).then((cache) => cache.match(event.request))
    )
  );
});
