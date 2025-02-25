// Dashboard.js
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (!user?.token) {
      setError("No tienes autorización. Inicia sesión.");
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener productos");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("❌ Error:", error.message);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  return (
    <div className="dashboard-container">
      {/* Botón de Cerrar Sesión */}
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>

      {/* 🔥 Título "GYM SHOP" 🔥 */}
      <h3 className="gym-title">GYM SHOP</h3>

      {/* Mostrar estado de carga o errores */}
      {loading && <p className="loading-message">Cargando productos...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Lista de productos */}
      <div className="product-list">
        {!loading && products.length > 0
          ? products.map((product) => (
              <div key={product._id} className="product-card">
                <img
                  src={
                    product.imageUrl?.startsWith("http")
                      ? product.imageUrl
                      : `http://localhost:3000${product.imageUrl}`
                  }
                  alt={product.name}
                  className="product-image"
                />
                <h4 className="product-name">{product.name}</h4>
                <p>{product.description}</p>
                <p className="product-price">
                  <strong>Precio:</strong> ${product.price}
                </p>
              </div>
            ))
          : !loading && (
              <p className="no-products">No hay productos disponibles</p>
            )}
      </div>
    </div>
  );
};

export default Dashboard;
