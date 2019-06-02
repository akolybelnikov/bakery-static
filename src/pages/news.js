import { graphql } from "gatsby"
import React from "react"
import { Heading, Text, Flex } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data, location }) => {
  const { edges } = data.allContentfulNews
  const pageTitle = `Наши новости`

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      <Heading>{pageTitle}</Heading>
      {edges &&
        edges.map(({ node: { content: { content } } }, idx) => (
          <Flex key={idx}>
            <Text>{content}</Text>
          </Flex>
        ))}
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
            fluid(maxWidth: 10) {
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
