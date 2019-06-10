if ("serviceWorker" in navigator) {
  navigator.serviceWorker.ready
    .then(registration => {
      console.log("one", registration)
      return navigator.serviceWorker.getRegistrations()
    })
    .then(function(registrations) {
      console.log("all", registrations)
      // if (registrations.length) {
      //   for (let registration of registrations) {
      //     registration.unregister()
      //   }
      // }
      return registrations
    })
}
