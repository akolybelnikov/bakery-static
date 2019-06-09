import Img from "gatsby-image/withIEPolyfill"
import flowRight from "lodash.flowright"
import React from "react"
import SwipeableViews from "react-swipeable-views"
import { autoPlay, bindKeyboard } from "react-swipeable-views-utils"
import { Card, Text, Box } from "rebass"
import styled from "styled-components"
import Pagination from "./pagination"

const Slide = styled.div`
  position: relative;
  -webkit-overflow-scrolling: touch;
`

const Image = styled(Img)`
  margin: 0 auto;
  height: 450px;
  @media all and (max-width: 320px) {
    height: 400px;
  }
  img {
    margin: 0;
    @media all and (max-width: 767px) {
      object-position: center bottom !important;
    }
  }
`

const AutoPlaySwipeView = flowRight(
  bindKeyboard,
  autoPlay
)(SwipeableViews)

const Carousel = ({ offers }) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const handleSlideChange = curr => setActiveIndex(curr)

  return (
    <Box style={{ position: `relative` }}>
      <AutoPlaySwipeView
        interval={5000}
        onChangeIndex={handleSlideChange}
        index={activeIndex}
        ignoreNativeScroll={true}
      >
        {offers.map((item, index) => {
          return (
            <Slide key={index}>
              <Card width={1}>
                <Image fluid={item.node.image.fluid} />
                <Card
                  width={[9 / 10, 3 / 4]}
                  mx={[`5%`, `12.5%`]}
                  boxShadow="0 2px 16px rgba(0,0,0,0.75)"
                  borderRadius={12}
                  bg="rgba(244, 229, 216, 0.65)"
                  style={{
                    position: "absolute",
                    top: `50%`,
                    transform: `translateY(-50%)`,
                  }}
                >
                  <Text
                    fontSize={[2, 3, 4]}
                    fontWeight={"lighter"}
                    color="primary"
                    px={[3, 4]}
                    py={[2, 3, 4]}
                    textAlign="center"
                    lineHeight={[1.5, 1.75, 2]}
                  >
                    {item.node.content.content}
                  </Text>
                </Card>
              </Card>
            </Slide>
          )
        })}
      </AutoPlaySwipeView>
      <Pagination
        dots={offers.length}
        index={activeIndex}
        onChangeIndex={handleSlideChange}
        bottom={8}
        right={8}
      />
    </Box>
  )
}

export { Carousel }
