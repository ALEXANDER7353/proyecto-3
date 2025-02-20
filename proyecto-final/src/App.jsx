import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Orders from "./components/PedidoForm";
import useAuth from "./hooks/useAuth";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

// 🔹 Separamos la definición de rutas en un componente
function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* 🔹 Redirige a login si no hay usuario, o a dashboard si hay usuario */}
      <Route
        path="/"
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      {/* 🔹 Redirige cualquier ruta inválida a "/" */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
