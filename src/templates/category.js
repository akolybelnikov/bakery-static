import { graphql } from "gatsby"
import React from "react"
import Responsive from "react-responsive"
import { Heading } from "rebass"
import Layout from "../components/layout"
import MobileProductFeed from "../components/mobileproducts"
import ProductFeed from "../components/products"
import SEO from "../components/seo"

const Default = props => <Responsive {...props} minWidth={768} />
const Mobile = props => <Responsive {...props} maxWidth={767} />

export default ({
  data: {
    contentfulCategory: { label, product },
  },
  location,
}) => {
  return (
    <Layout location={location} title={label}>
      <SEO title={label} />
      <Heading px={3} color="primary">
        {label}
      </Heading>

      <Default>
        <ProductFeed location={location} products={product} />
      </Default>
      <Mobile>
        <MobileProductFeed location={location} products={product} />
      </Mobile>
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
        category {
          name
        }
        image {
          fluid(maxWidth: 900) {
            sizes
            src
            srcSet
            srcSetWebp
            srcWebp
            base64
            aspectRatio
          }
        }
        description {
          internal {
            content
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
