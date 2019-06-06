import Img from "gatsby-image/withIEPolyfill"
import React from "react"
import { Card, Flex, Text, Box } from "rebass"
import styled from "styled-components"
import Social from "../components/sociallinks"
import { parseIngridients } from "../utils/utils"
import Accordion from "./accordion"
import { theme } from "../utils/styles"

const PhoneButton = styled.a`
  color: ${props => props.theme.colors.secondary};
  background: ${props => props.theme.colors.primary};
  padding: 3px 6px;
  margin: 8px 0;
  border-radius: 4px;
  width: fit-content;
  cursor: pointer;
  text-shadow: none;
  box-shadow: 0 2px 8px ${theme.colors.primaryBR2};
  font-size: 14px;
`

const Container = styled(Flex)`
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
  background: white;
  border-top-left-radius: 12px;
`

const StyledText = styled(Text)``

export default ({ products, location }) => {
  return (
    <Container mb={4} flexWrap="wrap">
      {products.map(
        (
          {
            category: { name },
            description: {
              internal: { content },
            },
            filling,
            image: { fluid },
            ingridients,
            price,
            productName,
            weight,
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
              boxShadow={`0 2px 8px ${theme.colors.primaryBR4}`}
            >
              <Image
                fluid={fluid}
                objectFit={name === "order" ? "cover" : "contain"}
              />
              <StyledText
                fontSize={2}
                color="primary"
                px={3}
                p={3}
                lineHeight={[1.3, 1.5]}
              >
                <b>{productName}</b>
                <Text color="primary" textAlign="left" fontSize={1} pt={2}>
                  {weight && (
                    <span>
                      <b>Вес:</b> {weight}
                    </span>
                  )}
                </Text>
                <Text color="primary" textAlign="left" fontSize={1}>
                  {price && (
                    <span>
                      <b>Цена:</b> {price} руб.
                    </span>
                  )}
                </Text>
              </StyledText>
              <Accordion min={0}>
                <Flex flexDirection="column" alignItems="center">
                  <Text
                    fontSize={2}
                    color="primary"
                    px={3}
                    py={[3]}
                    textAlign={["center"]}
                    lineHeight={1.5}
                  >
                    {content}
                  </Text>
                  {ingridients && (
                    <Text
                      color="primary"
                      textAlign="center"
                      px={3}
                      py={1}
                      fontSize={2}
                    >
                      {parseIngridients(ingridients.internal.content)}
                    </Text>
                  )}
                  {filling && filling.length && (
                    <Text color="primary" p={3} py={2} fontSize={1}>
                      <b>
                        <span>Начинки:&nbsp;&nbsp;</span>
                      </b>
                      {filling.map((item, idx) => (
                        <span key={idx}>
                          {item.name}
                          {idx < filling.length - 1 && <span>,&nbsp;</span>}
                        </span>
                      ))}
                    </Text>
                  )}
                </Flex>
                <hr
                  style={{ background: theme.colors.primary, margin: `20px` }}
                />
                <Flex py={2} justifyContent="center" alignItems="center">
                  <PhoneButton
                    href="tel:+79269823572"
                    target="_self"
                    name="phone number"
                  >
                    +7 (0) 926 982 35 72
                  </PhoneButton>
                </Flex>
                <Flex px={1} py={3} flexDirection="column" alignItems="space-around">
                  <Box px={2} pb={2}>
                    <Social
                      location={location}
                      iconSize={32}
                      quote={`${productName}: ${content}`}
                      title={productName}
                      description={`${content}`}
                      image={`https:${fluid.src}`}
                    />
                  </Box>
                </Flex>
              </Accordion>
            </StyledCard>
          )
        }
      )}
    </Container>
  )
}
