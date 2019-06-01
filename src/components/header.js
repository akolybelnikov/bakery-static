import { StaticQuery, graphql } from "gatsby"
import React from "react"
import { Box, Flex, Text } from "rebass"
import Img from "gatsby-image"
import styled from "styled-components"
import { Link } from "gatsby"

const Image = styled(Img)`
  width: 150px;
  @media all and (max-width: 320px) {
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
          <header>
            <Flex>
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
            </Flex>
          </header>
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
