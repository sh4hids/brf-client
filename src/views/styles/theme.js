const breakpoints = ['40em', '52em', '64em', '80em'];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

export default {
  breakpoints,
  borders: {
    primary: '1px solid #FF7275',
    light: '1px solid #E9EBEC',
  },
  typography: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: '18px',
    lineHeight: 1.45,
    fontWeight: '400',
    h1: {
      fontSize: '3.052em',
      lineHeight: 1.15,
      fontWeight: 700,
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
    h2: {
      fontSize: '2.441em',
      lineHeight: 1.15,
      fontWeight: 700,
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
    h3: {
      fontSize: '1.953em',
      lineHeight: 1.15,
      fontWeight: 700,
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
    h4: {
      fontSize: '1.563em',
      lineHeight: 1.15,
      fontWeight: 700,
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
    h5: {
      fontSize: '1.25em',
      lineHeight: 1.15,
      fontWeight: 700,
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
    h6: {
      fontSize: '1em',
      lineHeight: 1.15,
      fontWeight: 700,
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
    body: {
      fontSize: '1em',
      lineHeight: 1.45,
      fontWeight: 400,
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
    caption: {
      fontSize: '.8em',
      lineHeight: 1.45,
      fontWeight: 400,
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
  },
  colors: {
    primary: '#FF7275',
    secondary: '#DB5461',
    dark: '#303334',
    lightDark: '#4E5355',
    light: '#EFF1F3',
    lighter: '#FEFFFE',
    error: '#FF3C38',
    success: '#FFCA1E',
    warning: '#78BE20',
    placeholder: '#A9AEB1',
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
};
