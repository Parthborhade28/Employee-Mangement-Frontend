import React from "react";
import ReactDOM from "react-dom/client";

import {
  ThemeProvider,
} from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";

import {
  ThemeModeProvider,
} from "./theme/ThemeContext";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <ThemeModeProvider>

      {(theme) => (

        <ThemeProvider theme={theme}>

          <CssBaseline />

          <App />

        </ThemeProvider>

      )}

    </ThemeModeProvider>

  </React.StrictMode>
);