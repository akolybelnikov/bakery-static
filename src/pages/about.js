import { graphql } from "gatsby"
import React from "react"
import { Box, Heading } from "rebass"
import Instafeed from "../components/instafeed"
import Layout from "../components/layout"
import Newsfeed from "../components/newsfeed"
import SEO from "../components/seo"

export default ({ data, location }) => {
  const pageTitle = `Наши новости`
  const { edges } = data.allContentfulNews

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      <Heading color="primary" pb={4}>
        Наши новости
      </Heading>
      <Box mb={[4, 5]}>
        <Newsfeed news={edges} />
      </Box>
      <Heading color="primary" pb={4}>
        Мы на Инстаграм
      </Heading>
      <Instafeed />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allContentfulNews(
      filter: { node_locale: { eq: "ru" }, status: { eq: "active" } }
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
          date(formatString: "DD / MM / YYYY")
          image {
            fluid(maxWidth: 700) {
              aspectRatio
              base64
              sizes
              src
              srcSet
              srcSetWebp
              srcWebp
            }
          }
          content {
            content
          }
        }
      }
    }
  }
`
