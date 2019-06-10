import { Auth } from "aws-amplify"
import { navigate } from "gatsby"
import { Form, Text } from "informed"
import React, { useState } from "react"
import { FaEye } from "react-icons/fa"
import {
  Box,
  Button as RebassButton,
  Card as RebassCard,
  Flex,
  Heading,
  Text as RebassText,
} from "rebass"
import styled, {keyframes} from "styled-components"
import { mapSignUpError } from "../../utils/aws"
import { theme } from "../../utils/styles"
import {
  emptyCode,
  emptyName,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../utils/validation"
import BottomSheet from "./BottomSheet"
import Field from "./Field"

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(359deg);
  }
`

const Icon = styled(RebassButton).attrs({
  color: theme.colors.primary,
  backgroundColor: "transparent",
  boxShadow: "0 0 0 transparent",
  outline: "none",
  fontSize: [4],
  p: [0],
  px: [1],
})`
  height: 56px;
  cursor: pointer;
  // animation: ${spin} 1.5s linear infinite;
`

const Card = styled(RebassCard).attrs({
  boxShadow: `0px 4px 20px 0px ${theme.colors.secondary}`,
  my: [2],
  py: [3],
  px: [2],
})`
  position: relative;
  min-width: 350px;
  @media all and (max-width: 350px) {
    min-width: 300px;
  }
`

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
  mb: [3],
})`
  cursor: pointer;
  letter-spacing: 1px;
`

export default ({ onStateChange, authState, username, setUsername }) => {
  const [attribute, setAttribute] = useState("password")
  const [error, setError] = useState(false)
  const [open, setSheet] = useState(false)
  const [active, setActive] = useState({
    email: false,
    password: false,
    name: false,
    phone_number: false,
    username: false,
    code: false,
  })
  const [message, setMessage] = useState()

  const openSheet = () => {
    setSheet(true)
  }

  const closeSheet = () => {
    setSheet(false)
    if (error) {
      setError(false)
    }
    if (message) {
      setMessage(null)
    }
  }

  const setEmailActive = () => {
    if (open) {
      closeSheet()
    }
    setActive({ email: true })
  }

  const setEmailInactive = () => setActive({ email: false })

  const setPasswordActive = () => {
    setActive({ password: true })
    if (open) {
      closeSheet()
    }
  }
  const setPasswordInactive = () => setActive({ password: false })

  const setNameActive = () => {
    if (open) {
      closeSheet()
    }
    setActive({ name: true })
  }
  const setNameInactive = () => setActive({ name: false })

  const setPhoneActive = () => {
    if (open) {
      closeSheet()
    }
    setActive({ phone_number: true })
  }
  const setPhoneInactive = () => setActive({ phone_number: false })

  const setUsernameActive = () => {
    if (open) {
      closeSheet()
    }
    setActive({ username: true })
  }
  const setUsernameInactive = () => setActive({ username: false })

  const setCodeActive = () => {
    if (open) {
      closeSheet()
    }
    setActive({ code: true })
  }
  const setCodeInactive = () => setActive({ code: false })

  const toggleAttr = () => {
    attribute === "password" ? setAttribute("text") : setAttribute("password")
  }

  const signup = async form => {
    const {
      values: { email, password, name, phone_number },
      errors,
    } = form
    if (
      !errors.email &&
      !errors.password &&
      !errors.name &&
      !errors.phone_number
    ) {
      try {
        await Auth.signUp({
          username: email.trim(),
          password,
          attributes: {
            name,
            phone_number,
          },
        })
        setUsername(email.trim())
        onStateChange("signedUp")
      } catch (err) {
        setError(true)
        setMessage(mapSignUpError(err))
        openSheet()
      }
    }
  }

  const confirmSignUp = async form => {
    const {
      values: { username, code },
    } = form
    if (username && code) {
      try {
        await Auth.confirmSignUp(username.trim(), code.trim())
        navigate("/user/profile")
      } catch (err) {
        setError(true)
        setMessage(mapSignUpError(err))
        openSheet()
      }
    }
  }

  const resendCode = async form => {
    const {
      values: { username },
    } = form
    if (username) {
      try {
        await Auth.resendSignUp(username.trim())
        setMessage(
          "Мы выслали код подтверждения на Ваш адрес. Код действителен 24 часа."
        )
        openSheet()
      } catch (err) {
        setError(true)
        setMessage(mapSignUpError(err))
        openSheet()
      }
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
                      validate={validateEmail}
                    />
                  </Field>

                  <Flex>
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
                        type={attribute}
                        field="password"
                        id="password"
                        placeholder="Пароль"
                        onFocus={setPasswordActive}
                        onBlur={setPasswordInactive}
                        validate={validatePassword}
                      />
                    </Field>
                    <Icon onClick={toggleAttr}>
                      <FaEye />
                    </Icon>
                  </Flex>

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
                      validate={validatePhoneNumber}
                    />
                  </Field>

                  <Box>
                    <OutlinedButton onClick={() => signup(formState)}>
                      Зарегистрироваться
                    </OutlinedButton>
                  </Box>

                  <Flex justifyContent="space-between" alignItems="center">
                    <RebassText fontSize={[1, 2]} color="#282828;">
                      Зарегистрированы?
                    </RebassText>
                    <Button
                      type="button"
                      onClick={() => onStateChange("signIn")}
                    >
                      Войти
                    </Button>
                  </Flex>

                  <BottomSheet
                    toggle={closeSheet}
                    open={open}
                    children={message}
                    color={error ? theme.colors.red : theme.colors.primary}
                  />
                </Card>
              )
            }}
          </Form>
        </>
      )}
      {authState === "signedUp" && (
        <>
          <Heading color="primary">Подтвердить регистрацию</Heading>
          <Form>
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
                      initialValue={username}
                      validateOnBlur
                      validateOnChange
                      field="username"
                      id="username"
                      placeholder="Введите свой адрес эл.почты"
                      onFocus={setUsernameActive}
                      onBlur={setUsernameInactive}
                      validate={validateEmail}
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
                      onFocus={setCodeActive}
                      onBlur={setCodeInactive}
                      validate={emptyCode}
                    />
                  </Field>

                  <Box>
                    <OutlinedButton
                      type="button"
                      onClick={() => confirmSignUp(formState)}
                    >
                      Подтвердить
                    </OutlinedButton>
                  </Box>

                  <Flex alignItems="center" justifyContent="space-between">
                    <span>Код утерян? </span>
                    <Button
                      ml={[1]}
                      type="button"
                      onClick={() => resendCode(formState)}
                    >
                      Выслать повторно
                    </Button>
                  </Flex>

                  <BottomSheet
                    toggle={closeSheet}
                    open={open}
                    children={message}
                    color={error ? theme.colors.red : theme.colors.primary}
                  />
                </Card>
              )
            }}
          </Form>
        </>
      )}
    </Flex>
  )
}
