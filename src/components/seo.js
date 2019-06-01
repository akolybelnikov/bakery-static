/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import favicon16 from '../../content/assets/favicon-16x16.png'
import favicon32 from '../../content/assets/favicon-32x32.png'

function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
      ].concat(meta)}
    >
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={favicon32}
      />
      >
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={favicon16}
      />
      >
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `ru`,
  meta: [],
  description: `Классические хлебо-булочные  и кондитерские изделия, Торты на заказ, Имбирные пряники, Пирожные в ассортименте, Чай и кофе, специальные предложения, молочная продукция`,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
