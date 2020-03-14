import React from "react"
import renderer from "react-test-renderer"

import Header from "../header"

describe("Header component", () => {
  it("renders correctly", () => {
    expect(<Header location="/" />).toMatchSnapshot()
  })
})
