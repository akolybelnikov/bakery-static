import React, { useState } from "react"
import { Box } from "rebass"
import Login from "./components/Login"
import Signup from './components/Signup'
import { setUser, isLoggedIn } from "./utils/auth"

const Authenticator = () => {
  const [loading, setLoading] = React.useState(false)
  const [authState, setState] = useState()

  const setAuthState = newState => setState(newState)

  return (
    <Box>
      {authState === "signIn" && (
        <Login onStateChange={setAuthState} />
      )}
      {(authState === "signUp" || authState === "signedUp") && (
        <Signup onStateChange={setAuthState} authState={authState} />
      )}
    </Box>
  )
}

export default Authenticator
