const timestamp = 1635102060414;
const build = [
  "/app/start-0e7851ed.js",
  "/app/assets/start-61d1577b.css",
  "/app/layout.svelte-c3619dea.js",
  "/app/error.svelte-88216201.js",
  "/app/pages/index.svelte-3db12a4d.js",
  "/app/assets/pages/index.svelte-e0c70bef.css",
  "/app/pages/changepassword/index.svelte-6fd8afa7.js",
  "/app/assets/pages/changepassword/index.svelte-0cbfab54.css",
  "/app/pages/input/index.svelte-4e4dc0eb.js",
  "/app/assets/pages/input/index.svelte-95cbe373.css",
  "/app/pages/login/index.svelte-eb1b2ea7.js",
  "/app/assets/pages/login/index.svelte-de3d8aaf.css",
  "/app/pages/loker/index.svelte-b5748b75.js",
  "/app/assets/pages/loker/index.svelte-e7d6f703.css",
  "/app/pages/nilai/index.svelte-370d7664.js",
  "/app/assets/pages/nilai/index.svelte-dfc61709.css",
  "/app/pages/home/index.svelte-08b13001.js",
  "/app/assets/pages/home/index.svelte-8cbf3e75.css",
  "/app/pages/spin/index.svelte-757625e7.js",
  "/app/chunks/vendor-3e1a4086.js",
  "/app/chunks/paths-28a87002.js",
  "/app/chunks/helper-fdf82727.js",
  "/app/chunks/PageHead-b7ee7f38.js",
  "/app/chunks/FormControl-20200729.js",
  "/app/assets/FormControl-799f52a1.css",
  "/app/chunks/Page-671524e4.js",
  "/app/assets/Page-9222b32c.css",
  "/app/chunks/stores-f41050e5.js",
  "/app/assets/stores-2ede06c6.css",
  "/app/chunks/SortableTable-0a038a22.js",
  "/app/assets/SortableTable-eb476b1b.css",
  "/app/chunks/Spinner-2001130c.js",
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
  "/ipad.webp",
  "/iphone.png",
  "/iphone.webp",
  "/logo.webp",
  "/mac.png",
  "/mac.webp",
  "/macbook.png",
  "/macbook.webp",
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
