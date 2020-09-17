import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { makeStyles, styled } from "@material-ui/core/styles"
import axios from "axios"
import { window } from "browser-monads"
import { Link } from "gatsby"
import React, { useState } from "react"
import { Box, Flex } from "rebass"
import safe from "safe-await"
import { v4 as uuidv4 } from "uuid"
import { createOrder } from "../api/api"
import EmptyCart from "../components/emtpy-cart"
import FormTransition from "../components/form-transition"
import Layout from "../components/layout"
import FormHeader from "../components/order-form-header"
import OrderResult from "../components/order-result"
import SEO from "../components/seo"
import { useCartDispatch, useCartState } from "../state/cart"
import { useUserDispatch, useUserState } from "../state/user"
import { getCurrentUser } from "../utils/auth"
import { PAGE, USER } from "../utils/utils"

const useStyles = makeStyles({
  root: {
    marginBlockEnd: "2rem",
  },
})

const Form = styled("form")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 0,
})

const makeFormData = data => {
  let formData = new FormData()
  Object.keys(data).map(key => formData.append(key, data[key]))
  return formData
}

const ProcessOrder = ({ location }) => {
  // Page title
  const pageTitle = "Оформление заказа"

  // MUI styles
  const classes = useStyles()

  // Shopping cart state
  const dispatch = useCartDispatch()
  const shoppingCart = useCartState()
  const { products } = shoppingCart
  const dispatchUser = useUserDispatch()
  const { user } = useUserState()

  // Auth user
  const loggedInUser = getCurrentUser()

  const concatItems = () =>
    products.reduce(
      (list, item, idx) =>
        `${list} ${idx !== 0 ? "/ " : " "}${item.productName} (${
          item.count
        }) - ${item.total} руб.`,
      ""
    )
  const calculateTotal = () =>
    products.reduce((total, item) => (total += item.total), 0)

  const description = concatItems()
  const amount = calculateTotal()

  // Local state
  const [currentPage, setCurrentPage] = useState(PAGE.DELIVERY)
  const [state, setState] = useState({
    _products: description,
    _username: loggedInUser.username ? loggedInUser.username : user._username,
    _name: loggedInUser.name ? loggedInUser.name : user._name,
    _replyto: loggedInUser.email ? loggedInUser.email : user._replyto,
    _phone: loggedInUser.phone_number ? loggedInUser.phone_number : user._phone,
    _address: user._address || "",
    _pickup: user._pickup || "",
    _metro: user._metro || "",
  })
  const [response, setResponse] = useState({})
  const [confirmed, setCBChecked] = useState(false)

  const handleCBChange = event => {
    setCBChecked(event.target.checked)
  }

  const showSuccessfulPurchase = async ({
    refNum,
    formattedAmount,
    paymentDate,
    email,
  }) => {
    const order = {
      ...state,
      _bankref: refNum,
      _paymentdate: paymentDate,
      _amount: formattedAmount || amount,
      _replyto: email,
      _type: PAGE.DELIVERY,
      _orderid: uuidv4(),
    }
    handleFormSubmit(order)
    // save the order to the database
    await safe(createOrder(order))
  }

  const showFailurefulPurchase = response => {
    setResponse({
      error: {
        title: response.errorMessage || "Ошибка при оплате!",
        description:
          response.actionCodeDescription ||
          "К сожалению произошла ошибка при оплате Вашего заказа. Пожалуйста, свяжитесь с нами по телефону, или попробуйте оформить заказ ещё раз позже.",
      },
    })
  }

  const showErrorPurchase = response => {
    setResponse({
      error: {
        title: response.errorMessage || "Ошибка при оплате!",
        description:
          response.actionCodeDescription ||
          "К сожалению произошла ошибка при оплате Вашего заказа. Пожалуйста, свяжитесь с нами по телефону, или попробуйте оформить заказ ещё раз позже.",
      },
    })
  }

  const checkout = () => {
    ipayCheckout(amount, description)
  }

  const ipayCheckout = (amount, description) => {
    window.ipayCheckout(
      {
        amount,
        currency: "RUB",
        order_number: "",
        description,
      },
      function(order) {
        showSuccessfulPurchase(order)
      },
      function(err) {
        showFailurefulPurchase(err)
      },
      function(err) {
        showErrorPurchase(err)
      }
    )
  }

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
    switch (e.target.name) {
      case USER.NAME:
        dispatchUser({ type: "ADD_NAME", _name: e.target.value })
        break
      case USER.ADDRESS:
        dispatchUser({ type: "ADD_ADDRESS", _address: e.target.value })
        break
      case USER.EMAIL:
        dispatchUser({ type: "ADD_EMAIL", _replyto: e.target.value })
        break
      case USER.PHONE:
        dispatchUser({ type: "ADD_PHONE", _phone: e.target.value })
        break
      case USER.PICKUP:
        dispatchUser({ type: "ADD_PICKUP", _pickup: e.target.value })
        break
      case USER.METRO:
        dispatchUser({ type: "ADD_METRO", _metro: e.target.value })
        break
      default:
        break
    }
  }

  const handleFormSubmit = async orderdata => {
    const order =
      currentPage === PAGE.DELIVERY
        ? orderdata
        : {
            ...state,
            _type: PAGE.PICK_UP,
            _orderid: uuidv4(),
          }
    // handle user form submission
    const data = makeFormData(order)

    const [FSerror, FSsuccess] = await safe(
      axios({
        method: "post",
        headers: {
          Accept: "application/json",
        },
        url: `${process.env.GATSBY_FORMSPREE}`,
        data,
      })
    )

    if (FSerror) {
      setResponse({
        error: {
          title:
            currentPage === PAGE.PICK_UP
              ? "Ошибка подтверждения!"
              : "Спасибо за заказ!",
          description:
            currentPage === PAGE.PICK_UP
              ? "К сожалению произошла ошибка при отправке подтверждения. Пожалуйста, свяжитесь с нами по телефону, или попробуйте оформить заказ ещё раз позже."
              : "Ваш платёж принят, но произошла ошибка при отправке подтверждения. Для того, чтобы уточнить условия доставки, с Вами в ближайшее время свяжется наш менеджер.",
        },
      })
      if (currentPage !== PAGE.PICK_UP) {
        dispatch({ type: "EMPTY_CART" })
      }
    } else if (FSsuccess) {
      setResponse({
        success: {
          title: "Спасибо за заказ!",
          description:
            currentPage === PAGE.PICK_UP
              ? "Ваш заказ принят."
              : "Ваш заказ принят. Для того, чтобы уточнить условия доставки, с Вами в ближайшее время свяжется наш менеджер.",
        },
      })
      // empty the cart
      dispatch({ type: "EMPTY_CART" })
      // save the order to the database
      if (currentPage === PAGE.PICK_UP) {
        await safe(createOrder(order))
      }
    }
  }

  //   const cleanUpIPay = () => {
  //     const iframe = document.getElementsByTagName("iframe")[0]
  //     const style = document.body.getAttribute("style")
  //     setTimeout(() => {
  //       if (iframe) {
  //         document.body.removeChild(iframe)
  //       }
  //       if (style) {
  //         document.body.removeAttribute("style")
  //       }
  //       window.removeEventListener("message", window.closeModal)
  //     }, 2000)
  //   }

  const invalid = () =>
    currentPage === PAGE.DELIVERY
      ? !state._address ||
        !state._metro ||
        !state._name ||
        !state._phone ||
        !confirmed
      : !state._pickup ||
        !state._replyto ||
        !state._name ||
        !state._phone ||
        !confirmed

  const buttonDisabled = invalid()

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      {response.error || response.success ? (
        <OrderResult
          error={response.error}
          title={response.error ? response.error.title : response.success.title}
          description={
            response.error
              ? response.error.description
              : response.success.description
          }
        />
      ) : products.length ? (
        <Flex
          flexDirection="column"
          justifyItems="center"
          justifyContent="center"
          alignItems="center"
          minHeight={["50vh"]}
        >
          <Form>
            <FormHeader
              setPage={setCurrentPage}
              handleChange={handleChange}
              currentPage={currentPage}
            />
            <FormTransition
              handleChange={handleChange}
              currentPage={currentPage}
            />
          </Form>
          <Box pb={[4]}>
            <Link to="/delivery">Условия оплаты и доставки</Link>
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={confirmed}
                onChange={handleCBChange}
                name="confirmed"
                color="primary"
              />
            }
            label="Условия оплаты и доставки подтверждаю"
            classes={{ root: classes.root }}
          />
          <Button
            onClick={
              currentPage === PAGE.DELIVERY ? checkout : handleFormSubmit
            }
            color="primary"
            variant="contained"
            disabled={buttonDisabled}
          >
            {currentPage === PAGE.DELIVERY
              ? "Оплатить заказ"
              : "Отправить заказ"}
          </Button>
        </Flex>
      ) : (
        <EmptyCart />
      )}
    </Layout>
  )
}

export default ProcessOrder
