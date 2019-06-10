import { navigate } from "gatsby"
import React, { useEffect } from "react"
import { isLoggedIn } from "../../utils/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(`/auth`)
    }
  }, [])

  return isLoggedIn() ? <Component {...rest} /> : null
}

export default PrivateRoute
