import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  addUser,
  updateUser,
} from "../services/userService";

function UserModal({ mode, user, onClose, onUserAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    plan: "Basic",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);

  // Fill form while editing
  useEffect(() => {
    if (mode === "edit" && user) {
      setFormData({
        name: user.name,
        email: user.email,
        plan: user.plan,
        status: user.status,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        plan: "Basic",
        status: "Active",
      });
    }
  }, [mode, user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (mode === "add") {
        await addUser(formData);
        toast.success("User added successfully!");
      } else {
        await updateUser(user.id, formData);
        toast.success("User updated successfully!");
      }

      onUserAdded();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{mode === "add" ? "Add User" : "Edit User"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <select
            name="plan"
            value={formData.plan}
            onChange={handleChange}
          >
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="Gold">Gold</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading
              ? mode === "add"
                ? "Saving..."
                : "Updating..."
              : mode === "add"
              ? "Save User"
              : "Update User"}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserModal;