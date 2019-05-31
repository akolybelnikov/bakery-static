import Img from "gatsby-image"
import flowRight from "lodash.flowright"
import React from "react"
import SwipeableViews from "react-swipeable-views"
import { autoPlay, bindKeyboard } from "react-swipeable-views-utils"
import { Flex, Box, Text } from "rebass"
import styled from "styled-components"

const Slide = styled.div`
  position: relative;
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
          <Box key={idx} px={2} py={2} width={[1, 1 / 3]}>
            <Image fluid={node.image.fluid} />
            <Text
              px={1}
              py={2}
              textAlign={"center"}
              fontSize={4}
              fontWeight={"bolder"}
              color="primary"
              bg="secondary"
              style={{ textTransform: "lowercase" }}
            >
              {/* <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link> */}
              {title}
            </Text>
          </Box>
        )
      })}
    </Flex>
  )
}
