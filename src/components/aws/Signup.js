import { Auth } from "aws-amplify"
import { navigate, Link } from "gatsby"
import { Form, Text } from "informed"
import React, { useRef, useState } from "react"
import { FaEye } from "react-icons/fa"
import {
  Box,
  Button as RebassButton,
  Card as RebassCard,
  Flex,
  Heading,
  Text as RebassText,
} from "rebass"
import styled from "styled-components"
import { mapError } from "../../utils/aws"
import { theme } from "../../utils/styles"
import {
  emptyCode,
  emptyName,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
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
  max-width: 450px;
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

const Signin = styled(Flex)`
  border-block-end: 4px dotted ${props => props.theme.colors.secondary};
`

const SignUp = ({ onStateChange, authState, username, setUsername }) => {
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
    } = form.current.getState()
    if (
      !errors.email &&
      !errors.password &&
      !errors.name &&
      !errors.phone_number
    ) {
      showLoading()
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
        hideLoading()
      } catch (err) {
        setError(true)
        setMessage(mapError(err))
        openSheet()
        hideLoading()
      }
    }
  }

  const confirmSignUp = async form => {
    const {
      values: { username, code },
      errors,
    } = form.current.getState()
    if (username && code && !errors.username && !errors.code) {
      showLoading()
      try {
        await Auth.confirmSignUp(username.trim(), code.trim())
        navigate("/user/profile")
        hideLoading()
      } catch (err) {
        setError(true)
        setMessage(mapError(err))
        openSheet()
        hideLoading()
      }
    }
  }

  const resendCode = async form => {
    const {
      values: { username },
      errors,
    } = form.current.getState()
    if (username && !errors.username) {
      showLoading()
      try {
        await Auth.resendSignUp(username.trim())
        setMessage(
          "Мы выслали код подтверждения на Ваш адрес. Код действителен 24 часа."
        )
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

  const phoneNumberError = apiRef =>
    apiRef.current && apiRef.current.getState().errors.phone_number

  const phoneNumberValue = apiRef =>
    apiRef.current && apiRef.current.getState().values.phone_number

  const nameError = apiRef =>
    apiRef.current && apiRef.current.getState().errors.name

  const nameValue = apiRef =>
    apiRef.current && apiRef.current.getState().values.name

  return (
    <Flex
      style={{ position: "relative" }}
      px={[2]}
      flexDirection="column"
      alignItems="center"
    >
      <LoadingModal open={modalOpen} hideLoading={hideLoading} />
      {authState === "signUp" && (
        <>
          <Heading py={[4]} color="primary">
            Регистрация пользователя
          </Heading>
          <Form apiRef={apiRef}>
            <Card>
              <Field
                label="Aдрес эл.почты"
                error={emailError(apiRef)}
                value={emailValue(apiRef)}
                active={active.email}
                id="email"
                locked={false}
              >
                <Text
                  validateOnBlur
                  validateOnChange
                  autoComplete="username"
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
                  error={passwordError(apiRef)}
                  active={active.password}
                  id="password"
                  locked={false}
                  value={passwordValue(apiRef)}
                >
                  <Text
                    validateOnBlur
                    validateOnChange
                    type={attribute}
                    field="password"
                    id="password"
                    placeholder="Пароль"
                    autoComplete="current-password"
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
                error={nameError(apiRef)}
                active={active.name}
                id="name"
                locked={false}
                value={nameValue(apiRef)}
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
                error={phoneNumberError(apiRef)}
                active={active.phone_number}
                id="phone_number"
                locked={false}
                value={phoneNumberValue(apiRef)}
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
                <OutlinedButton onClick={() => signup(apiRef)}>
                  Зарегистрироваться
                </OutlinedButton>
              </Box>

              <Signin
                mb={[2]}
                pb={[2]}
                justifyContent="space-between"
                alignItems="center"
              >
                <RebassText fontSize={[1, 2]} color="#282828;">
                  Зарегистрированы?
                </RebassText>
                <Button type="button" onClick={() => onStateChange("signIn")}>
                  Войти
                </Button>
              </Signin>

              <BottomSheet
                toggle={closeSheet}
                open={open}
                children={message}
                color={error ? theme.colors.red : theme.colors.primary}
              />
              <RebassText fontSize={["12px", "14px"]} color="#282828;">
                * Заполняя данную форму, Вы выражаете свое согласие с нашей
                политикой обработки персональных данных
              </RebassText>
              <RebassText py={1} width={1} fontSize={["12px", "14px"]}>
                <Link aria-label="Privacy policy" to={`/privacy`}>
                  Ознакомиться
                </Link>
              </RebassText>
            </Card>
          </Form>
        </>
      )}
      {authState === "signedUp" && (
        <>
          <Heading color="primary">Подтвердить регистрацию</Heading>
          <Form apiRef={apiRef}>
            <Card>
              <Field
                label="Ваш aдрес эл. почты"
                error={usernameError(apiRef)}
                active={active.username}
                id="username"
                locked={false}
                value={usernameValue(apiRef)}
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
                error={codeError(apiRef)}
                active={active.code}
                id="code"
                locked={false}
                value={codeValue(apiRef)}
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
                  onClick={() => confirmSignUp(apiRef)}
                >
                  Подтвердить
                </OutlinedButton>
              </Box>

              <Flex alignItems="center" justifyContent="space-between">
                <span>Код утерян? </span>
                <Button
                  ml={[1]}
                  type="button"
                  onClick={() => resendCode(apiRef)}
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
          </Form>
        </>
      )}
    </Flex>
  )
}

export default SignUp
