import {
  red,
  grey,
  purple,
  blue,
  cyan,
  teal,
  amber,
} from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { Noto_Sans_KR } from '@next/font/google';

export const notoSansKr = Noto_Sans_KR({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// export const blackHansSans = Black_Han_Sans({
//   weight: '400',
//   subsets: [''],
//   display: 'swap',
//   fallback: ['Helvetica', 'Arial', 'sans-serif'],
// });

export const theme = createTheme({
  palette: {
    primary: {
      main: red['A400'],
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    grey: {
      main: grey.A400,
    },
    chart: {
      ['10th']: amber[100],
      ['25th']: cyan[100],
      ['50th']: blue[500],
      ['75th']: purple[100],
      ['90th']: teal[100],
      ['user']: red[500],
    },
  },
  typography: {
    fontFamily: notoSansKr.style.fontFamily,
  },
});
