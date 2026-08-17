import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  palette: {
    primary: {
      main: "#1976d2",
    },

    secondary: {
      main: "#2e7d32",
    },

    success: {
      main: "#2e7d32",
    },

    error: {
      main: "#d32f2f",
    },

    warning: {
      main: "#ed6c02",
    },

    background: {
      default: "#f5f7fb",
      paper: "#ffffff",
    },
  },

  typography: {
    fontFamily: "Poppins, Roboto, sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {

    MuiButton: {

      styleOverrides: {

        root: {

          borderRadius: 12,

          height: 45,

        },

      },

    },

    MuiCard: {

      styleOverrides: {

        root: {

          borderRadius: 16,

          boxShadow: "0 5px 20px rgba(0,0,0,.06)",

        },

      },

    },

    MuiTextField: {

      defaultProps: {

        fullWidth: true,

        variant: "outlined",

      },

    },

  },

});

export default theme;