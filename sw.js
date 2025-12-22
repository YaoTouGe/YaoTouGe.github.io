const cacheName = self.location.pathname
const pages = [

  "/zh/docs/",
  "/zh/tags/LTC/",
  "/zh/docs/ltclight/guide/",
  "/zh/tags/",
  "/docs/",
  "/tags/LTC/",
  "/docs/ltclight/guide/",
  "/tags/",
  "/",
  "/zh/",
  "/categories/",
  "/zh/categories/",
  "/book.min.6970156cec683193d93c9c4edaf0d56574e4361df2e0c1be4f697ae81c3ba55f.css",
  "/en.search-data.min.bec993fd04397926d15a6818ffd88537ea7e6f7f961bc5ff2efdb5b3cf81324a.json",
  "/en.search.min.138c01820cbe7bd88e27e92aa827e69554b7324c0b575415445d5aa306c4922c.js",
  
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
