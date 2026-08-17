import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import AddEmployee from "./pages/AddEmployee";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import EditEmployee from "./pages/EditEmployee";
import Employees from "./pages/Employees";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";

import { getProfile } from "./services/authService";


// =====================================================
// ADMIN ROUTE
// =====================================================

function AdminRoute({ children }) {

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {

    const checkRole = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {
          setIsAdmin(false);
          return;
        }

        const profile = await getProfile();

        setIsAdmin(profile.role === "ADMIN");

      } catch (error) {

        console.error(
          "Unable to verify user role:",
          error
        );

        setIsAdmin(false);

      } finally {

        setLoading(false);

      }

    };

    checkRole();

  }, []);


  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return null;
  }


  // ===================================================
  // NOT ADMIN
  // ===================================================

  if (!isAdmin) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );

  }


  // ===================================================
  // ADMIN
  // ===================================================

  return children;
}


// =====================================================
// APP
// =====================================================

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =================================================
            PUBLIC ROUTES
        ================================================= */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOtp />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />


        {/* =================================================
            DASHBOARD
            ADMIN + USER
        ================================================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            PROFILE
            ADMIN + USER
        ================================================= */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            ADMIN ONLY - EMPLOYEES
        ================================================= */}

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <Employees />
              </AdminRoute>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            ADMIN ONLY - ADD EMPLOYEE
        ================================================= */}

        <Route
          path="/add-employee"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AddEmployee />
              </AdminRoute>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            ADMIN ONLY - EDIT EMPLOYEE
        ================================================= */}

        <Route
          path="/edit-employee/:id"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <EditEmployee />
              </AdminRoute>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            UNKNOWN ROUTE
        ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;