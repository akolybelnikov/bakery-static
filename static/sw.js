self.addEventListener("install", () => self.skipWaiting())

self.addEventListener("activate", () => self.reistration.unregister())
