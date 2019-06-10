import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Heading, Flex, Text } from "rebass"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="404: Not Found" />
        <Flex
          style={{ minHeight: "50vh" }}
          flexDirection="column"
          alignItems="space-around"
        >
          <Heading color="primary" textAlign="center">
            Страница не найдена
          </Heading>
          <Text color="primary" textAlign="center">
            Наверняка это ошибка и страницы с таким названием не существует.
          </Text>
        </Flex>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
