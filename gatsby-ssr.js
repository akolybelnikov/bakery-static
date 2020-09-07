const React = require("react")
const { CartProvider } = require("./src/state/cart")

exports.wrapRootElement = ({ element }) => {
  return <CartProvider>{element}</CartProvider>
}
