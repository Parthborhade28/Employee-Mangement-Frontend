import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";

import {
  getDashboard,
  getRecentEmployees,
} from "../services/employeeService";

import DepartmentChart from "../pages/DepartmentChart";
import SalaryChart from "../components/SalaryChart";

function DashboardHome() {
  const [dashboard, setDashboard] = useState(null);
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const [dashboardData, recentData] = await Promise.all([
        getDashboard(),
        getRecentEmployees(),
      ]);

      setDashboard(dashboardData);
      setRecentEmployees(recentData);
    } catch (error) {
      console.error("Dashboard loading failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatSalary = (salary) => {
    if (salary === null || salary === undefined) {
      return "₹0";
    }

    return `₹${Math.round(salary).toLocaleString("en-IN")}`;
  };

  const statCards = [
    {
      title: "Total Employees",
      value: dashboard?.totalEmployees ?? 0,
      icon: <PeopleAltRoundedIcon />,
      iconBackground: "#e8f1ff",
      iconColor: "#1976d2",
    },
    {
      title: "Departments",
      value: dashboard?.totalDepartments ?? 0,
      icon: <BusinessRoundedIcon />,
      iconBackground: "#e8f7ee",
      iconColor: "#2e7d32",
    },
    {
      title: "Average Salary",
      value: formatSalary(dashboard?.averageSalary),
      icon: <CurrencyRupeeRoundedIcon />,
      iconBackground: "#fff4e5",
      iconColor: "#ed6c02",
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fb",
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#1f2937",
          }}
        >
          Dashboard
        </Typography>

        <Typography
          sx={{
            color: "#6b7280",
            mt: 0.7,
          }}
        >
          Welcome back! Here's an overview of your employee management system.
        </Typography>
      </Box>

      {/* Statistic Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={card.title}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                border: "1px solid #e9edf3",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                transition: "0.25s ease",

                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.09)",
                },
              }}
            >
              <CardContent
                sx={{
                  p: 3,
                  "&:last-child": {
                    pb: 3,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6b7280",
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      {card.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      {card.value}
                    </Typography>
                  </Box>

                  <Avatar
                    sx={{
                      width: 58,
                      height: 58,
                      bgcolor: card.iconBackground,
                      color: card.iconColor,
                    }}
                  >
                    {card.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Box sx={{ height: "100%" }}>
            <DepartmentChart />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Box sx={{ height: "100%" }}>
            <SalaryChart />
          </Box>
        </Grid>
      </Grid>

      {/* Recent Employees */}
      <Card
        sx={{
          borderRadius: 4,
          border: "1px solid #e9edf3",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2.5,
            borderBottom: "1px solid #edf0f4",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#1f2937",
            }}
          >
            Recent Employees
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#6b7280",
              mt: 0.5,
            }}
          >
            Recently added employees in your organization
          </Typography>
        </Box>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: "#f8fafc",
                }}
              >
                <TableCell sx={{ fontWeight: 700 }}>Employee</TableCell>

                <TableCell sx={{ fontWeight: 700 }}>
                  Department
                </TableCell>

                <TableCell sx={{ fontWeight: 700 }}>
                  Salary
                </TableCell>

                <TableCell sx={{ fontWeight: 700 }}>
                  Joining Date
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {recentEmployees.length > 0 ? (
                recentEmployees.map((emp) => (
                  <TableRow
                    key={emp.id}
                    hover
                    sx={{
                      "&:last-child td": {
                        borderBottom: 0,
                      },
                    }}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Avatar
                          src={emp.profileImage || ""}
                          alt={`${emp.firstName} ${emp.lastName}`}
                          sx={{
                            width: 44,
                            height: 44,
                            bgcolor: "#1976d2",
                          }}
                        >
                          {emp.firstName?.charAt(0)?.toUpperCase()}
                        </Avatar>

                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: "#1f2937",
                            }}
                          >
                            {emp.firstName} {emp.lastName}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: "#6b7280",
                            }}
                          >
                            {emp.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={emp.department}
                        size="small"
                        sx={{
                          bgcolor: "#e8f1ff",
                          color: "#1565c0",
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography fontWeight={600}>
                        {formatSalary(emp.salary)}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ color: "#6b7280" }}>
                      {emp.joiningDate || "-"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="center"
                    sx={{
                      py: 6,
                      color: "#6b7280",
                    }}
                  >
                    No recent employees found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

export default DashboardHome;