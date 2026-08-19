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


      // Get logged-in user

      const profileData =
        await getProfile();

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


        setDashboard(
          dashboardData
        );


        setRecentEmployees(
          recentData
        );

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


    const numericSalary =
      Number(salary);


    if (
      Number.isNaN(numericSalary)
    ) {

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


    const parsedDate =
      new Date(date);


    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {

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

          justifyContent:
            "center",

          alignItems:
            "center",

          flexDirection:
            "column",

          gap: 2,

          bgcolor:
            "background.default",

          color:
            "text.primary",
        }}
      >

        <CircularProgress />

        <Typography
          color="text.secondary"
        >
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

          justifyContent:
            "center",

          alignItems:
            "center",

          bgcolor:
            "background.default",
        }}
      >

        <Typography
          color="text.secondary"
        >
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

          bgcolor:
            "background.default",

          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >

        {/* =================================================
            USER HEADER
        ================================================= */}

        <Box
          sx={{
            mb: {
              xs: 2.5,
              md: 3,
            },
          }}
        >

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,

              color:
                "text.primary",

              fontSize: {
                xs: "1.7rem",
                sm: "2rem",
                md: "2.25rem",
              },
            }}
          >
            My Dashboard
          </Typography>


          <Typography
            sx={{
              color:
                "text.secondary",

              mt: 0.7,

              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
              },
            }}
          >
            Welcome back, {profile.name}.
            {" "}Here is your employee
            information.
          </Typography>

        </Box>


        {/* =================================================
            PROFILE CARD
        ================================================= */}

        <Card
          sx={{
            borderRadius: 4,

            border:
              "1px solid",

            borderColor:
              "divider",

            bgcolor:
              "background.paper",

            boxShadow:
              "0 8px 30px rgba(0,0,0,0.08)",

            mb: 3,
          }}
        >

          <CardContent
            sx={{
              p: {
                xs: 2.5,
                sm: 3,
                md: 3.5,
              },
            }}
          >

            <Box
              sx={{
                display: "flex",

                alignItems:
                  "center",

                gap: {
                  xs: 2,
                  sm: 3,
                },
              }}
            >

              {/* AVATAR */}

              <Avatar
                sx={{
                  width: {
                    xs: 60,
                    sm: 76,
                  },

                  height: {
                    xs: 60,
                    sm: 76,
                  },

                  bgcolor:
                    "primary.main",

                  fontSize: {
                    xs: 25,
                    sm: 30,
                  },

                  fontWeight: 700,
                }}
              >
                {profile.name
                  ?.charAt(0)
                  ?.toUpperCase()}
              </Avatar>


              {/* PROFILE INFORMATION */}

              <Box
                sx={{
                  minWidth: 0,
                }}
              >

                <Typography
                  variant="h5"
                  fontWeight={800}
                  sx={{
                    fontSize: {
                      xs: "1.25rem",
                      sm: "1.5rem",
                    },
                  }}
                >
                  {profile.name}
                </Typography>


                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 0.3,

                    overflow:
                      "hidden",

                    textOverflow:
                      "ellipsis",

                    whiteSpace:
                      "nowrap",

                    maxWidth: {
                      xs: 220,
                      sm: 400,
                    },
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


        {/* =================================================
            EMPLOYEE INFORMATION
        ================================================= */}

        <Grid
          container
          spacing={2.5}
        >

          {/* NAME */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >

            <InformationCard
              icon={
                <PersonRoundedIcon />
              }
              title="My Name"
              value={profile.name}
              iconBg="#e8f1ff"
              iconColor="#1976d2"
            />

          </Grid>


          {/* DEPARTMENT */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >

            <InformationCard
              icon={
                <BusinessRoundedIcon />
              }
              title="Department"
              value={
                profile.department ||
                "Not assigned"
              }
              iconBg="#e8f7ee"
              iconColor="#2e7d32"
            />

          </Grid>


          {/* SALARY */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >

            <InformationCard
              icon={
                <CurrencyRupeeRoundedIcon />
              }
              title="My Salary"
              value={formatSalary(
                profile.salary
              )}
              iconBg="#fff4e5"
              iconColor="#ed6c02"
            />

          </Grid>


          {/* JOINING DATE */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >

            <InformationCard
              icon={
                <CalendarMonthRoundedIcon />
              }
              title="Joining Date"
              value={formatDate(
                profile.joiningDate
              )}
              iconBg="#f3e8ff"
              iconColor="#7b1fa2"
            />

          </Grid>

        </Grid>


        {/* =================================================
            USER NOTICE
        ================================================= */}

        <Card
          sx={{
            mt: 2.5,

            borderRadius: 4,

            border:
              "1px solid",

            borderColor:
              "divider",

            bgcolor:
              "background.paper",

            boxShadow:
              "0 6px 24px rgba(0,0,0,0.06)",
          }}
        >

          <CardContent
            sx={{
              p: {
                xs: 2.5,
                sm: 3,
              },
            }}
          >

            <Box
              sx={{
                display: "flex",

                alignItems:
                  "flex-start",

                gap: 2,
              }}
            >

              <Avatar
                sx={{
                  width: 42,
                  height: 42,

                  bgcolor:
                    "#e8f1ff",

                  color:
                    "#1976d2",

                  flexShrink: 0,
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
                  Department, salary, and
                  joining date are assigned
                  and managed by administrators.
                </Typography>

              </Box>

            </Box>

          </CardContent>

        </Card>

      </Box>

    );

  }


  // =====================================================
  // ADMIN STATISTICS
  // =====================================================

  const statCards = [

    {
      title: "Total Employees",

      value:
        dashboard?.totalEmployees ?? 0,

      icon:
        <PeopleAltRoundedIcon />,

      iconBackground:
        "#e8f1ff",

      iconColor:
        "#1976d2",
    },


    {
      title: "Departments",

      value:
        dashboard?.totalDepartments ?? 0,

      icon:
        <BusinessRoundedIcon />,

      iconBackground:
        "#e8f7ee",

      iconColor:
        "#2e7d32",
    },


    {
      title: "Average Salary",

      value:
        formatSalary(
          dashboard?.averageSalary
        ),

      icon:
        <CurrencyRupeeRoundedIcon />,

      iconBackground:
        "#fff4e5",

      iconColor:
        "#ed6c02",
    },

  ];


  // =====================================================
  // ADMIN DASHBOARD
  // =====================================================

  return (

    <Box
      sx={{
        minHeight: "100%",

        bgcolor:
          "background.default",

        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >

      {/* =================================================
          ADMIN HEADER
      ================================================= */}

      <Box
        sx={{
          mb: 3,
        }}
      >

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,

            color:
              "text.primary",

            fontSize: {
              xs: "1.7rem",
              sm: "2rem",
              md: "2.25rem",
            },
          }}
        >
          Dashboard
        </Typography>


        <Typography
          sx={{
            color:
              "text.secondary",

            mt: 0.7,

            fontSize: {
              xs: "0.9rem",
              sm: "1rem",
            },
          }}
        >
          Welcome back, {profile.name}.
          {" "}Here's an overview of your
          employee management system.
        </Typography>

      </Box>


      {/* =================================================
          STATISTICS
      ================================================= */}

      <Grid
        container
        spacing={2.5}
        sx={{
          mb: 3,
        }}
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
                  "1px solid",

                borderColor:
                  "divider",

                bgcolor:
                  "background.paper",

                boxShadow:
                  "0 6px 24px rgba(0,0,0,0.07)",

                transition:
                  "transform 0.2s ease, box-shadow 0.2s ease",

                "&:hover": {
                  transform:
                    "translateY(-3px)",

                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.12)",
                },
              }}
            >

              <CardContent
                sx={{
                  p: {
                    xs: 2.5,
                    sm: 3,
                  },
                }}
              >

                <Box
                  sx={{
                    display: "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "space-between",

                    gap: 2,
                  }}
                >

                  <Box
                    sx={{
                      minWidth: 0,
                    }}
                  >

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontWeight: 600,

                        mb: 0.8,
                      }}
                    >
                      {card.title}
                    </Typography>


                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,

                        color:
                          "text.primary",

                        fontSize: {
                          xs: "1.7rem",
                          sm: "2rem",
                        },
                      }}
                    >
                      {card.value}
                    </Typography>

                  </Box>


                  <Avatar
                    sx={{
                      width: 54,
                      height: 54,

                      bgcolor:
                        card.iconBackground,

                      color:
                        card.iconColor,

                      flexShrink: 0,
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


      {/* =================================================
          CHARTS
      ================================================= */}

      <Grid
        container
        spacing={2.5}
        sx={{
          mb: 3,
        }}
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


      {/* =================================================
          RECENT EMPLOYEES
      ================================================= */}

      <Card
        sx={{
          borderRadius: 4,

          border:
            "1px solid",

          borderColor:
            "divider",

          bgcolor:
            "background.paper",

          boxShadow:
            "0 6px 24px rgba(0,0,0,0.07)",

          overflow:
            "hidden",
        }}
      >

        {/* HEADER */}

        <Box
          sx={{
            px: {
              xs: 2.5,
              sm: 3,
            },

            py: 2.5,

            borderBottom:
              "1px solid",

            borderColor:
              "divider",
          }}
        >

          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,

              color:
                "text.primary",
            }}
          >
            Recent Employees
          </Typography>


          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
            }}
          >
            Recently added employees
            in your organization
          </Typography>

        </Box>


        {/* EMPLOYEES */}

        <Box
          sx={{
            px: {
              xs: 2,
              sm: 3,
            },
          }}
        >

          {recentEmployees.length === 0 ? (

            <Typography
              color="text.secondary"
              textAlign="center"
              py={4}
            >
              No recent employees found.
            </Typography>

          ) : (

            recentEmployees.map((emp) => (

              <Box
                key={emp.id}
                sx={{
                  display: "flex",

                  alignItems:
                    "center",

                  gap: 2,

                  py: 2,

                  borderBottom:
                    "1px solid",

                  borderColor:
                    "divider",

                  "&:last-child": {
                    borderBottom:
                      "none",
                  },

                  flexWrap: {
                    xs: "wrap",
                    sm: "nowrap",
                  },
                }}
              >

                {/* AVATAR */}

                <Avatar
                  src={
                    emp.profileImage || ""
                  }
                  sx={{
                    width: 44,
                    height: 44,

                    bgcolor:
                      "primary.main",

                    flexShrink: 0,
                  }}
                >
                  {emp.firstName
                    ?.charAt(0)
                    ?.toUpperCase()}
                </Avatar>


                {/* EMPLOYEE INFO */}

                <Box
                  sx={{
                    flex: 1,

                    minWidth: 0,
                  }}
                >

                  <Typography
                    fontWeight={700}
                    noWrap
                  >
                    {emp.firstName}{" "}
                    {emp.lastName}
                  </Typography>


                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    sx={{
                      maxWidth: {
                        xs: "180px",
                        sm: "400px",
                      },
                    }}
                  >
                    {emp.email}
                  </Typography>

                </Box>


                {/* DEPARTMENT */}

                <Chip
                  label={
                    emp.department ||
                    "Not assigned"
                  }
                  size="small"
                  sx={{
                    bgcolor:
                      "action.hover",

                    color:
                      "primary.main",

                    fontWeight: 600,

                    border:
                      "1px solid",

                    borderColor:
                      "divider",
                  }}
                />


                {/* SALARY */}

                <Typography
                  fontWeight={700}
                  sx={{
                    minWidth: {
                      xs: "auto",
                      sm: 100,
                    },

                    textAlign:
                      "right",

                    color:
                      "text.primary",

                    ml: {
                      xs: "auto",
                      sm: 0,
                    },
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


// =========================================================
// REUSABLE USER INFORMATION CARD
// =========================================================

function InformationCard({
  icon,
  title,
  value,
  iconBg,
  iconColor,
}) {

  return (

    <Card
      sx={{
        height: "100%",

        borderRadius: 4,

        border:
          "1px solid",

        borderColor:
          "divider",

        bgcolor:
          "background.paper",

        boxShadow:
          "0 6px 24px rgba(0,0,0,0.06)",

        transition:
          "transform 0.2s ease, box-shadow 0.2s ease",

        "&:hover": {
          transform:
            "translateY(-2px)",

          boxShadow:
            "0 10px 28px rgba(0,0,0,0.1)",
        },
      }}
    >

      <CardContent
        sx={{
          p: {
            xs: 2.5,
            sm: 3,
          },
        }}
      >

        <Box
          sx={{
            display: "flex",

            alignItems:
              "center",

            gap: 1.5,

            mb: 2,
          }}
        >

          <Avatar
            sx={{
              width: 42,
              height: 42,

              bgcolor:
                iconBg,

              color:
                iconColor,

              flexShrink: 0,
            }}
          >
            {icon}
          </Avatar>


          <Typography
            color="text.secondary"
            fontWeight={600}
            sx={{
              fontSize: {
                xs: "0.85rem",
                sm: "0.9rem",
              },
            }}
          >
            {title}
          </Typography>

        </Box>


        <Typography
          variant="h6"
          fontWeight={800}
          color="text.primary"
          sx={{
            wordBreak:
              "break-word",

            fontSize: {
              xs: "1.05rem",
              sm: "1.15rem",
            },
          }}
        >
          {value}
        </Typography>

      </CardContent>

    </Card>

  );
}


export default DashboardHome;