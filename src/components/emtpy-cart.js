import React from "react";
import { Flex, Text } from 'rebass';

export default () => (
  <Flex
    flexDirection="column"
    justifyItems="center"
    justifyContent="center"
    alignItems="center"
    minHeight={["50vh"]}
  >
    <Text as="h4" color="primary">{`Корзина пуста`}</Text>
  </Flex>
)
