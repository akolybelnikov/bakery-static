import { Link } from "gatsby"
import React from "react"
import { Box, Flex, Text } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useCartDispatch, useCartState } from "../state/cart"
import { isLoggedIn } from "../utils/auth"

const ShoppingCart = ({ location }) => {
  const pageTitle = "Корзина покупателя"
  const shoppingCart = useCartState()
  const { products } = shoppingCart
  const dispatch = useCartDispatch()

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
        </Box>
      </Flex>
    </Layout>
  )
}

export default ShoppingCart
