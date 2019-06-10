import React, { useState } from "react"
import { animated, Spring } from "react-spring/renderprops"
import { Flex } from "rebass"
import styled from "styled-components"
import { theme } from "../utils/styles"
import Down from "./svg/arrowDropDown"
import Up from "./svg/arrowDropUp"

const AccordionMain = styled.div``

const StyledLink = styled.a`
  background-image: none;
  text-shadow: none;
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
      <Flex justifyContent="center" alignItems="center">
        <StyledLink onClick={handleClick}>
          {!open ? (
            <Down width={40} height={40} fill={theme.colors.primary} />
          ) : (
            <Up width={40} height={40} fill={theme.colors.primary} />
          )}
        </StyledLink>
      </Flex>
    </AccordionMain>
  )
}
