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

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error("Profile error:", error);
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

    return `₹${Number(salary).toLocaleString("en-IN")}`;
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "Not available";
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

  if (!profile) {
    return (
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          width: "100%",
          bgcolor: "#f5f7fb",
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
  // INFORMATION ITEM
  // =====================================================

  const informationItems = [
    {
      label: "Full Name",
      value: profile.name || "Not available",
      icon: <PersonRoundedIcon color="primary" />,
    },
    {
      label: "Email",
      value: profile.email || "Not available",
      icon: <EmailRoundedIcon color="primary" />,
    },
    {
      label: "Role",
      value: profile.role || "Not available",
      icon: (
        <AdminPanelSettingsRoundedIcon
          color="primary"
        />
      ),
    },
    {
      label: "Department",
      value:
        profile.department || "Not assigned",
      icon: (
        <BusinessRoundedIcon color="primary" />
      ),
    },
    {
      label: "Salary",
      value: formatSalary(profile.salary),
      icon: (
        <CurrencyRupeeRoundedIcon
          color="primary"
        />
      ),
    },
    {
      label: "Joining Date",
      value: formatDate(
        profile.joiningDate
      ),
      icon: (
        <CalendarMonthRoundedIcon
          color="primary"
        />
      ),
    },
  ];

  // =====================================================
  // PROFILE PAGE
  // =====================================================

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
          {/* ================= BACK BUTTON ================= */}

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

          {/* ================= HEADING ================= */}

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: "#111827",
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
              View your account and employee
              information.
            </Typography>
          </Box>

          {/* ================= PROFILE CARD ================= */}

          <Card
            sx={{
              width: "100%",
              maxWidth: 1000,
              borderRadius: 4,
              border:
                "1px solid #e5e7eb",
              boxShadow:
                "0 4px 20px rgba(0, 0, 0, 0.04)",
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 3,
                  sm: 4,
                  md: 5,
                },
              }}
            >
              {/* ================= PROFILE HEADER ================= */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  flexWrap: "wrap",
                }}
              >
                <Avatar
                  src={profile.profileImage || undefined}
                  sx={{
                    width: 110,
                    height: 110,
                    bgcolor: "primary.main",
                    fontSize: 48,
                    fontWeight: 500,
                  }}
                >
                  {!profile.profileImage &&
                    profile.name
                      ?.charAt(0)
                      .toUpperCase()}
                </Avatar>

                <Box>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                  >
                    {profile.name}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 0.5,
                    }}
                  >
                    {profile.email}
                  </Typography>

                  <Chip
                    label={
                      profile.role === "ADMIN"
                        ? "Administrator"
                        : "Employee"
                    }
                    color="primary"
                    sx={{
                      mt: 1.5,
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* ================= INFORMATION ================= */}

              <Typography
                variant="h6"
                fontWeight={700}
                sx={{
                  mb: 2.5,
                  color: "#111827",
                }}
              >
                Account Information
              </Typography>

              <Grid
                container
                spacing={2.5}
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
                            "flex-start",
                          gap: 2,
                          p: 2.5,
                          minHeight: 80,
                          borderRadius: 3,
                          bgcolor:
                            "#f8fafc",
                          border:
                            "1px solid #edf0f4",
                          boxSizing:
                            "border-box",
                        }}
                      >
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            minWidth: 42,
                            borderRadius: 2.5,
                            bgcolor:
                              "#e8f1ff",
                            display: "flex",
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
                            fontWeight={600}
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