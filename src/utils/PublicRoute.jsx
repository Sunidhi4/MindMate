import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getUserRole } from "./auth";

const PublicRoute = () => {
  if (isAuthenticated()) {
    const role = getUserRole();

    if (role === "USER") {
      return <Navigate to="/user/dashboard" replace />;
    }

    if (role === "EXPERT") {
      return <Navigate to="/expert/dashboard" replace />;
    }
  }

  return <Outlet />;
};

export default PublicRoute;
