import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [isNightMode, setIsNightMode] = useState(false);

  // Redirigir si el usuario ya está autenticado
  useEffect(() => {
    if (user && user.token) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    console.log("📤 Enviando datos al backend:", { email, password });

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("📥 Respuesta del backend:", data);

      if (!response.ok) {
        throw new Error(data.message || "Credenciales inválidas");
      }

      if (!data.token || !data.user) {
        throw new Error("Error en la autenticación. Intenta de nuevo.");
      }

      const { token, user } = data;

      // Guardamos el usuario en el contexto global y localStorage
      login({ email: user.email, token });

      // Redirigir al usuario a la página de dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Error en el login:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Configurar modo nocturno automáticamente según la hora del día
  useEffect(() => {
    const hour = new Date().getHours();
    const isDayTime = hour > 6 && hour < 19;
    setIsNightMode(!isDayTime);

    document.documentElement.style.setProperty(
      "--background-color",
      isDayTime ? "white" : "black"
    );
    document.documentElement.style.setProperty(
      "--text-color",
      isDayTime ? "black" : "white"
    );
    document.documentElement.style.setProperty(
      "--input-text-color",
      "lightsteelblue"
    );
    document.documentElement.style.setProperty("--input-bg-color", "white");
    document.documentElement.style.setProperty(
      "--input-border-color",
      "lightsteelblue"
    );
    document.documentElement.style.setProperty(
      "--button-bg-color",
      "lightsteelblue"
    );
    document.documentElement.style.setProperty(
      "--button-text-color",
      isDayTime ? "black" : "white"
    );
  }, []);

  return (
    <div className={`login-container ${isNightMode ? "night-mode" : ""}`}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            disabled={loading}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Login"}
        </button>

        {/* 🔹 Mostrar botón para registrarse solo si el usuario no existe */}
        {error === "Usuario no encontrado" && (
          <div>
            <p>¿No tienes cuenta?</p>
            <button onClick={() => navigate("/register")}>Crear Cuenta</button>
          </div>
        )}
      </form>

      {/* 🔹 Botón fijo para registrarse */}
      {!error && (
        <p>
          ¿No tienes cuenta?{" "}
          <button onClick={() => navigate("/register")}>Regístrate</button>
        </p>
      )}
    </div>
  );
};

export default Login;
