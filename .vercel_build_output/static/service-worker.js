const timestamp = 1634730469692;
const build = [
  "/app/start-02ae99dc.js",
  "/app/assets/start-61d1577b.css",
  "/app/layout.svelte-b1655468.js",
  "/app/error.svelte-64644eba.js",
  "/app/pages/index.svelte-b08ae26a.js",
  "/app/assets/pages/index.svelte-dd97ea44.css",
  "/app/pages/changepassword/index.svelte-dd7699c3.js",
  "/app/assets/pages/changepassword/index.svelte-0cbfab54.css",
  "/app/pages/input/index.svelte-86b761fb.js",
  "/app/assets/pages/input/index.svelte-95cbe373.css",
  "/app/pages/login/index.svelte-7a0bad08.js",
  "/app/assets/pages/login/index.svelte-de3d8aaf.css",
  "/app/pages/loker/index.svelte-debf0dec.js",
  "/app/assets/pages/loker/index.svelte-f720a108.css",
  "/app/pages/nilai/index.svelte-4f059dc7.js",
  "/app/assets/pages/nilai/index.svelte-dfc61709.css",
  "/app/pages/home/index.svelte-c83794e6.js",
  "/app/assets/pages/home/index.svelte-8cbf3e75.css",
  "/app/pages/spin/index.svelte-379daee8.js",
  "/app/chunks/vendor-79b04026.js",
  "/app/chunks/paths-28a87002.js",
  "/app/chunks/helper-fdf82727.js",
  "/app/chunks/PageHead-b102df8e.js",
  "/app/chunks/FormControl-83750bdf.js",
  "/app/assets/FormControl-799f52a1.css",
  "/app/chunks/Page-8df9c3a1.js",
  "/app/assets/Page-3a1e778e.css",
  "/app/chunks/stores-b4fc7c00.js",
  "/app/assets/stores-2ede06c6.css",
  "/app/chunks/SortableTable-1ce2e74b.js",
  "/app/assets/SortableTable-96b01e90.css",
  "/app/chunks/Spinner-461b7534.js",
  "/app/assets/Spinner-994c5188.css"
];
const files = [
  "/android-chrome-144x144.png",
  "/apple-touch-icon.png",
  "/bg1.jpg",
  "/bg2.jpg",
  "/browserconfig.xml",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/favicon.ico",
  "/global.css",
  "/ipad.png",
  "/iphone.png",
  "/logo.webp",
  "/mac.png",
  "/macbook.png",
  "/manifest.json",
  "/mstile-150x150.png",
  "/ps.webp",
  "/safari-pinned-tab.svg",
  "/site.webmanifest",
  "/sttm.webp"
];
const worker = self;
const FILES = `cache${timestamp}`;
const to_cache = build.concat(files);
const staticAssets = new Set(to_cache);
worker.addEventListener("install", (event) => {
  event.waitUntil(caches.open(FILES).then((cache) => cache.addAll(to_cache)).then(() => {
    worker.skipWaiting();
  }));
});
worker.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then(async (keys) => {
    for (const key of keys) {
      if (key !== FILES)
        await caches.delete(key);
    }
    worker.clients.claim();
  }));
});
async function fetchAndCache(request) {
  const cache = await caches.open(`offline${timestamp}`);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    const response = await cache.match(request);
    if (response)
      return response;
    throw err;
  }
}
worker.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || event.request.headers.has("range"))
    return;
  const url = new URL(event.request.url);
  const isHttp = url.protocol.startsWith("http");
  const isDevServerRequest = url.hostname === self.location.hostname && url.port !== self.location.port;
  const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
  const skipBecauseUncached = event.request.cache === "only-if-cached" && !isStaticAsset;
  if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
    event.respondWith((async () => {
      const cachedAsset = isStaticAsset && await caches.match(event.request);
      return cachedAsset || fetchAndCache(event.request);
    })());
  }
});
