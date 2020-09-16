import React, { createContext, useContext, useReducer } from "react"
import { Product } from "../models/Product"

const updateObject = (oldObject, newValues) =>
  Object.assign({}, oldObject, newValues)

const updateItemInArray = (array, productName, updateItemCb) => {
  const updatedItems = array.map(item => {
    if (item.productName !== productName) {
      return item
    }
    const updatedItem = updateItemCb(item)
    return updatedItem
  })
  return updatedItems
}

const initialState = {
  products: [],
}

const CartStateContext = createContext(initialState)
const CartDispatchContext = createContext()

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_PRODUCT": {
        const idx = state.products.findIndex(
          product => product.productName === action.productName
        )
        const products =
          idx === -1
            ? state.products.concat({
                ...new Product(action),
                count: 1,
                total: action.price,
              })
            : state.products

        return updateObject(state, { products })
      }
      case "INCREASE_QUANTITY": {
        const products = updateItemInArray(
          state.products,
          action.productName,
          product => {
            return updateObject(product, {
              count: product.count < 99 ? product.count + 1 : product.count,
              total:
                product.total < 99 * action.price || product.count === 0
                  ? product.total + action.price
                  : product.total,
            })
          }
        )
        return updateObject(state, { products })
      }
      case "DECREASE_QUANTITY": {
        const products = updateItemInArray(
          state.products,
          action.productName,
          product => {
            return updateObject(product, {
              count: product.count > 0 ? product.count - 1 : 0,
              total: product.total > 0 ? product.total - action.price : 0,
            })
          }
        )
        return updateObject(state, { products })
      }
      case "REMOVE_PRODUCT": {
        const products = state.products.filter(
          item => item.productName !== action.productName
        )
        return updateObject(state, { products })
      }
      case "EMPTY_CART": {
        const products = []
        return updateObject(state, { products })
      }
      default:
        return state
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
