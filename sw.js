const cacheName = 'cache-v1';
const resourcesToPrecache = [
  '/',
  'index.html',
  'css/styles.css',
  'js/main.js'
];

self.addEventListener('install', e => {

  // self.skipWaiting();

  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(resourcesToPrecache);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      return cachedResponse || fetch(e.request);
    })
  );
});

// self.addEventListener('activate', event => {
//   event.waitUntil(
//     caches.keys().then(keys => Promise.all(
//       keys.map(key => {
//         if (cacheName !== key) {
//           return caches.delete(key);
//         }
//       })
//     )).then(() => {
//       console.log(cacheName + ' now ready to handle fetches!');
//     })
//   );
// });
