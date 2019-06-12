self.addEventListener("install", () => self.skipWaiting())

self.addEventListener("activate", async () => {
  log("Service Worker activated")

  const cacheKeys = await caches.keys()

  cacheKeys.forEach(cacheKey => {
    if (cacheKey !== getCacheName()) {
      caches.delete(cacheKey)
    }
  })

  self.registration.unregister()
  
  self.clients.matchAll({ type: "window" }).then(clients => {
    for (const client of clients) {
      client.navigate(client.url)
    }
  })
})
