const API_URL = "http://localhost:3000/api"; // Asegúrate de que la URL sea correcta

const apiService = {
  get: async (endpoint) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`);
      if (!response.ok) throw new Error("Error en la solicitud GET");
      return await response.json();
    } catch (error) {
      console.error("GET Error:", error);
      throw error;
    }
  },

  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error en la solicitud POST");
      return await response.json();
    } catch (error) {
      console.error("POST Error:", error);
      throw error;
    }
  },

  put: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error en la solicitud PUT");
      return await response.json();
    } catch (error) {
      console.error("PUT Error:", error);
      throw error;
    }
  },

  delete: async (endpoint) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error en la solicitud DELETE");
      return await response.json();
    } catch (error) {
      console.error("DELETE Error:", error);
      throw error;
    }
  },
};

export default apiService;
