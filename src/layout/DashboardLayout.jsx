import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout() {

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Box sx={{ flexGrow: 1 }}>

                <Navbar />

                <Box sx={{ p: 3 }}>

                    <Outlet />

                </Box>

            </Box>

        </Box>

    );

}

export default DashboardLayout;