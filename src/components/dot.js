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
    backgroundColor: theme.colors.secondary,
    height: 16,
    width: 16,
    borderRadius: 8,
    margin: 6,
  }
}

export default ({ onClick, index, active }) => {
  const handleClick = event => {
    onClick(event, index)
  }

  return (
    <Button style={styles.root} onClick={handleClick}>
      <div
        style={{
          ...styles.dot,
          backgroundColor: active
            ? theme.colors.primary
            : theme.colors.secondary,
        }}
      />
    </Button>
  )
}
