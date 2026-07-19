import axios from "axios";

const api = axios.create({
  // Trailing slash stripped: baseURL + "/api/..." would otherwise request
  // "//api/...", which Express 5 treats as an unmatched route (404).
  baseURL: (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, ""),
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token from localStorage or sessionStorage to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("truehire_token") || sessionStorage.getItem("truehire_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
