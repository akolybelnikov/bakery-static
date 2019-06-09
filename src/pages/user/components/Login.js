import { Auth } from "aws-amplify"
import { navigate } from "gatsby"
import { Form, Text } from "informed"
import React, { useState } from "react"
import { Box, Button, Card, Flex, Heading, Text as RebassText } from "rebass"
import { setUser } from "../../../utils/auth"
import { theme } from "../../../utils/styles"
import Field from "./Field"

export default ({ onStateChange }) => {
  const [attribute, setAttribute] = useState("password")
  const [active, setActive] = useState({ email: false, password: false })

  const setEmailActive = () => setActive({ email: true })
  const setEmailInactive = () => setActive({ email: false })

  const setPasswordActive = () => setActive({ password: true })
  const setPasswordInactive = () => setActive({ password: false })

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
        setUser(userInfo)
        navigate("/user/profile")
      } catch (err) {
        if (err.code === "UserNotConfirmedException") {
          onStateChange("confirmSignUp")
        }
        console.error(err)
      }
    }
  }

  return (
    <Flex px={[2]} flexDirection="column" alignItems="center">
      <Heading textAlign="center" color="primary">
        Вход пользователя
      </Heading>
      <Form>
        {({ formState }) => {
          return (
            <Card
              boxShadow={`0px 4px 20px 0px ${theme.colors.secondary}`}
              my={[4]}
              p={[4]}
            >
              <Field
                label="Введите свой адрес эл.почты"
                error={formState.errors.email}
                active={active.email}
                id="email"
                locked={false}
                value={formState.values.email}
              >
                <Text
                  required
                  field="email"
                  id="email"
                  placeholder="Введите свой адрес эл.почты"
                  onFocus={setEmailActive}
                  onBlur={setEmailInactive}
                />
              </Field>

              <Field
                label="Введите свой пароль"
                error={formState.errors.password}
                active={active.password}
                id="password"
                locked={false}
                value={formState.values.password}
              >
                <Text
                  type="password"
                  field="password"
                  id="password"
                  placeholder="Введите свой пароль"
                  onFocus={setPasswordActive}
                  onBlur={setPasswordInactive}
                />
              </Field>

              <Flex alignItems="center" justifyContent="space-around">
                <RebassText fontSize={[1, 2]} color="#282828;">
                  Пароль утерян?{" "}
                </RebassText>
                <Button
                  variant="noOutline"
                  onClick={() => onStateChange("forgotPassword")}
                >
                  Запросить новый пароль
                </Button>
              </Flex>

              <Flex alignItems="center" justifyContent="space-around">
                <RebassText fontSize={[1, 2]} color="#282828;">
                  Нет профиля?
                </RebassText>
                <Button
                  variant="noOutline"
                  onClick={() => onStateChange("signUp")}
                >
                  Зарегистрироваться
                </Button>
              </Flex>
              <Box>
                <Button
                  mt={[4]}
                  width={[1 / 2]}
                  variant="primary"
                  type="button"
                  onClick={() => login(formState)}
                >
                  Войти
                </Button>
              </Box>
            </Card>
          )
        }}
      </Form>
    </Flex>
  )
}
