// eslint-disable-next-line no-undef
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Credenciales incorrectas");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
