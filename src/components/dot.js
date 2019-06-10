import React from "react"
import { theme } from "../utils/styles"
import { Button } from "rebass"

const styles = {
  root: {
    height: 24,
    width: 24,
    cursor: "pointer",
    border: 0,
    background: "none",
    padding: 0,
    marginRight: 6,
  },
  dot: {
    backgroundColor: "#e4e6e7",
    height: 16,
    width: 16,
    borderRadius: 8,
    margin: 6,
  },
  active: {
    backgroundColor: theme.colors.primary,
  },
}

export default ({ onClick, index, active }) => {
  const handleClick = event => {
    onClick(event, index)
  }

  let styleDot

  if (active) {
    styleDot = Object.assign({}, styles.dot, styles.active)
  } else {
    styleDot = styles.dot
  }

  return (
    <Button style={styles.root} onClick={handleClick}>
      <div style={styleDot} />
    </Button>
  )
}
