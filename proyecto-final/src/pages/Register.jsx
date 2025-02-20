import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState(""); // Nuevo estado para el nombre
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }), // Enviamos el nombre también
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar usuario");
      }

      setSuccess(true);

      // Redirige al login después de 2 segundos
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Tu Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && (
          <p style={{ color: "green" }}>
            ¡Registro exitoso! Redirigiendo al login...
          </p>
        )}

        <button type="submit">Registrar</button>
      </form>

      {/* 🔹 Botón para volver al login */}
      <p>
        ¿Ya tienes una cuenta?{" "}
        <button onClick={() => navigate("/login")}>Volver al Login</button>
      </p>
    </div>
  );
};

export default Register;
