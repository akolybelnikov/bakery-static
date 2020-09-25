import { exists, window } from "browser-monads"
import { navigate } from "gatsby"
import React from "react"
import { getCurrentUser, isLoggedIn } from "../../utils/auth"

export default ({ component: Component, ...rest }) => {
  if (exists(window) && !isLoggedIn()) {
    navigate(`/auth`)
  }
  const user = getCurrentUser()

  if (!user.roles.includes("admin")) {
    navigate(`/user/profile`)
  }
  return isLoggedIn() && user.roles.includes("admin") ? (
    <Component {...rest} />
  ) : null
}
