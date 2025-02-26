import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <h3 className="cart-title">Carrito de Compras 🛒</h3>

      {cart.length === 0 ? (
        <p className="empty-cart">Tu carrito está vacío.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <h4>{item.name}</h4>
              <p>Precio: ${item.price.toFixed(2)}</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item._id, parseInt(e.target.value))
                }
              />
              <button
                className="remove-button"
                onClick={() => removeFromCart(item._id)}
              >
                Eliminar
              </button>
            </div>
          ))}

          {/* 🔹 Mostrar Total del Carrito */}
          <h4 className="cart-total">Total: ${getTotalPrice().toFixed(2)}</h4>

          {/* 🔹 Botón para proceder al pago */}
          <button className="pay-button" onClick={() => navigate("/checkout")}>
            💳 Pagar
          </button>

          {/* 🔹 Botón para seguir comprando */}
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
