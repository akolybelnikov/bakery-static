import React from "react"
import { Flex, Button } from "rebass"
import Dropdown from "./dropdown"
import { navigate } from "gatsby"

export default ({ location }) => {
  return (
    <Flex
      style={{ flex: "auto" }}
      justifyContent="space-around"
      alignItems="center"
      flexWrap='wrap'
    >
      <Dropdown location={location} />
      <Button onClick={() => navigate('/news/')} variant='outline'>
        Новости
      </Button>
      <Button onClick={() => navigate('/about/')} variant='outline'>
        О нас
      </Button>
      <Button onClick={() => navigate('/contact/')} variant='outline'>
        Координаты
      </Button>
    </Flex>
  )
}
