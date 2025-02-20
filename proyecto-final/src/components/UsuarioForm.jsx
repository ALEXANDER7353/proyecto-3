// src/components/UsuarioForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiService } from "../api/apiService";

const UsuarioForm = () => {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchUsuario = async () => {
        try {
          const data = await apiService.get(`/usuarios/${id}`);
          setNombre(data.nombre);
        } catch (err) {
          setError("Error al cargar el usuario");
        }
      };

      fetchUsuario();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await apiService.put(`/usuarios/${id}`, { nombre });
      } else {
        await apiService.post("/usuarios", { nombre });
      }
      navigate("/usuarios");
    } catch (err) {
      setError("Error al guardar el usuario");
    }
  };

  return (
    <div>
      <h1>{id ? "Editar Usuario" : "Nuevo Usuario"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default UsuarioForm;
