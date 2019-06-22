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
}) => {
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
      {description && (
        <Text
          fontWeight={"lighter"}
          color="primary"
          textAlign="center"
          px={3}
          py={2}
          fontSize={2}
        >
          {description.internal.content}
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
      {location.pathname === "/order" && (
        <Flex p={2} justifyContent="space-around" alignItems="center">
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
        </Flex>
      )}
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
          quote={`${productName}: ${description &&
            description.internal.content}`}
          title={productName}
          description={`${description && description.internal.content}`}
          image={`https:${image && image.fluid.src}`}
        />
      </Flex>
    </Card>
  )
}
