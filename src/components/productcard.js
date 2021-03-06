import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import { navigate } from "gatsby"
import Img from "gatsby-image/withIEPolyfill"
import React, { Fragment } from "react"
import { Card, Flex, Heading, Text } from "rebass"
import styled from "styled-components"
import Social from "../components/sociallinks"
import { useCartDispatch, useCartState } from "../state/cart"
import { theme } from "../utils/styles"
import { parseIngridients } from "../utils/utils"

const Image = styled(Img)`
  width: 500px;
  height: 500px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background: white;
`

const PhoneButton = styled.a`
  color: ${theme.colors.secondary};
  background: ${theme.colors.primary};
  padding: 6px;
  margin: 8px 0 12px;
  border-radius: 4px;
  width: fit-content;
  cursor: pointer;
  text-shadow: none;
  box-shadow: 0 2px 8px ${theme.colors.primaryBR2};
  font-size: 16px;
`

export default ({
  product: {
    image,
    productName,
    category,
    description,
    ingridients,
    weight,
    price,
    filling,
  },
  location,
  // toggle,
}) => {
  const { products } = useCartState()
  const findProductInCart = item => item.productName === productName
  const isInCart = products.find(findProductInCart)
  const dispatch = useCartDispatch()
  let content = null
  if (description) {
      content = description.internal.content
  }

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
    // toggle()
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

  const goToCart = () => navigate("/shopping-cart")

  return (
    <Card bg="secondary" pb={4} borderRadius={12}>
      {image && (
        <Image
          fluid={image.fluid}
          objectFit={category.name === "order" ? "cover" : "contain"}
        />
      )}
      <Heading
        fontWeight={"normal"}
        fontSize={4}
        pt={4}
        pb={3}
        textAlign="center"
        color="primary"
      >
        {productName}
      </Heading>
      {content && (
        <Text
          fontWeight={"lighter"}
          color="primary"
          textAlign="center"
          px={3}
          py={2}
          fontSize={2}
        >
          {content}
        </Text>
      )}
      {ingridients && (
        <Text
          fontWeight={"normal"}
          color="primary"
          textAlign="center"
          px={3}
          py={1}
          fontSize={2}
        >
          {parseIngridients(ingridients.internal.content)}
        </Text>
      )}
      <Text
        fontWeight={"lighter"}
        color="primary"
        textAlign="left"
        px={3}
        py={2}
        fontSize={3}
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        {weight && (
          <span>
            <b>Вес:</b> {weight}
          </span>
        )}
        {price && (
          <span>
            <b>Цена:</b> {price} руб.
          </span>
        )}
      </Text>
      {filling && filling.length && (
        <Text color="primary" pl={4} pr={3} py={2} fontSize={2}>
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
      <hr style={{ background: theme.colors.primary, margin: `20px` }} />
      <Flex p={2} justifyContent="space-around" alignItems="center">
        {category.name === "order" ? (
          <Fragment>
            <Text color="primary" fontSize={1}>
              Закажи по телефону:
            </Text>
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
            <Button color="primary" variant="outlined" onClick={goToCart}>
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
            disableFocusRipple
            color="primary"
            variant="contained"
            onClick={addProductToCart}
          >
            В корзину
          </Button>
        )}
      </Flex>
      <hr style={{ background: theme.colors.primary, margin: `20px` }} />
      <Flex px={2} flexDirection="column" alignItems="space-around">
        <Text
          color="primary"
          textAlign="left"
          pl={3}
          fontSize={3}
          mb={3}
          fontWeight={"lighter"}
        >
          Поделись с друзьями:
        </Text>
        <Social
          location={location}
          iconSize={40}
          quote={`${productName}: ${content && content}`}
          title={productName}
          description={`${content && content}`}
          image={`https:${image && image.fluid.src}`}
        />
      </Flex>
    </Card>
  )
}
