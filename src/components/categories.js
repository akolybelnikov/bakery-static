import { Link } from "gatsby"
import Img from "gatsby-image/withIEPolyfill"
import React from "react"
import { Card, Flex, Heading } from "rebass"
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

export default ({ categories }) => {
  return (
    <Flex flexWrap="wrap" mx={-2} my={2}>
      {categories.map(({ node }, idx) => {
        const title = node.label
        return (
          <Card
            bg="secondary"
            key={idx}
            py={2}
            width={[95 / 100, 3 / 10]}
            boxShadow="0 2px 16px rgba(0,0,0,0.25)"
            borderRadius={8}
            mb={4}
            mx="auto"
          >
            <Heading
              px={1}
              py={3}
              textAlign={"center"}
              fontSize={4}
              fontWeight={"bolder"}
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
