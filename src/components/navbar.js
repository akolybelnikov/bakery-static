import { navigate } from "gatsby"
import React from "react"
import { Button, Flex } from "rebass"
import Dropdown from "./dropdown"

export default ({ location }) => {
  return (
    <Flex
      style={{ flex: "auto" }}
      justifyContent="space-around"
      alignItems="center"
      flexWrap="wrap"
    >
      <Dropdown location={location} />
      <Button onClick={() => navigate("/offers/")} variant="outline">
        Предложения
      </Button>
      <Button onClick={() => navigate("/about/")} variant="outline">
        Новости
      </Button>
      <Button onClick={() => navigate("/contact/")} variant="outline">
        Координаты
      </Button>
    </Flex>
  )
}
