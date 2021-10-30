const timestamp = 1635593227941;
const build = [
  "/app/start-7898f436.js",
  "/app/assets/start-61d1577b.css",
  "/app/layout.svelte-e662934e.js",
  "/app/error.svelte-a31513b3.js",
  "/app/pages/index.svelte-94e1ed5c.js",
  "/app/assets/pages/index.svelte-b29f3e4f.css",
  "/app/pages/changepassword/index.svelte-ee43ecc4.js",
  "/app/assets/pages/changepassword/index.svelte-0cbfab54.css",
  "/app/pages/input/index.svelte-b96df1a2.js",
  "/app/assets/pages/input/index.svelte-95cbe373.css",
  "/app/pages/login/index.svelte-678ce205.js",
  "/app/assets/pages/login/index.svelte-dd2d7523.css",
  "/app/pages/loker/index.svelte-0297c1eb.js",
  "/app/assets/pages/loker/index.svelte-69f40f79.css",
  "/app/pages/nilai/index.svelte-a6e6d9c9.js",
  "/app/assets/pages/nilai/index.svelte-dfc61709.css",
  "/app/pages/home/index.svelte-ef2402d2.js",
  "/app/assets/pages/home/index.svelte-8cbf3e75.css",
  "/app/pages/spin/index.svelte-825b84ef.js",
  "/app/chunks/vendor-a1babf57.js",
  "/app/chunks/paths-28a87002.js",
  "/app/chunks/helper-10cfd0ee.js",
  "/app/chunks/PageHead-b437813e.js",
  "/app/assets/PageHead-6ee02194.css",
  "/app/chunks/FormControl-84eba160.js",
  "/app/assets/FormControl-799f52a1.css",
  "/app/chunks/Page-bf74d58b.js",
  "/app/assets/Page-831855ca.css",
  "/app/chunks/stores-eeb9a86a.js",
  "/app/assets/stores-2ede06c6.css",
  "/app/chunks/SortableTable-7a6dcbe3.js",
  "/app/assets/SortableTable-51f0657a.css",
  "/app/chunks/Spinner-68f200ee.js",
  "/app/assets/Spinner-2c252a10.css"
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
