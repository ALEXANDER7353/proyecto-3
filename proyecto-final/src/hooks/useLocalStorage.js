// src/hooks/useLocalStorage.js
import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  // Obtener el valor inicial desde localStorage o usar el valor por defecto
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error al obtener el valor de localStorage", error);
      return initialValue;
    }
  });

  // Actualizar localStorage cuando el estado cambia
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error al guardar en localStorage", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
