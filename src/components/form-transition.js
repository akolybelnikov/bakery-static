import React from "react"
import { Transition } from "react-spring/renderprops"
import { Flex } from "rebass"
import OrderForm from "./order-form"
import PickUpForm from "./pickup-form"
import { PAGE } from "../utils/utils"

export default ({ handleChange, currentPage }) => (
  <Transition
    items={currentPage}
    from={{
      transform:
        currentPage === PAGE.DELIVERY
          ? "translate3d(500px,0,0)"
          : "translate3d(-500px,0,0)",
      opacity: 0,
      position: "absolute",
    }}
    enter={{
      transform: "translate3d(0px,0,0)",
      opacity: 1,
      position: "relative",
    }}
    leave={{
      transform:
        currentPage === PAGE.DELIVERY
          ? "translate3d(-500px,0,0)"
          : "translate3d(500px,0,0)",
      opacity: 0,
      position: "absolute",
    }}
  >
    {C =>
      C === PAGE.DELIVERY
        ? props => (
            <Flex
              style={props}
              flexDirection="column"
              justifyItems="center"
              justifyContent="flex-start"
              alignItems="center"
              minHeight={["25vh"]}
              pt={[3, 4]}
              width={[1, 2 / 3, 1 / 2]}
            >
              <OrderForm handleChange={handleChange} />
            </Flex>
          )
        : props => (
            <Flex
              style={props}
              flexDirection="column"
              justifyItems="center"
              justifyContent="flex-start"
              alignItems="center"
              minHeight={["25vh"]}
              pt={[3, 4]}
              width={[1, 2 / 3, 1 / 2]}
            >
              <PickUpForm handleChange={handleChange} />
            </Flex>
          )
    }
  </Transition>
)
