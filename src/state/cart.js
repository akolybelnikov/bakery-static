import React, { createContext, useContext, useReducer } from "react"

class Product {
  constructor(image, productName, weight, price, filling) {
    this.image = image
    this.productName = productName
    this.price = price
    this.filling = filling
    this.weight = weight
  }
}

const initialState = {
  products: [],
}

const CartStateContext = createContext(initialState)
const CartDispatchContext = createContext()

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_PRODUCT":
        const product = new Product(
          action.image,
          action.productName,
          action.weight,
          action.price,
          action.filling
        )
        return { products: [...state.products, product] }
      case "REMOVE_PRODUCT":
        const products = state.products.filter(
          p => p.productName !== action.productName
        )
        return { products }
      default:
        throw new Error()
    }
  }, initialState)

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  )
}

const useCartState = () => {
  const context = useContext(CartStateContext)
  if (context === undefined) {
    throw new Error("useCartState must be used withtin a CartProvider")
  }
  return context
}

const useCartDispatch = () => {
  const context = useContext(CartDispatchContext)
  if (context === undefined) {
    throw new Error("useCartDispatch must be used withtin a CartProvider")
  }
  return context
}

export { CartProvider, useCartDispatch, useCartState }
