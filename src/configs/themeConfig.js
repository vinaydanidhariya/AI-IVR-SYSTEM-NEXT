const themeConfig = {
  // ** Layout Configs
  templateName: 'SMART-IVR' /* App Name */,
  mode: 'light' /* light | dark */,
  contentWidth: 'boxed' /* full | boxed */,
  // ** Routing Configs
  routingLoader: true /* true | false */,
  // ** Navigation (Menu) Configs
  menuTextTruncate: true /* true | false */,
  navigationSize: 260 /* Number in PX(Pixels) /*! Note: This is for Vertical navigation menu only */,
  // ** Other Configs
  responsiveFontSizes: true /* true | false */,
  disableRipple: false /* true | false */,
  // ** Transitions
  enableTransitions: true,
  transitionDuration: 250,
  // ** Styling Configs  
  borderRadius: 10, /* Controls default border radius for cards, buttons, etc. */
  // ** Responsive breakpoints (in pixels)
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536
  },
  // ** Default theme palette
  defaultPrimaryColor: '#7367F0',
  defaultSecondaryColor: '#82868b',
  defaultSuccessColor: '#28C76F',
  defaultInfoColor: '#00CFE8',
  defaultWarningColor: '#FF9F43',
  defaultErrorColor: '#EA5455'
}

export default themeConfig
