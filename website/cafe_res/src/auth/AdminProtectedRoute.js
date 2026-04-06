import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    return <Navigate to="/adminlogin" />;
  }

  return children;
}

export default AdminProtectedRoute;