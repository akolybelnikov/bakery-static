import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { styled } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { Link } from "gatsby"
import React, { useState } from "react"
import { Box } from "rebass"
import { useUserState } from "../state/user"

const Form = styled("form")({
  width: "100%",
})

export default ({ handleChange, checkout, invalid }) => {
  const { user } = useUserState()
  const [confirmed, setState] = useState(false)

  const handleCBChange = event => {
    setState(event.target.checked)
  }

  return (
    <>
      <Form>
        <TextField
          required
          name="address"
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
        <FormControlLabel
          control={
            <Checkbox
              checked={confirmed}
              onChange={handleCBChange}
              name="confirmed"
              color="primary"
            />
          }
          label="Условия оплаты и доставки подтверждаю"
        />
      </Form>
      <Box pb={[4]}>
        <Link to="/delivery">Условия оплаты и доставки</Link>
      </Box>
      <Button
        onClick={checkout}
        color="primary"
        variant="contained"
        disabled={invalid || !confirmed}
      >
        Оформить заказ
      </Button>
    </>
  )
}
