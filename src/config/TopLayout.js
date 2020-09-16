import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"
import React from "react"
import theme from "../theme"

export default ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
