const CACHE_NAME = 'ruwhan-site-v1';
const OFFLINE_URL = '/offline.html';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/about/',
  '/resume/',
  '/assets/css/style.css',
  '/assets/js/main.js',
  '/assets/images/favicon-32x32.png',
  '/assets/images/favicon-192x192.png',
  '/assets/images/favicon-512x512.png',
  '/assets/images/favicon.svg',
  '/assets/images/maskable-icon.svg',
  OFFLINE_URL
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => key !== CACHE_NAME && caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

// Strategy: Network-first for navigations, cache-first for static assets
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Handle navigation requests
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(req);
          return cached || caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  // Cache-first for other requests (CSS/JS/images)
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          const copy = res.clone();
          // Only cache successful GET responses
          if (req.method === 'GET' && res.ok) {
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(OFFLINE_URL));
    })
  );
});