import { navigate } from "gatsby"
import React, { useState } from "react"
import { Box } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { isLoggedIn } from "../utils/auth"
import Login from "../components/aws/Login"
import Signup from "../components/aws/Signup"
import ResetPassword from "../components/aws/ResetPassword"

const Authenticator = ({ location }) => {
  const pageTitle = "Вход пользователя"
  const [username, setUsername] = useState()
  // const [loading, setLoading] = React.useState(false)
  const [authState, setState] = useState("signUp")

  const setAuthState = newState => setState(newState)
  const userSignedUp = username => setUsername(username)

  if (isLoggedIn()) {
    navigate("/user/profile")
  }

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      <Box>
        {authState === "signIn" && (
          <Login setUsername={userSignedUp} onStateChange={setAuthState} />
        )}
        {(authState === "signUp" || authState === "signedUp") && (
          <Signup
            username={username}
            setUsername={userSignedUp}
            onStateChange={setAuthState}
            authState={authState}
          />
        )}
        {(authState === "resetPassword" || authState === "codeSent") && (
          <ResetPassword
            setUsername={userSignedUp}
            onStateChange={setAuthState}
            authState={authState}
          />
        )}
      </Box>
    </Layout>
  )
}

export default Authenticator
