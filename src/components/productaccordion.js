import React, { useState } from "react"
import { animated, Spring } from "react-spring/renderprops"
import styled from "styled-components"
import Up from "./svg/arrowDropUp"
import Down from "./svg/arrowDropDown"
import { theme } from "../utils/styles"
import { Flex } from "rebass"

const AccordionMain = styled.div`
  position: relative;
`

const StyledLink = styled.a`
  background-image: none;
  text-shadow: none;
  position: absolute;
  margin-left: 50%;
  transform: translateX(-50%);
  z-index: 100;
`

const AccordionInnerContent = styled.div``

export default ({ children, min }) => {
  const [open, toggle] = useState(false)
  const handleClick = () => toggle(!open)

  return (
    <AccordionMain>
      <Spring
        from={{ height: min }}
        to={{
          height: open ? "auto" : min,
        }}
      >
        {style => (
          <animated.div style={{ ...style, overflow: "hidden" }}>
            <AccordionInnerContent>{children}</AccordionInnerContent>
          </animated.div>
        )}
      </Spring>
      <StyledLink onClick={handleClick}>
        {!open ? (
          <Down width={40} height={40} fill={theme.colors.primary} />
        ) : (
          <Up width={40} height={40} fill={theme.colors.primary} />
        )}
      </StyledLink>
    </AccordionMain>
  )
}
