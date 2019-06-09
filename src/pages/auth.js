import { navigate } from "gatsby"
import React, { useState } from "react"
import { Box } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { isLoggedIn } from "../utils/auth"
import Login from "./user/components/Login"
import Signup from "./user/components/Signup"

const Authenticator = ({ location }) => {
  const pageTitle = "Вход пользователя"

  const [loading, setLoading] = React.useState(false)
  const [authState, setState] = useState("signIn")

  const setAuthState = newState => setState(newState)

  if (isLoggedIn()) {
    navigate("/user/profile")
  }

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      <Box>
        {authState === "signIn" && <Login onStateChange={setAuthState} />}
        {(authState === "signUp" || authState === "signedUp") && (
          <Signup onStateChange={setAuthState} authState={authState} />
        )}
      </Box>
    </Layout>
  )
}

export default Authenticator
