// src/apiInstance/apiInstance.js
import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://financeappback-nmp7.onrender.com/api",
  headers: {
    accept: "application/json",
  },
});

// Función para usar solo en el cliente
export const setAuthToken = (token) => {
  if (typeof window !== "undefined" && token) {
    localStorage.setItem("token", token);
    apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("el token en apiinstance:", token);
  }
};

export default apiInstance;
