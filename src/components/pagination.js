import React from "react"
import { Flex } from "rebass"
import PaginationDot from "./dot"

export default ({ onChangeIndex, index, dots, bottom, right, top, left }) => {
  const handleClick = (_, index) => {
    onChangeIndex(index)
  }

  const children = []

  for (let i = 0; i < dots; i += 1) {
    children.push(
      <PaginationDot
        key={i}
        index={i}
        active={i === index}
        onClick={handleClick}
      />
    )
  }

  return (
    <Flex
      style={{
        position: `absolute`,
        bottom: bottom ? bottom : "",
        right: right ? right : "",
        top: top ? top : "",
        left: left ? left : "",
      }}
    >
      {children}
    </Flex>
  )
}
