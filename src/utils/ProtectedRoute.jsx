import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated , getUserRole } from "./auth";

const ProtectedRoute = ({allowedRoles}) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

   const role = getUserRole();

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
