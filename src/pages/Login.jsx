import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
  Divider,
} from "@mui/material";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";

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
    e?.preventDefault();

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
        throw new Error("The server did not return an authentication token.");
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f4f7fc",
        p: { xs: 0, sm: 3, md: 5 },
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 1100,
          minHeight: { md: 650 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "0.95fr 1.05fr" },
          overflow: "hidden",
          borderRadius: { xs: 0, sm: 4 },
          border: { xs: "none", sm: "1px solid #e7ecf5" },
          boxShadow: {
            xs: "none",
            sm: "0 24px 70px rgba(29, 51, 89, 0.10)",
          },
        }}
      >
        {/* LEFT BRAND PANEL */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "space-between",
            p: 5,
            color: "#fff",
            background:
              "linear-gradient(145deg, #173fbd 0%, #2463eb 55%, #5687ff 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 300,
              height: 300,
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%",
              top: 170,
              right: -120,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 220,
              height: 220,
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "50%",
              top: 210,
              right: -80,
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: 2.5,
                  bgcolor: "#fff",
                  color: "#2456d9",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <BusinessRoundedIcon sx={{ fontSize: 29 }} />
              </Box>

              <Typography variant="h6" fontWeight={800}>
                PeopleDesk
              </Typography>
            </Box>

            <Box sx={{ mt: 10 }}>
              <Typography
                sx={{
                  fontSize: { md: 35, lg: 42 },
                  fontWeight: 800,
                  lineHeight: 1.2,
                  letterSpacing: -1.2,
                  maxWidth: 390,
                }}
              >
                Your people.
                <br />
                Your workplace.
                <br />
                One platform.
              </Typography>

              <Typography
                sx={{
                  mt: 2.5,
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.9,
                  fontSize: 15,
                  maxWidth: 370,
                }}
              >
                Manage your workforce, organize employee information,
                and keep your team connected from one simple dashboard.
              </Typography>
            </Box>

            <Box sx={{ mt: 5, display: "grid", gap: 2.5 }}>
              {[
                {
                  icon: <GroupsRoundedIcon />,
                  title: "Employee directory",
                  desc: "Keep employee information organized.",
                },
                {
                  icon: <TaskAltRoundedIcon />,
                  title: "Simplified management",
                  desc: "Manage records in one convenient place.",
                },
                {
                  icon: <InsightsRoundedIcon />,
                  title: "A clearer overview",
                  desc: "Access your workforce information quickly.",
                },
              ].map((item) => (
                <Box
                  key={item.title}
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <Box
                    sx={{
                      width: 43,
                      height: 43,
                      flexShrink: 0,
                      borderRadius: 2,
                      display: "grid",
                      placeItems: "center",
                      bgcolor: "rgba(255,255,255,0.14)",
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Box>
                    <Typography fontWeight={700} fontSize={14}>
                      {item.title}
                    </Typography>
                    <Typography
                      fontSize={12}
                      sx={{ color: "rgba(255,255,255,0.75)", mt: 0.4 }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Typography
            sx={{
              position: "relative",
              zIndex: 1,
              mt: 5,
              fontSize: 12,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            © {new Date().getFullYear()} PeopleDesk. Built for better teamwork.
          </Typography>
        </Box>

        {/* RIGHT LOGIN PANEL */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 3, sm: 6, md: 7 },
            py: { xs: 5, sm: 6 },
            bgcolor: "#ffffff",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 390, mx: "auto" }}>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 58,
                  height: 58,
                  borderRadius: 3,
                  display: "grid",
                  placeItems: "center",
                  color: "#fff",
                  bgcolor: "#2456d9",
                  boxShadow: "0 8px 22px rgba(36,86,217,0.25)",
                }}
              >
                <BusinessRoundedIcon sx={{ fontSize: 34 }} />
              </Box>
            </Box>

            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
                color: "#2456d9",
                letterSpacing: 1.4,
                textAlign: { xs: "center", md: "left" },
                textTransform: "uppercase",
              }}
            >
              Welcome back
            </Typography>

            <Typography
              variant="h4"
              sx={{
                mt: 1,
                fontSize: { xs: 28, sm: 33 },
                fontWeight: 800,
                color: "#17233e",
                letterSpacing: -1,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Sign in to your account
            </Typography>

            <Typography
              sx={{
                mt: 1.5,
                mb: 4,
                fontSize: 14,
                color: "#778198",
                lineHeight: 1.8,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Enter your details to access your employee dashboard.
            </Typography>

            {errorMessage && (
              <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
                {errorMessage}
              </Alert>
            )}

            {slowConnection && loading && (
              <Alert severity="info" sx={{ mb: 2.5, borderRadius: 2 }}>
                <Typography fontWeight={700} fontSize={13}>
                  Connecting to the server...
                </Typography>
                <Typography fontSize={12}>
                  The server may be waking up. Please wait while we
                  process your login.
                </Typography>
              </Alert>
            )}

            <Box component="form" onSubmit={handleLogin}>
              <Typography
                sx={{ mb: 1, fontWeight: 700, fontSize: 13, color: "#34415a" }}
              >
                Email address
              </Typography>

              <TextField
                fullWidth
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                autoComplete="email"
                required
                sx={{
                  mb: 2.5,
                  "& .MuiOutlinedInput-root": {
                    height: 54,
                    borderRadius: 2.5,
                    bgcolor: "#fbfcff",
                    "& fieldset": { borderColor: "#e1e7f0" },
                    "&:hover fieldset": { borderColor: "#9aadd8" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2456d9",
                      borderWidth: 1.5,
                    },
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailRoundedIcon sx={{ color: "#8a96ac", fontSize: 21 }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
              >
                <Typography
                  sx={{ fontWeight: 700, fontSize: 13, color: "#34415a" }}
                >
                  Password
                </Typography>

                <Link
                  to="/forgot-password"
                  style={{
                    color: "#2456d9",
                    fontSize: 12,
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Forgot password?
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
                    height: 54,
                    borderRadius: 2.5,
                    bgcolor: "#fbfcff",
                    "& fieldset": { borderColor: "#e1e7f0" },
                    "&:hover fieldset": { borderColor: "#9aadd8" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2456d9",
                      borderWidth: 1.5,
                    },
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon sx={{ color: "#8a96ac", fontSize: 21 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          disabled={loading}
                        >
                          {showPassword ? (
                            <VisibilityOffRoundedIcon />
                          ) : (
                            <VisibilityRoundedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3.5,
                  height: 54,
                  borderRadius: 2.5,
                  textTransform: "none",
                  fontSize: 15,
                  fontWeight: 700,
                  bgcolor: "#2456d9",
                  boxShadow: "0 8px 20px rgba(36,86,217,0.2)",
                  "&:hover": {
                    bgcolor: "#1946bf",
                    boxShadow: "0 10px 25px rgba(36,86,217,0.28)",
                  },
                  "&.Mui-disabled": {
                    bgcolor: "#91a8e8",
                    color: "#fff",
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

            <Divider sx={{ my: 3, borderColor: "#edf0f5" }} />

            <Typography
              textAlign="center"
              sx={{ fontSize: 13, color: "#778198" }}
            >
              New to PeopleDesk?
              <Link
                to="/register"
                style={{
                  marginLeft: 5,
                  color: "#2456d9",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Create an account
              </Link>
            </Typography>

            <Typography
              sx={{
                display: { xs: "block", md: "none" },
                mt: 5,
                textAlign: "center",
                color: "#9aa3b5",
                fontSize: 11,
              }}
            >
              Employee Management System
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;