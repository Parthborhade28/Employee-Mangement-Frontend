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

  const [slowConnection, setSlowConnection] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleLogin = async () => {

    if (!form.email || !form.password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);
    setSlowConnection(false);

    // Show cold-start message after 5 seconds

    const slowTimer = setTimeout(() => {

      setSlowConnection(true);

    }, 5000);

    try {

      const response = await login(form);

    localStorage.setItem(
  "token",
  response.token
);

celebrate();

setTimeout(() => {
  navigate("/dashboard");
}, 800);

    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      alert(
        error.response?.data?.message ||
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
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f7fb",
        px: 2,
      }}
    >

      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 430,
          p: {
            xs: 3,
            sm: 5,
          },
          borderRadius: 5,
        }}
      >

        {/* ================= LOGO ================= */}

        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >

          <BusinessRoundedIcon
            color="primary"
            sx={{
              fontSize: 60,
            }}
          />

        </Box>

        {/* ================= TITLE ================= */}

        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
        >
          Employee Management
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          mb={4}
        >
          Welcome Back
        </Typography>

        {/* ================= EMAIL ================= */}

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          value={form.email}
          onChange={handleChange}
          margin="normal"
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
          margin="normal"
          label="Password"
          type={
            showPassword
              ? "text"
              : "password"
          }
          name="password"
          value={form.password}
          onChange={handleChange}
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

        {/* ================= FORGOT PASSWORD ================= */}

        <Box
          textAlign="right"
          mt={1}
        >

          <Link
            to="/forgot-password"
            style={{
              textDecoration: "none",
            }}
          >
            Forgot Password?
          </Link>

        </Box>

        {/* ================= SERVER MESSAGE ================= */}

        {slowConnection && (
          <Alert
            severity="info"
            sx={{
              mt: 2,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="body2"
              fontWeight={600}
            >
              Waking up server...
            </Typography>

            <Typography
              variant="caption"
            >
              The server is starting. This may
              take a little longer on the first
              request.
            </Typography>
          </Alert>
        )}

        {/* ================= LOGIN BUTTON ================= */}

        <Button
          fullWidth
          size="large"
          variant="contained"
          sx={{
            mt: 3,
            borderRadius: 3,
            height: 50,
            textTransform: "none",
            fontWeight: 600,
          }}
          onClick={handleLogin}
          disabled={loading}
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

              <span>
                {slowConnection
                  ? "Starting server..."
                  : "Logging in..."}
              </span>

            </Box>

          ) : (
            "Login"
          )}

        </Button>

        {/* ================= REGISTER ================= */}

        <Typography
          textAlign="center"
          mt={3}
        >

          Don't have an account?

          <Link
            to="/register"
            style={{
              textDecoration: "none",
              marginLeft: 5,
            }}
          >
            Register
          </Link>

        </Typography>

      </Paper>

    </Box>

  );

}

export default Login;