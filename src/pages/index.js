import { graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import styled from "styled-components"
import { Carousel } from "../components/carousel"
import Categories from "../components/categories"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Image = styled(Img)`
  margin: 0 auto;
  height: 450px;
  @media all and (max-width: 320px) {
    height: 300px;
  }
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const offers = data.allContentfulOffer.edges
    const categories = data.allContentfulCategory.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Главная страница" />
        <Carousel offers={offers} />
        <Categories categories={categories} />
      </Layout>
    )
  }
}

export default BlogIndex

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
