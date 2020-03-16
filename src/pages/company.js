import { graphql } from "gatsby"
import React from "react"
import { Flex, Heading } from "rebass"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Declarations = styled(Flex)`
  border-block-end: 4px dotted ${props => props.theme.colors.secondary};
`

const Company = ({
  data: {
    allContentfulFile: { edges },
    allContentfulPage: { nodes },
  },
  location,
}) => {
  const pageTitle = `Данные компании`
  const {
    table: { tableData },
  } = nodes[0]

  const renderTable = () => {
    return (
      <table>
        <tbody>
          {tableData.map((data, idx) => (
            <tr key={idx}>
              {data.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      <Heading color="primary" mb={4} px={[0, 3]}>
        {pageTitle}
      </Heading>
      <Flex px={[0, 3]}>{tableData && renderTable()}</Flex>
      <Heading color="primary" my={[2, 4]} px={[0, 3]}>
        Декларации о соответствии
      </Heading>
      <Declarations px={[0, 3]} pb={[4]}>
        {edges &&
          edges.map(({ node: { file: { file: { url } } } }, idx) => (
            <a
              key={idx}
              href={`https://${url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Пройти по ссылке
            </a>
          ))}
      </Declarations>
    </Layout>
  )
}

export default Company

export const pageQuery = graphql`
  query {
    allContentfulFile(
      filter: { node_locale: { eq: "ru" }, name: { eq: "certificates" } }
    ) {
      edges {
        node {
          file {
            file {
              url
            }
          }
        }
      }
    }
    allContentfulPage(
      filter: { node_locale: { eq: "ru" }, name: { eq: "company" } }
    ) {
      nodes {
        table {
          tableData
        }
      }
    }
  }
`
