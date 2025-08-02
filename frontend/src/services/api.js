import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL:  "https://rentcheck-1.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to each request if available
// ...existing code...
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("rentcheck_user");
    const user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// ...existing code...

export default api;
