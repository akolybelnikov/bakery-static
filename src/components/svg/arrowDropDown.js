import React from "react"

export default ({width, height, fill}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
  >
    <path d="M7 10l5 5 5-5z" fill={fill} />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)