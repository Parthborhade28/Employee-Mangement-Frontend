import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EmployeeForm from "../components/EmployeeForm";

import { getProfile } from "../services/authService";
import { addEmployee } from "../services/employeeService";

function AddEmployee() {
  const navigate = useNavigate();

  // =====================================================
  // PROFILE
  // =====================================================

  const [profile, setProfile] = useState(null);

  const [profileLoading, setProfileLoading] =
    useState(true);

  // =====================================================
  // EMPLOYEE
  // =====================================================

  const [image, setImage] = useState(null);

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    joiningDate: "",
  });

  // =====================================================
  // SNACKBAR
  // =====================================================

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // =====================================================
  // CHECK ADMIN
  // =====================================================

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    try {
      setProfileLoading(true);

      const data = await getProfile();

      setProfile(data);

      if (data.role !== "ADMIN") {
        navigate("/dashboard", {
          replace: true,
        });

        return;
      }
    } catch (error) {
      console.error(
        "Unable to load profile:",
        error
      );

      localStorage.removeItem("token");

      navigate("/", {
        replace: true,
      });
    } finally {
      setProfileLoading(false);
    }
  };

  // =====================================================
  // SAVE EMPLOYEE
  // =====================================================

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append(
        "firstName",
        employee.firstName
      );

      formData.append(
        "lastName",
        employee.lastName
      );

      formData.append(
        "email",
        employee.email
      );

      formData.append(
        "phone",
        employee.phone
      );

      formData.append(
        "department",
        employee.department
      );

      formData.append(
        "salary",
        employee.salary
      );

      formData.append(
        "joiningDate",
        employee.joiningDate
      );

      if (image) {
        formData.append(
          "profileImage",
          image
        );
      }

      await addEmployee(formData);

      setSnackbar({
        open: true,
        message:
          "Employee added successfully!",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/employees");
      }, 1200);
    } catch (error) {
      console.error(
        "Add employee error:",
        error
      );

      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Unable to add employee.",
        severity: "error",
      });
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (profileLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
          bgcolor: "background.default",
        }}
      >
        <CircularProgress />

        <Typography color="text.secondary">
          Checking permissions...
        </Typography>
      </Box>
    );
  }

  // =====================================================
  // ACCESS DENIED
  // =====================================================

  if (
    !profile ||
    profile.role !== "ADMIN"
  ) {
    return null;
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        bgcolor: "background.default",
      }}
    >
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar />

      {/* =================================================
          MAIN AREA
      ================================================= */}

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* NAVBAR */}

        <Navbar />

        {/* =================================================
            CONTENT
        ================================================= */}

        <Box
          component="main"
          sx={{
            flex: 1,
            width: "100%",
            minWidth: 0,

            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            py: {
              xs: 2,
              md: 3,
            },
          }}
        >
          {/* =================================================
              BACK BUTTON
          ================================================= */}

          <Button
            variant="outlined"
            startIcon={
              <ArrowBackRoundedIcon />
            }
            onClick={() =>
              navigate("/employees")
            }
            sx={{
              mb: 3,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Back to Employees
          </Button>

          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 0.7,
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "primary.main",
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                <PersonAddAltRoundedIcon />
              </Box>

              <Typography
                variant="h4"
                fontWeight={800}
                color="text.primary"
                sx={{
                  fontSize: {
                    xs: "1.7rem",
                    sm: "2rem",
                    md: "2.25rem",
                  },
                }}
              >
                Add Employee
              </Typography>
            </Box>

            <Typography
              color="text.secondary"
              sx={{
                ml: {
                  xs: 0,
                  sm: 6.5,
                },
                fontSize: {
                  xs: "0.9rem",
                  sm: "1rem",
                },
              }}
            >
              Add a new employee to your
              organization.
            </Typography>
          </Box>

          {/* =================================================
              EMPLOYEE FORM
          ================================================= */}

          <EmployeeForm
            employee={employee}
            setEmployee={setEmployee}
            image={image}
            setImage={setImage}
            onSubmit={handleSave}
            buttonText="Save Employee"
          />
        </Box>
      </Box>

      {/* =================================================
          SNACKBAR
      ================================================= */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() =>
            setSnackbar({
              ...snackbar,
              open: false,
            })
          }
          sx={{
            width: "100%",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddEmployee;