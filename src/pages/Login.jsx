import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";

import { celebrate } from "../components/ConfettiCelebration";
import { login } from "../services/authService";

/* ---------- design tokens ---------- */
const INK = "#0e1a2b";
const TEAL = "#0f766e";
const TEAL_DARK = "#0b5c56";
const MUTED = "#5b6678";
const LINE = "#d9e0ea";
const FIELD_BG = "#f6f8fb";

const FONT =
  '"Plus Jakarta Sans", "Inter", "Segoe UI", system-ui, -apple-system, Roboto, sans-serif';

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    bgcolor: FIELD_BG,
    fontSize: 15,
    transition: "background-color .2s, box-shadow .2s",
    "& fieldset": { borderColor: LINE },
    "&:hover fieldset": { borderColor: "#9fb0c8" },
    "&.Mui-focused": {
      bgcolor: "#fff",
      boxShadow: "0 0 0 4px rgba(15,118,110,0.14)",
    },
    "&.Mui-focused fieldset": { borderColor: TEAL, borderWidth: 1.5 },
  },
  "& .MuiOutlinedInput-input": { py: 1.65 },
};

const labelSx = {
  fontWeight: 600,
  fontSize: 13.5,
  color: INK,
  mb: 0.75,
};

const highlights = [
  { icon: GroupsRoundedIcon, text: "Employee records in one place" },
  { icon: EventAvailableRoundedIcon, text: "Leave and attendance at a glance" },
  { icon: ShieldRoundedIcon, text: "Access limited to your team" },
];

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [slowConnection, setSlowConnection] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrorMessage("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!form.email.trim() || !form.password) {
      setErrorMessage("Enter your email and password to sign in.");
      return;
    }

    setLoading(true);
    setSlowConnection(false);
    setErrorMessage("");

    const slowTimer = setTimeout(() => {
      setSlowConnection(true);
    }, 5000);

    try {
      const response = await login({
        email: form.email.trim(),
        password: form.password,
      });

      if (!response?.token) {
        throw new Error("Authentication token was not received.");
      }

      localStorage.setItem("token", response.token);

      celebrate();

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      console.error("Login error:", error);

      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Unable to sign in. Check your details and try again."
      );
    } finally {
      clearTimeout(slowTimer);
      setLoading(false);
      setSlowConnection(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        "@supports (min-height: 100dvh)": { minHeight: "100dvh" },
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: FONT,
        bgcolor: INK,
        px: { xs: 2, sm: 4, lg: 8 },
        py: { xs: 3, sm: 5 },
      }}
    >
      {/* BACKGROUND VIDEO (hidden for users who prefer reduced motion) */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        sx={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
          "@media (prefers-reduced-motion: reduce)": { display: "none" },
        }}
      >
        <source src="/IMG_1446.MOV" type="video/quicktime" />
        <source src="/IMG_1446.MOV" type="video/mp4" />
      </Box>

      {/* OVERLAY: darker on the left where the text sits */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          background: {
            xs: "rgba(14, 26, 43, 0.72)",
            md: "linear-gradient(100deg, rgba(14,26,43,0.9) 0%, rgba(14,26,43,0.68) 48%, rgba(14,26,43,0.45) 100%)",
          },
        }}
      />

      {/* CONTENT */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1120,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
          alignItems: "center",
          gap: { md: 6, lg: 10 },
        }}
      >
        {/* BRAND PANEL (tablet and up) */}
        <Box sx={{ display: { xs: "none", md: "block" }, color: "#fff" }}>
          <Box display="flex" alignItems="center" gap={1.5} mb={5}>
            <Box
              sx={{
                width: 44,
                height: 44,
                display: "grid",
                placeItems: "center",
                borderRadius: 2,
                bgcolor: TEAL,
              }}
            >
              <BusinessRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Typography fontWeight={700} fontSize={18} letterSpacing={-0.2}>
              Employee Management
            </Typography>
          </Box>

          <Typography
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { md: 40, lg: 52 },
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: 520,
            }}
          >
            Run your team from one dashboard.
          </Typography>

          <Typography
            sx={{
              mt: 2.5,
              maxWidth: 440,
              fontSize: 16.5,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.78)",
            }}
          >
            Sign in to manage people, track time off, and keep records
            current.
          </Typography>

          <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, mt: 5 }}>
            {highlights.map(({ icon: Icon, text }) => (
              <Box
                component="li"
                key={text}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 1.75,
                  fontSize: 15,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                <Icon sx={{ fontSize: 20, color: "#5eead4" }} />
                {text}
              </Box>
            ))}
          </Box>
        </Box>

        {/* LOGIN CARD */}
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: { xs: 440, md: 460 },
            justifySelf: { xs: "center", md: "end" },
            boxSizing: "border-box",
            p: { xs: 3, sm: 5 },
            borderRadius: { xs: 3, sm: 4 },
            bgcolor: "#fff",
            boxShadow: "0 30px 80px rgba(0, 0, 0, 0.35)",
            "@keyframes cardIn": {
              from: { opacity: 0, transform: "translateY(14px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
            animation: "cardIn .55s cubic-bezier(.2,.7,.2,1) both",
            "@media (prefers-reduced-motion: reduce)": { animation: "none" },
          }}
        >
          {/* Compact brand, mobile only (the brand panel covers desktop) */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              gap: 1.5,
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                display: "grid",
                placeItems: "center",
                borderRadius: 2,
                color: "#fff",
                bgcolor: TEAL,
              }}
            >
              <BusinessRoundedIcon sx={{ fontSize: 24 }} />
            </Box>
            <Typography fontWeight={700} fontSize={16} color={INK}>
              Employee Management
            </Typography>
          </Box>

          <Typography
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: 26, sm: 30 },
              letterSpacing: "-0.02em",
              color: INK,
              lineHeight: 1.15,
            }}
          >
            Sign in
          </Typography>

          <Typography sx={{ color: MUTED, mt: 0.75, mb: 3.5, fontSize: 14.5 }}>
            Use the email and password for your account.
          </Typography>

          {/* ERROR MESSAGE */}
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
              {errorMessage}
            </Alert>
          )}

          {/* COLD START MESSAGE */}
          {slowConnection && loading && (
            <Alert severity="info" sx={{ mb: 2.5, borderRadius: 2 }}>
              <Typography fontWeight={700} fontSize={13}>
                Starting the server
              </Typography>
              <Typography fontSize={12.5}>
                This can take up to a minute after a period of inactivity.
              </Typography>
            </Alert>
          )}

          {/* LOGIN FORM */}
          <Box component="form" onSubmit={handleLogin} noValidate={false}>
            <Typography component="label" htmlFor="email" display="block" sx={labelSx}>
              Email address
            </Typography>

            <TextField
              id="email"
              fullWidth
              name="email"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              autoComplete="email"
              required
              sx={{ ...fieldSx, mb: 2.5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailRoundedIcon sx={{ color: "#8591a5", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={0.75}
            >
              <Typography
                component="label"
                htmlFor="password"
                sx={{ ...labelSx, mb: 0 }}
              >
                Password
              </Typography>

              <Link
                to="/forgot-password"
                style={{
                  fontSize: 13,
                  color: TEAL,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </Link>
            </Box>

            <TextField
              id="password"
              fullWidth
              name="password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              autoComplete="current-password"
              required
              sx={fieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRoundedIcon sx={{ color: "#8591a5", fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((previous) => !previous)}
                      disabled={loading}
                      edge="end"
                      sx={{ color: "#8591a5" }}
                    >
                      {showPassword ? (
                        <VisibilityOffRoundedIcon fontSize="small" />
                      ) : (
                        <VisibilityRoundedIcon fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* LOGIN BUTTON */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              disableElevation
              sx={{
                mt: 3.5,
                height: 52,
                borderRadius: 2,
                textTransform: "none",
                fontSize: 15.5,
                fontWeight: 700,
                fontFamily: FONT,
                bgcolor: TEAL,
                transition: "background-color .2s, transform .1s",
                "&:hover": { bgcolor: TEAL_DARK },
                "&:active": { transform: "scale(0.99)" },
                "&.Mui-disabled": { bgcolor: TEAL, opacity: 0.7, color: "#fff" },
                "&.Mui-focusVisible": {
                  outline: `3px solid ${TEAL}`,
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

          {/* REGISTER LINK */}
          <Typography
            textAlign="center"
            sx={{ mt: 3.5, color: MUTED, fontSize: 14 }}
          >
            New here?
            <Link
              to="/register"
              style={{
                marginLeft: 6,
                color: TEAL,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Create an account
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default Login;
