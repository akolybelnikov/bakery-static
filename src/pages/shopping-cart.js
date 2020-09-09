import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import AddIcon from "@material-ui/icons/Add"
import CakeIcon from "@material-ui/icons/Cake"
import DeleteIcon from "@material-ui/icons/Delete"
import RemoveIcon from "@material-ui/icons/Remove"
import { window } from "browser-monads"
import { Link } from "gatsby"
import React, { Fragment } from "react"
import { Box, Flex, Text } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useCartDispatch, useCartState } from "../state/cart"
import { isLoggedIn } from "../utils/auth"

const options = {
  api_token: "YRF3C5RFICWISEWFR6GJ",
  language: "en",
  classNamePreloader: "payment-preloader",
  preloadBorderColor: "#13a024",
}

window.IPAY(options)

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  buttongroup: {
    paddingBlockEnd: `.5rem`,
  },
  weight: {
    maxWidth: `80%`,
  },
  image: {
    minWidth: "100px",
    minHeight: "100px",
  },
  secondary: {
    display: "flex",
    flexDirection: "column",
  },
  multiline: {
    paddingInline: "1rem",
  },
}))

const ShoppingCart = ({ location }) => {
  // Page title
  const pageTitle = "Корзина покупателя"
  // MaterialUI classes
  const classes = useStyles()
  const matches = useMediaQuery("(max-width:899px)")
  // State
  const shoppingCart = useCartState()
  const { products } = shoppingCart
  const dispatch = useCartDispatch()

  const calculateTotal = () =>
    products.reduce((total, item) => (total += item.total), 0)
  const concatItems = () =>
    products.reduce(
      (list, item, idx) =>
        `${list} ${idx !== 0 ? "/ " : " "}${item.productName} (${
          item.count
        }) - ${item.total} руб.`,
      ""
    )

  const showSuccessfulPurchase = order => console.log(order)
  const showFailurefulPurchase = order => console.log(order)

  const checkout = () => {
    const amount = calculateTotal(),
      description = concatItems()
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

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      <Flex
        flexDirection="column"
        justifyItems="center"
        justifyContent="center"
        alignItems="center"
        minHeight={["50vh"]}
      >
        <Box width={[1]}>
          <Flex
            flexDirection="column"
            justifyItems="center"
            justifyContent="center"
            alignItems="center"
          >
            {!products.length && (
              <Text as="h4" color="primary">{`Корзина пуста`}</Text>
            )}
            {!isLoggedIn() && !products.length && (
              <Text as="h6" pt={[4]} textAlign="center" maxWidth={["80vw"]}>
                {"Если в корзине были товары – "}
                <Link to={"/auth"}>войдите</Link>
                {", чтобы посмотреть список."}
              </Text>
            )}
            <List className={classes.root}>
              {products.map(
                (
                  {
                    productName,
                    weight,
                    ingridients,
                    price,
                    count,
                    image,
                    total,
                    content,
                  },
                  i
                ) => {
                  return (
                    <Fragment key={i}>
                      <ListItem
                        alignItems="flex-start"
                        color="primary"
                        classes={{}}
                      >
                        <ListItemAvatar>
                          <Avatar
                            variant="square"
                            src={image.fluid.srcWebp}
                            srcSet={image.fluid.srcSetWebp}
                            sizes={image.fluid.sizes}
                            classes={{ square: classes.image }}
                          >
                            <CakeIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          component="div"
                          classes={{
                            secondary: classes.secondary,
                            multiline: classes.multiline,
                          }}
                          primary={
                            <Flex justifyContent="space-between">
                              <Typography color="primary">
                                {productName}
                              </Typography>
                            </Flex>
                          }
                          secondary={
                            <Fragment>
                              <Typography
                                component="span"
                                variant="caption"
                                color="secondary"
                              >
                                {weight}. - {price} руб.
                              </Typography>
                              {ingridients ? (
                                <Typography component="span" variant="caption">
                                  {ingridients.internal.content}
                                </Typography>
                              ) : (
                                <Typography component="span" variant="caption">
                                  {content}
                                </Typography>
                              )}
                              <Flex
                                flexDirection={["column", "row"]}
                                alignItems={["flex-start", "center"]}
                                justifyContent="space-between"
                                pt={[2]}
                              >
                                <ButtonGroup
                                  size="small"
                                  color="primary"
                                  aria-label="small outlined button group"
                                  classes={{
                                    root: matches ? classes.buttongroup : "",
                                  }}
                                >
                                  <Button
                                    variant="outlined"
                                    onClick={() =>
                                      dispatch({
                                        type: "DECREASE_QUANTITY",
                                        productName,
                                        price,
                                      })
                                    }
                                  >
                                    <RemoveIcon />
                                  </Button>
                                  <Button>{count}</Button>
                                  <Button
                                    variant="outlined"
                                    onClick={() =>
                                      dispatch({
                                        type: "INCREASE_QUANTITY",
                                        productName,
                                        price,
                                      })
                                    }
                                  >
                                    <AddIcon />
                                  </Button>
                                </ButtonGroup>
                                <Typography color="primary">
                                  {total} руб.
                                </Typography>
                              </Flex>
                            </Fragment>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            color="secondary"
                            edge="end"
                            onClick={() =>
                              dispatch({
                                type: "REMOVE_PRODUCT",
                                productName,
                              })
                            }
                            aria-label="remove product"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {i < products.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </Fragment>
                  )
                }
              )}
            </List>
          </Flex>
          {!products.length ? null : (
            <Flex justifyContent="center" pt={[3]}>
              <Button onClick={checkout} color="primary" variant="contained">
                Оформить заказ
              </Button>
            </Flex>
          )}
        </Box>
      </Flex>
    </Layout>
  )
}

export default ShoppingCart
