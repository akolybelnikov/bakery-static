import React from "react"
import { Flex, Text, Heading } from "rebass"

export default ({ title, description }) => (
  <Flex
    flexDirection="column"
    justifyItems="center"
    justifyContent="center"
    alignItems="center"
    minHeight={["50vh"]}
  >
    <Heading>{title}</Heading>
    <Text>{description}</Text>
  </Flex>
)
