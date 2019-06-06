import Img from "gatsby-image/withIEPolyfill"
import React from "react"
import { Card, Flex, Heading, Text } from "rebass"
import styled from "styled-components"
import Social from "../components/sociallinks"
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
  color: ${props => props.theme.colors.secondary};
  background: ${props => props.theme.colors.primary};
  padding: 6px 12px;
  margin: 8px 0;
  border-radius: 4px;
  width: fit-content;
  cursor: pointer;
  text-shadow: none;
  box-shadow: 0 2px 8px ${theme.colors.primaryBR2};
  font-size: 16px;
`

export default ({ product, location }) => {
  return (
    <Card bg="secondary" pb={4} borderRadius={12}>
      <Image
        fluid={product.image.fluid}
        objectFit={product.category.name === "order" ? "cover" : "contain"}
      />
      <Heading fontSize={4} pt={4} pb={3} textAlign="center" color="primary">
        {product.productName}
      </Heading>
      {product.description && (
        <Text color="primary" textAlign="center" px={3} py={2} fontSize={3}>
          {product.description.internal.content}
        </Text>
      )}
      {product.ingridients && (
        <Text color="primary" textAlign="center" px={3} py={1} fontSize={2}>
          {parseIngridients(product.ingridients.internal.content)}
        </Text>
      )}
      <Text
        color="primary"
        textAlign="left"
        px={3}
        py={2}
        fontSize={3}
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        {product.weight && (
          <span>
            <b>Вес:</b> {product.weight}
          </span>
        )}
        {product.price && (
          <span>
            <b>Цена:</b> {product.price} руб.
          </span>
        )}
      </Text>
      {product.filling && product.filling.length && (
        <Text color="primary" pl={4} pr={3} py={2} fontSize={3}>
          <b>
            <span>Начинки:&nbsp;&nbsp;</span>
          </b>
          {product.filling.map((item, idx) => (
            <span key={idx}>
              {item.name}
              {idx < product.filling.length - 1 && <span>,&nbsp;</span>}
            </span>
          ))}
        </Text>
      )}
      <hr style={{ background: theme.colors.primary, margin: `20px` }} />
      <Flex p={2} justifyContent="space-around" alignItems="center">
        <Text color="primary" fontSize={3}>
          Закажи по телефону:
        </Text>
        <PhoneButton href="tel:+79269823572" target="_self" name="phone number">
          +7 (0) 926 982 35 72
        </PhoneButton>
      </Flex>
      <Flex px={2} flexDirection="column" alignItems="space-around">
        <Text color="primary" textAlign="left" pl={3} fontSize={3} mb={3}>
          Поделись с друзьями:
        </Text>
        <Social
          location={location}
          iconSize={40}
          quote={`${product.productName}: ${
            product.description.internal.content
          }`}
          title={product.productName}
          description={`${product.description.internal.content}`}
          image={`https:${product.image.fluid.src}`}
        />
      </Flex>
    </Card>
  )
}
