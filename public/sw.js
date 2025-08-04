const CACHE_NAME = 'thakirni-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  '/logo.png',
  '/static/js/0.chunk.js',
  '/static/js/main.chunk.js',
  '/static/media/logo.5d5d9eef.svg',
  '/adhkar',
  '/stories',
  '/quran-stories',
  '/favorites'
];

// Cache strategy: Network first, fallback to cache
const networkFirst = async (request) => {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
};

// Cache strategy: Cache first, fallback to network
const cacheFirst = async (request) => {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    throw error;
  }
};

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .then(() => {
        // Pre-cache all app routes
        return caches.open(CACHE_NAME).then(cache => {
          const routesToCache = [
            '/',
            '/adhkar',
            '/stories',
            '/quran-stories',
            '/favorites'
          ];
          return Promise.all(
            routesToCache.map(route => 
              fetch(route).then(response => cache.put(route, response))
            )
          );
        });
      })
  );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Always try cache first for everything
  event.respondWith(
    caches.match(request)
      .then(response => {
        // Return cached version if available
        if (response) {
          return response;
        }
        
        // If not in cache, try network
        return fetch(request)
          .then(networkResponse => {
            // Cache the network response for next time
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(request, responseClone);
              });
            return networkResponse;
          })
          .catch(error => {
            // If network fails and it's a navigation request, return the home page
            if (request.mode === 'navigate') {
              return caches.match('/');
            }
            throw error;
          });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
}); 