import React, { createContext, useContext, useReducer } from "react"

const initialState = {
  products: [],
}

const CartStateContext = createContext(initialState)
const CartDispatchContext = createContext()

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_PRODUCT":
        return {
          ...initialState,
          products: [...initialState.products, ...state.products],
        }
      case "REMOVE_PRODUCT":
        return {
          ...initialState,
          products: [...initialState.products, ...state.products],
        }
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
