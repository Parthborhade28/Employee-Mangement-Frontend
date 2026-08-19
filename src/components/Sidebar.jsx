import { useEffect, useState } from "react";

import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  CircularProgress,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { NavLink, useNavigate } from "react-router-dom";

import { getProfile } from "../services/authService";

const drawerWidth = 250;

function Sidebar() {
  const navigate = useNavigate();

  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("md")
  );

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    loadRole();
  }, []);

  const loadRole = async () => {
    try {
      setLoading(true);

      const profile = await getProfile();

      setRole(profile.role);
    } catch (error) {
      console.error(
        "Unable to load user role:",
        error
      );

      localStorage.removeItem("token");

      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  const handleNavigation = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  // ================= ADMIN MENU =================

  const adminMenuItems = [
    {
      text: "Dashboard",
      icon: <DashboardRoundedIcon />,
      path: "/dashboard",
    },
    {
      text: "Employees",
      icon: <GroupsRoundedIcon />,
      path: "/employees",
    },
    {
      text: "Add Employee",
      icon: <PersonAddAltRoundedIcon />,
      path: "/add-employee",
    },
    {
      text: "My Profile",
      icon: <AccountCircleRoundedIcon />,
      path: "/profile",
    },
  ];

  // ================= USER MENU =================

  const userMenuItems = [
    {
      text: "My Dashboard",
      icon: <DashboardRoundedIcon />,
      path: "/dashboard",
    },
    {
      text: "My Profile",
      icon: <AccountCircleRoundedIcon />,
      path: "/profile",
    },
  ];

  const menuItems =
    role === "ADMIN"
      ? adminMenuItems
      : userMenuItems;

  // ================= DRAWER CONTENT =================

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "background.paper",
        color: "text.primary",
      }}
    >
      {/* ================= TOP ================= */}

      <Box>

        {/* LOGO */}

        <Toolbar
          sx={{
            px: 2.5,
            minHeight: 76,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              width: "100%",
            }}
          >
            {/* LOGO ICON */}

            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "primary.main",
                color: "#fff",
              }}
            >
              <BusinessRoundedIcon />
            </Box>

            {/* LOGO TEXT */}

            <Box sx={{ flex: 1 }}>

              <Typography
                variant="h6"
                fontWeight={800}
                sx={{
                  lineHeight: 1.1,
                  letterSpacing: 0.3,
                }}
              >
                EMS PRO
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Employee Management
              </Typography>

            </Box>

            {/* MOBILE CLOSE */}

            <IconButton
              onClick={() =>
                setMobileOpen(false)
              }
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
                color: "text.primary",
              }}
            >
              <CloseRoundedIcon />
            </IconButton>

          </Box>
        </Toolbar>

        <Divider />

        {/* ================= MENU ================= */}

        <List
          sx={{
            px: 1.5,
            py: 2,
          }}
        >

          {loading ? (

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 3,
              }}
            >
              <CircularProgress size={24} />
            </Box>

          ) : (

            menuItems.map((item) => (

              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  mb: 0.7,
                }}
              >

                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={handleNavigation}
                  sx={{
                    minHeight: 48,
                    px: 1.8,
                    borderRadius: 2.5,

                    color: "text.secondary",

                    transition:
                      "all 0.2s ease",

                    "& .MuiListItemIcon-root": {
                      minWidth: 42,
                      color: "text.secondary",
                    },

                    "&:hover": {
                      bgcolor:
                        theme.palette.action.hover,
                      color: "text.primary",

                      "& .MuiListItemIcon-root": {
                        color: "primary.main",
                      },
                    },

                    "&.active": {
                      bgcolor: "primary.main",
                      color: "#ffffff",

                      boxShadow:
                        "0 4px 12px rgba(25,118,210,0.25)",

                      "& .MuiListItemIcon-root": {
                        color: "#ffffff",
                      },

                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    },
                  }}
                >

                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  />

                </ListItemButton>

              </ListItem>

            ))

          )}

        </List>

      </Box>

      {/* ================= BOTTOM ================= */}

      <Box sx={{ p: 1.5 }}>

        <Divider sx={{ mb: 1.5 }} />

        <ListItem
          disablePadding
        >

          <ListItemButton
            onClick={handleLogout}
            sx={{
              minHeight: 48,
              px: 1.8,
              borderRadius: 2.5,

              color: "error.main",

              "& .MuiListItemIcon-root": {
                minWidth: 42,
                color: "error.main",
              },

              "&:hover": {
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(244,67,54,0.12)"
                    : "#ffebee",
              },
            }}
          >

            <ListItemIcon>
              <LogoutRoundedIcon />
            </ListItemIcon>

            <ListItemText
              primary="Logout"
              primaryTypographyProps={{
                fontWeight: 600,
                fontSize: 14,
              }}
            />

          </ListItemButton>

        </ListItem>

      </Box>

    </Box>
  );

  return (
    <>
      {/* ================= MOBILE MENU BUTTON ================= */}

      <IconButton
        onClick={() =>
          setMobileOpen(true)
        }
        sx={{
          position: "fixed",
          top: 12,
          left: 12,
          zIndex: 1300,

          display: {
            xs: "flex",
            md: "none",
          },

          bgcolor:
            theme.palette.background.paper,

          color: "text.primary",

          border:
            `1px solid ${theme.palette.divider}`,

          boxShadow: 2,

          "&:hover": {
            bgcolor:
              theme.palette.action.hover,
          },
        }}
      >
        <MenuRoundedIcon />
      </IconButton>

      {/* ================= DESKTOP SIDEBAR ================= */}

      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },

          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",

            bgcolor:
              "background.paper",

            color: "text.primary",

            borderRight:
              `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* ================= MOBILE SIDEBAR ================= */}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() =>
          setMobileOpen(false)
        }
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",

            bgcolor:
              "background.paper",

            color: "text.primary",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default Sidebar;