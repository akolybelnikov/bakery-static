import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import React from "react"
import { PAGE } from "../utils/utils"
import { Flex } from "rebass"
import TextField from "@material-ui/core/TextField"

export default ({ setPage, handleChange, currentPage }) => {
  const matches = useMediaQuery("(max-width:899px)")

  return (
    <>
      <ButtonGroup
        disableElevation
        color="primary"
      >
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
        width={[1, 1 / 2]}
        flexDirection={["column", "row"]}
        justifyContent="space-between"
      >
        <TextField
          required
          name="name"
          label="Ваше имя"
          defaultValue=""
          variant="outlined"
          type="text"
          onChange={handleChange}
          margin="normal"
          fullWidth={matches}
        />
        <TextField
          required
          name="phone"
          label="Nомер телефона"
          defaultValue=""
          variant="outlined"
          type="text"
          onChange={handleChange}
          margin="normal"
          fullWidth={matches}
        />
      </Flex>
    </>
  )
}
