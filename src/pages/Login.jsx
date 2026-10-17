
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

import { celebrate } from "../components/ConfettiCelebration";
import { login } from "../services/authService";

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
      setErrorMessage("Please enter your email and password.");
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
          "Unable to login. Please try again."
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
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        px: 2,
        py: 4,
        bgcolor: "#101828",
      }}
    >
      {/* BACKGROUND VIDEO */}
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
        }}
      >
        <source src="/IMG_1446.MOV" type="video/quicktime" />
        <source src="/IMG_1446.MOV" type="video/mp4" />
      </Box>

      {/* DARK OVERLAY */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          bgcolor: "rgba(8, 15, 35, 0.58)",
          backdropFilter: "blur(2px)",
          zIndex: 1,
        }}
      />

      {/* LOGIN CARD */}
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 460,
          boxSizing: "border-box",
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255, 255, 255, 0.65)",
          boxShadow: "0 25px 80px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* LOGO */}
        <Box display="flex" justifyContent="center" mb={2}>
          <Box
            sx={{
              width: 68,
              height: 68,
              display: "grid",
              placeItems: "center",
              borderRadius: 3,
              color: "#fff",
              background: "linear-gradient(135deg, #2563eb, #4f46e5)",
              boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)",
            }}
          >
            <BusinessRoundedIcon sx={{ fontSize: 40 }} />
          </Box>
        </Box>

        {/* TITLE */}
        <Typography
          variant="h4"
          fontWeight={800}
          textAlign="center"
          sx={{
            fontSize: { xs: 25, sm: 30 },
            letterSpacing: -0.8,
            color: "#17233e",
          }}
        >
          Employee Management
        </Typography>

        <Typography
          textAlign="center"
          sx={{
            color: "#718096",
            mt: 1,
            mb: 3.5,
            fontSize: 14,
          }}
        >
          Welcome back! Please sign in to continue.
        </Typography>

        {/* ERROR MESSAGE */}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {errorMessage}
          </Alert>
        )}

        {/* COLD START MESSAGE */}
        {slowConnection && loading && (
          <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
            <Typography fontWeight={700} fontSize={13}>
              Waking up server...
            </Typography>
            <Typography fontSize={12}>
              The server is starting. Please wait while we connect.
            </Typography>
          </Alert>
        )}

        {/* LOGIN FORM */}
        <Box component="form" onSubmit={handleLogin}>
          <Typography
            fontWeight={700}
            fontSize={13}
            color="#34415a"
            mb={1}
          >
            Email Address
          </Typography>

          <TextField
            fullWidth
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            autoComplete="email"
            required
            sx={{
              mb: 2.5,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
                bgcolor: "#f8faff",
                "& fieldset": { borderColor: "#e1e7f0" },
                "&:hover fieldset": { borderColor: "#93a9df" },
                "&.Mui-focused fieldset": {
                  borderColor: "#2563eb",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailRoundedIcon sx={{ color: "#8793a8" }} />
                </InputAdornment>
              ),
            }}
          />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Typography fontWeight={700} fontSize={13} color="#34415a">
              Password
            </Typography>

            <Link
              to="/forgot-password"
              style={{
                fontSize: 12,
                color: "#2563eb",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          <TextField
            fullWidth
            name="password"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            disabled={loading}
            autoComplete="current-password"
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
                bgcolor: "#f8faff",
                "& fieldset": { borderColor: "#e1e7f0" },
                "&:hover fieldset": { borderColor: "#93a9df" },
                "&.Mui-focused fieldset": {
                  borderColor: "#2563eb",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRoundedIcon sx={{ color: "#8793a8" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    disabled={loading}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOffRoundedIcon />
                    ) : (
                      <VisibilityRoundedIcon />
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
            sx={{
              mt: 3.5,
              height: 53,
              borderRadius: 2.5,
              textTransform: "none",
              fontSize: 15,
              fontWeight: 700,
              background: "linear-gradient(135deg, #2563eb, #4f46e5)",
              boxShadow: "0 8px 20px rgba(37, 99, 235, 0.25)",
              "&:hover": {
                background: "linear-gradient(135deg, #1d4ed8, #4338ca)",
                boxShadow: "0 10px 25px rgba(37, 99, 235, 0.35)",
              },
            }}
          >
            {loading ? (
              <Box display="flex" alignItems="center" gap={1.5}>
                <CircularProgress size={20} color="inherit" />
                <span>
                  {slowConnection ? "Starting server..." : "Logging in..."}
                </span>
              </Box>
            ) : (
              "Sign In"
            )}
          </Button>
        </Box>

        {/* REGISTER LINK */}
        <Typography
          textAlign="center"
          sx={{ mt: 3, color: "#718096", fontSize: 13 }}
        >
          Don't have an account?
          <Link
            to="/register"
            style={{
              marginLeft: 5,
              color: "#2563eb",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Create Account
          </Link>
        </Typography>

        <Typography
          textAlign="center"
          sx={{ mt: 3, fontSize: 11, color: "#9aa3b5" }}
        >
          Secure Employee Management System
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;
