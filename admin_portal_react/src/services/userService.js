import BASE_URL from "./api";
import { getToken } from "./authService";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// Get users with Search, Filters & Pagination
export async function getUsers(
  page = 1,
  limit = 10,
  search = "",
  plan = "All",
  status = "All"
) {
  const params = new URLSearchParams({
    page,
    limit,
    search,
    plan,
    status,
  });

  const response = await fetch(
    `${BASE_URL}/api/users?${params.toString()}`,
    {
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users.");
  }

  return await response.json();
}

// Add user
export async function addUser(user) {
  const response = await fetch(`${BASE_URL}/api/users`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to add user.");
  }

  return await response.json();
}

// Update user
export async function updateUser(id, user) {
  const response = await fetch(`${BASE_URL}/api/users/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to update user.");
  }

  return await response.json();
}

// Delete user
export async function deleteUser(id) {
  const response = await fetch(`${BASE_URL}/api/users/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete user.");
  }

  return await response.json();
}