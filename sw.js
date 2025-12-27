const cacheName = self.location.pathname
const pages = [

  "/docs/ltclight/light_types/polygon_light/",
  "/docs/ltclight/sample/",
  "/zh/docs/ltclight/light_types/polygon_light/",
  "/zh/docs/ltclight/sample/",
  "/docs/ltclight/integration/",
  "/zh/docs/ltclight/integration/",
  "/docs/ltclight/light_types/",
  "/zh/docs/ltclight/light_types/",
  "/",
  "/zh/",
  "/categories/",
  "/zh/categories/",
  "/docs/",
  "/zh/docs/",
  "/docs/ltclight/light_types/linear_light/",
  "/docs/ltclight/",
  "/zh/docs/ltclight/",
  "/tags/",
  "/zh/tags/",
  "/docs/ltclight/light_types/textured_light/",
  "/zh/docs/ltclight/light_types/textured_light/",
  "/zh/docs/ltclight/light_types/linear_light/",
  "/book.min.6970156cec683193d93c9c4edaf0d56574e4361df2e0c1be4f697ae81c3ba55f.css",
  "/en.search-data.min.b413da1f10f24ec3e4dbabeee0b70f7d59cc628ed499dc1e63ea05a0a40a555a.json",
  "/en.search.min.8bccd18e6d00d0570be6003e46debc0480d3fd075e5fda952ebb6fb4bdd73f3e.js",
  
];

self.addEventListener("install", function (event) {
  self.skipWaiting();

  caches.open(cacheName).then((cache) => {
    return cache.addAll(pages);
  });
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }

  /**
   * @param {Response} response
   * @returns {Promise<Response>}
   */
  function saveToCache(response) {
    if (cacheable(response)) {
      return caches
        .open(cacheName)
        .then((cache) => cache.put(request, response.clone()))
        .then(() => response);
    } else {
      return response;
    }
  }

  /**
   * @param {Error} error
   */
  function serveFromCache(error) {
    return caches.open(cacheName).then((cache) => cache.match(request.url));
  }

  /**
   * @param {Response} response
   * @returns {Boolean}
   */
  function cacheable(response) {
    return response.type === "basic" && response.ok && !response.headers.has("Content-Disposition")
  }

  event.respondWith(fetch(request).then(saveToCache).catch(serveFromCache));
});
