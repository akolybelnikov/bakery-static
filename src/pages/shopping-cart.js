import { Link } from "gatsby"
import React from "react"
import { Box, Flex, Text } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { isLoggedIn } from "../utils/auth"

const ShoppingCart = ({ location }) => {
  const pageTitle = "Корзина покупателя"

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
            <Text as="h4" color="primary">{`Корзина пуста`}</Text>
            {!isLoggedIn() && (
              <Text as="h6" pt={[4]} textAlign="center" maxWidth={["80vw"]}>
                {"Если в корзине были товары – "}
                <Link to={"/auth"}>войдите</Link>
                {", чтобы посмотреть список."}
              </Text>
            )}
          </Flex>
        </Box>
      </Flex>
    </Layout>
  )
}

export default ShoppingCart
