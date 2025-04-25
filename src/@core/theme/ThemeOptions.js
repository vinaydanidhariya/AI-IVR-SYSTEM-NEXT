// ** MUI Theme Provider
import { deepmerge } from '@mui/utils'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Theme Override Imports
import palette from './palette'
import spacing from './spacing'
import shadows from './shadows'
import breakpoints from './breakpoints'

const themeOptions = settings => {
  // ** Vars
  const { mode, themeColor } = settings

  const coreThemeConfig = {
    palette: palette(mode, themeColor),
    typography: {
      fontFamily: [
        'Inter',
        'sans-serif',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(',')
    },
    shadows: shadows(mode),
    ...spacing,
    breakpoints: breakpoints(),
    shape: {
      borderRadius: themeConfig.borderRadius || 6
    },
    mixins: {
      toolbar: {
        minHeight: 64
      }
    },
    transitions: {
      duration: {
        shortest: themeConfig.transitionDuration * 0.1,
        shorter: themeConfig.transitionDuration * 0.2,
        short: themeConfig.transitionDuration * 0.4,
        standard: themeConfig.transitionDuration,
        complex: themeConfig.transitionDuration * 1.2,
        enteringScreen: themeConfig.transitionDuration * 0.8,
        leavingScreen: themeConfig.transitionDuration * 0.6
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
      }
    }
  }

  return deepmerge(coreThemeConfig, {
    palette: {
      primary: {
        ...coreThemeConfig.palette[themeColor],
        main: themeConfig.defaultPrimaryColor || coreThemeConfig.palette[themeColor].main
      }
    }
  })
}

export default themeOptions
