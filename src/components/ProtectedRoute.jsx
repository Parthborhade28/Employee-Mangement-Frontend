import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // User is not logged in
  if (!token) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // User is authenticated
  return children;
}

export default ProtectedRoute;