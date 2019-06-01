import Img from "gatsby-image"
import flowRight from "lodash.flowright"
import React from "react"
import SwipeableViews from "react-swipeable-views"
import { autoPlay, bindKeyboard } from "react-swipeable-views-utils"
import { Card, Text } from "rebass"
import styled from "styled-components"

const Slide = styled.div`
  position: relative;
`

const Image = styled(Img)`
  margin: 0 auto;
  height: 450px;
  @media all and (max-width: 320px) {
    height: 400px;
  }
  img {
    object-position: center bottom !important;
    margin: 0;
  }
`

const AutoPlaySwipeView = flowRight(
  bindKeyboard,
  autoPlay
)(SwipeableViews)

const Carousel = ({ offers }) => {
  const [activeIndex, setActiveIndex] = React.useState(0)

  const maxIndex = offers.length - 1

  const handleSlideChange = curr => setActiveIndex(curr)

  const handleBack = () => setActiveIndex(activeIndex - 1)

  const handleNext = () => setActiveIndex(activeIndex + 1)

  return (
    <AutoPlaySwipeView
      interval={5000}
      onChangeIndex={handleSlideChange}
      index={activeIndex}
      ignoreNativeScroll={true}
    >
      {offers.map((item, index) => {
        return (
          <Slide key={index}>
            <Card width={1} boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)">
              <Image fluid={item.node.image.fluid} />
              <Card
                width={[9 / 10, 3 / 4]}
                mx={[`5%`, `12.5%`]}
                boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
                borderRadius={12}
                bg="rgba(244, 229, 216, 0.7)"
                style={{ position: "absolute", top: 10 }}
              >
                <Text
                  fontSize={[3, 4]}
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
  )
}

export { Carousel }
