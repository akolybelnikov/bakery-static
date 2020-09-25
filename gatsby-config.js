require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Все Булочки Тут`,
    author: `Andrey Kolybelnikov / Irina Kmelniker`,
    description: `Веб страница московской булочной.`,
    siteUrl: `https://vsebulochki.com`,
    social: {
      facebook: `CONFERTRU.RU`,
      instagram: `vse_bulochki_tut`,
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/user/*`] },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_GA_ID,
        head: true,
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        allPageHeaders: [
          "X-Frame-Options: DENY",
          "X-XSS-Protection: 1; mode=block",
        ],
        headers: {
          "/service-worker.js": [
            "Cache-Control: no-cache",
            "Cache-Control: no-store, max-age=0",
          ],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Все Булочки Тут`,
        short_name: `vsebulochki.com`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#5E1839`,
        display: `standalone`,
        icon: `content/assets/icon.png`,
        include_favicon: false,
      },
    },
    //`gatsby-plugin-offline`,
    `gatsby-plugin-remove-serviceworker`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: `https://vsebulochki.com`,
        sitemap: `https://vsebulochki.com/sitemap.xml`,
        policy: [{ userAgent: "*", disallow: "" }],
      },
    },
    {
      resolve: `gatsby-source-faunadb`,
      options: {
        secret: process.env.GATSBY_FAUNADB,
        index: `all_orders`,
        type: `order`
      },
    },
  ],
}
