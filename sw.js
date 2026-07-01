/* ============================================================
   Service Worker for Obstetric Anesthesia TLVMC PWA
   - Caches core assets for offline use
   - Network-first strategy for PDFs, cache-first for shell
   ============================================================ */

const CACHE_NAME = 'ob-anes-tlvmc-v1';

// Core app shell — always cache these
const SHELL_ASSETS = [
  '/OBAnesLis/',
  '/OBAnesLis/index.html',
  '/OBAnesLis/style.css',
  '/OBAnesLis/app.js',
  '/OBAnesLis/manifest.json',
  '/OBAnesLis/design.png',
  '/OBAnesLis/icons/icon-192x192.png',
  '/OBAnesLis/icons/icon-512x512.png',
  '/OBAnesLis/apple-touch-icon.png'
];

// ── Install: cache the app shell ─────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching app shell');
      return cache.addAll(SHELL_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: clean up old caches ────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: serve from cache, fall back to network ────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // PDFs & images: network-first (fresh content), fall back to cache
  if (
    url.pathname.endsWith('.pdf') ||
    url.pathname.endsWith('.docx') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.jpg')
  ) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache a copy as we fetch
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // App shell & assets: cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cache fresh responses
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
