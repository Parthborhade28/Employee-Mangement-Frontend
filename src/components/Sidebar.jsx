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
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";

import { NavLink, useNavigate } from "react-router-dom";

const drawerWidth = 250;

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
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

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",

          bgcolor: "#ffffff",

          borderRight: "1px solid #e5e7eb",

          height: "100vh",

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",

          overflowX: "hidden",
        },
      }}
    >
      {/* ================= TOP SECTION ================= */}

      <Box>
        {/* Logo */}

        <Toolbar
          sx={{
            minHeight: "80px !important",
            px: 2.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <BusinessRoundedIcon
              sx={{
                fontSize: 35,
                color: "#1976d2",
              }}
            />

            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  lineHeight: 1.2,
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
          </Box>
        </Toolbar>

        <Divider />

        {/* Navigation */}

        <List
          sx={{
            px: 1.5,
            py: 2,
          }}
        >
          {menuItems.map((item) => (
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
                sx={{
                  minHeight: 48,

                  borderRadius: 3,

                  px: 2,

                  color: "#374151",

                  transition: "all 0.2s ease",

                  "& .MuiListItemIcon-root": {
                    minWidth: 42,
                    color: "#6b7280",
                  },

                  "&.active": {
                    bgcolor: "#1976d2",
                    color: "#ffffff",

                    "& .MuiListItemIcon-root": {
                      color: "#ffffff",
                    },

                    "&:hover": {
                      bgcolor: "#1565c0",
                    },
                  },

                  "&:hover": {
                    bgcolor: "#eaf2ff",
                    color: "#1976d2",

                    "& .MuiListItemIcon-root": {
                      color: "#1976d2",
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>

                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* ================= BOTTOM SECTION ================= */}

      <Box
        sx={{
          p: 1.5,
        }}
      >
        <Divider
          sx={{
            mb: 1.5,
          }}
        />

        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              minHeight: 48,

              borderRadius: 3,

              color: "#d32f2f",

              px: 2,

              "& .MuiListItemIcon-root": {
                minWidth: 42,
                color: "#d32f2f",
              },

              "&:hover": {
                bgcolor: "#ffebee",
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
              }}
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
}

export default Sidebar;