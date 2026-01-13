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
  "/docs/ltclight/global_config/",
  "/zh/docs/ltclight/global_config/",
  "/zh/",
  "/",
  "/zh/categories/",
  "/categories/",
  "/zh/docs/",
  "/docs/",
  "/docs/ltclight/light_types/linear_light/",
  "/docs/ltclight/",
  "/zh/docs/ltclight/",
  "/zh/tags/",
  "/tags/",
  "/docs/ltclight/light_types/textured_light/",
  "/zh/docs/ltclight/light_types/textured_light/",
  "/zh/docs/ltclight/light_types/linear_light/",
  "/book.min.cc2c524ed250aac81b23d1f4af87344917b325208841feca0968fe450f570575.css",
  "/zh.search-data.min.ad4fc37ed7af9e477faf9f2b8a1a2ad897934f1415d06eeb4d695e55a95a3eed.json",
  "/zh.search.min.54e269c3ce26f67ee09ec3d27d1a1ba0e6b04be6e262b63a1a294aec555fd22a.js",
  
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
