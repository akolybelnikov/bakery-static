import React from "react"
import { Heading } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Instafeed from "../components/instafeed"

export default ({ location }) => {
  const pageTitle = `О нас`

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      <Heading color="primary" pb={4}>
        Мы на Инстаграм
      </Heading>
      <Instafeed />
    </Layout>
  )
}
