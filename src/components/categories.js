import Img from "gatsby-image"
import React from "react"
import { Box, Flex, Heading } from "rebass"
import styled from "styled-components"

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
          <Box key={idx} p={2} width={[1, 1 / 3]}>
            <Heading
              px={1}
              py={3}
              textAlign={"center"}
              fontSize={4}
              fontWeight={"bolder"}
              color="primary"
              bg="secondary"
              style={{opacity: 0.95}}
            >
              {/* <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link> */}
              {title}
            </Heading>
            <Image fluid={node.image.fluid} />
          </Box>
        )
      })}
    </Flex>
  )
}
