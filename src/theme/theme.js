import { createTheme } from "@mui/material/styles";

const getTheme = (mode) => {
  const dark = mode === "dark";

  return createTheme({
    palette: {
      mode,

      primary: {
        main: "#1976d2",
      },

      background: {
        default: dark ? "#0f172a" : "#f5f7fb",
        paper: dark ? "#1e293b" : "#ffffff",
      },

      text: {
        primary: dark ? "#f8fafc" : "#111827",
        secondary: dark ? "#94a3b8" : "#6b7280",
      },

      divider: dark
        ? "#334155"
        : "#e5e7eb",
    },

    typography: {
      fontFamily:
        "Roboto, Arial, sans-serif",
    },

    shape: {
      borderRadius: 10,
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: dark
              ? "#0f172a"
              : "#f5f7fb",

            color: dark
              ? "#f8fafc"
              : "#111827",

            transition:
              "background-color 0.25s ease, color 0.25s ease",
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: dark
              ? "#1e293b"
              : "#ffffff",

            color: dark
              ? "#f8fafc"
              : "#111827",

            borderColor: dark
              ? "#334155"
              : "#e5e7eb",
          },
        },
      },

      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: dark
                  ? "#475569"
                  : "#cbd5e1",
              },

              "&:hover fieldset": {
                borderColor: dark
                  ? "#64748b"
                  : "#94a3b8",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
              },
            },

            "& .MuiInputLabel-root": {
              color: dark
                ? "#94a3b8"
                : "#6b7280",
            },

            "& .MuiInputBase-input": {
              color: dark
                ? "#f8fafc"
                : "#111827",
            },
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: dark
              ? "#111827"
              : "#ffffff",

            color: dark
              ? "#f8fafc"
              : "#111827",

            borderColor: dark
              ? "#334155"
              : "#e5e7eb",
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: dark
              ? "#111827"
              : "#ffffff",

            color: dark
              ? "#f8fafc"
              : "#111827",

            backgroundImage: "none",
          },
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: dark
              ? "#334155"
              : "#e5e7eb",
          },
        },
      },
    },
  });
};

export default getTheme;