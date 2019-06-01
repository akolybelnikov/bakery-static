import React from "react"
import { Box } from "rebass"
import { ThemeProvider } from "styled-components"
import Footer from "../components/footer"
import Header from "../components/header"
import { theme } from "../utils/styles"
import { rhythm } from "../utils/typography"

export default ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const path = location.pathname

  return (
    <ThemeProvider theme={theme}>
      <Box
        mx="auto"
        px={3}
        pb={3}
        pt={1}
        style={{
          maxWidth: rhythm(35),
        }}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}
