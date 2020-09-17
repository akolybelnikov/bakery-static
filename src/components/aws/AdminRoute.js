import { exists, window } from "browser-monads"
import { navigate } from "gatsby"
import React from "react"
import { getCurrentUser, isLoggedIn } from "../../utils/auth"
import { admins } from '../../config/creds';

export default ({ component: Component, ...rest }) => {
  if (exists(window) && !isLoggedIn()) {
    navigate(`/auth`)
  }
  const user = getCurrentUser()

  if (!admins.includes(user.username)) {
    navigate(`/user/profile`)
  }
  return isLoggedIn() && admins.includes(user.username) ? (
    <Component {...rest} />
  ) : null
}
