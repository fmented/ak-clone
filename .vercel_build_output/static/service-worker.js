const timestamp = 1635935382706;
const build = [
  "/app/start-1d66b193.js",
  "/app/assets/start-61d1577b.css",
  "/app/layout.svelte-8e0ba7c2.js",
  "/app/error.svelte-87002c77.js",
  "/app/pages/index.svelte-4cc4a68e.js",
  "/app/assets/pages/index.svelte-34361a92.css",
  "/app/pages/changepassword/index.svelte-8e3bd6d0.js",
  "/app/assets/pages/changepassword/index.svelte-0cbfab54.css",
  "/app/pages/input/index.svelte-63bcdabd.js",
  "/app/assets/pages/input/index.svelte-95cbe373.css",
  "/app/pages/login/index.svelte-87b2f15d.js",
  "/app/assets/pages/login/index.svelte-4116ffbe.css",
  "/app/pages/loker/index.svelte-f7ca9664.js",
  "/app/assets/pages/loker/index.svelte-69f40f79.css",
  "/app/pages/nilai/index.svelte-ccc5104c.js",
  "/app/assets/pages/nilai/index.svelte-dfc61709.css",
  "/app/pages/home/index.svelte-fe4c5584.js",
  "/app/assets/pages/home/index.svelte-8cbf3e75.css",
  "/app/pages/spin/index.svelte-209cf273.js",
  "/app/assets/pages/spin/index.svelte-de157c20.css",
  "/app/chunks/vendor-fe0f6730.js",
  "/app/chunks/paths-28a87002.js",
  "/app/chunks/helper-f30ad25d.js",
  "/app/chunks/PageHead-6fa28c50.js",
  "/app/assets/PageHead-3b77c1b3.css",
  "/app/chunks/FormControl-e009d08a.js",
  "/app/assets/FormControl-799f52a1.css",
  "/app/chunks/Page-b22dd7a6.js",
  "/app/assets/Page-ce71ea78.css",
  "/app/chunks/stores-7d6bd2a0.js",
  "/app/assets/stores-2ede06c6.css",
  "/app/chunks/SortableTable-9156a735.js",
  "/app/assets/SortableTable-2e0ca44d.css"
];
const files = [
  "/android-chrome-144x144.png",
  "/apple-touch-icon.png",
  "/bg1.jpg",
  "/bg2.jpg",
  "/bitter/latin.woff2",
  "/browserconfig.xml",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/favicon.ico",
  "/ipad.webp",
  "/iphone.webp",
  "/logo.webp",
  "/mac.webp",
  "/macbook.webp",
  "/manifest.json",
  "/mstile-150x150.png",
  "/ps.webp",
  "/robots.txt",
  "/safari-pinned-tab.svg",
  "/sitemap.xml",
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
