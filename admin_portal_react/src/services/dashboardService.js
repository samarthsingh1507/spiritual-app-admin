import BASE_URL from "./api";
import { getToken } from "./authService";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// Dashboard Cards
export async function getDashboardStats() {
  const response = await fetch(`${BASE_URL}/api/dashboard`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard statistics.");
  }

  return await response.json();
}

// Plan Distribution
export async function getPlanDistribution() {
  const response = await fetch(
    `${BASE_URL}/api/dashboard/plan-distribution`,
    {
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch plan distribution.");
  }

  return await response.json();
}

// Recent Users
export async function getRecentUsers() {
  const response = await fetch(
    `${BASE_URL}/api/dashboard/recent-users`,
    {
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recent users.");
  }

  return await response.json();
}

// Monthly Users
export async function getMonthlyUsers() {
  const response = await fetch(
    `${BASE_URL}/api/dashboard/monthly-users`,
    {
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch monthly users.");
  }

  return await response.json();
}

// Active vs Inactive
export async function getUserStatus() {
  const response = await fetch(
    `${BASE_URL}/api/dashboard/user-status`,
    {
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user status.");
  }

  return await response.json();
}