const primary = "#5E1839"
const secondary = "#F4E5D8"
const secondaryWashed = "rgba(244, 229, 216, 0.65)"
const primaryBR2 = "#9f7182"
const primaryBR3 = "#BF9FAA"
const primaryBR4 = "#DECED4"
const red = "#ec392f"

const theme = {
  colors: {
    primary,
    secondary,
    secondaryWashed,
    primaryBR2,
    primaryBR3,
    primaryBR4,
    red,
  },
  buttons: {
    primary: {
      color: primary,
      backgroundColor: "transparent",
      bcursor: "pointer",
      border: `1px solid ${primary}`,
    },
    clear: {
      color: primary,
      backgroundColor: "transparent",
      boxShadow: "0 0 0 transparent",
      outline: "none",
      width: "100%",
      fontSize: 20,
      lineHeight: 1.5,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      cursor: "pointer",
    },
    noOutline: {
      color: primary,
      backgroundColor: "transparent",
      boxShadow: "0 0 0 transparent",
      outline: "none",
      fontSize: [2, 3],
      lineHeight: 1.5,
      cursor: "pointer",
    },
    outline: {
      color: primary,
      backgroundColor: "transparent",
      boxShadow: "inset 0 0 0 1px",
      width: "auto",
      minWidth: "125px",
      fontWeight: "normal",
      marginBottom: 8,
      fontSize: 16,
      "&:hover": {
        boxShadow: "inset 0 0 0 2px",
        fontWeight: "bolder",
      },
      borderRadius: "4px",
      "&:focus": {
        outline: "none",
        boxShadow: "inset 0 0 0 2px",
        fontWeight: "bolder",
      },
      "&:active": {
        outline: "none",
        boxShadow: "inset 0 0 0 2px",
        fontWeight: "bolder",
      },
      transition: "all 200ms ease-in",
    },
  },
}

const baseLink = {
  boxShadow: `none`,
  textDecoration: `none`,
  color: `inherit`,
  backgroundImage: `none`,
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
    height: "10%",
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

export { menuStyles, theme, baseLink }
