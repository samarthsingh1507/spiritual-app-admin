import { Link } from "react-router-dom";
import BlockIcon from "@mui/icons-material/Block";

function Forbidden() {
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
      <BlockIcon
        sx={{
          fontSize: 90,
          color: "#ef4444",
        }}
      />

      <h1
        style={{
          fontSize: "64px",
          margin: 0,
        }}
      >
        403
      </h1>

      <h2>Access Denied</h2>

      <p>
        You don't have permission to access this page.
      </p>

      <Link to="/">
        <button>Go to Dashboard</button>
      </Link>
    </div>
  );
}

export default Forbidden;