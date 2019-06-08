const logAuth = process.env.NODE_ENV === "development" && false
const clog = (...args) => logAuth && console.log(...args)

export const isBrowser = () => typeof window !== "undefined"

export const initAuth = () => {
  if (isBrowser()) {
    // window.netlifyIdentity = netlifyIdentity
    // You must run this once before trying to interact with the widget
    // netlifyIdentity.init()
  }
}

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("COGNITO_USER")
    ? JSON.parse(window.localStorage.getItem("COGNITO_USER"))
    : null

const setUser = user =>
  window.localStorage.setItem("COGNITO_USER", JSON.stringify(user))

export const handleLogin = cb => {
  clog("isLoggedIn check", isLoggedIn())

  if (isLoggedIn()) {
    clog("logged in")
    cb(getUser())
  } else {
    clog("logging in...")
    // netlifyIdentity.open()
    // netlifyIdentity.on("login", user => {
    //   clog("logged in!", { user })
    //   setUser(user)
    //   cb(user)
    // })
  }
}

export const isLoggedIn = () => {
  if (!isBrowser()) return false
  const user = getUser()
  // const user = netlifyIdentity.currentUser()
  clog("isLoggedIn check", { user })
  return !!user
}

export const logout = cb => {
//   netlifyIdentity.logout()
//   netlifyIdentity.on("logout", () => {
//     setUser({})
//     cb()
//   })
}
