import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import { forgotPassword } from "../services/authService";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSendOtp = async () => {

    if (!email.trim()) {

      setSnackbar({
        open: true,
        message: "Please enter your email.",
        severity: "warning",
      });

      return;
    }

    try {

      setLoading(true);

      await forgotPassword({
        email,
      });

      setSnackbar({
        open: true,
        message: "OTP sent successfully.",
        severity: "success",
      });

      setTimeout(() => {

        navigate("/verify-otp", {
          state: { email },
        });

      }, 1200);

    } catch (error) {

      setSnackbar({
        open: true,
        message:
          error?.response?.data ||
          "Unable to send OTP.",
        severity: "error",
      });

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
        elevation={5}
        sx={{
          width: 450,
          p: 5,
          borderRadius: 4,
        }}
      >

        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate("/")}
          sx={{ mb: 2 }}
        >
          Back to Login
        </Button>

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={1}
        >
          Forgot Password
        </Typography>

        <Typography
          color="text.secondary"
          mb={4}
        >
          Enter your registered email address.
        </Typography>

        <TextField
          fullWidth
          label="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailRoundedIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 4,
            borderRadius: 3,
            height: 50,
          }}
          onClick={handleSendOtp}
          disabled={loading}
        >

          {loading ? (

            <CircularProgress
              size={24}
              color="inherit"
            />

          ) : (

            "Send OTP"

          )}

        </Button>

      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
      >

        <Alert
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>

      </Snackbar>

    </Box>

  );

}

export default ForgotPassword;