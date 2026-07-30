import { Link } from "react-router-dom";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        gap: "20px",
      }}
    >
      <ErrorOutlinedIcon
        sx={{
          fontSize: 90,
          color: "#2563eb",
        }}
      />

      <h1
        style={{
          fontSize: "64px",
          margin: 0,
        }}
      >
        404
      </h1>

      <h2>Page Not Found</h2>

      <p>
        The page you're looking for doesn't exist.
      </p>

      <Link to="/">
        <button>Back to Dashboard</button>
      </Link>
    </div>
  );
}

export default NotFound;