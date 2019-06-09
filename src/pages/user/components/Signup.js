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
} from "rebass"
import styled from "styled-components"
import { theme } from "../../../utils/styles"
import {
  emptyCode,
  emptyEmail,
  emptyName,
  emptyPassword,
  emptyPhone,
} from "../../../utils/validation"
import Field from "./Field"

const Card = styled(RebassCard).attrs({
  boxShadow: `0px 4px 20px 0px ${theme.colors.secondary}`,
  my: [4],
  p: [4],
})``

const Button = styled(RebassButton).attrs({
  color: theme.colors.primary,
  backgroundColor: "transparent",
  boxShadow: "0 0 0 transparent",
  outline: "none",
  fontSize: [2, 3],
  lineHeight: 1.5,
})`
  cursor: pointer;
`

const OutlinedButton = styled(RebassButton).attrs({
  color: "#fff",
  backgroundColor: theme.colors.primary,
  fontWeight: "normal",
  fontSize: 16,
  mb: [3],
})`
  cursor: pointer;
  letter-spacing: 1px;
`

export default ({ onStateChange, authState }) => {
  const [attribute, setAttribute] = useState("password")
  const [username, setUsername] = useState()
  const [active, setActive] = useState({
    email: false,
    password: false,
    name: false,
    phone_number: false,
    username: false,
    code: false,
  })

  const setEmailActive = () => setActive({ email: true })
  const setEmailInactive = () => setActive({ email: false })

  const setPasswordActive = () => setActive({ password: true })
  const setPasswordInactive = () => setActive({ password: false })

  const setNameActive = () => setActive({ name: true })
  const setNameInactive = () => setActive({ name: false })

  const setPhoneActive = () => setActive({ phone_number: true })
  const setPhoneInactive = () => setActive({ phone_number: false })

  const setUsernameActive = () => setActive({ username: true })
  const setUsernameInactive = () => setActive({ username: false })

  const setCodeActive = () => setActive({ code: true })
  const setCodeInactive = () => setActive({ code: false })

  // const toggleAttr = () => {
  //   attribute === "password" ? setAttribute("text") : setAttribute("password")
  // }

  const signup = async form => {
    const {
      values: { email, password, name, phone_number },
    } = form
    if (email && password && name && phone_number) {
      try {
        await Auth.signUp({
          username: email,
          password,
          attributes: {
            name,
            phone_number,
          },
        })
        setUsername(email)
        onStateChange("signedUp")
      } catch (err) {
        if (err.code === "UsernameExistsException") {
          onStateChange("signedUp")
        }
        console.log("error signing up...", err)
      }
    }
  }

  const confirmSignUp = async form => {
    const {
      values: { username, code },
    } = form
    try {
      await Auth.confirmSignUp(username, code)
      onStateChange("signedIn")
      alert("Successfully signed up!")
      navigate("/user/profile")
    } catch (err) {
      console.log("error confirming signing up...", err)
    }
  }

  return (
    <Flex px={[2]} flexDirection="column" alignItems="center">
      {authState === "signUp" && (
        <>
          <Heading color="primary">Регистрация пользователя</Heading>
          <Form>
            {({ formState }) => {
              return (
                <Card>
                  <Field
                    label="Aдрес эл.почты"
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
                      placeholder="Aдрес эл.почты"
                      onFocus={setEmailActive}
                      onBlur={setEmailInactive}
                      validate={emptyEmail}
                    />
                  </Field>

                  <Field
                    label="Пароль"
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
                      placeholder="Пароль"
                      onFocus={setPasswordActive}
                      onBlur={setPasswordInactive}
                      validate={emptyPassword}
                    />
                  </Field>

                  <Field
                    label="Ваше имя"
                    error={formState.errors.name}
                    active={active.name}
                    id="name"
                    locked={false}
                    value={formState.values.name}
                  >
                    <Text
                      validateOnBlur
                      validateOnChange
                      field="name"
                      id="name"
                      placeholder="Ваше имя"
                      onFocus={setNameActive}
                      onBlur={setNameInactive}
                      validate={emptyName}
                    />
                  </Field>

                  <Field
                    label="Ваш номер телефона"
                    error={formState.errors.phone_number}
                    active={active.phone_number}
                    id="phone_number"
                    locked={false}
                    value={formState.values.phone_number}
                  >
                    <Text
                      validateOnBlur
                      validateOnChange
                      field="phone_number"
                      id="phone_number"
                      placeholder="Ваш номер телефона"
                      onFocus={setPhoneActive}
                      onBlur={setPhoneInactive}
                      validate={emptyPhone}
                    />
                  </Field>

                  <Box justifyContent="flex-start">
                    <OutlinedButton onClick={() => signup(formState)}>
                      Зарегистрироваться
                    </OutlinedButton>
                  </Box>

                  <Flex alignItems="center">
                    <span>Зарегистрированы?</span>
                    <Button
                      type="button"
                      onClick={() => onStateChange("signIn")}
                    >
                      Войти
                    </Button>
                  </Flex>
                </Card>
              )
            }}
          </Form>
        </>
      )}
      {authState === "signedUp" && (
        <>
          <Heading color="primary">Подтвердить регистрацию</Heading>
          <Form initialValues={username}>
            {({ formState }) => {
              return (
                <Card>
                  <Field
                    label="Ваш aдрес эл. почты"
                    error={formState.errors.username}
                    active={active.username}
                    id="username"
                    locked={false}
                    value={formState.values.username}
                  >
                    <Text
                      validateOnBlur
                      validateOnChange
                      field="username"
                      id="username"
                      placeholder="Введите свой адрес эл.почты"
                      onFocus={setUsernameActive}
                      onBlur={setUsernameInactive}
                      validate={emptyEmail}
                    />
                  </Field>

                  <Field
                    label="Код подтверждения"
                    error={formState.errors.code}
                    active={active.code}
                    id="code"
                    locked={false}
                    value={formState.values.code}
                  >
                    <Text
                      validateOnBlur
                      validateOnChange
                      type="text"
                      field="code"
                      id="code"
                      placeholder="Код подтверждения"
                      onFocus={setUsernameActive}
                      onBlur={setUsernameInactive}
                      validate={emptyCode}
                    />
                  </Field>

                  <Flex flexWrap="wrap">
                    <Box>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={() => confirmSignUp(formState)}
                      >
                        Подтвердить
                      </Button>
                    </Box>
                    <Box>
                      <span>Код утерян? </span>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={() => console.log(authState)}
                      >
                        Выслать повторно
                      </Button>
                    </Box>
                  </Flex>
                </Card>
              )
            }}
          </Form>
        </>
      )}
    </Flex>
  )
}
