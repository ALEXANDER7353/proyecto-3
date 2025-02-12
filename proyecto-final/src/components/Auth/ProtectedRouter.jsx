import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};
