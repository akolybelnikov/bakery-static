import TextField from "@material-ui/core/TextField"
import React from "react"
import { useUserState } from "../state/user"
import { getCurrentUser } from "../utils/auth"

export default ({ handleChange }) => {
  const { user } = useUserState()
  // Auth
  const loggedInUser = getCurrentUser()
  const defaultEmailValue = loggedInUser.email ? loggedInUser.email : user._email

  return (
    <>
      <TextField
        required
        name="_replyto"
        label="Адрес эл. почты"
        defaultValue={defaultEmailValue}
        variant="outlined"
        type="email"
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      <TextField
        required
        name="_pickup"
        label="Время и дата самовывоза"
        defaultValue={user.pickup}
        variant="outlined"
        type="text"
        onChange={handleChange}
        margin="normal"
        multiline
        rows={3}
        fullWidth
      />
    </>
  )
}
