import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useAuth() {
  const { user, login, logout } = useContext(AuthContext);
  return { user, login, logout };
}

export default useAuth;
