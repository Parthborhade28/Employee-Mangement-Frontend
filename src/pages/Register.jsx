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
} from "@mui/material";

import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";

import { register } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !form.name ||
      !form.email ||
      !form.password
    ) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await register(form);

      navigate("/");
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
        px: 2,
        py: 4,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 4,
          boxShadow:
            "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent sx={{ p: 4 }}>

          {/* HEADER */}

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
                width: 60,
                height: 60,
                borderRadius: "50%",
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <PersonAddRoundedIcon
                sx={{
                  color: "#fff",
                  fontSize: 30,
                }}
              />
            </Box>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              Create Account
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Register for EMS PRO
            </Typography>
          </Box>

          {/* ERROR */}

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

          {/* FORM */}

          <Box
            component="form"
            onSubmit={handleRegister}
          >

            {/* NAME */}

            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              margin="normal"
              required
            />

            {/* EMAIL */}

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              margin="normal"
              required
            />

            {/* PASSWORD */}

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              margin="normal"
              required
            />

            {/* REGISTER */}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                height: 48,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              {loading
                ? "Creating Account..."
                : "Register"}
            </Button>

          </Box>

          {/* LOGIN */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <Typography
              color="text.secondary"
              sx={{ mr: 0.5 }}
            >
              Already have an account?
            </Typography>

            <Button
              variant="text"
              onClick={() => navigate("/")}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                p: 0,
                minWidth: "auto",
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