import { graphql, Link } from "gatsby"
import React from "react"
import { Flex } from "rebass"
import { Carousel } from "../components/carousel"
import Categories from "../components/categories"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Helmet from "react-helmet"

export default ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const offers = data.allContentfulOffer.edges
  const categories = data.allContentfulCategory.edges

  return (
    <Layout location={location} title={siteTitle}>
      <Helmet>
        <script type="text/javascript">
          {`
            if('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js', {scope: '/'}).then(function() { console.log("Service Worker Registered"); });
              });
            }
          `}
        </script>
      </Helmet>
      <SEO title="Главная страница" />
      <Carousel offers={offers} />
      <Flex justifyContent="center" mb={4} mt={1} pt={1} pb={3}>
        <Link
          to={`/offers`}
          style={{
            display: `flex`,
            alignItems: `center`,
          }}
        >
          <span
            style={{
              marginRight: 10,
            }}
          >
            Все спецпредложения
          </span>
        </Link>
      </Flex>
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
