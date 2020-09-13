import axios from "axios"
import { document, window } from "browser-monads"
import React, { useState } from "react"
import { Flex } from "rebass"
import EmptyCart from "../components/emtpy-cart"
import FormTransition from "../components/form-transition"
import Layout from "../components/layout"
import FormHeader from "../components/order-form-header"
import OrderResult from "../components/order-result"
import SEO from "../components/seo"
import { useCartDispatch, useCartState } from "../state/cart"
import { useUserState, useUserDispatch } from "../state/user"
import { PAGE, USER } from "../utils/utils"

const makeFormData = data => {
  let formData = new FormData()
  Object.keys(data).map(key => formData.append(key, data[key]))
  return formData
}

const ProcessOrder = ({ location }) => {
  // Page title
  const pageTitle = "Оформление заказа"

  // Shopping cart state
  const dispatch = useCartDispatch()
  const shoppingCart = useCartState()
  const { products } = shoppingCart
  const dispatchUser = useUserDispatch()
  const { user } = useUserState()

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
    products: description,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    pickup: user.pickup,
  })
  const [response, setResponse] = useState({})

  const showSuccessfulPurchase = order => {
    handleFormSubmit(order)
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
        dispatchUser({ type: "ADD_NAME", name: e.target.value })
        break
      case USER.ADDRESS:
        dispatchUser({ type: "ADD_ADDRESS", address: e.target.value })
        break
      case USER.EMAIL:
        dispatchUser({ type: "ADD_EMAIL", email: e.target.value })
        break
      case USER.PHONE:
        dispatchUser({ type: "ADD_PHONE", phone: e.target.value })
        break
      case USER.PICKUP:
        dispatchUser({ type: "ADD_PICKUP", pickup: e.target.value })
        break
      default:
        break
    }
  }

  const handleFormSubmit = ({
    refNum,
    formattedAmount,
    paymentDate,
    email,
  }) => {
    const data =
      currentPage === PAGE.DELIVERY
        ? makeFormData({
            ...state,
            "bank-ref": refNum,
            "payment-date": paymentDate,
            "order-amount": formattedAmount || amount,
            email: email,
            type: PAGE.DELIVERY,
          })
        : makeFormData({
            ...state,
            type: PAGE.PICK_UP,
          })

    axios({
      method: "post",
      headers: {
        Accept: "application/json",
      },
      url: `${process.env.GATSBY_FORMSPREE}`,
      data,
    })
      .then(() => {
        setResponse({
          success: {
            title: "Спасибо за заказ!",
            description: "Ваш заказ принят",
          },
        })
        dispatch({ type: "EMPTY_CART" })
        cleanUpIPay()
      })
      .catch(error => {
        setResponse({
          error: {
            title: "Ошибка подтверждения!",
            description:
              currentPage === PAGE.PICK_UP
                ? "К сожалению произошла ошибка при отправке подтверждения. Пожалуйста, свяжитесь с нами по телефону, или попробуйте оформить заказ ещё раз позже."
                : "Ваш платёж принят, но произошла ошибка при отправке подтверждения. Пожалуйста, свяжитесь с нами по телефону во избежание недоразумения.",
          },
        })
        if (currentPage !== PAGE.PICK_UP) {
          dispatch({ type: "EMPTY_CART" })
        }
      })
  }

  const cleanUpIPay = () => {
    const iframe = document.getElementsByTagName("iframe")[0]
    const style = document.body.getAttribute("style")
    setTimeout(() => {
      if (iframe) {
        document.body.removeChild(iframe)
      }
      if (style) {
        document.body.removeAttribute("style")
      }
      window.removeEventListener("message", window.closeModal)
    }, 2000)
  }

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
          justifyItems="flex-start"
          justifyContent="center"
          alignItems="center"
        >
          <FormHeader
            setPage={setCurrentPage}
            handleChange={handleChange}
            currentPage={currentPage}
          />
          <FormTransition
            checkout={checkout}
            handleChange={handleChange}
            currentPage={currentPage}
            sendOrder={handleFormSubmit}
            pickUpFormInvalid={
              !state.name ||
              !state.phone ||
              !state.pickup ||
              state.pickup.length < 10
            }
            orderFormInvalid={
              !state.name ||
              !state.phone ||
              !state.address ||
              state.address.length < 10
            }
          />
        </Flex>
      ) : (
        <EmptyCart />
      )}
    </Layout>
  )
}

export default ProcessOrder
