// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'

const GlobalStyles = theme => {
  // Calculate transition string based on theme config
  const transitionDuration = themeConfig.enableTransitions ? 
    `${themeConfig.transitionDuration}ms` : '0ms'
  
  return {
    // Body styles
    'html, body': {
      scrollBehavior: 'smooth'
    },
    
    'body': {
      transition: `background-color ${transitionDuration} ease-in-out, color ${transitionDuration} ease-in-out`,
      overflowX: 'hidden'
    },
    
    // Add custom scrollbar
    '*::-webkit-scrollbar': {
      width: '8px',
      height: '8px'
    },
    '*::-webkit-scrollbar-track': {
      background: theme.palette.mode === 'light' ? '#f1f1f1' : '#2d2d2d'
    },
    '*::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      background: theme.palette.mode === 'light' ? 
        'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
      transition: 'background 0.2s ease'
    },
    '*::-webkit-scrollbar-thumb:hover': {
      background: theme.palette.mode === 'light' ? 
        'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)'
    },
    
    // Perfect scrollbar custom styling
    '.ps__rail-y': {
      zIndex: 1,
      right: '0 !important',
      left: 'auto !important',
      '&:hover, &:focus, &.ps--clicking': {
        backgroundColor: theme.palette.mode === 'light' ? '#E4E5EB !important' : '#423D5D !important'
      },
      '& .ps__thumb-y': {
        right: '3px !important',
        left: 'auto !important',
        backgroundColor: theme.palette.mode === 'light' ? '#C2C4D1 !important' : '#504B6D !important'
      },
      '.layout-vertical-nav &': {
        '& .ps__thumb-y': {
          width: 4,
          backgroundColor: theme.palette.mode === 'light' ? '#C2C4D1 !important' : '#504B6D !important'
        },
        '&:hover, &:focus, &.ps--clicking': {
          backgroundColor: 'transparent !important',
          '& .ps__thumb-y': {
            width: 6
          }
        }
      }
    },
    
    // NProgress Bar styles
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        left: 0,
        top: 0,
        height: 3,
        width: '100%',
        zIndex: 2000,
        position: 'fixed',
        backgroundColor: theme.palette.primary.main,
        boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`
      }
    },
    
    // Custom focus outline
    'a, button, [tabindex]:not([tabindex="-1"])': {
      '&:focus': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: '2px',
        borderRadius: '4px'
      },
      '&:focus:not(:focus-visible)': {
        outline: 'none'
      }
    },
    
    // Global animation for hover transitions
    '.hover-animation': {
      transition: `all ${transitionDuration} cubic-bezier(0.4, 0, 0.2, 1)`,
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)'
      }
    },
    
    // Global card styles
    '.MuiCard-root': {
      transition: `box-shadow ${transitionDuration} ease-in-out, transform ${transitionDuration} ease-in-out`,
      overflow: 'hidden'
    },
    
    // Global transition for buttons
    '.MuiButton-root': {
      transition: `all ${transitionDuration} ease-in-out`
    }
  }
}

export default GlobalStyles
