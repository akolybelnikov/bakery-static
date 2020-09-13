import { red } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core/styles"

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5E1839",
    },
    secondary: {
      main: "#F3922B"
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  overrides: {
    MuiBadge: {
      colorSecondary: {
        color: "#5E1839",
      },
    },
  },
})

export default theme
