import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CustomTheme from './theme/customTheme';
import { ThemeProvider } from '@emotion/react';
import { ApiClientProvider } from "./context/ApiClientContext";
import { CssBaseline } from '@mui/material';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={CustomTheme}>
    {/* <ApiClientProvider> */}
      <CssBaseline />
      <App />
    {/* </ApiClientProvider> */}
  </ThemeProvider>
);
