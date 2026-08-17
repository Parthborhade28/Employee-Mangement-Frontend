import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Pagination,
  Snackbar,
  Alert,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EmployeeToolbar from "../components/EmployeeToolbar";
import EmployeeTable from "../components/EmployeeTable";
import DeleteEmployeeDialog from "../components/DeleteEmployeeDialog";

import {
  getEmployeesByPage,
  searchEmployee,
  deleteEmployee,
  exportEmployees,
  exportPdf,
  importEmployees,
} from "../services/employeeService";

function Employees() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, [page]);

  const loadEmployees = async () => {
    try {
      const data = await getEmployeesByPage(page, size);

      setEmployees(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);

      setSnackbarMessage("Failed to load employees");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleSearch = async (value) => {
    setSearch(value);

    if (value.trim() === "") {
      setPage(0);
      loadEmployees();
      return;
    }

    try {
      const data = await searchEmployee(value);

      if (Array.isArray(data)) {
        setEmployees(data);
        setTotalPages(1);
      } else {
        setEmployees(data.content);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error(error);

      setSnackbarMessage("Search failed");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleImportEmployees = async (file) => {
    try {
      const message = await importEmployees(file);

      setSnackbarMessage(
        typeof message === "string"
          ? message
          : message?.message || "Employees imported successfully"
      );

      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      setPage(0);

      await loadEmployees();
    } catch (error) {
      console.error("Import error:", error);

      let errorMessage = "Failed to import employees";

      if (typeof error.response?.data === "string") {
        errorMessage = error.response.data;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteEmployee(selectedEmployee.id);

      await loadEmployees();

      setSnackbarMessage("Employee deleted successfully.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);

      setSnackbarMessage("Unable to delete employee.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setOpenDeleteDialog(false);
      setSelectedEmployee(null);
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
      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

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
            py: {
              xs: 2,
              md: 3,
            },
          }}
        >
          {/* Back Button */}

          <Box sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackRoundedIcon />}
              onClick={() => navigate("/dashboard")}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Back to Dashboard
            </Button>
          </Box>

          {/* Employee Toolbar */}

          <EmployeeToolbar
            search={search}
            onSearch={handleSearch}
            onAddEmployee={() => navigate("/add-employee")}
            onExportExcel={exportEmployees}
            onExportPdf={exportPdf}
            onImportEmployees={handleImportEmployees}
          />

          {/* Employee Table */}

          <Box
            sx={{
              width: "100%",
              bgcolor: "#ffffff",
              borderRadius: 4,
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            <EmployeeTable
              employees={employees}
              onEdit={(id) =>
                navigate(`/edit-employee/${id}`)
              }
              onDelete={(id) => {
                const employee = employees.find(
                  (e) => e.id === id
                );

                handleDeleteClick(employee);
              }}
            />
          </Box>

          {/* Pagination */}

          <Box
            display="flex"
            justifyContent="center"
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            <Pagination
              page={page + 1}
              count={totalPages}
              color="primary"
              onChange={(event, value) =>
                setPage(value - 1)
              }
            />
          </Box>
        </Box>
      </Box>

      {/* Delete Dialog */}

      <DeleteEmployeeDialog
        open={openDeleteDialog}
        employee={selectedEmployee}
        onClose={() =>
          setOpenDeleteDialog(false)
        }
        onConfirm={handleConfirmDelete}
      />

      {/* Snackbar */}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() =>
          setOpenSnackbar(false)
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          onClose={() =>
            setOpenSnackbar(false)
          }
          sx={{
            width: "100%",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Employees;