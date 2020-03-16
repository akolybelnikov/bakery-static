import { graphql } from "gatsby"
import React from "react"
import { Flex, Heading, Text, Card } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image/withIEPolyfill"
import styled from "styled-components"
import { theme } from "../utils/styles"

const Image = styled(Img)`
  width: 100%;
  height: 35vw;
  @media all and (max-width: 768px) {
    height: 35vw;
  }
  @media all and (max-width: 420px) {
    height: 100vw;
  }
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`

const CardText = styled(Text)`
  @media all and (min-width: 768px) {
    max-height: 200px;
  }
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`

export default ({
  data: {
    allContentfulOffer: { edges },
  },
  location,
}) => {
  const pageTitle = `Специальные предложения`

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      <Heading color="primary" px={[0, 3]} mb={4}>
        {pageTitle}
      </Heading>
      <Flex flexWrap={"wrap"}>
        {edges &&
          edges.map(
            (
              {
                node: {
                  content: { content },
                  image: { fluid },
                },
              },
              idx
            ) => (
              <Card
                width={[1, 3 / 10]}
                mb={[4]}
                mx={[0, "auto"]}
                key={idx}
                boxShadow={`0 2px 8px ${theme.colors.primary}`}
                borderRadius={8}
              >
                <Image fluid={fluid} />
                <CardText
                  px={[3]}
                  py={[2]}
                  my={[2]}
                  fontSize={[2, 3]}
                  textAlign="center"
                  color="primary"
                >
                  {content}
                </CardText>
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
            fluid(maxWidth: 750) {
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
