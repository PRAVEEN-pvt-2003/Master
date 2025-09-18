import { Navigate } from "react-router-dom";

// Protect user-only pages
export function UserProtectedRoute({ children }) {
  const userToken = localStorage.getItem("userToken");
  if (!userToken) return <Navigate to="/auth" replace />;
  return children;
}

// Protect admin-only pages
export function AdminProtectedRoute({ children }) {
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) return <Navigate to="/adminlogin" replace />;
  return children;
}
