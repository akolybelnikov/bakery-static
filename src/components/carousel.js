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
    height: 300px;
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
            <Card
              fontWeight="bold"
              width={1}
              borderRadius={8}
              boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
            >
              <Image fluid={item.node.image.fluid} />
              <Text
                fontSize={[2, 3, 4]}
                fontWeight="bold"
                color="primary"
                p={[2, 3, 4]}
                textAlign="center"
                lineHeight={[1.5, 1.75, 2]}
                bg="rgba(255,255,255,0.50)"
                style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
              >
                {item.node.content.content}
              </Text>
            </Card>
          </Slide>
        )
      })}
    </AutoPlaySwipeView>
  )
}

export { Carousel }
