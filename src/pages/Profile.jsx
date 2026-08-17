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

  /* ================= LOADING ================= */

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

  /* ================= PROFILE ================= */

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
          {/* Back Button */}

          <Button
            variant="outlined"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate("/dashboard")}
            sx={{
              mb: 3,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Back to Dashboard
          </Button>

          {/* Page Heading */}

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
              View your account information and role details.
            </Typography>
          </Box>

          {/* Profile Card */}

          <Card
            sx={{
              width: "100%",
              maxWidth: 950,
              borderRadius: 4,
              border: "1px solid #e5e7eb",
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
              {/* Profile Header */}

              <Box
                display="flex"
                alignItems="center"
                gap={3}
                flexWrap="wrap"
              >
                <Avatar
                  sx={{
                    width: 110,
                    height: 110,
                    bgcolor: "primary.main",
                    fontSize: 48,
                    fontWeight: 500,
                  }}
                >
                  {profile.name
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

                  <Chip
                    label={profile.role}
                    color="primary"
                    sx={{
                      mt: 1.5,
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Profile Information */}

              <Grid container spacing={3}>
                {/* Full Name */}

                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      p: 2.5,
                      borderRadius: 3,
                      bgcolor: "#f8fafc",
                    }}
                  >
                    <PersonRoundedIcon
                      color="primary"
                    />

                    <Box>
                      <Typography
                        color="text.secondary"
                        variant="body2"
                      >
                        Full Name
                      </Typography>

                      <Typography
                        fontWeight={600}
                        sx={{ mt: 0.5 }}
                      >
                        {profile.name}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Email */}

                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      p: 2.5,
                      borderRadius: 3,
                      bgcolor: "#f8fafc",
                    }}
                  >
                    <EmailRoundedIcon
                      color="primary"
                    />

                    <Box>
                      <Typography
                        color="text.secondary"
                        variant="body2"
                      >
                        Email
                      </Typography>

                      <Typography
                        fontWeight={600}
                        sx={{
                          mt: 0.5,
                          wordBreak: "break-word",
                        }}
                      >
                        {profile.email}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Role */}

                <Grid size={{ xs: 12 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      p: 2.5,
                      borderRadius: 3,
                      bgcolor: "#f8fafc",
                    }}
                  >
                    <AdminPanelSettingsRoundedIcon
                      color="primary"
                    />

                    <Box>
                      <Typography
                        color="text.secondary"
                        variant="body2"
                      >
                        Role
                      </Typography>

                      <Typography
                        fontWeight={600}
                        sx={{ mt: 0.5 }}
                      >
                        {profile.role}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;