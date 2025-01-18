import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { CssBaseline } from "@mui/material";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="893568568269-hoiq1a7574rl1i57pv4mk020r2vpt5s5.apps.googleusercontent.com">
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>

);