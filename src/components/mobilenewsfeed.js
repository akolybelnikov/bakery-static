import Img from "gatsby-image"
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
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primaryBR4} 25%,
    ${props => props.theme.colors.primaryBR2} 100%
  );
`

const Image = styled(Img)`
  min-width: 100%;
  max-height: 100vw;
`

// const Slide = styled(Box)`
//   -webkit-overflow-scrolling: touch;
// `

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
            <StyledCard key={index} width={1} mx={[0, 'auto']} my={2} borderRadius={12}>
              <Image fluid={fluid} />
              <Accordion>
                <Flex alignItems="center">
                  <Text
                    fontSize={3}
                    color="primary"
                    px={3}
                    py={[2,3]}
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
