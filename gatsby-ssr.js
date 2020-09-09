import React from "react"
import TopLayout from "./src/config/TopLayout"
import { CartProvider } from "./src/state/cart"

const HeadComponents = [
  <script
    key="fetch-ipay"
    src="https://3dsec.sberbank.ru/payment/docsite/assets/js/ipay.js"
  />,
]

export const wrapRootElement = ({ element }) => {
  return (
    <TopLayout>
      <CartProvider>{element}</CartProvider>
    </TopLayout>
  )
}

export const onRenderBody = (
  { setHeadComponents },
  pluginOptions
) => {
  setHeadComponents(HeadComponents)
}
