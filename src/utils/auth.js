const isBrowser = typeof window !== `undefined`

export const setUser = user =>
  isBrowser && (window.localStorage.COGNITO_USER = JSON.stringify(user))

const getUser = () => {
  if (!isBrowser) return

  if (window.localStorage.COGNITO_USER) {
    let user = JSON.parse(window.localStorage.COGNITO_USER)
    return user ? user : {}
  }
  return {}
}

export const isLoggedIn = () => {
  if (!isBrowser) return false

  const user = getUser()
  if (user) return !!user.username
}

export const getCurrentUser = () => isBrowser && getUser()

export const logout = callback => {
  if (!isBrowser) return
  setUser({})
  callback()
}
