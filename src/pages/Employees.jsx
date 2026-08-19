import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Pagination,
  Snackbar,
  Alert,
  CircularProgress,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EmployeeToolbar from "../components/EmployeeToolbar";
import EmployeeTable from "../components/EmployeeTable";
import DeleteEmployeeDialog from "../components/DeleteEmployeeDialog";

import { getProfile } from "../services/authService";

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

  // =====================================================
  // PROFILE
  // =====================================================

  const [profile, setProfile] =
    useState(null);

  const [profileLoading, setProfileLoading] =
    useState(true);

  // =====================================================
  // EMPLOYEES
  // =====================================================

  const [employees, setEmployees] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(0);

  const [size] =
    useState(5);

  const [totalPages, setTotalPages] =
    useState(1);

  // =====================================================
  // SNACKBAR
  // =====================================================

  const [openSnackbar, setOpenSnackbar] =
    useState(false);

  const [snackbarMessage, setSnackbarMessage] =
    useState("");

  const [snackbarSeverity, setSnackbarSeverity] =
    useState("success");

  // =====================================================
  // DELETE
  // =====================================================

  const [openDeleteDialog, setOpenDeleteDialog] =
    useState(false);

  const [selectedEmployee, setSelectedEmployee] =
    useState(null);

  // =====================================================
  // LOAD PROFILE
  // =====================================================

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setProfileLoading(true);

      const data =
        await getProfile();

      setProfile(data);

      if (
        data.role !== "ADMIN"
      ) {
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

      localStorage.removeItem(
        "token"
      );

      navigate("/", {
        replace: true,
      });
    } finally {
      setProfileLoading(false);
    }
  };

  // =====================================================
  // LOAD EMPLOYEES
  // =====================================================

  useEffect(() => {
    if (
      profile &&
      profile.role === "ADMIN"
    ) {
      loadEmployees();
    }
  }, [profile, page]);

  const loadEmployees = async () => {
    try {
      const data =
        await getEmployeesByPage(
          page,
          size
        );

      setEmployees(
        data.content
      );

      setTotalPages(
        data.totalPages
      );
    } catch (error) {
      console.error(error);

      showSnackbar(
        "Failed to load employees",
        "error"
      );
    }
  };

  // =====================================================
  // SNACKBAR HELPER
  // =====================================================

  const showSnackbar = (
    message,
    severity = "success"
  ) => {
    setSnackbarMessage(
      message
    );

    setSnackbarSeverity(
      severity
    );

    setOpenSnackbar(true);
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = async (
    value
  ) => {
    setSearch(value);

    if (
      value.trim() === ""
    ) {
      setPage(0);

      await loadEmployees();

      return;
    }

    try {
      const data =
        await searchEmployee(
          value
        );

      if (
        Array.isArray(data)
      ) {
        setEmployees(data);

        setTotalPages(1);
      } else {
        setEmployees(
          data.content
        );

        setTotalPages(
          data.totalPages
        );
      }
    } catch (error) {
      console.error(error);

      showSnackbar(
        "Search failed",
        "error"
      );
    }
  };

  // =====================================================
  // IMPORT
  // =====================================================

  const handleImportEmployees =
    async (file) => {
      try {
        const message =
          await importEmployees(
            file
          );

        showSnackbar(
          typeof message ===
            "string"
            ? message
            : message?.message ||
                "Employees imported successfully",
          "success"
        );

        setPage(0);

        await loadEmployees();
      } catch (error) {
        console.error(
          "Import error:",
          error
        );

        let errorMessage =
          "Failed to import employees";

        if (
          typeof error.response
            ?.data === "string"
        ) {
          errorMessage =
            error.response.data;
        } else if (
          error.response
            ?.data?.message
        ) {
          errorMessage =
            error.response.data.message;
        }

        showSnackbar(
          errorMessage,
          "error"
        );
      }
    };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDeleteClick = (
    employee
  ) => {
    setSelectedEmployee(
      employee
    );

    setOpenDeleteDialog(
      true
    );
  };

  const handleConfirmDelete =
    async () => {
      if (!selectedEmployee) {
        return;
      }

      try {
        await deleteEmployee(
          selectedEmployee.id
        );

        await loadEmployees();

        showSnackbar(
          "Employee deleted successfully.",
          "success"
        );
      } catch (error) {
        console.error(error);

        showSnackbar(
          "Unable to delete employee.",
          "error"
        );
      } finally {
        setOpenDeleteDialog(
          false
        );

        setSelectedEmployee(
          null
        );
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

          alignItems:
            "center",

          justifyContent:
            "center",

          bgcolor:
            "background.default",

          flexDirection:
            "column",

          gap: 2,
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

        bgcolor:
          "background.default",
      }}
    >
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <Box
        sx={{
          flex: 1,

          minWidth: 0,

          display: "flex",

          flexDirection:
            "column",
        }}
      >
        <Navbar />

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
              navigate(
                "/dashboard"
              )
            }
            sx={{
              mb: 3,

              borderRadius: 3,

              textTransform:
                "none",

              fontWeight: 600,
            }}
          >
            Back to Dashboard
          </Button>

          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",

                alignItems:
                  "center",

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

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                  bgcolor:
                    "primary.main",

                  color: "#fff",

                  flexShrink: 0,
                }}
              >
                <GroupsRoundedIcon />
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
                Employees
              </Typography>
            </Box>

            <Typography
              color="text.secondary"
              sx={{
                ml: {
                  xs: 0,
                  sm: 6.5,
                },
              }}
            >
              Manage your organization's
              employees.
            </Typography>
          </Box>

          {/* =================================================
              TOOLBAR
          ================================================= */}

          <EmployeeToolbar
            search={search}
            onSearch={
              handleSearch
            }
            onAddEmployee={() =>
              navigate(
                "/add-employee"
              )
            }
            onExportExcel={
              exportEmployees
            }
            onExportPdf={
              exportPdf
            }
            onImportEmployees={
              handleImportEmployees
            }
            isAdmin={true}
          />

          {/* =================================================
              TABLE CARD
          ================================================= */}

          <Card
            sx={{
              mt: 3,

              width: "100%",

              borderRadius: 4,

              border:
                "1px solid",

              borderColor:
                "divider",

              bgcolor:
                "background.paper",

              boxShadow:
                "0 8px 30px rgba(0,0,0,0.07)",

              overflow:
                "hidden",
            }}
          >
            <CardContent
              sx={{
                p: 0,

                "&:last-child": {
                  pb: 0,
                },
              }}
            >
              <EmployeeTable
                employees={
                  employees
                }

                onEdit={(id) =>
                  navigate(
                    `/edit-employee/${id}`
                  )
                }

                onDelete={(id) => {
                  const employee =
                    employees.find(
                      (e) =>
                        e.id === id
                    );

                  handleDeleteClick(
                    employee
                  );
                }}

                isAdmin={true}
              />
            </CardContent>
          </Card>

          {/* =================================================
              PAGINATION
          ================================================= */}

          <Box
            sx={{
              display: "flex",

              justifyContent:
                "center",

              mt: 3,

              mb: 2,
            }}
          >
            <Pagination
              page={
                page + 1
              }
              count={
                totalPages
              }
              color="primary"
              onChange={(
                event,
                value
              ) =>
                setPage(
                  value - 1
                )
              }
              sx={{
                "& .MuiPaginationItem-root":
                  {
                    borderRadius: 2,
                  },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* =================================================
          DELETE DIALOG
      ================================================= */}

      <DeleteEmployeeDialog
        open={
          openDeleteDialog
        }
        employee={
          selectedEmployee
        }
        onClose={() =>
          setOpenDeleteDialog(
            false
          )
        }
        onConfirm={
          handleConfirmDelete
        }
      />

      {/* =================================================
          SNACKBAR
      ================================================= */}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() =>
          setOpenSnackbar(
            false
          )
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity={
            snackbarSeverity
          }
          variant="filled"
          onClose={() =>
            setOpenSnackbar(
              false
            )
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