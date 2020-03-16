import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types"
import { graphql } from "gatsby"
import React from "react"
import { Flex, Heading, Text } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <b>{text}</b>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => <Text my={2}>{children}</Text>,
    [BLOCKS.HEADING_4]: (_, children) => <Heading mb={2}>{children}</Heading>,
    [INLINES.HYPERLINK]: (node, children) => (
      <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
}

const Privacy = ({
  data: {
    allContentfulPage: { nodes },
  },
  location,
}) => {
  const pageTitle = `Политика обработки персональных данных`
  const {
    childContentfulPageContentRichTextNode: { json },
  } = nodes[0]

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      <Heading color="primary" mb={[4, 2]} px={[0, 4]}>
        {pageTitle}
      </Heading>
      {json && (
        <Flex p={[0, 4]} flexDirection="column">
          {documentToReactComponents(json, options)}
        </Flex>
      )}
    </Layout>
  )
}

export default Privacy

export const pageQuery = graphql`
  query {
    allContentfulPage(
      filter: { node_locale: { eq: "ru" }, name: { eq: "privacy" } }
    ) {
      nodes {
        childContentfulPageContentRichTextNode {
          json
        }
      }
    }
  }
`
