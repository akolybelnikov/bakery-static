import { Auth } from "aws-amplify"
import { Link, navigate } from "gatsby"
import React from "react"
import { Button, Flex as FlexRebass, Heading, Text } from "rebass"
import styled from "styled-components"
import { useUserDispatch } from "../../state/user"
import { getCurrentUser, isLoggedIn, logout } from "../../utils/auth"
import { baseLink } from "../../utils/styles"

const Flex = styled(FlexRebass).attrs({
  py: [2],
  px: [2],
  width: [1],
  m: "0 auto",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
})`
  position: relative;
  min-height: 50vh;
`

const Profile = () => {
  const user = getCurrentUser()
  const dispatch = useUserDispatch()
  const logOutCallback = () => {
    dispatch({ type: "REMOVE_USER" })
    navigate("/")
  }

  return (
    <>
      {isLoggedIn() ? (
        <Flex>
          <Heading textAlign="center" color="primary">
            Добро пожаловать,{" "}
            {user.name ? user.name : "неизвестный пользователь"}!
          </Heading>
          <Text textAlign="center" color="primary">
            Вы зарегистрированы с адресом эл. почты: <b>{user.email}</b>
          </Text>
          <Button variant="primary" width={[1, 1 / 2, 1 / 3]}>
            <Link style={baseLink} to={"/shopping-cart"}>
              Моя корзина
            </Link>
          </Button>
          {user.roles.includes("admin") && (
            <Button variant="primary" width={[1, 1 / 2, 1 / 3]}>
              <Link style={baseLink} to={"/user/orders"}>
                Orders
              </Link>
            </Button>
          )}
          <Button
            variant="primary"
            width={[1, 1 / 2, 1 / 3]}
            onClick={() =>
              Auth.signOut()
                .then(logout(logOutCallback))
                .catch(err => console.error(err))
            }
          >
            Выйти
          </Button>
        </Flex>
      ) : null}
    </>
  )
}

export default Profile
