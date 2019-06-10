import React from "react"
import { animated, Spring } from "react-spring/renderprops"
import { Button as RebassButton, Flex as RebassFlex, Text } from "rebass"
import styled from "styled-components"
import Close from "../../../components/svg/close"
import { theme } from "../../../utils/styles"

const Flex = styled(RebassFlex).attrs({
  alignItems: "center",
  justifyContent: "center",
})`
  position: relative;
  height: 100%;
`

const Button = styled(RebassButton).attrs({
  backgroundColor: "transparent",
  boxShadow: "0 0 0 transparent",
  outline: "none",
  padding: 0,
})`
  position: absolute;
  top: 10px;
  right: 0;
  cursor: pointer;
`

const styles = {
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  background: theme.colors.secondary,
  width: '100%',
}

export default ({ children, toggle, open }) => {
  return (
    <Spring
      from={{ height: 0, opacity: 0 }}
      to={{
        height: open ? 150 : 0,
        opacity: open ? 1 : 0,
      }}
    >
      {style => (
        <animated.div style={{ ...style, ...styles }}>
          <Flex>
            <Text color={`${theme.colors.red}`} textAlign="center">
              {children}
            </Text>
            <Button onClick={toggle}>
              <Close width={24} height={24} fill={theme.colors.primary} />
            </Button>
          </Flex>
        </animated.div>
      )}
    </Spring>
  )
}
