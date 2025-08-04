const CACHE_NAME = 'thakirni-offline-v2';
const STATIC_CACHE = 'thakirni-static-v2';
const DYNAMIC_CACHE = 'thakirni-dynamic-v2';

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  '/logo.png',
  '/logo.svg',
  '/robots.txt'
];

// App routes to cache
const APP_ROUTES = [
  '/',
  '/adhkar',
  '/stories',
  '/quran-stories',
  '/favorites'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      }),
      // Cache app routes
      caches.open(DYNAMIC_CACHE).then(cache => {
        console.log('Caching app routes...');
        return cache.addAll(APP_ROUTES);
      })
    ]).then(() => {
      console.log('Service Worker installed successfully');
      return self.skipWaiting();
    }).catch(error => {
      console.error('Service Worker installation failed:', error);
    })
  );
});

// Activate event - clean up old caches and take control
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE && cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker activated successfully');
      return self.clients.claim();
    })
  );
});

// Fetch event - offline-first strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests (analytics, etc.)
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        // If we have a cached response, return it
        if (cachedResponse) {
          console.log('Serving from cache:', request.url);
          return cachedResponse;
        }

        // If not in cache, try network
        return fetch(request)
          .then(networkResponse => {
            // Don't cache if response is not valid
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clone the response
            const responseToCache = networkResponse.clone();

            // Cache the response
            caches.open(DYNAMIC_CACHE)
              .then(cache => {
                cache.put(request, responseToCache);
                console.log('Cached new resource:', request.url);
              })
              .catch(error => {
                console.error('Failed to cache response:', error);
              });

            return networkResponse;
          })
          .catch(error => {
            console.log('Network request failed, checking for fallback:', request.url);
            
            // For navigation requests, return the offline page
            if (request.mode === 'navigate') {
              return caches.match('/offline.html');
            }

            // For other requests, return a basic offline response
            if (request.destination === 'image') {
              return caches.match('/logo.png');
            }

            // For API requests, return empty response
            if (request.url.includes('/api/')) {
              return new Response(JSON.stringify({ error: 'Offline mode' }), {
                status: 503,
                statusText: 'Service Unavailable',
                headers: { 'Content-Type': 'application/json' }
              });
            }

            throw error;
          });
      })
  );
});

// Background sync for when connection is restored
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
    event.waitUntil(
      // Handle any pending operations when connection is restored
      Promise.resolve()
    );
  }
});

// Handle push notifications
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/logo192.png',
      badge: '/logo192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
}); 