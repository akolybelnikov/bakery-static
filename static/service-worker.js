self.addEventListener("install", () => self.skipWaiting())

self.addEventListener("activate", async () => {
  console.log("Service Worker activated")

  const cacheKeys = await caches.keys()

  cacheKeys.forEach(cacheKey => {
    caches.delete(cacheKey)
  })

  self.registration.unregister()

  self.clients.matchAll({ type: "window" }).then(clients => {
    for (const client of clients) {
      client.navigate(client.url)
    }
  })
})
