import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
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
  },
}

const Delivery = ({
  data: {
    allContentfulPage: { nodes },
  },
  location,
}) => {
  const pageTitle = `Оплата и доставка`
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

export default Delivery

export const pageQuery = graphql`
  query {
    allContentfulPage(
      filter: { node_locale: { eq: "ru" }, name: { eq: "delivery" } }
    ) {
      nodes {
        childContentfulPageContentRichTextNode {
          json
        }
      }
    }
  }
`
