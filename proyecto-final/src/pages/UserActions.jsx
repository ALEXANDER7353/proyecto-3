import axios from "axios";

const updateUser = async (id) => {
  try {
    const newName = prompt("Ingrese nuevo nombre:");
    await axios.put(`http://localhost:3000/users/${id}`, { name: newName });
    alert("Usuario actualizado");
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
  }
};

const deleteUser = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/users/${id}`);
    alert("Usuario eliminado");
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
  }
};

export { updateUser, deleteUser };
