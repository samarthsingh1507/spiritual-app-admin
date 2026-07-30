import {
  FaUsers,
  FaUserCheck,
  FaCrown,
  FaStar,
} from "react-icons/fa";

function DashboardCard({ title, value }) {
  let icon = <FaUsers />;
  let color = "#2563eb";

  switch (title) {
    case "Total Users":
      icon = <FaUsers />;
      color = "#2563eb";
      break;

    case "Active Users":
      icon = <FaUserCheck />;
      color = "#16a34a";
      break;

    case "Premium Users":
      icon = <FaStar />;
      color = "#f59e0b";
      break;

    case "Gold Users":
      icon = <FaCrown />;
      color = "#9333ea";
      break;

    default:
      break;
  }

  return (
    <div
      className="dashboard-card"
      style={{
        borderTop: `5px solid ${color}`,
      }}
    >
      <div
        style={{
          fontSize: "32px",
          color,
          marginBottom: "15px",
        }}
      >
        {icon}
      </div>

      <h3>{title}</h3>

      <h2>{value}</h2>
    </div>
  );
}

export default DashboardCard;