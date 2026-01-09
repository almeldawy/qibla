const CACHE_NAME = 'qibla-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Installation : on met les fichiers essentiels en cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // On essaie d'ajouter les ressources, mais on ne bloque pas si une échoue
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation : on vide l'ancien cache si on change de version
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Stratégie : Réseau d'abord, sinon cache (pour être sûr d'avoir la dernière version)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
