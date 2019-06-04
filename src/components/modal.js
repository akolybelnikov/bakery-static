import React, { useState } from "react"
import Modal from "react-responsive-modal"

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
  },
}

export default () => {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

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
      children={
        <></>
        // <Card bg="secondaryWashed">
        //   <Image fluid={fluid} />
        //   <Flex alignItems="center">
        //     <StyledText
        //       fontSize={3}
        //       color="primary"
        //       p={3}
        //       textAlign={["center"]}
        //       lineHeight={[1.3, 1.5, 1.65]}
        //     >
        //       {content}
        //     </StyledText>
        //   </Flex>
        // </Card>
      }
    />
  )
}
