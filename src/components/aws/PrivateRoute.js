import { navigate } from "gatsby"
import React from "react"
import { isLoggedIn } from "../../utils/auth"

export default ({ component: Component, ...rest }) => {
  const isBrowser = typeof window !== `undefined`
  if (isBrowser && !isLoggedIn()) {
    navigate(`/auth`)
  }
  return isLoggedIn() ? <Component {...rest} /> : null
}
