import { navigate } from "gatsby"
import React, { useState } from "react"
import { Box } from "rebass"
import { isLoggedIn } from "../../utils/auth"
import Login from "./components/Login"
import Signup from "./components/Signup"

const Authenticator = () => {
  const [loading, setLoading] = React.useState(false)
  const [authState, setState] = useState('signIn')

  const setAuthState = newState => setState(newState)

  if (isLoggedIn()) {
    navigate("/user/profile")
  }

  console.log(authState)

  return (
    <Box>
      {authState === "signIn" && <Login onStateChange={setAuthState} />}
      {(authState === "signUp" || authState === "signedUp") && (
        <Signup onStateChange={setAuthState} authState={authState} />
      )}
    </Box>
  )
}

export default Authenticator
