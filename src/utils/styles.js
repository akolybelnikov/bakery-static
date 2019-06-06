const primary = "#5E1839"
const secondary = "#F4E5D8"
const secondaryWashed = "rgba(244, 229, 216, 0.65)"
const primaryBR2 = "#9f7182"
const primaryBR3 = "#BF9FAA"
const primaryBR4 = "#DECED4"

const theme = {
  colors: {
    primary,
    secondary,
    secondaryWashed,
    primaryBR2,
    primaryBR3,
    primaryBR4,
  },
  buttons: {
    primary: {
      color: primary,
      backgroundColor: secondaryWashed,
      boxShadow: 'inset 0 2px 16px',
    },
    clear: {
      color: primary,
      backgroundColor: "transparent",
      boxShadow: '0 0 0 transparent',
      outline: 'none',
      width: '100%',
      fontSize: 20,
      lineHeight: 1.5,
      fontWeight: 400,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      cursor: 'pointer'

    },
    outline: {
      color: primary,
      backgroundColor: "transparent",
      boxShadow: "inset 0 0 0 1px",
      width: 'auto',
      minWidth: '125px',
      fontWeight: 300,
      marginBottom: 8,
      fontSize: 16,
      "&:hover": {
        boxShadow: "inset 0 0 0 2px",
        fontWeight: 500,
      },
      borderRadius: "4px",
      "&:focus": {
        outline: "none",
        boxShadow: "inset 0 0 0 2px",
        fontWeight: 500,
      },
      "&:active": {
        outline: "none",
        boxShadow: "inset 0 0 0 2px",
        fontWeight: 500,
      },
      transition: "all 200ms ease-in",
    },
  },
}

const menuStyles = {
  bmBurgerButton: {
    position: "fixed",
    width: "32px",
    height: "28px",
    right: "28px",
    top: "36px",
  },
  bmBurgerBars: {
    background: theme.colors.primary,
    height: "18%",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
    position: "absolute",
    right: "28px",
    top: "24px",
  },
  bmCross: {
    background: theme.colors.primary,
    height: "20px",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: theme.colors.secondary,
    padding: "2.5em 1.5em",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
    height: `auto`,
  },
  bmItem: {
    padding: "1em 0",
    color: theme.colors.primary,
    backgroundImage: `none`,
    textShadow: `none`,
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
}

export { menuStyles, theme }
