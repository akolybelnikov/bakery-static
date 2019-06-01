import React from "react"
import { ThemeProvider } from "styled-components"
import Footer from "../components/footer"
import { rhythm, scale } from "../utils/typography"
import Header from "../components/header"
import { Box, Flex, Text } from "rebass"

const theme = {
  colors: {
    primary: "#5E1839",
    secondary: "#F4E5D8",
  },
}

export default ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const path = location.pathname

  return (
    <ThemeProvider theme={theme}>
      <Box
        mx="auto"
        style={{
          maxWidth: rhythm(35),
          padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
        }}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}
