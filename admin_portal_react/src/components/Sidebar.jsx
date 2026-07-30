import { NavLink, useNavigate } from "react-router-dom";

import { logout } from "../services/authService";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    logout();

    navigate("/login", { replace: true });
  };

  return (
    <aside className="sidebar">
      <h2 className="logo">Admin Portal</h2>

      <ul>
        <li>
          <NavLink to="/">📊 Dashboard</NavLink>
        </li>

        <li>
          <NavLink to="/users">👥 User Management</NavLink>
        </li>

        <li>
          <NavLink to="/notifications">
            📢 Push Notifications
          </NavLink>
        </li>

        <li
          onClick={handleLogout}
          style={{
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          🚪 Logout
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;