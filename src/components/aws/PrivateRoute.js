import { navigate } from "gatsby"
import React from "react"
import { isLoggedIn } from "../../utils/auth"

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, location, ...rest } = this.props
    if (!isLoggedIn()) {
      navigate(`/auth`)
      return null
    }
    return <Component {...rest} />
  }
}

export default PrivateRoute
