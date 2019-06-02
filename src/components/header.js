import { graphql, Link, StaticQuery } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import Responsive from "react-responsive"
import { Flex, Text } from "rebass"
import styled from "styled-components"

const Default = props => <Responsive {...props} minWidth={769} />

const Image = styled(Img)`
  width: 150px;
  @media all and (max-width: 767px) {
    width: 100px;
  }
  img {
    margin-bottom: 0;
  }
`

export default () => {
  return (
    <StaticQuery
      query={logoQuery}
      render={data => {
        const logo = data.logo.childImageSharp.fluid

        return (
          <>
            <header>
              <Flex justifyContent="space-between">
                <Link
                  style={{
                    boxShadow: `none`,
                    textDecoration: `none`,
                    color: `inherit`,
                    backgroundImage: `none`,
                  }}
                  to={`/`}
                >
                  <Image fluid={logo} />
                </Link>
                <Flex>
                  <Default>
                    <Flex alignItems="center">
                      <Text>This is default</Text>
                    </Flex>
                  </Default>
                </Flex>
              </Flex>
            </header>
          </>
        )
      }}
    />
  )
}

const logoQuery = graphql`
  query LogoQuery {
    logo: file(absolutePath: { regex: "/icon.png/" }) {
      childImageSharp {
        fluid(maxWidth: 150) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
