<<<<<<< HEAD
/** Backend base URL — override with REACT_APP_API_URL in .env */
export const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

export const AUTH_API = `${API_BASE}/api/auth`;
export const USERS_API = `${API_BASE}/users`;
=======
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Intercepteur requête : ajoute le token JWT automatiquement
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur réponse : gestion globale des erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide → déconnexion automatique
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default api;
>>>>>>> 4e3b5072001c40ddd098fb493cbb1d7eb6202f9e
