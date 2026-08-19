import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { getProfile } from "../services/authService";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] =
    useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setProfile(data);
    } catch (error) {
      console.error(
        "Profile error:",
        error
      );
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
      return "Not available";
    }

    return `₹${Number(
      salary
    ).toLocaleString("en-IN")}`;
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "Not available";
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

  if (!profile) {
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
        <Sidebar />

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Navbar />

          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        </Box>
      </Box>
    );
  }

  // =====================================================
  // INFORMATION
  // =====================================================

  const informationItems = [
    {
      label: "Full Name",
      value:
        profile.name ||
        "Not available",
      icon: <PersonRoundedIcon />,
    },

    {
      label: "Email",
      value:
        profile.email ||
        "Not available",
      icon: <EmailRoundedIcon />,
    },

    {
      label: "Role",
      value:
        profile.role ||
        "Not available",
      icon: (
        <AdminPanelSettingsRoundedIcon />
      ),
    },

    {
      label: "Department",
      value:
        profile.department ||
        "Not assigned",
      icon: (
        <BusinessRoundedIcon />
      ),
    },

    {
      label: "Salary",
      value: formatSalary(
        profile.salary
      ),
      icon: (
        <CurrencyRupeeRoundedIcon />
      ),
    },

    {
      label: "Joining Date",
      value: formatDate(
        profile.joiningDate
      ),
      icon: (
        <CalendarMonthRoundedIcon />
      ),
    },
  ];

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
          flexDirection: "column",
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
              BACK
          ================================================= */}

          <Button
            variant="outlined"
            startIcon={
              <ArrowBackRoundedIcon />
            }
            onClick={() =>
              navigate("/dashboard")
            }
            sx={{
              mb: 3,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Back to Dashboard
          </Button>

          {/* =================================================
              HEADER
          ================================================= */}

          <Box sx={{ mb: 3 }}>
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
              My Profile
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 0.5,
              }}
            >
              View your account and
              employee information.
            </Typography>
          </Box>

          {/* =================================================
              PROFILE CARD
          ================================================= */}

          <Card
            sx={{
              width: "100%",
              maxWidth: 1100,

              borderRadius: 4,

              border:
                "1px solid",

              borderColor:
                "divider",

              bgcolor:
                "background.paper",

              boxShadow:
                "0 8px 30px rgba(0,0,0,0.07)",
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 2.5,
                  sm: 4,
                  md: 5,
                },
              }}
            >
              {/* =================================================
                  PROFILE HEADER
              ================================================= */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,

                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },

                  textAlign: {
                    xs: "center",
                    sm: "left",
                  },
                }}
              >
                <Avatar
                  src={
                    profile.profileImage ||
                    undefined
                  }
                  sx={{
                    width: {
                      xs: 90,
                      sm: 110,
                    },

                    height: {
                      xs: 90,
                      sm: 110,
                    },

                    bgcolor:
                      "primary.main",

                    fontSize: {
                      xs: 40,
                      sm: 48,
                    },

                    fontWeight: 700,

                    boxShadow:
                      "0 6px 20px rgba(25,118,210,0.25)",
                  }}
                >
                  {!profile.profileImage &&
                    profile.name
                      ?.charAt(0)
                      .toUpperCase()}
                </Avatar>

                <Box
                  sx={{
                    minWidth: 0,
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight={800}
                    color="text.primary"
                    sx={{
                      fontSize: {
                        xs: "1.6rem",
                        sm: "2rem",
                      },
                    }}
                  >
                    {profile.name}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 0.5,
                      wordBreak:
                        "break-word",
                    }}
                  >
                    {profile.email}
                  </Typography>

                  <Chip
                    label={
                      profile.role ===
                      "ADMIN"
                        ? "Administrator"
                        : "Employee"
                    }
                    color="primary"
                    sx={{
                      mt: 1.5,
                      fontWeight: 700,
                    }}
                  />
                </Box>
              </Box>

              <Divider
                sx={{
                  my: 4,
                }}
              />

              {/* =================================================
                  INFORMATION
              ================================================= */}

              <Typography
                variant="h6"
                fontWeight={800}
                color="text.primary"
                sx={{
                  mb: 2.5,
                }}
              >
                Account Information
              </Typography>

              <Grid
                container
                spacing={2}
              >
                {informationItems.map(
                  (item) => (
                    <Grid
                      key={item.label}
                      size={{
                        xs: 12,
                        sm: 6,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems:
                            "center",

                          gap: 2,

                          p: {
                            xs: 2,
                            sm: 2.5,
                          },

                          minHeight: 82,

                          borderRadius: 3,

                          bgcolor:
                            "action.hover",

                          border:
                            "1px solid",

                          borderColor:
                            "divider",

                          transition:
                            "0.2s ease",

                          "&:hover": {
                            borderColor:
                              "primary.main",

                            transform:
                              "translateY(-2px)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 44,
                            height: 44,

                            minWidth: 44,

                            borderRadius: 2.5,

                            bgcolor:
                              "primary.main",

                            color: "#fff",

                            display:
                              "flex",

                            alignItems:
                              "center",

                            justifyContent:
                              "center",
                          }}
                        >
                          {item.icon}
                        </Box>

                        <Box
                          sx={{
                            minWidth: 0,
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            {item.label}
                          </Typography>

                          <Typography
                            fontWeight={700}
                            color="text.primary"
                            sx={{
                              mt: 0.5,
                              wordBreak:
                                "break-word",
                            }}
                          >
                            {item.value}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  )
                )}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;