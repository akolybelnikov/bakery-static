import Img from "gatsby-image/withIEPolyfill"
import React from "react"
import { Card, Flex, Text, Box } from "rebass"
import styled from "styled-components"
import Accordion from "./accordion"

const Container = styled(Box)`
  position: relative;
  @media all and (min-width: 768px) {
    display: none;
  }
`

const StyledCard = styled(Card)`
  background: ${props => props.theme.colors.primaryBR4};
`

const Image = styled(Img)`
  min-width: 100%;
  max-height: 100vw;
`

export default ({ news }) => {
  return (
    <Container mb={4}>
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
            <StyledCard
              key={index}
              width={1}
              mx={[0, "auto"]}
              my={3}
              borderRadius={12}
            >
              <Image fluid={fluid} />
              <Accordion min={135}>
                <Flex alignItems="center">
                  <Text
                    fontSize={[3]}
                    color="primary"
                    px={3}
                    py={[3]}
                    textAlign={["center"]}
                    lineHeight={[1.3, 1.5]}
                  >
                    {content}
                  </Text>
                </Flex>
              </Accordion>
            </StyledCard>
          )
        }
      )}
    </Container>
  )
}
