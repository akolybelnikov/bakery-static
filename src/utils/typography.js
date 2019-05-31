import Typography from "typography"
import oceanBeachTheme from 'typography-theme-ocean-beach'
import { blue } from "ansi-colors";

oceanBeachTheme.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    "a": {
      color: `#5E1839`
    }
  }
}

delete oceanBeachTheme.googleFonts

const typography = new Typography(oceanBeachTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
