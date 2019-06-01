import { graphql } from "gatsby"
import React from "react"
import { Heading } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data, location }) => {
  const category = data.contentfulCategory
  const pageTitle = data.contentfulCategory.label

  // console.log(category, location)

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      <Heading>{pageTitle}</Heading>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($name: String!) {
    contentfulCategory(name: { eq: $name }, node_locale: { eq: "ru" }) {
      name
      label
      product {
        id
        image {
          fluid(maxWidth: 300) {
            sizes
            src
            srcSet
            srcSetWebp
            srcWebp
            base64
            aspectRatio
          }
        }
        filling {
          name
        }
        ingridients {
          ingridients
          internal {
            content
          }
        }
        productName
        price
        weight
        status
      }
    }
  }
`
