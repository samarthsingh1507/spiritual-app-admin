import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Forbidden from "./pages/Forbidden";

import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./routes/ProtectedRoute";

import { isLoggedIn } from "./services/authService";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          isLoggedIn()
            ? <Navigate to="/" replace />
            : <Login />
        }
      />

      <Route
        path="/403"
        element={<Forbidden />}
      />

      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;