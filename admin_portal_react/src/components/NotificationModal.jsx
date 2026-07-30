import { useEffect, useState } from "react";
import {
  addNotification,
  updateNotification,
} from "../services/notificationService";
import { toast } from "react-toastify";

function NotificationModal({
  mode,
  notification,
  onClose,
  onSaved,
}) {
  const [form, setForm] = useState({
    title: "",
    message: "",
    audience: "All",
    status: "Draft",
    scheduled_at: "",
  });

  useEffect(() => {
    if (mode === "edit" && notification) {
      setForm({
        title: notification.title || "",
        message: notification.message || "",
        audience: notification.audience || "All",
        status: notification.status || "Draft",
        scheduled_at: notification.scheduled_at
          ? notification.scheduled_at.slice(0, 16)
          : "",
      });
    }
  }, [mode, notification]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Title is required.");
      return;
    }

    if (!form.message.trim()) {
      toast.error("Message is required.");
      return;
    }

    try {
      if (mode === "add") {
        await addNotification(form);
        toast.success("Notification created.");
      } else {
        await updateNotification(notification.id, form);
        toast.success("Notification updated.");
      }

      onSaved();
    } catch (err) {
      console.error(err);
      toast.error("Operation failed.");
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>
          {mode === "add"
            ? "Create Notification"
            : "Edit Notification"}
        </h2>

        <form onSubmit={handleSubmit}>

          <label>Title</label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Notification title"
          />

          <label>Message</label>

          <textarea
            rows={5}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Notification message"
          />

          <label>Audience</label>

          <select
            name="audience"
            value={form.audience}
            onChange={handleChange}
          >
            <option value="All">All Users</option>
            <option value="Free">Free</option>
            <option value="Gold">Gold</option>
            <option value="Premium">Premium</option>
          </select>

          <label>Status</label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Draft">Draft</option>
            <option value="Scheduled">
              Scheduled
            </option>
            <option value="Sent">
              Sent
            </option>
          </select>

          <label>Schedule</label>

          <input
            type="datetime-local"
            name="scheduled_at"
            value={form.scheduled_at}
            onChange={handleChange}
          />

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              {mode === "add"
                ? "Create"
                : "Update"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default NotificationModal;