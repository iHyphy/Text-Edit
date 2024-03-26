const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { StaleWhileRevalidate, CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache files managed by workbox-webpack-plugin.
precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 Days
    }),
  ],
});

// Strategy for HTML pages
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Cache pages on navigate requests
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Asset Caching: Implement caching for CSS, JavaScript, and images
// Cache CSS and JavaScript files
registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Cache image files
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60, // Maximum number of images to cache
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 Days
      }),
    ],
  })
);

// Additional asset caching logic can be added here, for example, for fonts or API responses.
