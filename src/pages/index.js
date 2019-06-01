import { graphql } from "gatsby"
import React from "react"
import { Carousel } from "../components/carousel"
import Categories from "../components/categories"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const offers = data.allContentfulOffer.edges
  const categories = data.allContentfulCategory.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Главная страница" />
      <Carousel offers={offers} />
      <Categories categories={categories} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulCategory(filter: { node_locale: { eq: "ru" } }) {
      edges {
        node {
          name
          label
          image {
            id
            fluid(maxWidth: 960) {
              sizes
              src
              srcSet
              srcSetWebp
              srcWebp
              base64
              aspectRatio
            }
          }
        }
      }
    }
    allContentfulOffer(filter: { node_locale: { eq: "ru" } }) {
      edges {
        node {
          image {
            fluid(maxWidth: 960) {
              sizes
              src
              srcSet
              srcSetWebp
              srcWebp
              base64
              aspectRatio
            }
          }
          createdAt(formatString: "DD-MM-YYYY")
          content {
            content
          }
        }
      }
    }
  }
`
