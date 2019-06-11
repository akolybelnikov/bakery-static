self.addEventListener('activate', () => activateSW());

async function activateSW() {

    console.log('Service Worker activated');

    const cacheKeys = await caches.keys();

    cacheKeys.forEach(cacheKey => {
        caches.delete(cacheKey);
    });

    window.location.reload()

    return self.clients.claim();
}

