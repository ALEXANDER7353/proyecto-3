import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../api/apiService";

const PedidoForm = () => {
  const [descripcion, setDescripcion] = useState("");
  const [total, setTotal] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchPedido = async () => {
        try {
          const data = await apiService.get(`/pedidos/${id}`);
          setDescripcion(data.descripcion);
          setTotal(data.total);
        } catch (err) {
          setError("Error al cargar el pedido");
        }
      };

      fetchPedido();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await apiService.put(`/pedidos/${id}`, { descripcion, total });
      } else {
        await apiService.post("/pedidos", { descripcion, total });
      }
      navigate("/pedidos");
    } catch (err) {
      setError("Error al guardar el pedido");
    }
  };

  return (
    <div>
      <h1>{id ? "Editar Pedido" : "Nuevo Pedido"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Descripción:
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </label>
        <label>
          Total:
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            required
          />
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default PedidoForm;
