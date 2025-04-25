// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import MuiToolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: 'all 0.3s ease-in-out',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 6),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  minHeight: theme.mixins.toolbar.minHeight,
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  backdropFilter: 'blur(10px)',
  [theme.breakpoints.down('md')]: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5)
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  width: '100%',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  padding: `${theme.spacing(0)} !important`,
  minHeight: `${theme.mixins.toolbar.minHeight}px !important`,
  transition:
    'padding .25s ease-in-out, box-shadow .25s ease-in-out, backdrop-filter .25s ease-in-out, background-color .25s ease-in-out',
  '&.scrolled': {
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(20px)',
    backgroundColor: theme.palette.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.9)' 
      : 'rgba(30, 30, 30, 0.9)'
  }
}))

const LayoutAppBar = props => {
  // ** Props
  const { settings, verticalAppBarContent: userVerticalAppBarContent } = props

  // ** Hooks
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  // ** Vars
  const { contentWidth } = settings

  // ** State for scroll effect
  const [scrolled, setScrolled] = useState(false)

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AppBar 
      elevation={scrolled ? 3 : 0} 
      color='default' 
      className='layout-navbar' 
      position='sticky'
      sx={{
        transition: 'all 0.3s ease',
        transform: scrolled ? 'translateY(0)' : 'translateY(0)',
        opacity: 1
      }}
    >
      <Toolbar
        className={`navbar-content-container ${scrolled ? 'scrolled' : ''}`}
        sx={{
          ...(contentWidth === 'boxed' && {
            '@media (min-width:1440px)': { maxWidth: `calc(1440px - ${theme.spacing(6)} * 2)` }
          })
        }}
      >
        <Box 
          sx={{ 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: isMobile ? 'space-between' : 'flex-end'
          }}
        >
          {(userVerticalAppBarContent && userVerticalAppBarContent(props)) || null}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default LayoutAppBar
