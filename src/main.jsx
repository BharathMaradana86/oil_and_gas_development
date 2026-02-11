import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { PlatformProvider } from './context/PlatformContext';
import { theme } from './theme';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PlatformProvider>
        <App />
      </PlatformProvider>
    </ThemeProvider>
  </React.StrictMode>
);
