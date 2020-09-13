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
import { PAGE } from "../utils/utils"

const makeFormData = data => {
  let formData = new FormData()
  Object.keys(data).map(key => formData.append(key, data[key]))
  return formData
}

const ProcessOrder = ({ location }) => {
  // Page title
  const pageTitle = "Оформление заказа"
  const [currentPage, setCurrentPage] = useState(PAGE.DELIVERY)

  // Shopping cart state
  const dispatch = useCartDispatch()
  const shoppingCart = useCartState()
  const { products } = shoppingCart

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
  const [state, setState] = useState({
    products: description,
  })
  const [error, setError] = useState(null)
  const [confirmation, setConfirmation] = useState(false)

  const showSuccessfulPurchase = order => {
    handleFormSubmit(order)
  }
  const showFailurefulPurchase = error => {
    setError(error)
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
      function(order) {
        showFailurefulPurchase(order)
      }
    )
  }

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = ({ refNum, formattedAmount, paymentDate }) => {
    const data =
      currentPage === PAGE.DELIVERY
        ? makeFormData({
            ...state,
            "bank-ref": refNum,
            "payment-date": paymentDate,
            "order-amount": formattedAmount || amount,
            type: PAGE.DELIVERY,
          })
        : makeFormData({
            ...state,
            type: PAGE.PICK_UP,
          })
    
    axios({
      method: "post",
      url: `${process.env.GATSBY_FORMSPREE}`,
      data,
    })
      .then(() => {
        setConfirmation(true)
        dispatch({ type: "EMPTY_CART" })
        const iframe = document.getElementsByTagName("iframe")[0]
        if (iframe) {
          setTimeout(() => {
            document.body.removeChild(iframe)
            document.body.getAttribute("style")
            document.body.removeAttribute("style")
            window.removeEventListener("message", window.closeModal)
          }, 3000)
        }
      })
      .catch(error => console.error(error))
  }

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      {confirmation ? (
        <OrderResult
          title={error ? "Error" : "Success"}
          description={error ? "An error occured" : "Thank you for your order"}
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
