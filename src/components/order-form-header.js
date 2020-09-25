import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import TextField from "@material-ui/core/TextField"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import React from "react"
import { Flex } from "rebass"
import { useUserState } from "../state/user"
import { getCurrentUser } from "../utils/auth"
import { PAGE } from "../utils/utils"

export default ({ setPage, handleChange, currentPage }) => {
  const matches = useMediaQuery("(max-width:899px)")
  const { user } = useUserState()

  // Auth
  const loggedInUser = getCurrentUser()
  const defaultNameValue = loggedInUser.name ? loggedInUser.name : user._name
  const defaultPhoneValue = loggedInUser.phone_number
    ? loggedInUser.phone_number
    : user._phone

  return (
    <>
      <ButtonGroup disableElevation color="primary">
        <Button
          variant={currentPage === PAGE.PICK_UP ? "contained" : "outlined"}
          onClick={() => setPage(PAGE.PICK_UP)}
        >
          Забрать в магазине
        </Button>
        <Button
          variant={currentPage === PAGE.DELIVERY ? "contained" : "outlined"}
          onClick={() => setPage(PAGE.DELIVERY)}
        >
          Оформить доставку
        </Button>
      </ButtonGroup>
      <Flex
        pt={[3, 4]}
        width={[1, 2 / 3, 1 / 2]}
        flexDirection={["column", "column", "row"]}
        justifyContent="space-between"
      >
        <TextField
          required
          name="_name"
          label="Ваше имя"
          defaultValue={defaultNameValue}
          variant="outlined"
          type="text"
          onChange={handleChange}
          margin="normal"
          fullWidth={matches}
        />
        <TextField
          required
          name="_phone"
          label="Nомер телефона"
          defaultValue={defaultPhoneValue}
          variant="outlined"
          type="phone"
          onChange={handleChange}
          margin="normal"
          fullWidth={matches}
        />
      </Flex>
    </>
  )
}
