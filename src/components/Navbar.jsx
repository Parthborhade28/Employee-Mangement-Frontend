import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Chip,
  IconButton,
  CircularProgress,
} from "@mui/material";

import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

import { getProfile } from "../services/authService";

function Navbar() {

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    try {

      const data = await getProfile();

      setProfile(data);

    } catch (error) {

      console.log(error);

    }

  };

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
   <AppBar
  position="sticky"
  sx={{
    width: "100%",
    boxSizing: "border-box",
    bgcolor: "#fff",
    color: "#111827",
    borderBottom: "1px solid #e5e7eb",
  }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: 72,
        }}
      >

        <Box>

          <Typography
            variant="h5"
            fontWeight="bold"
          >
            Employee Management System
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            gap={1}
            mt={0.5}
          >

            <CalendarMonthRoundedIcon
              sx={{
                fontSize: 18,
                color: "#6b7280",
              }}
            />

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {today}
            </Typography>

          </Box>

        </Box>

        <Box
          display="flex"
          alignItems="center"
          gap={3}
        >

          <IconButton>

            <NotificationsNoneRoundedIcon />

          </IconButton>

          {profile ? (

            <>
              <Avatar
                sx={{
                  bgcolor: "#1976d2",
                }}
              >
                {profile.name.charAt(0).toUpperCase()}
              </Avatar>

              <Box>

                <Typography fontWeight={600}>
                  {profile.name}
                </Typography>

                <Chip
                  label={profile.role}
                  size="small"
                  color="primary"
                />

              </Box>
            </>

          ) : (

            <CircularProgress size={25} />

          )}

        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;