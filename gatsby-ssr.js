import React from "react"
import TopLayout from "./src/config/TopLayout"
import { CartProvider } from "./src/state/cart"
import { UserProvider } from "./src/state/user"

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const HeadComponents = [
  <script key="fb-script">
    {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '549514382358073'); 
        fbq('track', 'PageView');
    `}
  </script>,
  <noscript key="fb-noscript">
    {`
        <img
        alt="facebook noscript page view"
        height="1"
        width="1"
        src="https://www.facebook.com/tr?id=549514382358073&ev=PageView&noscript=1" />
    `}
  </noscript>,
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
      <UserProvider>
        <CartProvider>{element}</CartProvider>
      </UserProvider>
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
