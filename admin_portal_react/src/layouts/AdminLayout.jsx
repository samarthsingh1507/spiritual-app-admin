import { Routes, Route } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Notifications from "../pages/Notifications";
import UserDetails from "../pages/UserDetails";
import NotFound from "../pages/NotFound";

import RoleRoute from "../routes/RoleRoute";

import "../styles/dashboard.css";

const AdminLayout = () => {
  return (
    <div className="container">
      <Sidebar />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route
            path="/users"
            element={
              <RoleRoute roles={["SuperAdmin", "Admin"]}>
                <Users />
              </RoleRoute>
            }
          />

          <Route
            path="/users/:id"
            element={
              <RoleRoute roles={["SuperAdmin", "Admin"]}>
                <UserDetails />
              </RoleRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <RoleRoute roles={["SuperAdmin", "Admin"]}>
                <Notifications />
              </RoleRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;