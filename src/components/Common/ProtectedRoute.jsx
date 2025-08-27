import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, role } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    switch (role) {
      case "admin":
        return <Navigate to="/dashboard/admin" replace />;
      case "merchant":
        return <Navigate to="/dashboard/merchant" replace />;
      case "member":
        return <Navigate to="/dashboard/member" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
