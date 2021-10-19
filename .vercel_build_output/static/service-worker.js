const timestamp = 1634653551872;
const build = [
  "/app/start-ba3c4279.js",
  "/app/assets/start-61d1577b.css",
  "/app/layout.svelte-458118db.js",
  "/app/error.svelte-26187a6b.js",
  "/app/pages/index.svelte-64ed892f.js",
  "/app/assets/pages/index.svelte-249d24da.css",
  "/app/pages/changepassword/index.svelte-af24198d.js",
  "/app/assets/pages/changepassword/index.svelte-0cbfab54.css",
  "/app/pages/input/index.svelte-07015725.js",
  "/app/assets/pages/input/index.svelte-95cbe373.css",
  "/app/pages/login/index.svelte-2bdfba51.js",
  "/app/assets/pages/login/index.svelte-de3d8aaf.css",
  "/app/pages/loker/index.svelte-1c3db519.js",
  "/app/assets/pages/loker/index.svelte-f720a108.css",
  "/app/pages/nilai/index.svelte-918f71be.js",
  "/app/assets/pages/nilai/index.svelte-dfc61709.css",
  "/app/pages/home/index.svelte-06d1c0a3.js",
  "/app/assets/pages/home/index.svelte-8cbf3e75.css",
  "/app/pages/spin/index.svelte-cb9bb983.js",
  "/app/chunks/vendor-0d13e34a.js",
  "/app/chunks/paths-28a87002.js",
  "/app/chunks/helper-fdf82727.js",
  "/app/chunks/PageHead-75484f8c.js",
  "/app/chunks/FormControl-7755543e.js",
  "/app/assets/FormControl-799f52a1.css",
  "/app/chunks/Page-d8a85c88.js",
  "/app/assets/Page-3a1e778e.css",
  "/app/chunks/TitledBox-6b8aaf7e.js",
  "/app/assets/TitledBox-c2c42933.css",
  "/app/chunks/SortableTable-a9f8626b.js",
  "/app/assets/SortableTable-96b01e90.css",
  "/app/chunks/Spinner-155df517.js",
  "/app/assets/Spinner-994c5188.css"
];
const files = [
  "/android-chrome-144x144.png",
  "/apple-touch-icon.png",
  "/bg1.jpg",
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
