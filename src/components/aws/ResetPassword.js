import { Auth } from "aws-amplify"
import { Form, Text } from "informed"
import React, { useState, useRef } from "react"
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
import LoadingModal from "../loadingmodal"
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

const ResetPassword = ({ onStateChange, authState, username, setUsername }) => {
  const [attribute, setAttribute] = useState("password")
  const [confirmAttribute, setConfirmAttribute] = useState("password")
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
  const [modalOpen, setModal] = useState(false)

  const apiRef = useRef()

  const showLoading = () => setModal(true)
  const hideLoading = () => setModal(false)

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

  const toggleConfirmAttr = () => {
    confirmAttribute === "password"
      ? setConfirmAttribute("text")
      : setConfirmAttribute("password")
  }

  const passwordMatch = apiRef => {
    const {
      values: { password, confirmpassword },
      errors,
    } = apiRef.current.getState()

    console.log(password, confirmpassword, errors)

    return !confirmpassword
      ? "Подтвердите пароль"
      : confirmpassword !== password
      ? "Пароль не совпадает с указанным"
      : null
  }

  const sendcode = async form => {
    const {
      values: { email },
      errors,
    } = form.current.getState()
    if (email && !errors.email) {
      showLoading()
      try {
        await Auth.forgotPassword(email.trim())
        setUsername(email.trim())
        onStateChange("codeSent")
        hideLoading()
      } catch (err) {
        setError(true)
        setMessage(mapError(err))
        openSheet()
        hideLoading()
      }
    }
  }

  const confirmchange = async form => {
    const {
      values: { username, code, password },
      errors,
    } = form.current.getState()
    if (
      username &&
      code &&
      password &&
      !errors.username &&
      !errors.password &&
      !errors.code
    ) {
      showLoading()
      try {
        await Auth.forgotPasswordSubmit(
          username.trim(),
          code.trim(),
          password.trim()
        )
        setConfirmed(true)
        setMessage("Пароль успешно сохранён. Вы можете войти на сайт.")
        openSheet()
        hideLoading()
      } catch (err) {
        setError(true)
        setMessage(mapError(err))
        openSheet()
        hideLoading()
      }
    }
  }

  const emailError = apiRef =>
    apiRef.current && apiRef.current.getState().errors.email

  const emailValue = apiRef =>
    apiRef.current && apiRef.current.getState().values.email

  const passwordError = apiRef =>
    apiRef.current && apiRef.current.getState().errors.password

  const passwordValue = apiRef =>
    apiRef.current && apiRef.current.getState().values.password

  const codeError = apiRef =>
    apiRef.current && apiRef.current.getState().errors.code

  const codeValue = apiRef =>
    apiRef.current && apiRef.current.getState().values.code

  const usernameError = apiRef =>
    apiRef.current && apiRef.current.getState().errors.username

  const usernameValue = apiRef =>
    apiRef.current && apiRef.current.getState().values.username

  const confirmPasswordError = apiRef =>
    apiRef.current && apiRef.current.getState().errors.confirmpassword

  const confirmPasswordValue = apiRef =>
    apiRef.current && apiRef.current.getState().values.confirmpassword

  return (
    <Flex
      style={{ position: "relative" }}
      px={[2]}
      flexDirection="column"
      alignItems="center"
    >
      <LoadingModal open={modalOpen} hideLoading={hideLoading} />
      {authState === "resetPassword" && (
        <>
          <Heading color="primary">Сменить пароль</Heading>
          <Form apiRef={apiRef}>
            <Card>
              <Field
                label="Адрес эл. почты пользователя"
                error={emailError(apiRef)}
                value={emailValue(apiRef)}
                active={active.email}
                id="email"
                locked={false}
              >
                <Text
                  validateOnBlur
                  validateOnChange
                  field="email"
                  id="email"
                  placeholder="Адрес эл. почты пользователя"
                  onFocus={setEmailActive}
                  onBlur={setEmailInactive}
                  validate={validateEmail}
                />
              </Field>

              <Box>
                <OutlinedButton onClick={() => sendcode(apiRef)}>
                  Запросить
                </OutlinedButton>
              </Box>

              <BottomSheet
                toggle={closeSheet}
                open={open}
                children={message}
                color={error ? theme.colors.red : theme.colors.primary}
              />
            </Card>
          </Form>
        </>
      )}

      {authState === "codeSent" && (
        <>
          <Heading color="primary">Подтвердить смену пароля</Heading>
          <Form apiRef={apiRef}>
            <Card>
              <Field
                label="Ваш aдрес эл. почты"
                error={usernameError(apiRef)}
                value={usernameValue(apiRef)}
                active={active.username}
                id="username"
                locked={false}
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
                error={codeError(apiRef)}
                value={codeValue(apiRef)}
                active={active.code}
                id="code"
                locked={false}
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
                  error={passwordError(apiRef)}
                  value={passwordValue(apiRef)}
                  active={active.password}
                  id="password"
                  locked={false}
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
                  error={confirmPasswordError(apiRef)}
                  value={confirmPasswordValue(apiRef)}
                  active={active.password}
                  id="confirmpassword"
                  locked={false}
                >
                  <Text
                    validateOnBlur
                    validateOnChange
                    type={confirmAttribute}
                    field="confirmpassword"
                    id="confirmpassword"
                    placeholder="Подтвердите пароль"
                    onFocus={setConfirmPasswordActive}
                    onBlur={setConfirmPasswordInactive}
                    validate={() => passwordMatch(apiRef)}
                  />
                </Field>
                <Icon onClick={toggleConfirmAttr}>
                  <FaEye />
                </Icon>
              </Flex>

              <Box>
                <OutlinedButton
                  type="button"
                  onClick={() => confirmchange(apiRef)}
                >
                  Подтвердить смену
                </OutlinedButton>
              </Box>

              <BottomSheet
                toggle={closeSheet}
                open={open}
                children={message}
                color={error ? theme.colors.red : theme.colors.primary}
              />
            </Card>
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

export default ResetPassword
