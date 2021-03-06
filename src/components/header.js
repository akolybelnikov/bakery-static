import Badge from "@material-ui/core/Badge"
import { graphql, Link, StaticQuery } from "gatsby"
import Img from "gatsby-image/withIEPolyfill"
import React from "react"
import Responsive from "react-responsive"
import { Flex } from "rebass"
import styled from "styled-components"
import Navbar from "../components/navbar"
import { useCartState } from "../state/cart"
import { isLoggedIn } from "../utils/auth"
import { baseLink, theme } from "../utils/styles"
import Cart from "./svg/cart"
import User from "./svg/user"

const Default = props => <Responsive {...props} minWidth={900} />
const Touch = props => <Responsive {...props} maxWidth={899} />

const Image = styled(Img)`
  width: 150px;
  @media all and (max-width: 899px) {
    width: 105px;
  }
  @media all and (max-width: 767px) {
    width: 100px;
  }
  img {
    margin-bottom: 0;
  }
`
const HeaderContainer = styled.header`
  @media all and (min-width: 900px) {
    position: fixed;
    top: 0px;
    z-index: 999;
    background: white;
    width: 100%;
    padding-inline-end: 16px;
  }
`

const Header = ({ location, maxHeaderWidth }) => {
  const { products } = useCartState()

  return (
    <StaticQuery
      query={logoQuery}
      render={data => {
        const logo = data.logo.childImageSharp.fluid

        return (
          <HeaderContainer style={{ maxWidth: `${maxHeaderWidth}` }}>
            <Flex justifyContent="space-between">
              <Link style={{ ...baseLink, flex: `0 0 20%` }} to={`/`}>
                <Image fluid={logo} />
              </Link>
              <Flex
                justifyContent="center"
                alignItems="center"
                style={{ flex: `auto` }}
              >
                <Touch>
                  {location.pathname !== "/shopping-cart" &&
                    !location.pathname.includes("user") && (
                      <Badge
                        badgeContent={products.length}
                        color="secondary"
                        overlap="circle"
                      >
                        <Link
                          style={{ ...baseLink, paddingBlockEnd: "0.35rem" }}
                          to={`/shopping-cart`}
                        >
                          <Cart
                            width={60}
                            height={60}
                            fill={theme.colors.primary}
                          />
                        </Link>
                      </Badge>
                    )}
                  {location.pathname !== "/auth" &&
                    !location.pathname.includes("user") && (
                      <Link
                        style={{
                          ...baseLink,
                          paddingInlineStart: "1rem",
                          paddingBlockEnd: "0.25rem",
                        }}
                        to={isLoggedIn() ? `/user/profile` : `/auth`}
                      >
                        <User
                          width={45}
                          height={35}
                          fill={theme.colors.primary}
                        />
                      </Link>
                    )}
                </Touch>
                <Default>
                  <Navbar location={location} />
                </Default>
              </Flex>
            </Flex>
          </HeaderContainer>
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
export default Header
