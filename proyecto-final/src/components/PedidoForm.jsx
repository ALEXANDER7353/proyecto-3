import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../api/apiService";

const PedidoForm = () => {
  const [descripcion, setDescripcion] = useState("");
  const [total, setTotal] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchPedido = async () => {
        setLoading(true);
        try {
          const response = await apiService.get(`/pedidos/${id}`);
          setDescripcion(response.descripcion);
          setTotal(response.total);
        } catch (err) {
          setError("❌ Error al cargar el pedido");
        } finally {
          setLoading(false);
        }
      };

      fetchPedido();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!descripcion.trim() || total <= 0) {
        setError(
          "⚠️ La descripción no puede estar vacía y el total debe ser mayor a 0."
        );
        setLoading(false);
        return;
      }

      if (id) {
        await apiService.put(`/pedidos/${id}`, { descripcion, total });
      } else {
        await apiService.post("/pedidos", { descripcion, total });
      }

      alert("✅ Pedido guardado correctamente.");
      navigate("/orders");
    } catch (err) {
      setError("❌ Error al guardar el pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pedido-form-container">
      <h1>{id ? "✏️ Editar Pedido" : "📝 Nuevo Pedido"}</h1>

      {loading ? <p className="loading-message">Cargando...</p> : null}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="pedido-form">
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
            min="0"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Guardando..." : "💾 Guardar"}
        </button>

        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/orders")}
        >
          🔙 Volver a Órdenes
        </button>
      </form>
    </div>
  );
};

export default PedidoForm;
