import { Router } from "@reach/router"
import React from "react"
import Layout from "../../components/layout"
import PrivateRoute from "./components/PrivateRoute"
import Login from "./login"
import Profile from "./profile"

const App = ({ location }) => {
  return (
    <Layout location={location} title={'app'}>
      <Router>
        <PrivateRoute path="/app/profile" component={Profile} />
        <PublicRoute path="/app">
          <Login path="/login" />
        </PublicRoute>
      </Router>
    </Layout>
  )
}
function PublicRoute(props) {
  return <div>{props.children}</div>
}

export default App
