import { Auth } from "aws-amplify"
import { Form, Text } from "informed"
import React, { useState } from "react"
import { FaEye } from "react-icons/fa"
import {
  Box,
  Button as RebassButton,
  Card as RebassCard,
  Flex,
  Heading,
} from "rebass"
import styled from "styled-components"
import { mapError } from "../../utils/aws"
import { theme } from "../../utils/styles"
import {
  emptyCode,
  validateEmail,
  validatePassword,
} from "../../utils/validation"
import BottomSheet from "./BottomSheet"
import Field from "./Field"

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
  console.log(authState)
  const [attribute, setAttribute] = useState("password")
  const [error, setError] = useState(false)
  const [open, setSheet] = useState(false)
  const [active, setActive] = useState({
    email: false,
    password: false,
    username: false,
    code: false,
    confirmpassword: false,
  })
  const [message, setMessage] = useState()
  const [confirmed, setConfirmed] = useState(false)
  // const [loading, setLoading] = useState(false)

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

  const setConfirmPasswordActive = () => {
    setActive({ confirmpassword: true })
    if (open) {
      closeSheet()
    }
  }
  const setConfirmPasswordInactive = () => setActive({ confirmpassword: false })

  const toggleAttr = () => {
    attribute === "password" ? setAttribute("text") : setAttribute("password")
  }

  const passwordMatch = ({ values: { password, confirmpassword } }) =>
    !confirmpassword || !confirmpassword.length
      ? "Подтвердите пароль"
      : confirmpassword !== password
      ? "Пароль не совпадает с указанным"
      : undefined

  const sendcode = async form => {
    const {
      values: { email },
      errors,
    } = form
    if (!errors.email) {
      try {
        await Auth.forgotPassword(email.trim())
        setUsername(email.trim())
        onStateChange("codeSent")
      } catch (err) {
        setError(true)
        setMessage(mapError(err))
        openSheet()
      }
    }
  }

  const confirmchange = async form => {
    const {
      values: { username, code, password },
      errors,
    } = form
    if (!errors.username && !errors.password && !errors.code) {
      try {
        await Auth.forgotPasswordSubmit(
          username.trim(),
          code.trim(),
          password.trim()
        )
        setConfirmed(true)
        setMessage("Пароль успешно сохранён. Вы можете войти на сайт.")
        openSheet()
      } catch (err) {
        setError(true)
        setMessage(mapError(err))
        openSheet()
      }
    }
  }

  return (
    <Flex
      style={{ position: "relative" }}
      px={[2]}
      flexDirection="column"
      alignItems="center"
    >
      {authState === "resetPassword" && (
        <>
          <Heading color="primary">Сменить пароль</Heading>
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

                  <Box>
                    <OutlinedButton onClick={() => sendcode(formState)}>
                      Отправить
                    </OutlinedButton>
                  </Box>

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

      {authState === "codeSent" && (
        <>
          <Heading color="primary">Подтвердить смену пароля</Heading>
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
                      placeholder="Ваш aдрес эл. почты"
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

                  <Flex>
                    <Field
                      label="Подтвердите пароль"
                      error={formState.errors.confirmpassword}
                      active={active.password}
                      id="password"
                      locked={false}
                      value={formState.values.confirmpassword}
                    >
                      <Text
                        validateOnBlur
                        validateOnChange
                        type={"password"}
                        field="confirmpassword"
                        id="confirmpassword"
                        placeholder="Подтвердите пароль"
                        onFocus={setConfirmPasswordActive}
                        onBlur={setConfirmPasswordInactive}
                        validate={() => passwordMatch(formState)}
                      />
                    </Field>
                    <Icon onClick={toggleAttr}>
                      <FaEye />
                    </Icon>
                  </Flex>

                  <Box>
                    <OutlinedButton
                      type="button"
                      onClick={() => confirmchange(formState)}
                    >
                      Подтвердить
                    </OutlinedButton>
                  </Box>

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
          {confirmed && (
            <Box>
              <OutlinedButton onClick={() => onStateChange("signIn")}>
                Вход пользователя
              </OutlinedButton>
            </Box>
          )}
        </>
      )}
    </Flex>
  )
}
