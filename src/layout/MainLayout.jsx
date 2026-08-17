import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <Navbar />

        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;