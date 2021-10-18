const timestamp = 1634560749991;
const build = [
  "/app/start-ff503291.js",
  "/app/assets/start-61d1577b.css",
  "/app/layout.svelte-b94ba585.js",
  "/app/error.svelte-d7b2b6dd.js",
  "/app/pages/index.svelte-5600ac1a.js",
  "/app/assets/pages/index.svelte-ef7e3835.css",
  "/app/pages/changepassword/index.svelte-b96e369e.js",
  "/app/assets/pages/changepassword/index.svelte-0cbfab54.css",
  "/app/pages/input/index.svelte-d392a804.js",
  "/app/assets/pages/input/index.svelte-95cbe373.css",
  "/app/pages/login/index.svelte-a4fab860.js",
  "/app/assets/pages/login/index.svelte-ad8d8b23.css",
  "/app/pages/loker/index.svelte-4068feb8.js",
  "/app/assets/pages/loker/index.svelte-d242d8cf.css",
  "/app/pages/nilai/index.svelte-8b8a9c5b.js",
  "/app/assets/pages/nilai/index.svelte-dfc61709.css",
  "/app/pages/home/index.svelte-1b1c1180.js",
  "/app/assets/pages/home/index.svelte-8cbf3e75.css",
  "/app/pages/spin/index.svelte-cfe60e0f.js",
  "/app/chunks/vendor-7e49fdc9.js",
  "/app/chunks/paths-28a87002.js",
  "/app/chunks/helper-fdf82727.js",
  "/app/chunks/PageHead-ef4f7792.js",
  "/app/chunks/FormControl-ec879633.js",
  "/app/assets/FormControl-799f52a1.css",
  "/app/chunks/Page-27037ac8.js",
  "/app/assets/Page-3a1e778e.css",
  "/app/chunks/TitledBox-8ce99489.js",
  "/app/assets/TitledBox-c2c42933.css",
  "/app/chunks/SortableTable-2ee04ba3.js",
  "/app/assets/SortableTable-af4efd76.css",
  "/app/chunks/Spinner-2a32f139.js",
  "/app/assets/Spinner-d500aad0.css"
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