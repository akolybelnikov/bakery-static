require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Все Булочки Тут`,
    author: `Andrey Kolybelnikov`,
    description: `Веб страница московской булочной.`,
    siteUrl: `https://vsebulochki.com`,
    social: {
      facebook: `CONFERTRU.RU`,
      instagram: `vse_bulochki_tut`,
    },
  },
  plugins: [
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
      resolve: `gatsby-plugin-styled-components`,
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_GA_ID,
        head: true,
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
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
        include_favicon: false,
      },
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-offline`,
    // `gatsby-plugin-remove-serviceworker`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
