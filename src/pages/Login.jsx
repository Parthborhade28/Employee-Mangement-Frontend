import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  CssBaseline,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { celebrate } from "../components/ConfettiCelebration";
import { login } from "../services/authService";

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

// Confetti on every sign-in feels playful, not premium. Flip to true to bring it back.
const CELEBRATE_ON_LOGIN = false;

const REMEMBER_KEY = "em_remember_email";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */

const INK = "#0b1522"; // deep navy, used for the media panel and headings
const PAPER = "#ffffff";
const FIELD = "#f5f7fa";
const LINE = "#d7dee8";
const MUTED = "#566274";
const EMERALD = "#0d7a6b"; // primary action
const EMERALD_DARK = "#096558";
const MINT = "#7ee0c9"; // accent on dark surfaces only

const FONT =
  '"Manrope", "Inter", "Segoe UI", system-ui, -apple-system, Roboto, sans-serif';

const theme = createTheme({
  palette: {
    primary: { main: EMERALD, dark: EMERALD_DARK, contrastText: "#fff" },
    text: { primary: INK, secondary: MUTED },
    error: { main: "#b42318" },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: FONT,
    button: { textTransform: "none", fontWeight: 700, letterSpacing: 0 },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: FIELD,
          fontSize: 15,
          transition: "background-color .2s ease, box-shadow .2s ease",
          "& fieldset": { borderColor: LINE },
          "&:hover fieldset": { borderColor: "#9aa9bd" },
          "&.Mui-focused": {
            backgroundColor: PAPER,
            boxShadow: "0 0 0 4px rgba(13,122,107,0.15)",
          },
          "&.Mui-focused fieldset": { borderColor: EMERALD, borderWidth: 1.5 },
          "&.Mui-error.Mui-focused": {
            boxShadow: "0 0 0 4px rgba(180,35,24,0.13)",
          },
        },
        input: { padding: "15px 14px 15px 0" },
      },
    },
    MuiFormHelperText: {
      styleOverrides: { root: { marginLeft: 2, marginTop: 6, fontSize: 12.5 } },
    },
    MuiAlert: {
      styleOverrides: { root: { borderRadius: 10, alignItems: "center" } },
    },
  },
});

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const safeStorage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* storage unavailable (private mode, quota): ignore */
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};

function validate({ email, password }) {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "Enter a valid email, like name@company.com.";
  }

  if (!password) {
    errors.password = "Enter your password.";
  }

  return errors;
}

function getErrorMessage(error) {
  const status = error?.response?.status;

  if (status === 401 || status === 403) {
    return "Incorrect email or password. Check your details and try again.";
  }
  if (status === 429) {
    return "Too many attempts. Wait a few minutes, then try again.";
  }
  if (!error?.response && error?.request) {
    return "Can't reach the server. Check your connection and try again.";
  }

  return (
    error?.response?.data?.message ||
    error?.message ||
    "Unable to sign in right now. Please try again."
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

function Login() {
  const navigate = useNavigate();
  const redirectTimer = useRef(null);

  const savedEmail = useMemo(() => safeStorage.get(REMEMBER_KEY) || "", []);

  const [form, setForm] = useState({ email: savedEmail, password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [submitted, setSubmitted] = useState(false);
  const [remember, setRemember] = useState(Boolean(savedEmail));
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);

  const [loading, setLoading] = useState(false);
  const [slowConnection, setSlowConnection] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fieldErrors = validate(form);
  const showError = (name) =>
    Boolean((touched[name] || submitted) && fieldErrors[name]);

  useEffect(() => {
    return () => clearTimeout(redirectTimer.current);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (name === "password") setCapsLock(false);
  };

  const handleCapsLock = (e) => {
    if (typeof e.getModifierState === "function") {
      setCapsLock(e.getModifierState("CapsLock"));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    setSubmitted(true);

    if (Object.keys(validate(form)).length > 0) {
      return;
    }

    setLoading(true);
    setSlowConnection(false);
    setErrorMessage("");

    const slowTimer = setTimeout(() => setSlowConnection(true), 5000);

    try {
      const email = form.email.trim();

      const response = await login({ email, password: form.password });

      if (!response?.token) {
        throw new Error("Authentication token was not received.");
      }

      localStorage.setItem("token", response.token);

      if (remember) {
        safeStorage.set(REMEMBER_KEY, email);
      } else {
        safeStorage.remove(REMEMBER_KEY);
      }

      if (CELEBRATE_ON_LOGIN) celebrate();

      redirectTimer.current = setTimeout(
        () => navigate("/dashboard"),
        CELEBRATE_ON_LOGIN ? 800 : 0
      );
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(getErrorMessage(error));
    } finally {
      clearTimeout(slowTimer);
      setLoading(false);
      setSlowConnection(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          "@supports (min-height: 100dvh)": { minHeight: "100dvh" },
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1.05fr) minmax(0, 1fr)",
          },
          gridTemplateRows: { xs: "auto 1fr", md: "1fr" },
          bgcolor: INK,
          fontFamily: FONT,
        }}
      >
        {/* ---------------------------------------------------------- */}
        {/* Media panel: banner on mobile, full-height column on md+     */}
        {/* ---------------------------------------------------------- */}
        <Box
          component="aside"
          sx={{
            position: "relative",
            overflow: "hidden",
            isolation: "isolate",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: { xs: 176, sm: 208, md: "100%" },
            p: { xs: 3, sm: 4, md: 6, lg: 8 },
            background:
              "radial-gradient(120% 90% at 0% 0%, #13324a 0%, #0b1522 60%)",
          }}
        >
          <Box
            component="video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -2,
              "@media (prefers-reduced-motion: reduce)": { display: "none" },
            }}
          >
            <source src="/IMG_1446.MOV" type="video/quicktime" />
            <source src="/IMG_1446.MOV" type="video/mp4" />
          </Box>

          <Box
            aria-hidden="true"
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: -1,
              background: {
                xs: "linear-gradient(180deg, rgba(11,21,34,0.55) 0%, rgba(11,21,34,0.85) 100%)",
                md: "linear-gradient(160deg, rgba(11,21,34,0.78) 0%, rgba(11,21,34,0.5) 45%, rgba(11,21,34,0.88) 100%)",
              },
            }}
          />

          {/* Brand */}
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box
              sx={{
                width: 40,
                height: 40,
                display: "grid",
                placeItems: "center",
                borderRadius: "11px",
                bgcolor: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.22)",
                backdropFilter: "blur(6px)",
              }}
            >
              <BusinessRoundedIcon sx={{ fontSize: 22, color: MINT }} />
            </Box>
            <Typography fontWeight={700} fontSize={16.5} letterSpacing="-0.01em">
              Employee Management
            </Typography>
          </Box>

          {/* Statement (desktop only) */}
          <Box sx={{ display: { xs: "none", md: "block" }, maxWidth: 540 }}>
            <Typography
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { md: 40, lg: 54 },
                lineHeight: 1.06,
                letterSpacing: "-0.035em",
                textWrap: "balance",
              }}
            >
              People operations, without the busywork.
            </Typography>

            <Typography
              sx={{
                mt: 2.5,
                fontSize: 17,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.78)",
                maxWidth: 440,
              }}
            >
              Employee records, time off and team details in one secure
              workspace.
            </Typography>
          </Box>

          <Typography
            sx={{
              display: { xs: "none", md: "block" },
              fontSize: 13,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            &copy; {new Date().getFullYear()} Employee Management
          </Typography>
        </Box>

        {/* ---------------------------------------------------------- */}
        {/* Form panel                                                   */}
        {/* ---------------------------------------------------------- */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            bgcolor: PAPER,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 3, sm: 6 },
            py: { xs: 4, sm: 6, md: 6 },
            mt: { xs: "-20px", md: 0 },
            borderTopLeftRadius: { xs: 24, md: 0 },
            borderTopRightRadius: { xs: 24, md: 0 },
            "@keyframes panelIn": {
              from: { opacity: 0, transform: "translateY(12px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
            animation: "panelIn .5s cubic-bezier(.2,.7,.2,1) both",
            "@media (prefers-reduced-motion: reduce)": { animation: "none" },
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 400 }}>
            <Typography
              component="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: 28, sm: 32 },
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: INK,
              }}
            >
              Sign in
            </Typography>

            <Typography sx={{ mt: 1, mb: 4, color: MUTED, fontSize: 15 }}>
              Welcome back. Enter your details to continue.
            </Typography>

            {errorMessage && (
              <Alert severity="error" role="alert" sx={{ mb: 3 }}>
                {errorMessage}
              </Alert>
            )}

            {slowConnection && loading && (
              <Alert severity="info" role="status" sx={{ mb: 3 }}>
                <Typography fontWeight={700} fontSize={13.5}>
                  Starting the server
                </Typography>
                <Typography fontSize={12.5}>
                  This can take up to a minute after a period of inactivity.
                </Typography>
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleLogin}
              noValidate
              aria-busy={loading}
            >
              {/* Email */}
              <Typography
                component="label"
                htmlFor="email"
                sx={{
                  display: "block",
                  mb: 0.9,
                  fontSize: 14,
                  fontWeight: 600,
                  color: INK,
                }}
              >
                Email address
              </Typography>

              <TextField
                id="email"
                name="email"
                type="email"
                inputMode="email"
                fullWidth
                autoFocus={!savedEmail}
                autoComplete="username"
                placeholder="name@company.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                error={showError("email")}
                helperText={showError("email") ? fieldErrors.email : " "}
                inputProps={{
                  "aria-invalid": showError("email"),
                  autoCapitalize: "none",
                  spellCheck: false,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ ml: 0.5 }}>
                      <EmailOutlinedIcon sx={{ color: "#7b8799", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Password */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mt={0.5}
                mb={0.9}
              >
                <Typography
                  component="label"
                  htmlFor="password"
                  sx={{ fontSize: 14, fontWeight: 600, color: INK }}
                >
                  Password
                </Typography>

                <Box
                  component={Link}
                  to="/forgot-password"
                  sx={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: EMERALD,
                    textDecoration: "none",
                    borderRadius: 1,
                    "&:hover": { textDecoration: "underline" },
                    "&:focus-visible": {
                      outline: `2px solid ${EMERALD}`,
                      outlineOffset: 3,
                    },
                  }}
                >
                  Forgot password?
                </Box>
              </Box>

              <TextField
                id="password"
                name="password"
                fullWidth
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleCapsLock}
                onKeyUp={handleCapsLock}
                disabled={loading}
                error={showError("password")}
                helperText={
                  showError("password")
                    ? fieldErrors.password
                    : capsLock
                    ? "Caps Lock is on."
                    : " "
                }
                inputProps={{ "aria-invalid": showError("password") }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ ml: 0.5 }}>
                      <LockOutlinedIcon sx={{ color: "#7b8799", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        aria-pressed={showPassword}
                        onClick={() => setShowPassword((prev) => !prev)}
                        onMouseDown={(e) => e.preventDefault()}
                        disabled={loading}
                        edge="end"
                        sx={{ color: "#7b8799", mr: 0.25 }}
                      >
                        {showPassword ? (
                          <VisibilityOffOutlinedIcon fontSize="small" />
                        ) : (
                          <VisibilityOutlinedIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel
                sx={{ mt: 0.5, ml: -0.75 }}
                control={
                  <Checkbox
                    size="small"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    disabled={loading}
                    sx={{ "&.Mui-checked": { color: EMERALD } }}
                  />
                }
                label={
                  <Typography fontSize={14} color={MUTED}>
                    Remember my email
                  </Typography>
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disableElevation
                disabled={loading}
                sx={{
                  mt: 2.5,
                  height: 52,
                  fontSize: 15.5,
                  borderRadius: "12px",
                  bgcolor: EMERALD,
                  transition: "background-color .2s ease, transform .1s ease",
                  "&:hover": { bgcolor: EMERALD_DARK },
                  "&:active": { transform: "scale(0.99)" },
                  "&.Mui-disabled": {
                    bgcolor: EMERALD,
                    color: "#fff",
                    opacity: 0.72,
                  },
                  "&.Mui-focusVisible": {
                    outline: `3px solid ${EMERALD}`,
                    outlineOffset: 3,
                  },
                }}
              >
                {loading ? (
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <CircularProgress size={20} color="inherit" />
                    <span>
                      {slowConnection ? "Starting server..." : "Signing in..."}
                    </span>
                  </Box>
                ) : (
                  "Sign in"
                )}
              </Button>
            </Box>

            <Typography
              textAlign="center"
              sx={{ mt: 4, color: MUTED, fontSize: 14.5 }}
            >
              New to the platform?
              <Box
                component={Link}
                to="/register"
                sx={{
                  ml: 0.75,
                  fontWeight: 700,
                  color: EMERALD,
                  textDecoration: "none",
                  borderRadius: 1,
                  "&:hover": { textDecoration: "underline" },
                  "&:focus-visible": {
                    outline: `2px solid ${EMERALD}`,
                    outlineOffset: 3,
                  },
                }}
              >
                Create an account
              </Box>
            </Typography>
          </Box>

          {/* Mobile footer (desktop footer lives in the media panel) */}
          <Typography
            sx={{
              display: { xs: "block", md: "none" },
              mt: 5,
              fontSize: 12.5,
              color: "#8a95a5",
            }}
          >
            &copy; {new Date().getFullYear()} Employee Management
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Login;