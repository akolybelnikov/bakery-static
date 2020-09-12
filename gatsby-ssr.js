import React from "react"
import TopLayout from "./src/config/TopLayout"
import { CartProvider } from "./src/state/cart"
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const HeadComponents = [
  <script
    key="fetch-ipay"
    src="https://3dsec.sberbank.ru/payment/docsite/assets/js/ipay.js"
  />,
]

const BodyComponents = [
  <script
    key="run-ipay"
    dangerouslySetInnerHTML={{
      __html: `
        var ipay = new IPAY({
        api_token: "${process.env.GATSBY_SBERBANK_API}",
        language: "en",
        classNamePreloader: "payment-preloader",
        preloadBorderColor: "#F3922B",
        });
    `,
    }}
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
  { setHeadComponents, setPostBodyComponents },
  pluginOptions
) => {
  setHeadComponents(HeadComponents)
  setPostBodyComponents(BodyComponents)
}
