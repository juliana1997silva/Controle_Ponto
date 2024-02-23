import Montserrate from '../../../../assets/fonts/Montserrat/static/Montserrat-Medium.ttf';

import type { ThemeOptions } from '@mui/material/styles';
export const Typograph: ThemeOptions['typography'] = {
  fontFamily: ['Montserrat'].join(','),
  fontSize: 12
};

export const TypographComponents: ThemeOptions['components'] = {
  MuiCssBaseline: {
    styleOverrides: `
            @font-face {
                font-family: 'Montserrat';
                font-style: normal;
                font-display: swap;
                font-weight: 500;
                src: local('Montserrat'), local('Montserrat-Medium'), url('${Montserrate}') format('ttf');
                unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
        `
  }
};
