const theme = {
  colors: {
    primary: "#5E1839",
    secondary: "#F4E5D8",
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
