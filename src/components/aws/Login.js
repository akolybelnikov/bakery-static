import { Auth } from "aws-amplify"
import { navigate } from "gatsby"
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
import { useUserDispatch } from "../../state/user"
import { setUser } from "../../utils/auth"
import { mapError } from "../../utils/aws"
import { theme } from "../../utils/styles"
import { emptyLoginPassword, validateEmail } from "../../utils/validation"
import LoadingModal from "../loadingmodal"
import BottomSheet from "./BottomSheet"
import Field from "./Field"

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
  fontFamily: `'Roboto Slab',sans-serif`,
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

export default ({ onStateChange, setUsername }) => {
  const [attribute, setAttribute] = useState("password")
  const [active, setActive] = useState({ email: false, password: false })

  const [error, setError] = useState()
  const [open, setSheet] = useState(false)
  const [modalOpen, setModal] = useState(false)

  const apiRef = useRef()

  const dispatch = useUserDispatch()

  const showLoading = () => {
    setModal(true)
  }
  const hideLoading = () => {
    setModal(false)
  }

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

  const toggleAttr = () => {
    attribute === "password" ? setAttribute("text") : setAttribute("password")
  }

  const login = async form => {
    const {
      values: { email, password },
      errors,
    } = form.current.getState()

    if (email && password && !errors.email && !errors.password) {
      showLoading()
      try {
        await Auth.signIn(email.trim(), password.trim())
        const user = await Auth.currentAuthenticatedUser()
        const userInfo = {
          ...user.attributes,
          username: user.username,
          roles: user.signInUserSession.idToken.payload["cognito:groups"] || []
        }
        setUser(userInfo)
        dispatch({ type: "ADD_USER", user: userInfo })
        navigate("/user/profile")
        hideLoading()
      } catch (err) {
        if (err.code === "UserNotConfirmedException") {
          setUsername(email)
          onStateChange("signedUp")
        } else {
          setError(mapError(err))
          openSheet()
        }
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

  return (
    <Flex px={[2]} flexDirection="column" alignItems="center">
      <LoadingModal open={modalOpen} hideLoading={hideLoading} />
      <Heading textAlign="center" color="primary">
        Вход пользователя
      </Heading>
      <Form apiRef={apiRef}>
        <Card>
          <Field
            label="Введите свой адрес эл.почты"
            error={emailError(apiRef)}
            active={active.email}
            id="email"
            locked={false}
            value={emailValue(apiRef)}
          >
            <Text
              validateOnBlur
              validateOnChange
              autoComplete="username"
              field="email"
              id="email"
              placeholder="Введите свой адрес эл.почты"
              onFocus={setEmailActive}
              onBlur={setEmailInactive}
              validate={validateEmail}
            />
          </Field>

          <Flex>
            <Field
              label="Введите свой пароль"
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
                autoComplete="current-password"
                placeholder="Введите свой пароль"
                onFocus={setPasswordActive}
                onBlur={setPasswordInactive}
                validate={emptyLoginPassword}
              />
            </Field>
            <Icon onClick={toggleAttr}>
              <FaEye />
            </Icon>
          </Flex>

          <Box>
            <OutlinedButton type="submit" onClick={() => login(apiRef)}>
              Войти
            </OutlinedButton>
          </Box>

          <Flex mt={[4]} alignItems="center" justifyContent="space-between">
            <RebassText fontSize={[1, 2]} color="#282828;">
              Нет профиля?
            </RebassText>
            <Button variant="noOutline" onClick={() => onStateChange("signUp")}>
              Зарегистрироваться
            </Button>
          </Flex>

          <Flex mt={[2]} alignItems="center" justifyContent="space-between">
            <RebassText fontSize={[1, 2]} color="#282828;">
              Пароль утерян?{" "}
            </RebassText>
            <Button
              variant="noOutline"
              onClick={() => onStateChange("resetPassword")}
            >
              Запросить новый
            </Button>
          </Flex>

          <BottomSheet
            color={theme.colors.red}
            toggle={closeSheet}
            open={open}
            children={error}
          />
        </Card>
      </Form>
    </Flex>
  )
}
