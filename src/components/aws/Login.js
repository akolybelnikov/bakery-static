import { Auth } from "aws-amplify"
import { navigate } from "gatsby"
import { Form, Text } from "informed"
import React, { useState } from "react"
import {
  Box,
  Button as RebassButton,
  Card as RebassCard,
  Flex,
  Heading,
  Text as RebassText,
} from "rebass"
import { setUser } from "../../utils/auth"
import { theme } from "../../utils/styles"
import Field from "./Field"
import styled from "styled-components"
import BottomSheet from "./BottomSheet"
import { mapSignInError } from "../../utils/aws"
import { validateEmail, emptyLoginPassword } from "../../utils/validation"

const Button = styled(RebassButton).attrs({
  color: theme.colors.primary,
  backgroundColor: "transparent",
  boxShadow: "0 0 0 transparent",
  outline: "none",
  fontSize: [2],
  lineHeight: 1.5,
})`
  cursor: pointer;
`

const OutlinedButton = styled(RebassButton).attrs({
  color: "#fff",
  backgroundColor: theme.colors.primary,
  fontWeight: "normal",
  fontSize: 16,
  width: [1 / 2],
})`
  cursor: pointer;
  letter-spacing: 1px;
`

const Card = styled(RebassCard).attrs({
  boxShadow: `0px 4px 20px 0px ${theme.colors.secondary}`,
  my: [4],
  py: [4],
  px: [2],
})`
  position: relative;
  min-width: 350px;
  @media all and (max-width: 350px) {
    min-width: 300px;
  }
`

export default ({ onStateChange, setUsername }) => {
  // const [attribute, setAttribute] = useState("password")
  const [active, setActive] = useState({ email: false, password: false })
  const [error, setError] = useState()
  const [open, setSheet] = useState(false)

  const setEmailActive = () => {
    setActive({ email: true })
    if (open) {
      closeSheet()
    }
  }
  const setEmailInactive = () => {
    setActive({ email: false })
  }

  const setPasswordActive = () => {
    setActive({ password: true })
    if (open) {
      closeSheet()
    }
  }
  const setPasswordInactive = () => {
    setActive({ password: false })
  }

  const openSheet = () => {
    setSheet(true)
  }

  const closeSheet = () => {
    setSheet(false)
    setError(null)
  }

  // const toggleAttr = () => {
  //   attribute === "password" ? setAttribute("text") : setAttribute("password")
  // }

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
          setUsername(email)
          onStateChange("signedUp")
        } else {
          setError(mapSignInError(err))
          openSheet()
        }
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
            <Card>
              <Field
                label="Введите свой адрес эл.почты"
                error={formState.errors.email}
                active={active.email}
                id="email"
                locked={false}
                value={formState.values.email}
              >
                <Text
                  validateOnBlur
                  validateOnChange
                  field="email"
                  id="email"
                  placeholder="Введите свой адрес эл.почты"
                  onFocus={setEmailActive}
                  onBlur={setEmailInactive}
                  validate={validateEmail}
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
                  validateOnBlur
                  validateOnChange
                  type="password"
                  field="password"
                  id="password"
                  placeholder="Введите свой пароль"
                  onFocus={setPasswordActive}
                  onBlur={setPasswordInactive}
                  validate={emptyLoginPassword}
                />
              </Field>

              <Box>
                <OutlinedButton type="submit" onClick={() => login(formState)}>
                  Войти
                </OutlinedButton>
              </Box>

              <Flex mt={[2]} alignItems="center" justifyContent="space-between">
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

              {/* <Flex mt={[4]} alignItems="center" justifyContent="space-between">
                <RebassText fontSize={[1, 2]} color="#282828;">
                  Пароль утерян?{" "}
                </RebassText>
                <Button
                  variant="noOutline"
                  onClick={() => onStateChange("forgotPassword")}
                >
                  Запросить новый
                </Button>
              </Flex> */}

              <BottomSheet
                color={theme.colors.red}
                toggle={closeSheet}
                open={open}
                children={error}
              />
            </Card>
          )
        }}
      </Form>
    </Flex>
  )
}
