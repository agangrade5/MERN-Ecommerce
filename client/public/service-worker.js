/* eslint-disable no-restricted-globals */
const CACHE_NAME = "my-app-cache-v2";
const STATIC_CACHE = "static-cache-v2";
const DYNAMIC_CACHE = "dynamic-cache-v2";
const IMAGE_CACHE = "image-cache-v2";

// Static assets to cache immediately
const STATIC_ASSETS = [
    "/",
    "/index.html",
    "/static/js/bundle.js", // adjust based on your build output
    "/static/css/main.css", // adjust based on your build output
    "/src/assets/empty-cart.png",
    "/src/assets/banner1.jpg",
    "/vite.svg",
    "/manifest.json"
];

// Routes to cache dynamically
const ROUTES_TO_CACHE = [
    "/",
    "/products",
    "/cart",
    "/about",
    "/contact",
    "/login",
    "/register"
];

// API endpoints to cache with different strategies
const API_CACHE_PATTERNS = {
    products: /https:\/\/dummyjson\.com\/products/,
    images: /https:\/\/cdn\.dummyjson\.com/
};

// Install Service Worker
self.addEventListener("install", (event) => {
    console.log("Service Worker installing...");
    event.waitUntil(
        Promise.all([
            // Cache static assets
            caches.open(STATIC_CACHE).then((cache) => {
                console.log("Caching static assets");
                return cache.addAll(STATIC_ASSETS);
            }),
            // Skip waiting to activate immediately
            self.skipWaiting()
        ])
    );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
    console.log("Service Worker activating...");
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then((cacheNames) =>
                Promise.all(
                    cacheNames
                        .filter((name) => 
                            name !== STATIC_CACHE && 
                            name !== DYNAMIC_CACHE && 
                            name !== IMAGE_CACHE
                        )
                        .map((name) => {
                            console.log("Deleting old cache:", name);
                            return caches.delete(name);
                        })
                )
            ),
            // Take control of all clients
            self.clients.claim()
        ])
    );
});

// Fetch event handler with different strategies
self.addEventListener("fetch", (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== "GET") {
        return;
    }

    // Handle different types of requests with appropriate strategies
    if (isStaticAsset(request)) {
        event.respondWith(cacheFirst(request, STATIC_CACHE));
    } else if (isProductAPI(request)) {
        event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    } else if (isImageRequest(request)) {
        event.respondWith(cacheFirst(request, IMAGE_CACHE));
    } else if (isNavigationRequest(request)) {
        event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    } else {
        event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    }
});

// Cache strategies
async function cacheFirst(request, cacheName) {
    try {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }

        const networkResponse = await fetch(request);
        if (networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error("Cache first strategy failed:", error);
        return await caches.match("/index.html");
    }
}

async function networkFirst(request, cacheName) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.status === 200) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log("Network failed, trying cache:", request.url);
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }

        // Fallback for navigation requests
        if (isNavigationRequest(request)) {
            return await caches.match("/index.html");
        }
        
        throw error;
    }
}

// Helper functions to categorize requests
function isStaticAsset(request) {
    return request.url.includes("/static/") ||
           request.url.includes("/assets/") ||
           request.url.includes("vite.svg") ||
           request.url.includes(".css") ||
           request.url.includes(".js");
}

function isProductAPI(request) {
    return API_CACHE_PATTERNS.products.test(request.url);
}

function isImageRequest(request) {
    return API_CACHE_PATTERNS.images.test(request.url) ||
           request.destination === "image" ||
           /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(new URL(request.url).pathname);
}

function isNavigationRequest(request) {
    return request.mode === "navigate" || 
           (request.method === "GET" && request.headers.get("accept").includes("text/html"));
}

// Background sync for failed requests (optional)
self.addEventListener("sync", (event) => {
    if (event.tag === "background-sync") {
        console.log("Background sync triggered");
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    // Handle any queued requests when connection is restored
    console.log("Performing background sync...");
}

// Handle push notifications (optional)
self.addEventListener("push", (event) => {
    if (event.data) {
        const options = {
            body: event.data.text(),
            icon: "/vite.svg",
            badge: "/vite.svg"
        };
        
        event.waitUntil(
            self.registration.showNotification("My App", options)
        );
    }
});

// Cache management - clean up old entries
setInterval(() => {
    cleanupCache(DYNAMIC_CACHE, 50); // Keep only 50 entries
    cleanupCache(IMAGE_CACHE, 100);  // Keep only 100 images
}, 24 * 60 * 60 * 1000); // Run daily

async function cleanupCache(cacheName, maxEntries) {
    try {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        
        if (keys.length > maxEntries) {
            const keysToDelete = keys.slice(0, keys.length - maxEntries);
            await Promise.all(keysToDelete.map(key => cache.delete(key)));
            console.log(`Cleaned up ${keysToDelete.length} entries from ${cacheName}`);
        }
    } catch (error) {
        console.error("Cache cleanup failed:", error);
    }
}