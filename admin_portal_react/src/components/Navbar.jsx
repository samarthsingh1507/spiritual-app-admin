import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <header className="navbar">
      <div>
        <h2>Admin Dashboard</h2>
        <p className="navbar-subtitle">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <div className="profile">
        <button className="notification-btn">
          <FaBell />
          <span className="notification-badge">3</span>
        </button>

        <div className="profile-info">
          <FaUserCircle className="profile-icon" />

          <div>
            <h4>Admin</h4>
            <p>Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;