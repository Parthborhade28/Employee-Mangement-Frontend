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
} from "@mui/material";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";

import { login } from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

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

    try {

      setLoading(true);

      const response = await login(form);

      localStorage.setItem(
        "token",
        response.token
      );

      navigate("/dashboard");

    } catch (error) {

      alert("Invalid Email or Password");

    } finally {

      setLoading(false);

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
      }}
    >

      <Paper
        elevation={6}
        sx={{
          width: 430,
          p: 5,
          borderRadius: 5,
        }}
      >

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

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          value={form.email}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailRoundedIcon />
              </InputAdornment>
            ),
          }}
        />

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
                >
                  {showPassword
                    ? <VisibilityOffRoundedIcon />
                    : <VisibilityRoundedIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

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

        <Button
          fullWidth
          size="large"
          variant="contained"
          sx={{
            mt: 3,
            borderRadius: 3,
            height: 50,
          }}
          onClick={handleLogin}
          disabled={loading}
        >

          {loading
            ? <CircularProgress size={25} color="inherit" />
            : "Login"}

        </Button>

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