import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container">
      <h3 className="title">Carrito de Compra 🛒</h3>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <h4>{item.name}</h4>
              <p>Precio: ${item.price}</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item._id, parseInt(e.target.value))
                }
              />
              <button onClick={() => removeFromCart(item._id)}>Eliminar</button>
            </div>
          ))}
          <h4>Total: ${getTotalPrice()}</h4>

          {/* 🔹 Botón "Seguir Comprando" */}
          <button
            className="continue-shopping"
            onClick={() => navigate("/dashboard")}
          >
            🛍️ Seguir Comprando
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
