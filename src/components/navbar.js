import React from "react"
import { Flex } from "rebass"
import Dropdown from "./dropdown"

export default ({ location }) => {
  return (
    <Flex>
      <Dropdown location={location} />
    </Flex>
  )
}
