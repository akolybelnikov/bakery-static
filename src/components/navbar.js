import { Link, navigate } from "gatsby"
import React from "react"
import { Button, Flex } from "rebass"
import { isLoggedIn } from "../utils/auth"
import { baseLink, theme } from "../utils/styles"
import Dropdown from "./dropdown"
import Cart from "./svg/cart"
import User from "./svg/user"

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
      {location.pathname !== "/shopping-cart" &&
        !location.pathname.includes("user") && (
          <Link
            style={{ ...baseLink, paddingBlockEnd: "0.35rem" }}
            to={`/shopping-cart`}
          >
            <Cart width={80} height={80} fill={theme.colors.primary} />
          </Link>
        )}
      {location.pathname !== "/auth" && !location.pathname.includes("user") && (
        <Link
          style={{ ...baseLink, paddingBlockEnd: "0.35rem" }}
          to={isLoggedIn() ? `/user/profile` : `/auth`}
        >
          <User width={60} height={80} fill={theme.colors.primary} />
        </Link>
      )}
    </Flex>
  )
}
