// src/components/ItemList.jsx
import { useState, useEffect } from "react";
import apiService from "../api/apiService";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener la lista de ítems al montar el componente
    const fetchItems = async () => {
      try {
        const data = await apiService.get("/items");
        setItems(data);
      } catch (err) {
        setError("Error al cargar los ítems");
      }
    };

    fetchItems();
  }, []);

  const handleAddItem = async () => {
    try {
      const addedItem = await apiService.post("/items", { name: newItem });
      setItems([...items, addedItem]);
      setNewItem("");
    } catch (err) {
      setError("Error al agregar el ítem");
    }
  };

  const handleUpdateItem = async (id, updatedName) => {
    try {
      const updatedItem = await apiService.put(`/items/${id}`, {
        name: updatedName,
      });
      setItems(items.map((item) => (item.id === id ? updatedItem : item)));
    } catch (err) {
      setError("Error al actualizar el ítem");
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await apiService.delete(`/items/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      setError("Error al eliminar el ítem");
    }
  };

  return (
    <div>
      <h1>Lista de Ítems</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleUpdateItem(item.id, "Nuevo Nombre")}>
              Actualizar
            </button>
            <button onClick={() => handleDeleteItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Nuevo ítem"
      />
      <button onClick={handleAddItem}>Agregar Ítem</button>
    </div>
  );
};

export default ItemList;
