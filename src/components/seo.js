import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import favicon16 from "../../content/assets/favicon-16x16.png"
import favicon32 from "../../content/assets/favicon-32x32.png"

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
      <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
      <script>
        {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '549514382358073'); 
            fbq('track', 'PageView');
        `}
      </script>
      <noscript>
        {`
            <img
            alt="facebook noscript page view"
            height="1"
            width="1"
            src="https://www.facebook.com/tr?id=549514382358073&ev=PageView&noscript=1" />
        `}
      </noscript>
      <script
        src="https://cdn.lr-ingest.io/LogRocket.min.js"
        crossorigin="anonymous"
      ></script>
      <script>
        {`window.LogRocket && window.LogRocket.init('6tlyrx/vsebulochki');`}
      </script>
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
