import { Auth } from "aws-amplify"
import { navigate } from "gatsby"
import { Form, Text } from "informed"
import React, { useState } from "react"
import { Box, Button, Card, Flex, Heading } from "rebass"
import { isLoggedIn, setUser } from "../../../utils/auth"

export default ({ onStateChange }) => {
  const [attribute, setAttribute] = useState("password")

  const toggleAttr = () => {
    attribute === "password" ? setAttribute("text") : setAttribute("password")
  }

  const login = async form => {
    const {
      values: { email, password },
    } = form
    if (email && password) {
      try {
        await Auth.signIn(email.trim(), password.trim())
        const user = await Auth.currentAuthenticatedUser()
        const userInfo = {
          ...user.attributes,
          username: user.username,
        }
        console.log(userInfo)
        setUser(userInfo)
        onStateChange("signedIn")
        navigate("/user/profile")
      } catch (err) {
        if (err.code === "UserNotConfirmedException") {
          onStateChange("confirmSignUp")
        }
        console.error(err)
      }
    }
  }

  if (isLoggedIn()) navigate("/user/profile")

  return (
    <Box>
      <Heading color="primary">Вход пользователя</Heading>
      <Form>
        {({ formState }) => {
          return (
            <Card>
              <Box>
                <label htmlFor="email">Адрес эл. почты</label>
                <Text
                  field="email"
                  id="email"
                  placeholder="Введите свой адрес эл.почты"
                />
              </Box>

              <Box>
                <label htmlFor="password">Пароль</label>
                <Text
                  type="password"
                  field="password"
                  id="password"
                  placeholder="Введите свой пароль"
                />
              </Box>

              <Box>
                <span>Пароль утерян? </span>
                <Button
                  variant="primary"
                  onClick={() => onStateChange("forgotPassword")}
                >
                  Запросить новый пароль
                </Button>
              </Box>

              <Flex flexWrap="wrap">
                <Box>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => login(formState)}
                  >
                    Войти
                  </Button>
                </Box>
                <Box>
                  <span>Нет профиля?</span>
                  <Button
                    variant="primary"
                    onClick={() => onStateChange("signUp")}
                  >
                    Зарегистрироваться
                  </Button>
                </Box>
              </Flex>
            </Card>
          )
        }}
      </Form>
    </Box>
  )
}
