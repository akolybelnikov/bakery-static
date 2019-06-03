import Img from "gatsby-image"
import flowRight from "lodash.flowright"
import React from "react"
import SwipeableViews from "react-swipeable-views"
import { autoPlay, bindKeyboard } from "react-swipeable-views-utils"
import { Card, Text, Box } from "rebass"
import styled from "styled-components"
import Pagination from "./pagination"

const Slide = styled(Box)`
  -webkit-overflow-scrolling: touch;
  position: relative;
`

const StyledCard = styled(Card)`
  display: flex;
  @media all and (max-width: 767px) {
    flex-direction: column;
  }
  background: linear-gradient(
    125deg,
    white 20%,
    ${props => props.theme.colors.primaryBR3} 100%
  );
`

const Image = styled(Img)`
  min-width: 30%;
  @media all and (max-width: 767px) {
    min-width: 100%;
  }
  img {
    margin: 0;
    object-fit: contain !important;
    object-position: center top !important;
  }
`
const SwipeView = flowRight(
  bindKeyboard
)(SwipeableViews)

export default ({ news }) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const handleSlideChange = curr => setActiveIndex(curr)

  return (
    <Box style={{ position: `relative` }}>
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
                  <Text
                    fontSize={3}
                    color="primary"
                    p={3}
                    textAlign={["center", "justify"]}
                    lineHeight={[1.3, 1.5, 1.65]}
                  >
                    {content}
                  </Text>
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
        right={10}
      />
    </Box>
  )
}
