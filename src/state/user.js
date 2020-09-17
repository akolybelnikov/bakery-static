import React, { createContext, useContext, useReducer } from "react"
import { User } from "../models/User"

const updateObject = (oldObject, newValues) =>
  Object.assign({}, oldObject, newValues)

const initialState = {
  user: {
    _name: "",
    _phone: "",
    _replyto: "",
    _address: "",
    _pickup: "",
    _metro: "",
    _username: "guest"
  },
}

const UserStateContext = createContext(initialState)
const UserDispatchContext = createContext()

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_USER": {
        const user = new User(action.user)
        return updateObject(state, { user })
      }
      case "ADD_NAME": {
        const user = updateObject(state.user, { _name: action._name })
        return updateObject(state, { user })
      }
      case "ADD_EMAIL": {
        const user = updateObject(state.user, { _replyto: action._replyto })
        return updateObject(state, { user })
      }
      case "ADD_PHONE": {
        const user = updateObject(state.user, { _phone: action._phone })
        return updateObject(state, { user })
      }
      case "ADD_ADDRESS": {
        const user = updateObject(state.user, { _address: action._address })
        return updateObject(state, { user })
      }
      case "ADD_PICKUP": {
        const user = updateObject(state.user, { _pickup: action._pickup })
        return updateObject(state, { user })
      }
      case "ADD_METRO": {
        const user = updateObject(state.user, { _metro: action._metro })
        return updateObject(state, { user })
      }
      case "REMOVE_USER": {
        const user = {}
        return updateObject(state, { user })
      }
      default:
        return state
    }
  }, initialState)

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

const useUserState = () => {
  const context = useContext(UserStateContext)
  if (context === undefined) {
    throw new Error("useUserState must be used withtin a UserProvider")
  }
  return context
}

const useUserDispatch = () => {
  const context = useContext(UserDispatchContext)
  if (context === undefined) {
    throw new Error("useUserDispatch must be used withtin a UserProvider")
  }
  return context
}

export { UserProvider, useUserDispatch, useUserState }
