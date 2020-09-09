import { Link } from "gatsby"
import React from "react"
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

const ShoppingCart = ({ location }) => {
  const pageTitle = "Корзина покупателя"
  const shoppingCart = useCartState()
  const { products } = shoppingCart
  const dispatch = useCartDispatch()

  window.IPAY(options)

  const checkout = () =>
    window.ipayCheckout(
      {
        amount: 499.99,
        currency: "RUB",
        order_number: "",
        description: "Н. В. Гоголь. Вечера на хуторе близ Диканьки",
      },
      function(order) {
        window.showSuccessfulPurchase(order)
      },
      function(order) {
        window.showFailurefulPurchase(order)
      }
    )

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
            {products.map((product, i) => {
              return (
                <p
                  key={i}
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_PRODUCT",
                      productName: product.productName,
                    })
                  }
                >
                  {product.productName} - {product.count}
                </p>
              )
            })}
          </Flex>

          <button
            onClick={checkout}
            className="btn btn-xs btn-outline btn-primary"
          >
            Купить
          </button>
        </Box>
      </Flex>
    </Layout>
  )
}

export default ShoppingCart
