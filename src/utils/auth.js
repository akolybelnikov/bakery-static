import { window } from "browser-monads"

export const setUser = user =>
  (window.localStorage.COGNITO_USER = JSON.stringify(user))

const getUser = () =>
  window.localStorage.COGNITO_USER
    ? JSON.parse(window.localStorage.COGNITO_USER)
    : {}

export const isLoggedIn = () => {
  const user = getUser()
  if (user) return !!user.username
}

export const getCurrentUser = () => getUser()

export const logout = callback => {
  setUser({})
  callback()
}
