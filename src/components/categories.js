import { Link } from "gatsby"
import Img from "gatsby-image/withIEPolyfill"
import React from "react"
import { Flex, Heading } from "rebass"
import { Card as CardRebass } from "rebass"
import styled from "styled-components"
import ArrowRight from "../components/svg/arrowRight"
import { theme } from "../utils/styles"

const StyledLink = styled(Link)`
  background-image: none;
  text-shadow: none;
  margin: 12px 12px 4px;
  text-align: right;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  cursor: pointer;
  padding: 4px 8px 0;
`
const Image = styled(Img)`
  margin: 0 auto;
  height: 350px;
  @media all and (max-width: 639px) {
    height: 500px;
  }
  @media all and (max-width: 520px) {
    height: 450px;
  }
  @media all and (max-width: 420px) {
    height: 350px;
  }
`

const Card = styled(CardRebass).attrs({
  bg: "secondary",
  py: 2,
  width: [95 / 100, 3 / 10],
  borderRadius: 8,
  mb: 4,
  mx: "auto",
})`
  position: relative;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  transition: all 0.25s;
  top: 0;
  height: 100%;
  cursor: ${props => (props.onClick ? "pointer" : "default")};
  &:hover {
    top: -10px;
    box-shadow: 0 12px 16px rgba(0, 0, 0, 0.25);
  }
`

export default ({ categories }) => {
  return (
    <Flex flexWrap="wrap" mx={-2} my={2}>
      {categories.map(({ node }, idx) => {
        const title = node.label
        return (
          <Card key={idx}>
            <Heading
              px={1}
              py={3}
              textAlign={"center"}
              fontSize={4}
              fontWeight={"normal"}
              color="primary"
              style={{ opacity: 0.95 }}
            >
              {/* <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link> */}
              {title}
            </Heading>
            <Image fluid={node.image.fluid} />
            <Flex justifyContent="flex-end">
              <StyledLink to={`/${node.name}`}>
                <ArrowRight
                  width="32"
                  height="32"
                  fill={theme.colors.primary}
                />
              </StyledLink>
            </Flex>
          </Card>
        )
      })}
    </Flex>
  )
}
