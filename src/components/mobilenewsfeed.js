import Img from "gatsby-image";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { Box, Card, Flex, Text } from "rebass";
import styled from "styled-components";
import Pagination from "./pagination";

const Container = styled(Box)`
  position: relative;
  @media all and (orienattion: landscape) {
    display: none;
  }
`

const Slide = styled(Box)`
  -webkit-overflow-scrolling: touch;
`

const StyledCard = styled(Card)`
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primaryBR4} 25%,
    ${props => props.theme.colors.primaryBR2} 100%
  );
`

const StyledText = styled(Text)`
  min-height: 65vw;
`

const Image = styled(Img)`
  min-width: 100%;
  min-height: calc(100vw - 2rem);
  max-height: 300px;
`

export default ({ news }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const handleSlideChange = curr => setActiveIndex(curr)

  return (
    <Container mb={4}>
      <SwipeableViews
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
                    <StyledText
                      fontSize={[3, 4]}
                      color="primary"
                      px={3} py={4}
                      textAlign={["center"]}
                      lineHeight={[1.3, 1.5, 1.65]}
                    >
                      {content}
                    </StyledText>
                  </Flex>
                </StyledCard>
              </Slide>
            )
          }
        )}
      </SwipeableViews>
      <Pagination
        dots={news.length}
        index={activeIndex}
        onChangeIndex={handleSlideChange}
        bottom={10}
        right={10}
      />
    </Container>
  )
}
