// src/pages/Usuarios.jsx

import { useState, useEffect } from "react";
import { updateUser, deleteUser } from "./UserActions";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // 📌 Obtener usuarios desde el backend
  useEffect(() => {
    fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Si usas autenticación
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => setError("Error al obtener usuarios"));
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <button onClick={() => updateUser(user._id)}>✏️ Editar</button>
            <button onClick={() => deleteUser(user._id)}>🗑 Eliminar</button>
          </li>
        ))}
      </ul>{" "}
      ➜ Local: http://localhost:5173/
    </div>
  );
};

export default Users;
