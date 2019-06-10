import React from "react"
import Responsive from "react-responsive"
import { Box } from "rebass"
import { ThemeProvider } from "styled-components"
import Footer from "../components/footer"
import Header from "../components/header"
import { theme } from "../utils/styles"
import { rhythm } from "../utils/typography"
import Menu from "./menu"

const Mobile = props => <Responsive {...props} maxWidth={899} />

export default ({ location, title, children }) => {
  // const rootPath = `${__PATH_PREFIX__}/`

  return (
    <ThemeProvider theme={theme}>
      <Box id="outer-container">
        <Mobile>
          <Menu location={location} />
        </Mobile>
        <Box
          mx="auto"
          px={3}
          pb={3}
          pt={1}
          style={{
            maxWidth: rhythm(35),
            overflowX: `hidden`,
          }}
        >
          <Header location={location} />
          <main id="page-wrap">{children}</main>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  )
}
