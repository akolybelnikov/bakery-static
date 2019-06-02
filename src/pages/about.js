import React from "react"
import { Flex, Heading, Text } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ location }) => {
  const pageTitle = `О нас`

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      <Heading color="primary" pb={3}>Мы на Инстаграм</Heading>
    </Layout>
  )
}
