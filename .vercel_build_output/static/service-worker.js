const timestamp = 1635467807490;
const build = [
  "/app/start-38423040.js",
  "/app/assets/start-61d1577b.css",
  "/app/layout.svelte-c3619dea.js",
  "/app/error.svelte-88216201.js",
  "/app/pages/index.svelte-008ecfdb.js",
  "/app/assets/pages/index.svelte-d5a3d6df.css",
  "/app/pages/changepassword/index.svelte-794a0836.js",
  "/app/assets/pages/changepassword/index.svelte-0cbfab54.css",
  "/app/pages/input/index.svelte-d6435822.js",
  "/app/assets/pages/input/index.svelte-95cbe373.css",
  "/app/pages/login/index.svelte-a9268f32.js",
  "/app/assets/pages/login/index.svelte-eb275d51.css",
  "/app/pages/loker/index.svelte-bdc39f45.js",
  "/app/assets/pages/loker/index.svelte-e7d6f703.css",
  "/app/pages/nilai/index.svelte-526055de.js",
  "/app/assets/pages/nilai/index.svelte-dfc61709.css",
  "/app/pages/home/index.svelte-6a1e0059.js",
  "/app/assets/pages/home/index.svelte-8cbf3e75.css",
  "/app/pages/spin/index.svelte-bde2e1c9.js",
  "/app/chunks/vendor-3e1a4086.js",
  "/app/chunks/paths-28a87002.js",
  "/app/chunks/helper-fdf82727.js",
  "/app/chunks/PageHead-780f6808.js",
  "/app/chunks/FormControl-20200729.js",
  "/app/assets/FormControl-799f52a1.css",
  "/app/chunks/Page-ddd8e493.js",
  "/app/assets/Page-5e4eb7fb.css",
  "/app/chunks/stores-f41050e5.js",
  "/app/assets/stores-2ede06c6.css",
  "/app/chunks/SortableTable-25088af7.js",
  "/app/assets/SortableTable-51f0657a.css",
  "/app/chunks/Spinner-52f46c79.js",
  "/app/assets/Spinner-2c252a10.css"
];
const files = [
  "/android-chrome-144x144.png",
  "/apple-touch-icon.png",
  "/bg1.jpg",
  "/bg2.jpg",
  "/bitter/cyrillic-ext.woff2",
  "/bitter/cyrillic.woff2",
  "/bitter/latin-ext.woff2",
  "/bitter/latin.woff2",
  "/bitter/vietnam.woff2",
  "/browserconfig.xml",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/favicon.ico",
  "/font.css",
  "/font.min.css",
  "/global.css",
  "/global.min.css",
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
