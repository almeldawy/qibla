const CACHE_NAME = 'qibla-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap'
];

// 1. Installation : On remplit le cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 2. Nettoyage : On supprime les vieux caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// 3. Stratégie optimisée : Cache d'abord, sinon Réseau
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si le fichier est dans le cache, on le renvoie immédiatement
      if (cachedResponse) {
        return cachedResponse;
      }
      // Sinon, on va le chercher sur internet
      return fetch(event.request);
    })
  );
});
