import React from "react"
import Responsive from "react-responsive"
import { Box } from "rebass"
import styled, { ThemeProvider } from "styled-components"
import Footer from "../components/footer"
import Header from "../components/header"
import { theme } from "../utils/styles"
import { rhythm } from "../utils/typography"
import Menu from "./menu"

const Mobile = props => <Responsive {...props} maxWidth={899} />

const Main = styled.main`
  @media all and (min-width: 900px) {
    padding-block-start: 9rem;
  }
`

export default ({ location, children }) => {
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
          <Header location={location} maxHeaderWidth={rhythm(35)} />
          <Main id="page-wrap">{children}</Main>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  )
}
