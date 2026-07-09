/* ============================================================
   Service Worker for Obstetric Anesthesia TLVMC PWA  v2
   Strategy:
     - HTML / JS / CSS / JSON  → Network-first (always fresh)
     - PDFs / images           → Cache-first (large, rarely change)
   ============================================================ */

const CACHE_NAME = 'ob-anes-tlvmc-v2';

// ── Install: pre-cache app icons only (small, stable) ────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/OBAnesLis/icons/icon-192x192.png',
        '/OBAnesLis/icons/icon-512x512.png',
        '/OBAnesLis/apple-touch-icon.png'
      ]);
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: delete ALL old caches ──────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        console.log('[SW v2] Deleting cache:', key);
        return caches.delete(key);
      }))
    ).then(() => self.clients.claim())
  );
});

// ── Fetch ─────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const path = url.pathname;

  // PDFs, DOCX, images → cache-first (large files, stable)
  const isLargeFile =
    path.endsWith('.pdf') ||
    path.endsWith('.docx') ||
    path.endsWith('.jpeg') ||
    path.endsWith('.jpg') ||
    path.endsWith('.tif');

  if (isLargeFile) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Everything else (HTML, JS, CSS, JSON, PNG icons) → network-first
  // Always try the network; only fall back to cache if offline
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
