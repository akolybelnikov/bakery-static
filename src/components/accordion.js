import React, { useState, useCallback } from "react"
import { Spring, config, animated } from "react-spring/renderprops"
import styled from "styled-components"
import { Heading, Text, Flex, Button } from "rebass"

const AccordionMain = styled.div``

const AccordionTitle = styled.div``

const AccordionOuterContent = styled.div`
  overflow: hidden;
`

const AccordionInnerContent = styled.div``

export default ({ children }) => {
  const [open, toggle] = useState(false)
  const handleClick = () => toggle(!open)

  return (
    <AccordionMain>
      <AccordionTitle>
        <Button onClick={handleClick}>click</Button>
      </AccordionTitle>
      <Spring
        from={{ height: 0, opacity: 0 }}
        to={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
      >
        {style => (
          <animated.div style={{ ...style, overflow: "hidden" }}>
            <AccordionInnerContent>{children}</AccordionInnerContent>
          </animated.div>
        )}
      </Spring>
    </AccordionMain>
  )
}
