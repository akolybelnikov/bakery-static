import { graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

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
    const categories = data.allContentfulCategory.edges

    // console.log(categories)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Главная страница" />
        {categories.map(({ node }, idx) => {
          const title = node.label
          return (
            <div key={idx}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                {/* <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link> */}
                {node.label}
              </h3>
              <Image fluid={node.image.fluid} />
            </div>
          )
        })}
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
            }
          }
        }
      }
    }
  }
`
