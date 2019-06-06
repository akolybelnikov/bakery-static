import React, { useState } from "react"
import Modal from "react-responsive-modal"
import { theme } from "../utils/styles"

const modalStyles = {
  overlay: {
    // padding: 0,
  },
  modal: {
    // padding: 0,
  },
  closeButton: {
    boxShadow: "0 0 0 transparent",
    outline: "none",
  },
}

export default ({ children, fill }) => {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  return (
    <Modal
      open={open}
      onClose={toggle}
      styles={modalStyles}
      closeIconSize={36}
      closeIconSvgPath={
        <>
          <path
            fill={fill}
            d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
          />
          <path fill="none" d="M0 0h24v24H0V0z" />
        </>
      }
      children={children}
    />
  )
}
