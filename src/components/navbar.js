import { navigate } from "gatsby"
import React from "react"
import { Button, Flex } from "rebass"
import Dropdown from "./dropdown"
import { isLoggedIn } from "../utils/auth"

export default ({ location }) => {
  return (
    <Flex
      style={{ flex: "auto" }}
      justifyContent="space-around"
      alignItems="center"
      flexWrap="wrap"
    >
      {location.pathname !== "/" && (
        <Button onClick={() => navigate("/")} variant="outline">
          В начало
        </Button>
      )}
      <Dropdown location={location} />
      {location.pathname !== "/offers" && (
        <Button onClick={() => navigate("/offers")} variant="outline">
          Предложения
        </Button>
      )}
      {location.pathname !== "/about" && (
        <Button onClick={() => navigate("/about")} variant="outline">
          Новости
        </Button>
      )}
      {location.pathname !== "/auth" && (
        <Button onClick={() => navigate("/user/profile")} variant="outline">
          {!isLoggedIn() ? "Вход пользователя" : "Мой профиль"}
        </Button>
      )}
    </Flex>
  )
}
