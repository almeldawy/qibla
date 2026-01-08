const CACHE_NAME = 'qibla-cache-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// Installation : on met les fichiers dans le "frigo" (cache)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activation : on nettoie les vieux caches
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Stratégie : Répondre avec le cache, sinon chercher sur le réseau
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
