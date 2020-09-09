import { Analytics, Auth } from "aws-amplify"
import React from "react"
import TopLayout from "./src/config/TopLayout"
import { CartProvider } from "./src/state/cart"

Analytics.configure({ disabled: true })

Auth.configure({
  identityPoolId: process.env.GATSBY_IDENTITY_POOL_ID,
  region: process.env.GATSBY_AWS_REGION,
  userPoolId: process.env.GATSBY_USER_POOL_ID,
  userPoolWebClientId: process.env.GATSBY_WEBCLIENT_ID,
  mandatorySignIn: false,
})

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <TopLayout>
        <CartProvider>{element}</CartProvider>
      </TopLayout>
    </>
  )
}

// export const onServiceWorkerUpdateReady = () => {
//   const answer = window.confirm(
//     `Приложение было обновлено... Загрузить обновлённую версию?`
//   )

//   if (answer === true) {
//     window.location.reload()
//   }
// }
