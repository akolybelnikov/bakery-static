import { Router } from "@reach/router"
import { navigate } from "gatsby"
import React from "react"
import PrivateRoute from "../../components/aws/PrivateRoute"
import Layout from "../../components/layout"
import { isLoggedIn } from "../../utils/auth"
import Profile from "./profile"

const App = ({ location }) => {
  const isBrowser = typeof window !== `undefined`

  if (isBrowser && !isLoggedIn()) {
    navigate(`/auth`)
  }  

  return (
    <Layout location={location} title={"Страница Пользователя"}>
      <Router>
        <PrivateRoute
          isLoggedIn={isLoggedIn()}
          path="/user/profile"
          component={Profile}
        />
      </Router>
    </Layout>
  )
}

export default App
