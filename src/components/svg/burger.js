import React from "react"

const commonStyles = {
  strokeWidth: 20,
  strokeLinecap: "round",
  stroke: "#52082d",
  fill: "none",
  transition: "all 0.5s ease-in-out",
}

export default props => {
  let arrayMiddle = props.isActive ? "0px 220px" : "240px 240px"
  let offsetTopBottom = props.isActive ? "-650px" : 0
  let offsetMiddle = props.isActive ? "-120px" : "0"

  return (
    <svg
      viewBox="0 0 800 600"
      width={props.width}
      height={props.height}
      onClick={props.onToggleMenu}>
      <path
        style={{
          strokeDashoffset: offsetTopBottom,
          strokeDasharray: "240px 910px",
          ...commonStyles,
        }}
        d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"
      />

      <path
        id="burger-icon-middlebar"
        style={{
          strokeDasharray: arrayMiddle,
          strokeDashoffset: offsetMiddle,
          ...commonStyles,
        }}
        d="M300,320 L540,320"
      />

      <path
        id="burger-icon-bottombar"
        style={{
          strokeDashoffset: offsetTopBottom,
          strokeDasharray: "240px 910px",
          ...commonStyles,
        }}
        d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
        transform="translate(480, 320) scale(1, -1) translate(-480, -318)"
      />
    </svg>
  )
}
