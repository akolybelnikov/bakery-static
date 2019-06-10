import React from "react";

export default ({
  component: Component,
  isLoggedIn,
  ...rest
}) => {
  return isLoggedIn ? <Component {...rest} /> : null
}
