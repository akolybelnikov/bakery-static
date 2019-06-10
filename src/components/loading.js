import React from "react"
import { FaSpinner } from "react-icons/fa"
import { animated, Spring } from "react-spring/renderprops"
import { Box, Flex as RebassFlex } from "rebass"
import styled, { keyframes } from "styled-components"
import { theme } from "../utils/styles"

const Icon = styled(Box).attrs({
  color: theme.colors.primary,
  fontSize: [6],
  px: [0],
  py: [0],
})``

const Flex = styled(RebassFlex).attrs({
  alignItems: "center",
  justifyContent: "center",
})`
`

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

export default ({ open }) => {
  return (
    <Spring
      from={{ height: 0, opacity: 0 }}
      to={{
        height: open ? 300 : 0,
        opacity: open ? 1 : 0,
      }}
    >
      {style => (
        <animated.div style={{ ...style, ...{position: 'absolute'} }}>
          <Flex>
            <Icon>
              <Spinner />
            </Icon>
          </Flex>
        </animated.div>
      )}
    </Spring>
  )
}
