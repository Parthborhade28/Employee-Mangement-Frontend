import { Box } from "@mui/material";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardHome from "./DashboardHome";

function Dashboard() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#f5f7fb",
      }}
    >
      {/* Sidebar */}

      <Sidebar />

      {/* Main Area */}

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
            minWidth: 0,
          }}
        >
          <DashboardHome />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;