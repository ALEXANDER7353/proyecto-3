import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 🔹 Añadir producto a la cesta
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // 🔹 Eliminar producto de la cesta
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // 🔹 Modificar cantidad de productos en la cesta
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  // 🔹 Obtener el total del precio
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 🔹 Hook personalizado para acceder al contexto del carrito
export const useCart = () => useContext(CartContext);
