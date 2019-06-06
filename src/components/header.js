import { graphql, Link, StaticQuery } from "gatsby"
import Img from "gatsby-image/withIEPolyfill"
import React from "react"
import Responsive from "react-responsive"
import { Flex } from "rebass"
import styled from "styled-components"
import Navbar from "../components/navbar"

const Default = props => <Responsive {...props} minWidth={900} />

const Image = styled(Img)`
  width: 150px;
  @media all and (max-width: 767px) {
    width: 100px;
  }
  img {
    margin-bottom: 0;
  }
`

export default ({ location }) => {
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
                    flex: `0 0 20%`,
                  }}
                  to={`/`}
                >
                  <Image fluid={logo} />
                </Link>
                <Flex
                  alignItems="center"
                  style={{ flex: `auto` }}
                >
                  <Default>
                    <Navbar location={location} />
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
