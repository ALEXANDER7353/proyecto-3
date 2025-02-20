// src/components/UsuariosList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiService } from "../api/apiService";

const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await apiService.get("/usuarios");
        setUsuarios(data);
      } catch (err) {
        setError("Error al cargar los usuarios");
      }
    };

    fetchUsuarios();
  }, []);

  const handleDelete = async (id) => {
    try {
      await apiService.delete(`/usuarios/${id}`);
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    } catch (err) {
      setError("Error al eliminar el usuario");
    }
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Link to="/usuarios/nuevo">Agregar Usuario</Link>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nombre}
            <Link to={`/usuarios/editar/${usuario.id}`}>Editar</Link>
            <button onClick={() => handleDelete(usuario.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsuariosList;
