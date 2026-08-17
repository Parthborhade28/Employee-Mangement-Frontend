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

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EmployeeForm from "../components/EmployeeForm";

import { getProfile } from "../services/authService";
import { addEmployee } from "../services/employeeService";

function AddEmployee() {
  const navigate = useNavigate();

  // ================= PROFILE =================

  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  // ================= EMPLOYEE =================

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

  // ================= SNACKBAR =================

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ================= CHECK ROLE =================

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    try {
      setProfileLoading(true);

      const data = await getProfile();

      setProfile(data);

      // USER cannot add employees

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

  // ================= SAVE EMPLOYEE =================

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
          "Employee Added Successfully",
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
          "Unable to Add Employee",
        severity: "error",
      });
    }
  };

  // ================= LOADING =================

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
          bgcolor: "#f5f7fb",
        }}
      >
        <CircularProgress />

        <Typography
          color="text.secondary"
        >
          Checking permissions...
        </Typography>
      </Box>
    );
  }

  // ================= ACCESS DENIED =================

  if (
    !profile ||
    profile.role !== "ADMIN"
  ) {
    return null;
  }

  // ================= ADMIN PAGE =================

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#f5f7fb",
      }}
    >
      {/* ================= SIDEBAR ================= */}

      <Sidebar />

      {/* ================= MAIN CONTENT ================= */}

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ================= NAVBAR ================= */}

        <Navbar />

        {/* ================= PAGE CONTENT ================= */}

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
          {/* ================= BACK BUTTON ================= */}

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

          {/* ================= PAGE HEADING ================= */}

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: "#111827",
              }}
            >
              Add Employee
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 0.5,
              }}
            >
              Fill the employee details below.
            </Typography>
          </Box>

          {/* ================= EMPLOYEE FORM ================= */}

          <Box
            sx={{
              width: "100%",
              bgcolor: "#ffffff",
              borderRadius: 4,
              border:
                "1px solid #e5e7eb",
              boxShadow:
                "0 4px 20px rgba(0, 0, 0, 0.04)",
              p: {
                xs: 2,
                sm: 3,
                md: 4,
              },
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                mb: 3,
                color: "#111827",
              }}
            >
              Employee Information
            </Typography>

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
      </Box>

      {/* ================= SNACKBAR ================= */}

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