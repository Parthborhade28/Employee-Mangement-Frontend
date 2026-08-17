import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

import { verifyOtp } from "../services/authService";

function VerifyOtp() {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email;

  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const inputRefs = useRef([]);

  const handleChange = (value, index) => {

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {

      inputRefs.current[index + 1].focus();

    }

  };

  const handleVerify = async () => {

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {

      setSnackbar({
        open: true,
        message: "Enter 6 digit OTP",
        severity: "warning",
      });

      return;

    }

    try {

      setLoading(true);

      await verifyOtp({

        email,

        otp: otpValue,

      });

      setSnackbar({
        open: true,
        message: "OTP Verified Successfully",
        severity: "success",
      });

      setTimeout(() => {

        navigate("/reset-password", {
          state: { email },
        });

      }, 1000);

    } catch (error) {

      setSnackbar({
        open: true,
        message: error.response?.data || "Invalid OTP",
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
        bgcolor: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Paper
        sx={{
          p: 5,
          width: 500,
          borderRadius: 4,
        }}
      >

        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
        >
          Verify OTP
        </Typography>

        <Typography
          color="text.secondary"
          textAlign="center"
          mt={1}
          mb={4}
        >
          Enter the OTP sent to

          <br />

          <strong>{email}</strong>

        </Typography>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
        >

          {otp.map((digit, index) => (

            <TextField

              key={index}

              inputRef={(el) =>
                inputRefs.current[index] = el
              }

              value={digit}

              onChange={(e) =>
                handleChange(
                  e.target.value,
                  index
                )
              }

              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontSize: 24,
                },
              }}

              sx={{
                width: 55,
              }}

            />

          ))}

        </Stack>

        <Button

          fullWidth

          variant="contained"

          sx={{
            mt: 4,
            height: 50,
            borderRadius: 3,
          }}

          onClick={handleVerify}

          disabled={loading}

        >

          {loading ? (

            <CircularProgress
              color="inherit"
              size={25}
            />

          ) : (

            "Verify OTP"

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

export default VerifyOtp;