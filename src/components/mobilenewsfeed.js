import Img from "gatsby-image";
import flowRight from "lodash.flowright";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { bindKeyboard } from "react-swipeable-views-utils";
import { Box, Card, Flex, Text } from "rebass";
import styled from "styled-components";
import { theme } from "../utils/styles";
import Pagination from "./pagination";

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

const StyledLink = styled.a`
  text-shadow: none;
  font-size: 16px;
  padding: 4px 0;
`
const SwipeView = flowRight(bindKeyboard)(SwipeableViews)

export default ({ news }) => {
  const [activeIndex, setActiveIndex] = useState(0)
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
            const lastSpace = content.substring(0, 225).lastIndexOf(" ")

            return (
              <Slide width={1} key={index}>
                <StyledCard borderRadius={12}>
                  <Image fluid={fluid} />
                  <Flex alignItems="center">
                    <StyledText
                      fontSize={3}
                      color="primary"
                      p={3}
                      textAlign={["center"]}
                      lineHeight={[1.3, 1.5, 1.65]}
                    >
                      {content.substring(0, lastSpace)}
                      {content.length > 225 && (
                        <>
                          <span> ...</span>
                          <Text>
                            <StyledLink role="button">читать дальше</StyledLink>
                          </Text>
                        </>
                      )}
                    </StyledText>
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
        right={10}
      />
    </Box>
  )
}
