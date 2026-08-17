import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
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
function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />
        <Route
          path="/verify-otp"
          element={<VerifyOtp />}
        />
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-employee"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-employee/:id"
          element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;