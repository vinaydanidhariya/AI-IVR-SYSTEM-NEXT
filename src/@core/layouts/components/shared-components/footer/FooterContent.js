// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled } from '@mui/material/styles'

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 500,
  transition: 'color 0.2s ease, transform 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.dark,
    transform: 'translateY(-2px)'
  }
}))

const HeartIcon = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  color: theme.palette.error.main,
  animation: 'heartbeat 1.5s ease-in-out infinite',
  '@keyframes heartbeat': {
    '0%': { transform: 'scale(1)' },
    '25%': { transform: 'scale(1.1)' },
    '50%': { transform: 'scale(1)' },
    '75%': { transform: 'scale(1.1)' },
    '100%': { transform: 'scale(1)' }
  }
}))

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <Box sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      alignItems: 'center', 
      justifyContent: { xs: 'center', md: 'space-between' },
      textAlign: { xs: 'center', md: 'left' },
      width: '100%',
      padding: theme => theme.spacing(0, 1)
    }}>
      <Typography sx={{ 
        mr: 2, 
        fontSize: { xs: '0.875rem', sm: '1rem' }, 
        opacity: 0.9,
        transition: 'opacity 0.2s ease-in-out',
        '&:hover': { opacity: 1 }
      }}>
        {`© ${new Date().getFullYear()}, Made with `}
        <HeartIcon component='span'>
          ❤️
        </HeartIcon>
        {` by `}
        <StyledLink target='_blank' href='/'>
          vinaydanidhariya
        </StyledLink>
      </Typography>
    </Box>
  )
}

export default FooterContent
