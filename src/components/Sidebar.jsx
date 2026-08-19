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
      console.error("Unable to load user role:", error);

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
    setMobileOpen(false);
  };

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

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* ================= TOP ================= */}

      <Box>
        <Toolbar
          sx={{
            px: 2,
            minHeight: 70,
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
            <BusinessRoundedIcon
              sx={{
                fontSize: 35,
                color: "#1976d2",
              }}
            />

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
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

            {/* Close button only on mobile */}

            <IconButton
              onClick={() => setMobileOpen(false)}
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
              }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Box>
        </Toolbar>

        <Divider />

        {/* ================= NAVIGATION ================= */}

        <List sx={{ p: 2 }}>
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
                  mb: 1,
                }}
              >
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={handleNavigation}
                  sx={{
                    borderRadius: 3,

                    "&.active": {
                      bgcolor: "#1976d2",
                      color: "#ffffff",

                      "& .MuiListItemIcon-root": {
                        color: "#ffffff",
                      },
                    },

                    "&:hover": {
                      bgcolor: "#1976d2",
                      color: "#ffffff",

                      "& .MuiListItemIcon-root": {
                        color: "#ffffff",
                      },
                    },
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.text}
                  />
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      </Box>

      {/* ================= LOGOUT ================= */}

      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 2 }} />

        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 3,
              color: "#d32f2f",

              "&:hover": {
                bgcolor: "#ffebee",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "#d32f2f",
              }}
            >
              <LogoutRoundedIcon />
            </ListItemIcon>

            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <>
      {/* ================= MOBILE MENU BUTTON ================= */}

      <IconButton
        onClick={() => setMobileOpen(true)}
        sx={{
          position: "fixed",
          top: 12,
          left: 12,
          zIndex: 1300,
          display: {
            xs: "flex",
            md: "none",
          },
          bgcolor: "#ffffff",
          boxShadow: 2,

          "&:hover": {
            bgcolor: "#ffffff",
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
            bgcolor: "#ffffff",
            borderRight: "1px solid #e5e7eb",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* ================= MOBILE SIDEBAR ================= */}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
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
            bgcolor: "#ffffff",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default Sidebar;