import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import RemoveIcon from "@material-ui/icons/Remove"
import { Link } from "gatsby"
import React from "react"
import { Flex } from "rebass"
import EmptyCart from "../components/emtpy-cart"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useCartDispatch, useCartState } from "../state/cart"

const useStyles = makeStyles(theme => ({
  root: {
    marginBlockEnd: "1rem",
    display: "flex",
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
}))

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
  // Page title
  const pageTitle = "Корзина покупателя"
  // MaterialUI classes
  const classes = useStyles()
  const matches = useMediaQuery("(max-width:899px)")
  // Shopping cart store
  const dispatch = useCartDispatch()
  const shoppingCart = useCartState()
  const { products } = shoppingCart
  const calculateTotal = () =>
    products.reduce((total, item) => (total += item.total), 0)
  const totalInCart = calculateTotal()
  const totalWeight = calculateTotalWeight(products)

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
                    <Flex flexDirection="column">
                      <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5" color="primary">
                          {productName}
                        </Typography>
                        <Typography variant="caption" color="secondary">
                          {weight}. - {price} руб.
                        </Typography>
                        <Typography component="p" variant="caption">
                          {ingridients ? ingridients.internal.content : content}
                        </Typography>
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
                          justifyContent="space-between"
                          flexDirection={["column", "row"]}
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
                          <Typography color="primary">{total} руб.</Typography>
                        </Flex>
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
            justifyContent="space-around"
            my={[3]}
          >
            <Typography component="span" variant="h6" color="primary">
              Общая сумма: {totalInCart} руб.
            </Typography>
            <Typography component="span" variant="h6" color="primary">
              Общий вес: {totalWeight} гр.
            </Typography>
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
