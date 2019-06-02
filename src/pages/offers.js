import { graphql } from "gatsby"
import React from "react"
import { Heading, Text, Flex } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data, location }) => {
  const { edges } = data.allContentfulOffer
  const pageTitle = `Специальные предложения`

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title="pageTitle" />
      <Heading color="primary" mb={4}>
        {pageTitle}
      </Heading>
      {edges &&
        edges.map(({ node: { content: { content } } }, idx) => (
          <Flex flexDirection={`column`} key={idx}>
            <Text>{content}</Text>
          </Flex>
        ))}
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allContentfulOffer(
      filter: { node_locale: { eq: "ru" }, status: { eq: "active" } }
    ) {
      edges {
        node {
          image {
            fluid(maxWidth: 500) {
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
            id
          }
          id
          createdAt(formatString: "DD / MM / YYYY")
        }
      }
    }
  }
`
