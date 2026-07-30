import BASE_URL from "./api";
import { getToken } from "./authService";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// Get Notifications
export async function getNotifications(
  page = 1,
  limit = 10,
  search = ""
) {
  const params = new URLSearchParams({
    page,
    limit,
    search,
  });

  const response = await fetch(
    `${BASE_URL}/api/notifications?${params.toString()}`,
    {
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch notifications.");
  }

  return await response.json();
}

// Add Notification
export async function addNotification(notification) {
  const response = await fetch(`${BASE_URL}/api/notifications`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(notification),
  });

  if (!response.ok) {
    throw new Error("Failed to add notification.");
  }

  return await response.json();
}

// Update Notification
export async function updateNotification(id, notification) {
  const response = await fetch(`${BASE_URL}/api/notifications/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(notification),
  });

  if (!response.ok) {
    throw new Error("Failed to update notification.");
  }

  return await response.json();
}

// Delete Notification
export async function deleteNotification(id) {
  const response = await fetch(`${BASE_URL}/api/notifications/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete notification.");
  }

  return await response.json();
}