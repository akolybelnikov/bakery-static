if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    if (registrations.length) {
      for (let registration of registrations) {
        console.log(registration)
        registration.unregister()
      }
    }
  })
}
