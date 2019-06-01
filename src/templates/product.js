import { graphql } from "gatsby"
import React from "react"
import { Heading } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data, location }) => {
  const product = data.contentfulProduct
  const pageTitle = data.contentfulProduct.productName

  // console.log(product)

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      <Heading>{pageTitle}</Heading>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    contentfulProduct(
      node_locale: { eq: "ru" }
      status: { eq: "active" }
      id: { eq: $id }
    ) {
      category {
        name
      }
      description {
        internal {
          content
        }
      }
      filling {
        name
      }
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
      ingridients {
        internal {
          content
        }
      }
      productName
      status
      weight
      price
    }
  }
`
