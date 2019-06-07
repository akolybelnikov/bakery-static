import React, { useEffect } from "react"
import { isLoggedIn } from "../services/auth"
import { navigate } from "gatsby"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  //   componentDidMount = () => {
  //     if (!isLoggedIn() && location.pathname !== `/app/login`) {
  //       // If the user is not logged in, redirect to the login page.
  //       navigate(`/app/login`)
  //       return null
  //     }
  //   }
  useEffect(() => {
    if (!isLoggedIn() && location.pathname !== `/app/login`) {
      navigate(`/app/login`)
    }
  }, [])

  return isLoggedIn() ? <Component {...rest} /> : null
}

export default PrivateRoute
