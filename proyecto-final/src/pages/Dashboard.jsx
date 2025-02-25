// dashboard
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener productos");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("❌ Error:", error.message);
      }
    };

    fetchProducts();
  }, [user]);

  return (
    <div>
      <h2>Bienvenido al Dashboard</h2>
      <button onClick={handleLogout}>Cerrar Sesión</button>

      <h3>Productos de la tienda</h3>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={
                  product.imageUrl.startsWith("http")
                    ? product.imageUrl
                    : `http://localhost:3000${product.imageUrl}`
                }
                alt={product.name}
                className="product-image"
              />
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>
                <strong>Precio:</strong> ${product.price}
              </p>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
