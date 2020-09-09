import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import { navigateTo } from "gatsby"
import Img from "gatsby-image/withIEPolyfill"
import React, { Fragment } from "react"
import { Box, Card, Flex, Text } from "rebass"
import styled from "styled-components"
import Social from "../components/sociallinks"
import { useCartDispatch, useCartState } from "../state/cart"
import { theme } from "../utils/styles"
import { parseIngridients } from "../utils/utils"
import Accordion from "./accordion"

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
  background: ${props => props.theme.colors.secondary};
`

const Image = styled(Img)`
  min-width: 100%;
  max-height: 100vw;
  background: white;
  border-top-left-radius: 12px;
`

const StyledText = styled(Text)``

export default ({ products, location }) => {
  const dispatch = useCartDispatch()
  const cart = useCartState()
  const goToCart = () => navigateTo("/shopping-cart")

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
            image,
            ingridients,
            price,
            productName,
            weight,
          },
          index
        ) => {
          const findProductInCart = item => item.productName === productName

          const isInCart = cart.products.find(findProductInCart)

          const addProductToCart = () => {
            dispatch({
              type: "ADD_PRODUCT",
              image,
              productName,
              filling,
              weight,
              price,
              ingridients,
              content,
            })
          }

          const increaseProductQuantity = () => {
            dispatch({
              type: "INCREASE_QUANTITY",
              productName,
              price,
            })
          }

          const decreaseProductQuantity = () => {
            dispatch({
              type: "DECREASE_QUANTITY",
              productName,
              price,
            })
          }

          return (
            <StyledCard
              key={index}
              width={1}
              mx={[0, "auto"]}
              my={3}
              borderRadius={12}
              boxShadow={`0 2px 8px ${theme.colors.primaryBR4}`}
            >
              {image && (
                <Image
                  fluid={image.fluid}
                  objectFit={name === "order" ? "cover" : "contain"}
                />
              )}
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
                <Flex
                  py={2}
                  flexWrap={["wrap"]}
                  justifyContent="space-around"
                  alignItems="center"
                >
                  {name === "order" ? (
                    <Fragment>
                      <PhoneButton
                        href="tel:+79266298726"
                        target="_self"
                        name="phone number"
                      >
                        +7 (926) 629 87 26
                      </PhoneButton>
                      <PhoneButton
                        href="tel:+79269823572"
                        target="_self"
                        name="phone number"
                      >
                        +7 (926) 982 35 72
                      </PhoneButton>
                    </Fragment>
                  ) : isInCart ? (
                    <Fragment>
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={goToCart}
                      >
                        В корзинe
                      </Button>
                      <ButtonGroup
                        size="small"
                        color="primary"
                        aria-label="small outlined button group"
                      >
                        <Button
                          variant="contained"
                          disableElevation
                          onClick={decreaseProductQuantity}
                        >
                          -
                        </Button>
                        <Button>{isInCart.count}</Button>
                        <Button
                          variant="contained"
                          disableElevation
                          onClick={increaseProductQuantity}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </Fragment>
                  ) : (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={addProductToCart}
                    >
                      В корзину
                    </Button>
                  )}
                </Flex>
                <Flex
                  px={1}
                  py={3}
                  flexDirection="column"
                  alignItems="space-around"
                >
                  <Box px={2} pb={2}>
                    <Social
                      location={location}
                      iconSize={32}
                      quote={`${productName}: ${content}`}
                      title={productName}
                      description={`${content}`}
                      image={`https:${image && image.fluid.src}`}
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
