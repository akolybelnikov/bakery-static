import { graphql } from "gatsby"
import React from "react"
import { Flex, Heading, Text, Card } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import styled from "styled-components"

const Image = styled(Img)`
  margin: 0 auto;
  height: auto;
  width: 100%;
  @media all and (max-width: 639px) {
    height: 250px;
  }
  @media all and (max-width: 420px) {
    height: 150px;
  }
`

export default ({ data, location }) => {
  const { edges } = data.allContentfulOffer
  const pageTitle = `Специальные предложения`

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title="pageTitle" />
      <Heading color="primary" mb={4}>
        {pageTitle}
      </Heading>
      <Flex flexDirection={[`column`, `row`]}>
        {edges &&
          edges.map(
            (
              {
                node: {
                  content: { content },
                  image: { fluid },
                  createdAt,
                },
              },
              idx
            ) => (
              <Card width={[1, 1 / 3]} mx={3} key={idx}>
                <Image fluid={fluid} />
                <Text>{content}</Text>
              </Card>
            )
          )}
      </Flex>
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
