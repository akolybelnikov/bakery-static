import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import RemoveIcon from "@material-ui/icons/Remove"
import { Link, navigate } from "gatsby"
import React from "react"
import { Flex } from "rebass"
import EmptyCart from "../components/emtpy-cart"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useCartDispatch, useCartState } from "../state/cart"
import { isLoggedIn } from "../utils/auth"
import { theme as customTheme } from "../utils/styles"

const useStyles = makeStyles(theme => ({
  root: {
    marginBlockEnd: "1rem",
    display: "flex",
    minWidth: "100%",
    justifyContent: "space-between",
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
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 150,
    height: 150,
    minHeight: 150,
    minWidth: 150,
  },
  discount: {
    flexBasis: "60%",
  },
  discountButton: {
    marginBlockEnd: "1rem",
  },
  strikedThrough: {
    textDecoration: "line-through",
    textDecorationColor: "red",
  },
}))

const DiscountButton = withStyles(theme => ({
  root: {
    color: customTheme.colors.primary,
    backgroundColor: customTheme.colors.secondary,
    "&:hover": {
      backgroundColor: customTheme.colors.secondaryWashed,
    },
  },
}))(Button)

let regexp = /[0-9]{1,5}/g

const parseWeight = weight => {
  const matches = weight.matchAll(regexp)
  let reduced = Array.from(matches).reduce((acc, curr) => [...acc, ...curr], [])
  if (!reduced.length || !weight.includes("гр")) return
  if (reduced.length === 1) return Number(reduced[0])
  if (weight.includes("*")) return Number(reduced[0]) * Number(reduced[1])
  return
}

const calculateTotalWeight = products =>
  products.reduce(
    (total, product) =>
      (total += parseWeight(product.weight) * product.count || 0),
    0
  )

const ShoppingCart = ({ location }) => {
  const isUserLoggedIn = isLoggedIn()
  // Shopping cart store
  const dispatch = useCartDispatch()
  const shoppingCart = useCartState()
  // Page title
  const pageTitle = "Корзина покупателя"
  // MaterialUI classes
  const classes = useStyles()
  const matches = useMediaQuery("(max-width:767px)")
  const { products, discounted } = shoppingCart
  const calculateTotal = () =>
    products.reduce((total, item) => (total += item.total), 0)
  const totalInCart = calculateTotal()
  const totalWeight = calculateTotalWeight(products)
  const appliedDiscount = amount => ((amount / 100) * 90).toFixed(2)
  const withDiscount = appliedDiscount(totalInCart)

  const applyDiscount = () => {
    isUserLoggedIn ? dispatch({ type: "APPLY_DISCOUNT" }) : navigate("/auth")
  }

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      {products.length ? (
        <Flex
          flexDirection="column"
          justifyItems="center"
          justifyContent="flex-start"
          alignItems="center"
          minHeight={["50vh"]}
        >
          <>
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
                  <Card className={classes.root} key={i}>
                    <Flex flexDirection="column" flexGrow={[1]}>
                      <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5" color="primary">
                          {productName}
                        </Typography>
                        <Typography variant="caption" color="secondary">
                          {weight}. - {price} руб.
                        </Typography>
                        {!matches && (
                          <Typography component="p" variant="caption">
                            {ingridients
                              ? ingridients.internal.content
                              : content}
                          </Typography>
                        )}
                      </CardContent>
                      <Flex
                        p={[2, 3]}
                        justifyContent={["center", "space-between"]}
                        alignContent={["center"]}
                        alignItems="center"
                        flexDirection={["column", "row"]}
                      >
                        <Flex
                          alignItems="center"
                          width={[1, 1 / 2]}
                          justifyItems="flex-start"
                        >
                          <ButtonGroup
                            size={"small"}
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
                        </Flex>
                        <Flex
                          //flexDirection={["column", "row"]}
                          justifyContent={[
                            "space-between",
                            "space-around",
                            "space-between",
                          ]}
                          alignItems={["center"]}
                          width={[1]}
                        >
                          <Typography color="primary">{total} руб.</Typography>
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
                        </Flex>
                      </Flex>
                    </Flex>
                    <CardMedia
                      image={image.fluid.src}
                      className={classes.cover}
                    />
                  </Card>
                )
              }
            )}
          </>
          <Flex
            width={[1]}
            flexDirection={["column", "row"]}
            justifyContent="space-between"
            my={[3]}
          >
            <Typography
              className={discounted ? classes.strikedThrough : ""}
              component="span"
              variant="h6"
              color="primary"
            >
              Общая сумма: {totalInCart} руб.
            </Typography>
            <Typography component="span" variant="h6" color="primary">
              Общий вес: {totalWeight} гр.
            </Typography>
          </Flex>
          {discounted && (
            <Flex justifyContent="flex-start" width={[1]} mb={[3]}>
              <Typography component="span" variant="h6" color="secondary">
                Общая сумма: {withDiscount} руб.
              </Typography>
            </Flex>
          )}
          <Flex
            justifyContent={isUserLoggedIn ? "flex-start" : "space-between"}
            flexDirection={["column", "row"]}
            width={[1]}
            mb={[3]}
          >
            <DiscountButton
              color="primary"
              variant="contained"
              disabled={discounted}
              onClick={applyDiscount}
              className={matches ? classes.discountButton : ""}
            >
              {!isUserLoggedIn
                ? "Получить скидку"
                : !discounted
                ? "Приложить скидку 10%"
                : "Скидка приложена"}
            </DiscountButton>
            {!isUserLoggedIn && (
              <Typography
                component="p"
                className={classes.discount}
                color="secondary"
              >
                Стань постоянным покупателем и получи скидку 10% на всю
                продукцию.
              </Typography>
            )}
          </Flex>
          <Flex justifyContent="center" mt={[3]}>
            <Link to="/process-order">
              <Button color="primary" variant="contained">
                Оформить заказ
              </Button>
            </Link>
          </Flex>
        </Flex>
      ) : (
        <EmptyCart />
      )}
    </Layout>
  )
}

export default ShoppingCart
