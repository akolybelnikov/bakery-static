import { Router } from "@reach/router"
import React from "react"
import Layout from "../../components/layout"
import PrivateRoute from "./components/PrivateRoute"
import Authenticator from "./auth"
import Profile from "./profile"

const App = ({ location }) => {
  return (
    <Layout location={location} title={"Страница Пользователя"}>
      <Router>
        <PrivateRoute path="/user/profile" component={Profile} />
        <Authenticator path="/user/auth" />
      </Router>
    </Layout>
  )
}

export default App
