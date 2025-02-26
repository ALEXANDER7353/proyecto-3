import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setProcessing(true);

    // Simulación de pago
    setTimeout(() => {
      alert("✅ Pago exitoso. ¡Gracias por tu compra!");
      navigate("/dashboard"); // Redirigir al Dashboard después del pago
    }, 2000);
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">💳 Pago Seguro</h2>
      <form onSubmit={handlePayment} className="checkout-form">
        <label>
          Nombre en la Tarjeta:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Número de Tarjeta:
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength="16"
            required
          />
        </label>

        <label>
          Fecha de Expiración:
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            required
          />
        </label>

        <label>
          CVV:
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            maxLength="3"
            required
          />
        </label>

        {/* 🔹 Botón para Confirmar Pago */}
        <button type="submit" className="pay-button" disabled={processing}>
          {processing ? "Procesando..." : "Confirmar Pago"}
        </button>
      </form>

      {/* 🔹 Botón para volver al Dashboard */}
      <button className="home-button" onClick={() => navigate("/dashboard")}>
        🏠 Página de Inicio
      </button>
    </div>
  );
};

export default CheckoutPage;
