const CACHE_NAME = "coffee-app-v1";
const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/manifest.json",
    "/offline.html",
    "/icons/coffee-192.png",
    "/icons/coffee-512.png"
];

// Install Service Worker
self.addEventListener("install", (event) => {
    console.log("Service Worker installing...");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching assets...");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
    console.log("Service Worker activated");
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log("Removing old cache:", key);
                        return caches.delete(key);
                    }
                })
            )
        )
    );
    self.clients.claim();
});

// Fetch Handler
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || caches.match("/offline.html");
            });
        })
    );
});

// Notification Click Handler (only once)
self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow("/"));
});