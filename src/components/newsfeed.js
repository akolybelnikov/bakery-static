import Img from "gatsby-image/withIEPolyfill"
import flowRight from "lodash.flowright"
import React from "react"
import SwipeableViews from "react-swipeable-views"
import { bindKeyboard } from "react-swipeable-views-utils"
import { Box, Card, Text, Flex } from "rebass"
import styled from "styled-components"
import Pagination from "./pagination"

const Slide = styled(Box)`
  -webkit-overflow-scrolling: touch;
`

const StyledCard = styled(Card)`
  display: flex;
  background: ${props => props.theme.colors.secondaryWashed};
`

const Image = styled(Img)`
  min-width: 250px;
  max-width: 250px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`
const SwipeView = flowRight(bindKeyboard)(SwipeableViews)

export default ({ news }) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const handleSlideChange = curr => setActiveIndex(curr)

  return (
    <Box mb={4} px={3} style={{ position: `relative` }}>
      <SwipeView
        interval={12000}
        onChangeIndex={handleSlideChange}
        index={activeIndex}
        ignoreNativeScroll={true}
        animateHeight
      >
        {news.map(
          (
            {
              node: {
                image: { fluid },
                content: { content },
              },
            },
            index
          ) => {
            return (
              <Slide width={1} key={index}>
                <StyledCard borderRadius={12}>
                  <Image fluid={fluid} />
                  <Flex alignItems="center">
                    <Text
                      style={{ minHeight: "fit-content" }}
                      fontSize={3}
                      color="primary"
                      px={3}
                      py={4}
                      textAlign={["center"]}
                      lineHeight={[1.3, 1.5, 1.65]}
                    >
                      {content}
                    </Text>
                  </Flex>
                </StyledCard>
              </Slide>
            )
          }
        )}
      </SwipeView>
      <Pagination
        dots={news.length}
        index={activeIndex}
        onChangeIndex={handleSlideChange}
        bottom={10}
        right={20}
      />
    </Box>
  )
}
