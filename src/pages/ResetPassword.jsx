import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  IconButton,
} from "@mui/material";

import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

import { resetPassword } from "../services/authService";

function ResetPassword() {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email;

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    newPassword: "",

    confirmPassword: "",

  });

  const [snackbar, setSnackbar] = useState({

    open: false,

    message: "",

    severity: "success",

  });

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleResetPassword = async () => {

    if (form.newPassword !== form.confirmPassword) {

      setSnackbar({

        open: true,

        message: "Passwords do not match",

        severity: "warning",

      });

      return;

    }

    try {

      setLoading(true);

      await resetPassword({

        email,

        newPassword: form.newPassword,

      });

      setSnackbar({

        open: true,

        message: "Password Reset Successfully",

        severity: "success",

      });

      setTimeout(() => {

        navigate("/");

      }, 1500);

    } catch (error) {

      setSnackbar({

        open: true,

        message:

          error.response?.data ||

          "Unable to reset password",

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
          width: 450,
          p: 5,
          borderRadius: 4,
        }}
      >

        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
        >

          Reset Password

        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          mb={4}
          mt={1}
        >

          Create your new password

        </Typography>

        <TextField

          fullWidth

          margin="normal"

          label="New Password"

          type={
            showPassword
              ? "text"
              : "password"
          }

          name="newPassword"

          value={form.newPassword}

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

        <TextField

          fullWidth

          margin="normal"

          label="Confirm Password"

          type={
            showConfirmPassword
              ? "text"
              : "password"
          }

          name="confirmPassword"

          value={form.confirmPassword}

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
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }

                >

                  {showConfirmPassword
                    ? <VisibilityOffRoundedIcon />
                    : <VisibilityRoundedIcon />}

                </IconButton>

              </InputAdornment>

            ),

          }}

        />

        <Button

          fullWidth

          variant="contained"

          sx={{
            mt: 4,
            height: 50,
            borderRadius: 3,
          }}

          onClick={handleResetPassword}

          disabled={loading}

        >

          {loading ? (

            <CircularProgress
              color="inherit"
              size={24}
            />

          ) : (

            "Reset Password"

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

export default ResetPassword;