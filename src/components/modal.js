import React, { useState } from "react"
import Modal from "react-responsive-modal"
import { theme } from "../utils/styles"

const modalStyles = {
  overlay: {
    padding: 0,
  },
  modal: {
    padding: 0,
  },
  closeButton: {
    boxShadow: "0 0 0 transparent",
    outline: "none",
    background: theme.colors.secondary,
    borderRadius: 12,
  },
}

export default ({ children }) => {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  const lastSpace = content.substring(0, 225).lastIndexOf(" ")


  return (
    <Modal
      open={open}
      onClose={toggle}
      styles={modalStyles}
      closeIconSize={40}
      closeIconSvgPath={
        <path
          fill={theme.colors.primary}
          d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z"
        />
      }
      children={children}
    >
      {content.substring(0, lastSpace)}
      {content.length > 225 && (
        <>
          <span> ...</span>
          <Text>
            <StyledLink onClick={toggle} role="button">
              читать дальше
            </StyledLink>
          </Text>
        </>
      )}
    </Modal>
  )
}
