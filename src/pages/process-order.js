//import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
// import ButtonGroup from "@material-ui/core/ButtonGroup"
// import Divider from "@material-ui/core/Divider"
// import IconButton from "@material-ui/core/IconButton"
// import List from "@material-ui/core/List"
// import ListItem from "@material-ui/core/ListItem"
// import ListItemAvatar from "@material-ui/core/ListItemAvatar"
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
// import ListItemText from "@material-ui/core/ListItemText"
// import { makeStyles } from "@material-ui/core/styles"
//import Typography from "@material-ui/core/Typography"
// import useMediaQuery from "@material-ui/core/useMediaQuery"
// import AddIcon from "@material-ui/icons/Add"
// import CakeIcon from "@material-ui/icons/Cake"
// import DeleteIcon from "@material-ui/icons/Delete"
// import RemoveIcon from "@material-ui/icons/Remove"
import { window, document } from "browser-monads"
import { Link } from "gatsby"
import React, { useState } from "react"
import { Flex, Text } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useCartDispatch, useCartState } from "../state/cart"
import { isLoggedIn } from "../utils/auth"
// import { theme } from "../utils/styles"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

// const options = {
//   api_token: process.env.GATSBY_SBERBANK_API,
//   language: "en",
//   classNamePreloader: "payment-preloader",
//   preloadBorderColor: theme.colors.primary,
// }

// window.IPAY(options)

// const useStyles = makeStyles(theme => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//   },
//   buttongroup: {
//     paddingBlockEnd: `.5rem`,
//   },
//   weight: {
//     maxWidth: `80%`,
//   },
//   image: {
//     minWidth: "100px",
//     minHeight: "100px",
//   },
//   secondary: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   multiline: {
//     paddingInline: "1rem",
//   },
// }))

const ProcessOrder = ({ location }) => {
  // Page title
  const pageTitle = "Оформление заказа"
  // MaterialUI classes
  //   const classes = useStyles()
  //   const matches = useMediaQuery("(max-width:899px)")
  // Shopping cart store
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
  const [state, setState] = useState({ products: description })
  const [confirmation, setConfirmation] = useState(false)
  const [error, setError] = useState(false)

  const showSuccessfulPurchase = () => {
    dispatch({ type: "EMPTY_CART" })
    handleFormSubmit()
  }
  const showFailurefulPurchase = order => {
    console.log(order)
    setError(true)
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
        // setState({
        //   ...state,
        //   refNum: order.refNum,
        //   paymentDate: order.paymentDate,
        //   email: order.email,
        //   amount: order.amount,
        // })
        showSuccessfulPurchase()
      },
      function(order) {
        showFailurefulPurchase(order)
      }
    )
  }

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = () => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...state,
      }),
    })
      .then(() => {
        setConfirmation(true)
        const iframe = document.getElementsByTagName("iframe")[0]
        document.body.removeChild(iframe)
        document.body.getAttribute("style")
        document.body.removeAttribute("style")
        window.removeEventListener("message", window.closeModal)
      })
      .catch(error => console.error(error))
  }

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      {!products.length && !confirmation ? (
        <Flex
          flexDirection="column"
          justifyItems="center"
          justifyContent="center"
          alignItems="center"
          minHeight={["50vh"]}
        >
          <Text as="h4" color="primary">{`Корзина пуста`}</Text>
          {isLoggedIn() ? null : (
            <Text as="h6" pt={[4]} textAlign="center" maxWidth={["80vw"]}>
              {"Если в корзине были товары – "}
              <Link to={"/auth"}>войдите</Link>
              {", чтобы посмотреть список."}
            </Text>
          )}
        </Flex>
      ) : !confirmation ? (
        <Flex
          flexDirection="column"
          justifyItems="center"
          justifyContent="center"
          alignItems="center"
          minHeight={["50vh"]}
        >
          <form
            name="contact"
            method="post"
            action="/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="products" value="description" />
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="bot-field" onChange={handleChange} />
              </label>
            </p>
            <p>
              <label>
                Your name:
                <br />
                <input type="text" name="name" onChange={handleChange} />
              </label>
            </p>
            <p>
              <label>
                Your email:
                <br />
                <input type="email" name="email" onChange={handleChange} />
              </label>
            </p>
            <p>
              <label>
                Message:
                <br />
                <textarea name="message" onChange={handleChange} />
              </label>
            </p>
            <Button onClick={checkout} color="secondary" variant="contained">
              Оформить заказ
            </Button>
          </form>
        </Flex>
      ) : !error ? (
        <Flex
          flexDirection="column"
          justifyItems="center"
          justifyContent="center"
          alignItems="center"
          minHeight={["50vh"]}
        >
          <h1>Thank you!</h1>
          <p>This is a custom thank you page for form submissions</p>
        </Flex>
      ) : (
        <Flex
          flexDirection="column"
          justifyItems="center"
          justifyContent="center"
          alignItems="center"
          minHeight={["50vh"]}
        >
          <h1>Error</h1>
          <p>This is a custom error page.</p>
        </Flex>
      )}
    </Layout>
  )
}

export default ProcessOrder
