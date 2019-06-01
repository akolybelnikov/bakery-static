import React from "react"

export default ({ width, height, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path fill={fill} d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
    </svg>
  )
}
