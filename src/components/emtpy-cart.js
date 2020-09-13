import React from "react"
import { Flex, Text } from "rebass"
import { theme } from "../utils/styles"
import Cart from "./svg/cart"

export default () => (
  <Flex
    flexDirection="column"
    justifyItems="center"
    justifyContent="center"
    alignItems="center"
    minHeight={["50vh"]}
  >
    <Text as="h4" color="primary">{`Корзина пуста`}</Text>
    <Flex>
      <Cart width={100} height={100} fill={theme.colors.primary} />
    </Flex>
  </Flex>
)
