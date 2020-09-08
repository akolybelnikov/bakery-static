import React from "react"
import TopLayout from "./src/config/TopLayout"
import { CartProvider } from "./src/state/cart"

export const wrapRootElement = ({ element }) => {
  return (
    <TopLayout>
      <CartProvider>{element}</CartProvider>
    </TopLayout>
  )
}
