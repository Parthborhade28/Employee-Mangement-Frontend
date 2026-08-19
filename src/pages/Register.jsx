import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  LinearProgress,
} from "@mui/material";

import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import { celebrate } from "../components/ConfettiCelebration";
import { register } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // ================= PASSWORD STRENGTH =================

  const getPasswordStrength = () => {
    const password = form.password;

    if (!password) {
      return {
        value: 0,
        text: "",
      };
    }

    let strength = 0;

    if (password.length >= 6) {
      strength += 25;
    }

    if (/[A-Z]/.test(password)) {
      strength += 25;
    }

    if (/[0-9]/.test(password)) {
      strength += 25;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 25;
    }

    let text = "Weak";

    if (strength >= 75) {
      text = "Strong";
    } else if (strength >= 50) {
      text = "Medium";
    }

    return {
      value: strength,
      text,
    };
  };

  const passwordStrength =
    getPasswordStrength();

  // ================= REGISTER =================

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    const name = form.name.trim();
    const email = form.email.trim();

    if (!name || !email || !form.password) {
      setError(
        "Please fill all required fields."
      );
      return;
    }

    if (name.length < 2) {
      setError(
        "Name must contain at least 2 characters."
      );
      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

    await register({
  name,
  email,
  password: form.password,
});

celebrate();

setSuccess(true);

      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f7fb",
        px: {
          xs: 1.5,
          sm: 2,
        },
        py: 3,
      }}
    >

      <Card
        sx={{
          width: "100%",
          maxWidth: 450,
          borderRadius: {
            xs: 3,
            sm: 4,
          },
          boxShadow:
            "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >

        <CardContent
          sx={{
            p: {
              xs: 2.5,
              sm: 4,
            },
          }}
        >

          {/* ================= HEADER ================= */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >

            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >

              <BusinessRoundedIcon
                sx={{
                  color: "#fff",
                  fontSize: 34,
                }}
              />

            </Box>

            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              sx={{
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.125rem",
                },
              }}
            >
              Create Account
            </Typography>

            <Typography
              color="text.secondary"
              textAlign="center"
              sx={{
                mt: 0.5,
              }}
            >
              Join EMS PRO
            </Typography>

          </Box>

          {/* ================= ERROR ================= */}

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                borderRadius: 2,
              }}
            >
              {error}
            </Alert>
          )}

          {/* ================= SUCCESS ================= */}

          {success && (
            <Alert
              severity="success"
              sx={{
                mb: 2,
                borderRadius: 2,
              }}
            >
              Account created successfully!
              Redirecting to login...
            </Alert>
          )}

          {/* ================= FORM ================= */}

          <Box
            component="form"
            onSubmit={handleRegister}
          >

            {/* ================= NAME ================= */}

            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />

            {/* ================= EMAIL ================= */}

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />

            {/* ================= PASSWORD ================= */}

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={form.password}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRoundedIcon />
                  </InputAdornment>
                ),

                endAdornment: (
                  <InputAdornment position="end">

                    <IconButton
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
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
              }}
            />

            {/* ================= PASSWORD STRENGTH ================= */}

            {form.password && (
              <Box sx={{ mt: 1 }}>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    mb: 0.5,
                  }}
                >

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Password strength
                  </Typography>

                  <Typography
                    variant="caption"
                    fontWeight={600}
                  >
                    {passwordStrength.text}
                  </Typography>

                </Box>

                <LinearProgress
                  variant="determinate"
                  value={
                    passwordStrength.value
                  }
                  sx={{
                    height: 5,
                    borderRadius: 5,
                  }}
                />

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Use 6+ characters with
                  uppercase, number and symbol.
                </Typography>

              </Box>
            )}

            {/* ================= REGISTER ================= */}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading || success}
              sx={{
                mt: 3,
                height: 50,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
              }}
            >

              {loading ? (

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >

                  <CircularProgress
                    size={23}
                    color="inherit"
                  />

                  Creating Account...

                </Box>

              ) : (
                "Create Account"
              )}

            </Button>

          </Box>

          {/* ================= LOGIN ================= */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 3,
              flexWrap: "wrap",
            }}
          >

            <Typography
              color="text.secondary"
            >
              Already have an account?
            </Typography>

            <Button
              variant="text"
              onClick={() => navigate("/")}
              disabled={loading}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                p: 0,
                minWidth: "auto",
                ml: 0.5,
              }}
            >
              Login
            </Button>

          </Box>

        </CardContent>

      </Card>

    </Box>
  );
}

export default Register;