if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    if (registrations.length) {
      for (let registration of registrations) {
        registration.unregister()
      }
    }
  })
}
