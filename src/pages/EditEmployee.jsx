import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

import {
  getEmployeeById,
  updateEmployee,
} from "../services/employeeService";

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

  // ================= PROFILE =================

  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] =
    useState(true);

  // ================= EMPLOYEE =================

  const [loading, setLoading] = useState(true);

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    joiningDate: "",
    profileImage: "",
  });

  const [image, setImage] = useState(null);

  // ================= SNACKBAR =================

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ================= CHECK PROFILE =================

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    try {
      setProfileLoading(true);

      const data = await getProfile();

      setProfile(data);

      // USER cannot edit employees

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

  // ================= LOAD EMPLOYEE =================

  useEffect(() => {
    if (
      profile &&
      profile.role === "ADMIN"
    ) {
      loadEmployee();
    }
  }, [profile, id]);

  const loadEmployee = async () => {
    try {
      setLoading(true);

      const data =
        await getEmployeeById(id);

      setEmployee(data);
    } catch (error) {
      console.error(
        "Error loading employee:",
        error
      );

      setSnackbar({
        open: true,
        message:
          "Unable to load employee",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE EMPLOYEE =================

  const handleUpdate = async () => {
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

      await updateEmployee(
        id,
        formData
      );

      setSnackbar({
        open: true,
        message:
          "Employee Updated Successfully",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/employees");
      }, 1200);
    } catch (error) {
      console.error(
        "Update employee error:",
        error
      );

      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Unable to Update Employee",
        severity: "error",
      });
    }
  };

  // ================= PROFILE LOADING =================

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

      {/* ================= MAIN AREA ================= */}

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

            py: 3,
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

          {/* ================= HEADING ================= */}

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: "#111827",
              }}
            >
              Edit Employee
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 0.5,
              }}
            >
              Update employee information.
            </Typography>
          </Box>

          {/* ================= EMPLOYEE FORM ================= */}

          {loading ? (
            <Box
              sx={{
                minHeight: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <EmployeeForm
              employee={employee}
              setEmployee={setEmployee}
              image={image}
              setImage={setImage}
              existingImage={
                employee.profileImage
              }
              onSubmit={handleUpdate}
              buttonText="Update Employee"
            />
          )}
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
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default EditEmployee;