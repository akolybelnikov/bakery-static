import { Auth } from "aws-amplify"
import { navigate } from "gatsby"
import { Form, Text } from "informed"
import React, { useState } from "react"
import { Box, Button, Card, Flex, Heading } from "rebass"

export default ({ onStateChange, authState }) => {
  const [attribute, setAttribute] = useState("password")
  const [username, setUsername] = useState()

  console.log(authState)

  const toggleAttr = () => {
    attribute === "password" ? setAttribute("text") : setAttribute("password")
  }

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
    <Box>
      {authState === "signUp" && (
        <>
          <Heading color="primary">Регистрация пользователя</Heading>
          <Form>
            {({ formState }) => {
              return (
                <Card>
                  <Box>
                    <label htmlFor="email">Адрес эл. почты</label>
                    <Text
                      required
                      field="email"
                      id="email"
                      placeholder="Введите свой адрес эл.почты"
                    />
                  </Box>

                  <Box>
                    <label htmlFor="password">Пароль</label>
                    <Text
                      required
                      type="password"
                      field="password"
                      id="password"
                      placeholder="Введите свой пароль"
                    />
                  </Box>

                  <Box>
                    <label htmlFor="name">Ваше имя</label>
                    <Text
                      required
                      field="name"
                      id="name"
                      placeholder="Как нам к Вам обращаться?"
                    />
                  </Box>

                  <Box>
                    <label htmlFor="phone_number">Ваш номер телефона</label>
                    <Text
                      required
                      field="phone_number"
                      id="phone_number"
                      placeholder="например: +79261234567"
                    />
                  </Box>

                  <Flex flexWrap="wrap">
                    <Box>
                      <Button
                        variant="primary"
                        onClick={() => signup(formState)}
                      >
                        Зарегистрироваться
                      </Button>
                    </Box>
                    <Box>
                      <span>Зарегистрированы?</span>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={() => onStateChange("signIn")}
                      >
                        Войти
                      </Button>
                    </Box>
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
                  <Box>
                    <label htmlFor="username">Адрес эл. почты</label>
                    <Text
                      required
                      field="username"
                      id="username"
                      placeholder="Введите свой адрес эл.почты"
                    />
                  </Box>
                  <Box>
                    <label htmlFor="code">Код подтверждения</label>
                    <Text
                      required
                      type="text"
                      field="code"
                      id="code"
                      placeholder="Введите код"
                    />
                  </Box>
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
    </Box>
  )
}
