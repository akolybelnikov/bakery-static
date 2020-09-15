import TextField from "@material-ui/core/TextField"
import React from "react"
import { useUserState } from "../state/user"

export default ({ handleChange }) => {
  const { user } = useUserState()

  return (
    <>
      <TextField
        required
        name="_metro"
        label="Ближайшая ст. метро"
        defaultValue={user.metro}
        variant="outlined"
        type="text"
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      <TextField
        required
        name="_address"
        label="Подробный адрес доставки"
        variant="outlined"
        type="text"
        onChange={handleChange}
        margin="normal"
        multiline
        rows={3}
        fullWidth
        defaultValue={user.address}
      />
    </>
  )
}
