import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import {
  getDashboard,
  getRecentEmployees,
} from "../services/employeeService";

import { getProfile } from "../services/authService";

import DepartmentChart from "../pages/DepartmentChart";
import SalaryChart from "../components/SalaryChart";

function DashboardHome() {
  // =====================================================
  // PROFILE
  // =====================================================

  const [profile, setProfile] = useState(null);

  // =====================================================
  // ADMIN DASHBOARD DATA
  // =====================================================

  const [dashboard, setDashboard] = useState(null);

  const [recentEmployees, setRecentEmployees] =
    useState([]);

  const [loading, setLoading] = useState(true);

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // First get logged-in user's profile
      const profileData = await getProfile();

      setProfile(profileData);

      // =================================================
      // ADMIN ONLY
      // =================================================

      if (profileData.role === "ADMIN") {
        const [
          dashboardData,
          recentData,
        ] = await Promise.all([
          getDashboard(),
          getRecentEmployees(),
        ]);

        setDashboard(dashboardData);
        setRecentEmployees(recentData);
      }
    } catch (error) {
      console.error(
        "Dashboard loading failed:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FORMAT SALARY
  // =====================================================

  const formatSalary = (salary) => {
    if (
      salary === null ||
      salary === undefined ||
      salary === ""
    ) {
      return "Not assigned";
    }

    const numericSalary = Number(salary);

    if (Number.isNaN(numericSalary)) {
      return "Not assigned";
    }

    return `₹${Math.round(
      numericSalary
    ).toLocaleString("en-IN")}`;
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "Not assigned";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress />

        <Typography color="text.secondary">
          Loading dashboard...
        </Typography>
      </Box>
    );
  }

  // =====================================================
  // PROFILE NOT FOUND
  // =====================================================

  if (!profile) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="text.secondary">
          Unable to load profile.
        </Typography>
      </Box>
    );
  }

  // =====================================================
  // USER DASHBOARD
  // =====================================================

  if (profile.role === "USER") {
    return (
      <Box
        sx={{
          minHeight: "100%",
          bgcolor: "#f5f7fb",
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {/* ================= HEADER ================= */}

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#1f2937",
            }}
          >
            My Dashboard
          </Typography>

          <Typography
            sx={{
              color: "#6b7280",
              mt: 0.7,
            }}
          >
            Welcome back, {profile.name}.
            Here is your employee information.
          </Typography>
        </Box>

        {/* ================= PROFILE CARD ================= */}

        <Card
          sx={{
            borderRadius: 4,
            border: "1px solid #e9edf3",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.05)",
            mb: 3,
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 3,
                md: 4,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "#1976d2",
                  fontSize: 32,
                }}
              >
                {profile.name
                  ?.charAt(0)
                  ?.toUpperCase()}
              </Avatar>

              <Box>
                <Typography
                  variant="h5"
                  fontWeight={700}
                >
                  {profile.name}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 0.3,
                  }}
                >
                  {profile.email}
                </Typography>

                <Chip
                  label="Employee"
                  color="primary"
                  size="small"
                  sx={{
                    mt: 1,
                    fontWeight: 600,
                  }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* ================= MY INFORMATION ================= */}

        <Grid
          container
          spacing={3}
        >
          {/* NAME */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                border:
                  "1px solid #e9edf3",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#e8f1ff",
                      color: "#1976d2",
                    }}
                  >
                    <PersonRoundedIcon />
                  </Avatar>

                  <Typography
                    color="text.secondary"
                    fontWeight={600}
                  >
                    My Name
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  {profile.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* DEPARTMENT */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                border:
                  "1px solid #e9edf3",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#e8f7ee",
                      color: "#2e7d32",
                    }}
                  >
                    <BusinessRoundedIcon />
                  </Avatar>

                  <Typography
                    color="text.secondary"
                    fontWeight={600}
                  >
                    Department
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  {profile.department ||
                    "Not assigned"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* SALARY */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                border:
                  "1px solid #e9edf3",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#fff4e5",
                      color: "#ed6c02",
                    }}
                  >
                    <CurrencyRupeeRoundedIcon />
                  </Avatar>

                  <Typography
                    color="text.secondary"
                    fontWeight={600}
                  >
                    My Salary
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  {formatSalary(
                    profile.salary
                  )}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* JOINING DATE */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                border:
                  "1px solid #e9edf3",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#f3e8ff",
                      color: "#7b1fa2",
                    }}
                  >
                    <CalendarMonthRoundedIcon />
                  </Avatar>

                  <Typography
                    color="text.secondary"
                    fontWeight={600}
                  >
                    Joining Date
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  fontWeight={700}
                >
                  {formatDate(
                    profile.joiningDate
                  )}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* ================= USER NOTICE ================= */}

        <Card
          sx={{
            mt: 3,
            borderRadius: 4,
            border:
              "1px solid #e9edf3",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
              }}
            >
              <Avatar
                sx={{
                  width: 42,
                  height: 42,
                  bgcolor: "#e8f1ff",
                  color: "#1976d2",
                }}
              >
                <InfoOutlinedIcon />
              </Avatar>

              <Box>
                <Typography
                  fontWeight={700}
                >
                  Employee Access
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 0.5,
                    lineHeight: 1.7,
                  }}
                >
                  You can view your employee
                  information and profile.
                  Department, salary, and joining
                  date are assigned and managed
                  by administrators.
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // =====================================================
  // ADMIN DASHBOARD
  // =====================================================

  const statCards = [
    {
      title: "Total Employees",
      value:
        dashboard?.totalEmployees ?? 0,
      icon: <PeopleAltRoundedIcon />,
      iconBackground: "#e8f1ff",
      iconColor: "#1976d2",
    },
    {
      title: "Departments",
      value:
        dashboard?.totalDepartments ?? 0,
      icon: <BusinessRoundedIcon />,
      iconBackground: "#e8f7ee",
      iconColor: "#2e7d32",
    },
    {
      title: "Average Salary",
      value: formatSalary(
        dashboard?.averageSalary
      ),
      icon: <CurrencyRupeeRoundedIcon />,
      iconBackground: "#fff4e5",
      iconColor: "#ed6c02",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100%",
        bgcolor: "#f5f7fb",
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      {/* ================= ADMIN HEADER ================= */}

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
          Welcome back, {profile.name}.
          Here's an overview of your
          employee management system.
        </Typography>
      </Box>

      {/* ================= STAT CARDS ================= */}

      <Grid
        container
        spacing={3}
        sx={{ mb: 4 }}
      >
        {statCards.map((card) => (
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 4,
            }}
            key={card.title}
          >
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                border:
                  "1px solid #e9edf3",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.05)",
                transition:
                  "0.25s ease",

                "&:hover": {
                  transform:
                    "translateY(-4px)",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.09)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "space-between",
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
                      bgcolor:
                        card.iconBackground,
                      color:
                        card.iconColor,
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

      {/* ================= CHARTS ================= */}

      <Grid
        container
        spacing={3}
        sx={{ mb: 4 }}
      >
        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <DepartmentChart />
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <SalaryChart />
        </Grid>
      </Grid>

      {/* ================= RECENT EMPLOYEES ================= */}

      <Card
        sx={{
          borderRadius: 4,
          border:
            "1px solid #e9edf3",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2.5,
            borderBottom:
              "1px solid #edf0f4",
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
            Recently added employees in
            your organization
          </Typography>
        </Box>

        <Box sx={{ p: 3 }}>
          {recentEmployees.length === 0 ? (
            <Typography
              color="text.secondary"
              textAlign="center"
              py={3}
            >
              No recent employees found.
            </Typography>
          ) : (
            recentEmployees.map((emp) => (
              <Box
                key={emp.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  py: 2,

                  borderBottom:
                    "1px solid #edf0f4",

                  "&:last-child": {
                    borderBottom: "none",
                  },
                }}
              >
                <Avatar
                  src={
                    emp.profileImage || ""
                  }
                  sx={{
                    width: 44,
                    height: 44,
                    bgcolor: "#1976d2",
                  }}
                >
                  {emp.firstName
                    ?.charAt(0)
                    ?.toUpperCase()}
                </Avatar>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    fontWeight={600}
                  >
                    {emp.firstName}{" "}
                    {emp.lastName}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {emp.email}
                  </Typography>
                </Box>

                <Chip
                  label={
                    emp.department ||
                    "Not assigned"
                  }
                  size="small"
                  sx={{
                    bgcolor: "#e8f1ff",
                    color: "#1565c0",
                    fontWeight: 600,
                  }}
                />

                <Typography
                  fontWeight={600}
                  sx={{
                    minWidth: 100,
                    textAlign: "right",
                  }}
                >
                  {formatSalary(
                    emp.salary
                  )}
                </Typography>
              </Box>
            ))
          )}
        </Box>
      </Card>
    </Box>
  );
}

export default DashboardHome;