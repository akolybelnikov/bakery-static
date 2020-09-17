import { navigate } from "gatsby"
import React from "react"
import { isLoggedIn } from "../../utils/auth"
import { exists, window } from "browser-monads"

export default ({ component: Component, ...rest }) => {
  //const isBrowser = typeof window !== `undefined`
  if (exists(window) && !isLoggedIn()) {
    navigate(`/auth`)
  }
  return isLoggedIn() ? <Component {...rest} /> : null
}
