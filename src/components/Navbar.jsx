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
  Tooltip,
} from "@mui/material";

import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

import { getProfile } from "../services/authService";
import { useThemeMode } from "../theme/ThemeContext";

function Navbar() {

  const [profile, setProfile] =
    useState(null);

  const { mode, toggleTheme } =
    useThemeMode();

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

  const today =
    new Date().toLocaleDateString(
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
      elevation={0}
      sx={{
        width: "100%",
        boxSizing: "border-box",

        bgcolor: "background.paper",

        color: "text.primary",

        borderBottom:
          "1px solid",

        borderColor: "divider",
      }}
    >

      <Toolbar
        sx={{
          justifyContent:
            "space-between",

          minHeight: 72,

          px: {
            xs: 2,
            sm: 3,
          },
        }}
      >

        {/* ================= LEFT ================= */}

        <Box
          sx={{
            minWidth: 0,
          }}
        >

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              fontSize: {
                xs: "1.1rem",
                sm: "1.35rem",
                md: "1.5rem",
              },

              whiteSpace: "nowrap",

              overflow: "hidden",

              textOverflow: "ellipsis",
            }}
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
                color:
                  "text.secondary",
              }}
            />

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              {today}
            </Typography>

          </Box>

        </Box>

        {/* ================= RIGHT ================= */}

        <Box
          display="flex"
          alignItems="center"
          gap={{
            xs: 0.5,
            sm: 1.5,
          }}
        >

          {/* ================= THEME TOGGLE ================= */}

          <Tooltip
            title={
              mode === "light"
                ? "Switch to dark mode"
                : "Switch to light mode"
            }
          >

            <IconButton
              onClick={toggleTheme}
              sx={{
                color:
                  "text.primary",

                "&:hover": {
                  bgcolor:
                    "action.hover",
                },
              }}
            >

              {mode === "light" ? (
                <DarkModeRoundedIcon />
              ) : (
                <LightModeRoundedIcon />
              )}

            </IconButton>

          </Tooltip>

          {/* ================= NOTIFICATIONS ================= */}

          <Tooltip title="Notifications">

            <IconButton
              sx={{
                color:
                  "text.primary",

                "&:hover": {
                  bgcolor:
                    "action.hover",
                },
              }}
            >

              <NotificationsNoneRoundedIcon />

            </IconButton>

          </Tooltip>

          {/* ================= PROFILE ================= */}

          {profile ? (

            <Box
              display="flex"
              alignItems="center"
              gap={{
                xs: 0.5,
                sm: 1,
              }}
            >

              <Avatar
                sx={{
                  bgcolor:
                    "primary.main",

                  width: {
                    xs: 36,
                    sm: 42,
                  },

                  height: {
                    xs: 36,
                    sm: 42,
                  },
                }}
              >
                {profile.name
                  ?.charAt(0)
                  .toUpperCase()}
              </Avatar>

              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              >

                <Typography
                  fontWeight={600}
                  noWrap
                >
                  {profile.name}
                </Typography>

                <Chip
                  label={profile.role}
                  size="small"
                  color="primary"
                />

              </Box>

            </Box>

          ) : (

            <CircularProgress
              size={25}
            />

          )}

        </Box>

      </Toolbar>

    </AppBar>

  );
}

export default Navbar;