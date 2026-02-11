import { createTheme } from '@mui/material/styles';

/**
 * MSIL/Hypervise-aligned palette for Oil & Gas platform
 */
export const theme = createTheme({
  palette: {
    primary: { main: '#395DAB' },
    secondary: { main: '#707784' },
    error: { main: '#FF5630' },
    success: { main: '#36b37e' },
    warning: { main: '#d29922' },
    background: {
      default: '#F4F5F6',
      paper: '#ffffff',
    },
    text: {
      primary: '#101623',
      secondary: '#707784',
      disabled: '#A0A8B0',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h5: { fontWeight: 700, color: '#101623' },
    body1: { color: '#101623' },
    body2: { color: '#707784' },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #e5e7eb',
        },
      },
    },
  },
});
