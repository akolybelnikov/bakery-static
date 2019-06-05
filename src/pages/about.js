import { graphql } from "gatsby";
import React from "react";
import Responsive from "react-responsive";
import { Heading } from "rebass";
import Instafeed from "../components/instafeed";
import Layout from "../components/layout";
import MobileNewsfeed from "../components/mobilenewsfeed";
import Newsfeed from "../components/newsfeed";
import SEO from "../components/seo";

const Default = props => <Responsive {...props} minWidth={1025} />
const Mobile = props => (
  <Responsive {...props} maxWidth={767} orientation={"portrait"} />
)
const TouchLandscape = props => (
  <Responsive {...props} maxWidth={1024} orientation={"landscape"} />
)
const TabletPortrait = props => (
  <Responsive {...props} minWidth={768} orientation={"portrait"} />
)

export default ({ data, location }) => {
  const pageTitle = `Наши новости`
  const { edges } = data.allContentfulNews

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      <Heading color="primary" pb={4}>
        Наши новости
      </Heading>
      <Default>
        <Newsfeed news={edges} />
      </Default>
      <TouchLandscape>
        <Newsfeed news={edges} />
      </TouchLandscape>
      <TabletPortrait>
        <Newsfeed news={edges} />
      </TabletPortrait>
      <Mobile>
        <MobileNewsfeed news={edges} />
      </Mobile>
      <Heading color="primary" pb={4}>
        Мы на Инстаграм
      </Heading>
      <Instafeed />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allContentfulNews(
      filter: { node_locale: { eq: "ru" }, status: { eq: "active" } }
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
          date(formatString: "DD / MM / YYYY")
          image {
            fluid(maxWidth: 700) {
              aspectRatio
              base64
              sizes
              src
              srcSet
              srcSetWebp
              srcWebp
            }
          }
          content {
            content
          }
        }
      }
    }
  }
`
