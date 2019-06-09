import { Auth } from "aws-amplify"
import { navigate } from "gatsby"
import React from "react"
import { Button, Flex as FlexRebass, Heading, Text } from "rebass"
import styled from "styled-components"
import { getCurrentUser, logout } from "../../utils/auth"

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

  return (
    <Flex>
      <Heading textAlign="center" color="primary">
        Добро пожаловать, {user.name ? user.name : "неизвестный пользователь"}!
      </Heading>
      <Text textAlign="center" color="primary">
        Вы зарегистрированы с адресом эл. почты: <b>{user.email}</b>
      </Text>
      <Button
        variant="primary"
        width={[1, 1/2, 1 / 3]}
        onClick={() =>
          Auth.signOut()
            .then(logout(() => navigate("/user/auth")))
            .catch(err => console.log("eror:", err))
        }
      >
        Выйдти
      </Button>
    </Flex>
  )
}

export default Profile
