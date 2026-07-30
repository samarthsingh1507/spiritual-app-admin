import BASE_URL from "./api";
import { getToken } from "./authService";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// Get all user details
export async function getAllUserDetails() {
  const response = await fetch(`${BASE_URL}/api/summary`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user details.");
  }

  return await response.json();
}

// Get single user details
export async function getUserDetails(id) {
  const response = await fetch(
    `${BASE_URL}/api/summary/${id}`,
    {
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user details.");
  }

  return await response.json();
}