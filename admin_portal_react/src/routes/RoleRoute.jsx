import { Navigate } from "react-router-dom";
import { getAdmin } from "../services/authService";

function RoleRoute({ children, roles }) {
  const admin = getAdmin();

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(admin.role)) {
    return <Navigate to="/403" replace />;
  }

  return children;
}

export default RoleRoute;