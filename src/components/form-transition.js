import React from "react"
import { Transition } from "react-spring/renderprops"
import { Flex } from "rebass"
import OrderForm from "./order-form"
import PickUpForm from "./pickup-form"
import { PAGE } from "../utils/utils"

export default ({
  checkout,
  handleChange,
  currentPage,
  orderFormInvalid,
  pickUpFormInvalid,
  sendOrder,
}) => (
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
              minHeight={["35vh"]}
              pt={[3, 4]}
              width={[1, 1 / 2]}
            >
              <OrderForm
                checkout={checkout}
                handleChange={handleChange}
                invalid={orderFormInvalid}
              />
            </Flex>
          )
        : props => (
            <Flex
              style={props}
              flexDirection="column"
              justifyItems="center"
              justifyContent="flex-start"
              alignItems="center"
              minHeight={["35vh"]}
              pt={[3, 4]}
              width={[1, 1 / 2]}
            >
              <PickUpForm
                sendOrder={sendOrder}
                handleChange={handleChange}
                invalid={pickUpFormInvalid}
              />
            </Flex>
          )
    }
  </Transition>
)
