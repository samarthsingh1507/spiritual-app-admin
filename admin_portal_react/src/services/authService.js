import BASE_URL from "./api";

export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const saveAdmin = (admin) => {
  localStorage.setItem("admin", JSON.stringify(admin));
};

export const getAdmin = () => {
  const admin = localStorage.getItem("admin");
  return admin ? JSON.parse(admin) : null;
};

export const isSuperAdmin = () => {
  return getAdmin()?.role === "SuperAdmin";
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
};

export const isLoggedIn = () => {
  return !!getToken();
};