import React from "react";
import { FaSpinner } from "react-icons/fa";
import Modal from "react-responsive-modal";
import { Box } from "rebass";
import styled, { keyframes } from "styled-components";
import { theme } from "../utils/styles";

const Icon = styled(Box).attrs({
  color: theme.colors.primary,
  fontSize: [8],
  px: [0],
  py: [0],
})``

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(359deg);
  }
`

const Spinner = styled(FaSpinner)`
  animation: ${spin} 1.5s linear infinite;
`

const modalStyles = {
  overlay: {
    alignItems: 'center',
    background: "rgba(244, 229, 216, 0.5)",
  },
  modal: {
    background: "transparent",
    padding: 0,
    boxShadow: 'none',
  },
}

const LoadingModal = ({ open, hideLoading }) => {
  return (
    <Modal
      open={open}
      styles={modalStyles}
      showCloseIcon={false}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      onClose={hideLoading}
      focusTrapped={false}
      children={
        <Icon>
          <Spinner />
        </Icon>
      }
    />
  )
}

export default LoadingModal
