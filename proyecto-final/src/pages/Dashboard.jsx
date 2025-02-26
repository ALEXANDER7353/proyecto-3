import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; // Importamos el carrito
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // 🔹 Icono de carrito
import "./Dashboard.css";

const Dashboard = () => {
  const { logout, user } = useContext(AuthContext);
  const { cart, addToCart } = useCart(); // 🔹 Accedemos al carrito y la función para añadir productos
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
          headers: { Authorization: `Bearer ${user.token}` },
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
      {/* 🔹 Contenedor de botón de Cerrar Sesión y Carrito */}
      <div className="header-right">
        {/* 🔹 Botón de Carrito con Contador */}
        <button className="cart-button" onClick={() => navigate("/cart")}>
          <FaShoppingCart />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </button>

        {/* 🔹 Botón de Cerrar Sesión */}
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>

      {/* 🔹 Título "GYM SHOP" */}
      <h3 className="gym-title">GYM SHOP</h3>

      {/* 🔹 Mostrar estado de carga o errores */}
      {loading && <p className="loading-message">Cargando productos...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* 🔹 Lista de productos */}
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
                {/* 🔹 Botón para añadir producto al carrito */}
                <button
                  className="product-button"
                  onClick={() => addToCart(product)}
                >
                  Añadir al carrito 🛒
                </button>
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
