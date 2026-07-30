import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { getUserDetails } from "../services/summaryService";

import "../styles/userDetails.css";

function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    try {
      setLoading(true);

      const data = await getUserDetails(id);

      setUser(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load user details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "80px",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return <h2>User not found.</h2>;
  }

  const initials = user.name
    ? user.name.charAt(0).toUpperCase()
    : "?";

  const planColor = () => {
    switch (user.plan) {
      case "Premium":
        return "primary";
      case "Gold":
        return "warning";
      case "Free":
      case "Basic":
      default:
        return "default";
    }
  };

  return (
    <div className="user-details">

      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        onClick={() => navigate("/users")}
        sx={{ mb: 3 }}
      >
        Back to Users
      </Button>

      <div className="profile-header">

        <div className="avatar">
          {initials}
        </div>

        <div className="profile-info">
          <h1>{user.name}</h1>

          <p>{user.email}</p>

          <div className="chips">

            <Chip
              label={user.status}
              color={
                user.status === "Active"
                  ? "success"
                  : "error"
              }
            />

            <Chip
              label={user.plan}
              color={planColor()}
            />

          </div>

        </div>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h4>Joined</h4>

          <p>
            {new Date(
              user.created_at
            ).toLocaleDateString()}
          </p>
        </div>

        <div className="stat-card">
          <h4>Last Active</h4>

          <p>
            {user.last_active
              ? new Date(
                  user.last_active
                ).toLocaleString()
              : "-"}
          </p>
        </div>

        <div className="stat-card">
          <h4>User ID</h4>

          <p>#{user.id}</p>
        </div>

        <div className="stat-card">
          <h4>Summary Date</h4>

          <p>
            {user.summary_date
              ? new Date(
                  user.summary_date
                ).toLocaleDateString()
              : "-"}
          </p>
        </div>

      </div>

      <div className="card">
        <h3>📝 Daily Summary</h3>

        <p>
          {user.daily_summary ||
            "No summary available."}
        </p>
      </div>

      <div className="card">
        <h3>💡 Motivation</h3>

        <p>{user.motivation || "-"}</p>
      </div>

      <div className="card">

        <h3>🎯 Goal Progress</h3>

        <div className="goal-grid">

          <Chip
            label={
              user.meditation_completed
                ? "Meditation ✓"
                : "Meditation ✗"
            }
            color={
              user.meditation_completed
                ? "success"
                : "default"
            }
          />

          <Chip
            label={
              user.reading_completed
                ? "Reading ✓"
                : "Reading ✗"
            }
            color={
              user.reading_completed
                ? "success"
                : "default"
            }
          />

          <Chip
            label={
              user.gratitude_completed
                ? "Gratitude ✓"
                : "Gratitude ✗"
            }
            color={
              user.gratitude_completed
                ? "success"
                : "default"
            }
          />

        </div>

      </div>

    </div>
  );
}

export default UserDetails;