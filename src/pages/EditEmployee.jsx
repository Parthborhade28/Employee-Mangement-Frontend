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

import {
  getEmployeeById,
  updateEmployee,
} from "../services/employeeService";

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    loadEmployee();
  }, [id]);

  const loadEmployee = async () => {
    try {
      setLoading(true);

      const data = await getEmployeeById(id);

      setEmployee(data);
    } catch (error) {
      console.error("Error loading employee:", error);

      setSnackbar({
        open: true,
        message: "Unable to load employee",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("firstName", employee.firstName);
      formData.append("lastName", employee.lastName);
      formData.append("email", employee.email);
      formData.append("phone", employee.phone);
      formData.append("department", employee.department);
      formData.append("salary", employee.salary);
      formData.append("joiningDate", employee.joiningDate);

      if (image) {
        formData.append("profileImage", image);
      }

      await updateEmployee(id, formData);

      setSnackbar({
        open: true,
        message: "Employee Updated Successfully",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/employees");
      }, 1200);
    } catch (error) {
      console.error("Update employee error:", error);

      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Unable to Update Employee",
        severity: "error",
      });
    }
  };

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
        {/* Navbar */}

        <Navbar />

        {/* Page Content */}

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
          {/* Back Button */}

          <Button
            variant="outlined"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate("/employees")}
            sx={{
              mb: 3,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Back to Employees
          </Button>

          {/* Heading */}

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
              sx={{ mt: 0.5 }}
            >
              Update employee information.
            </Typography>
          </Box>

          {/* Loading */}

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
              existingImage={employee.profileImage}
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