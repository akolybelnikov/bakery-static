import { Router } from "@reach/router"
import React from "react"
import AdminRoute from "../../components/aws/AdminRoute"
import PrivateRoute from "../../components/aws/PrivateRoute"
import Layout from "../../components/layout"
import Orders from "./orders"
import Profile from "./profile"

const App = ({ location }) => {
  return (
    <Layout location={location} title={"Страница Пользователя"}>
      <Router>
        <PrivateRoute path="/user/profile" component={Profile} />
        <AdminRoute path="/user/orders" component={Orders} />
      </Router>
    </Layout>
  )
}

export default App
