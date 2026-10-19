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
  LinearProgress,
  Divider,
} from "@mui/material";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";

import { celebrate } from "../components/ConfettiCelebration";
import { register } from "../services/authService";

// Shared input styles: ensure typed text is visible.
const inputStyles = {
  "& .MuiOutlinedInput-root": {
    height: 52,
    borderRadius: 2.5,
    bgcolor: "#fbfcff",
    "& fieldset": { borderColor: "#e1e7f0" },
    "&:hover fieldset": { borderColor: "#9aadd8" },
    "&.Mui-focused fieldset": {
      borderColor: "#2456d9",
      borderWidth: 1.5,
    },
  },
  "& .MuiInputBase-input": {
    color: "#17233e !important",
    WebkitTextFillColor: "#17233e",
    opacity: 1,
    fontSize: 14,
    fontWeight: 500,
    caretColor: "#2456d9",
    "&::placeholder": {
      color: "#8a96ac",
      WebkitTextFillColor: "#8a96ac",
      opacity: 1,
    },
  },
  "& input:-webkit-autofill": {
    WebkitTextFillColor: "#17233e",
    caretColor: "#2456d9",
    transition: "background-color 9999s ease-in-out 0s",
  },
};

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [slowConnection, setSlowConnection] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const getPasswordStrength = () => {
    const password = form.password;

    if (!password) {
      return { value: 0, text: "", color: "#94a3b8" };
    }

    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;

    if (strength >= 75) {
      return { value: strength, text: "Strong", color: "#16a34a" };
    }

    if (strength >= 50) {
      return { value: strength, text: "Medium", color: "#d97706" };
    }

    return { value: strength, text: "Weak", color: "#dc2626" };
  };

  const passwordStrength = getPasswordStrength();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading || success) return;

    setError("");
    setSuccess(false);

    const name = form.name.trim();
    const email = form.email.trim();

    if (!name || !email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (name.length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);
    setSlowConnection(false);

    const slowTimer = setTimeout(() => {
      setSlowConnection(true);
    }, 5000);

    try {
      await register({
        name,
        email,
        password: form.password,
      });

      setSuccess(true);
      celebrate();

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
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
        px: { xs: 0, sm: 2 },
        py: { xs: 3, sm: 4 },
        bgcolor: "#101828",
      }}
    >
      {/* Background video */}
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

      {/* Dark overlay */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          bgcolor: "rgba(8, 15, 35, 0.58)",
          backdropFilter: "blur(2px)",
          zIndex: 1,
        }}
      />

      {/* Main card */}
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1100,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "0.95fr 1.05fr",
          },
          overflow: "hidden",
          borderRadius: { xs: 0, sm: 4 },
          bgcolor: "rgba(255,255,255,0.96)",
          border: "1px solid rgba(255,255,255,0.65)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.3)",
        }}
      >
        {/* Left brand panel */}
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

            <Box sx={{ mt: 8 }}>
              <Typography
                sx={{
                  fontSize: { md: 34, lg: 40 },
                  fontWeight: 800,
                  lineHeight: 1.2,
                  letterSpacing: -1.2,
                  maxWidth: 390,
                }}
              >
                Great teams
                <br />
                start here.
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
                Create your account and bring your employee information,
                team records, and workplace management together in one place.
              </Typography>
            </Box>

            <Box sx={{ mt: 5, display: "grid", gap: 2.5 }}>
              {[
                {
                  icon: <GroupsRoundedIcon />,
                  title: "Organize your team",
                  desc: "Keep employee records in one place.",
                },
                {
                  icon: <TaskAltRoundedIcon />,
                  title: "Simplify your workflow",
                  desc: "Make everyday management easier.",
                },
                {
                  icon: <InsightsRoundedIcon />,
                  title: "Stay organized",
                  desc: "Access your workforce information.",
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
                      sx={{
                        color: "rgba(255,255,255,0.75)",
                        mt: 0.4,
                      }}
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

        {/* Right registration panel */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 3, sm: 6, md: 6 },
            py: { xs: 4, sm: 5 },
            bgcolor: "rgba(255,255,255,0.96)",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 390, mx: "auto" }}>
            {/* Mobile logo */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "center",
                mb: 2,
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
                <PersonAddRoundedIcon sx={{ fontSize: 32 }} />
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
              Get started
            </Typography>

            <Typography
              variant="h4"
              sx={{
                mt: 1,
                fontSize: { xs: 27, sm: 32 },
                fontWeight: 800,
                color: "#17233e",
                letterSpacing: -1,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Create your account
            </Typography>

            <Typography
              sx={{
                mt: 1.5,
                mb: 3,
                fontSize: 14,
                color: "#778198",
                lineHeight: 1.8,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Join PeopleDesk and manage your workplace with ease.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
                Account created successfully! Redirecting to login...
              </Alert>
            )}

            {slowConnection && loading && (
              <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
                The server may be waking up. Please wait...
              </Alert>
            )}

            <Box component="form" onSubmit={handleRegister}>
              {/* Full name */}
              <Typography
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#34415a",
                }}
              >
                Full name
              </Typography>

              <TextField
                fullWidth
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                disabled={loading || success}
                autoComplete="name"
                required
                inputProps={{ minLength: 2, maxLength: 100 }}
                sx={{ ...inputStyles, mb: 2.2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonRoundedIcon sx={{ color: "#8a96ac" }} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Email */}
              <Typography
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#34415a",
                }}
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
                disabled={loading || success}
                autoComplete="email"
                required
                sx={{ ...inputStyles, mb: 2.2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRoundedIcon sx={{ color: "#8a96ac" }} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Password */}
              <Typography
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#34415a",
                }}
              >
                Password
              </Typography>

              <TextField
                fullWidth
                name="password"
                placeholder="Create a password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                disabled={loading || success}
                autoComplete="new-password"
                required
                inputProps={{ minLength: 6 }}
                sx={inputStyles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRoundedIcon sx={{ color: "#8a96ac" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={() =>
                          setShowPassword((prev) => !prev)
                        }
                        disabled={loading || success}
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

              {/* Password strength */}
              {form.password && (
                <Box sx={{ mt: 1.2 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    mb={0.6}
                  >
                    <Typography fontSize={12} color="#778198">
                      Password strength
                    </Typography>

                    <Typography
                      fontSize={12}
                      fontWeight={700}
                      sx={{ color: passwordStrength.color }}
                    >
                      {passwordStrength.text}
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={passwordStrength.value}
                    sx={{
                      height: 5,
                      borderRadius: 5,
                      bgcolor: "#e9edf5",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: passwordStrength.color,
                        borderRadius: 5,
                      },
                    }}
                  />

                  <Typography
                    sx={{ mt: 0.7, fontSize: 11, color: "#8993a6" }}
                  >
                    Use 6+ characters, uppercase letters, numbers and symbols.
                  </Typography>
                </Box>
              )}

              {/* Register button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading || success}
                sx={{
                  mt: 3,
                  height: 53,
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
                      {slowConnection ? "Starting server..." : "Creating account..."}
                    </span>
                  </Box>
                ) : success ? (
                  "Account created"
                ) : (
                  "Create Account"
                )}
              </Button>
            </Box>

            <Divider sx={{ my: 2.5, borderColor: "#edf0f5" }} />

            <Typography
              textAlign="center"
              sx={{ fontSize: 13, color: "#778198" }}
            >
              Already have an account?
              <Link
                to="/"
                style={{
                  marginLeft: 5,
                  color: "#2456d9",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Sign in
              </Link>
            </Typography>

            <Typography
              sx={{
                display: { xs: "block", md: "none" },
                mt: 3,
                textAlign: "center",
                color: "#9aa3b5",
                fontSize: 11,
              }}
            >
              Secure Employee Management System
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Register;
