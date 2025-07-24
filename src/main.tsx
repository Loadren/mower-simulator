import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const discordDarkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5865F2',
    },
    background: {
      default: '#313338', 
      paper: '#23272A', 
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B9BBBE',
    },
    error: {
      main: '#FF0000',
      light: '#FF0000',
      dark: '#FF0000',
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'gg sans, Segoe UI, sans-serif',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={discordDarkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
