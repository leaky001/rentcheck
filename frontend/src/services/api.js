// src/services/api.js

import axios from "axios";

// ✅ Replace this with your actual deployed backend URL
const API_BASE_URL = "https://rentcheck-1.onrender.com";

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept each request and attach token if available
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

// Optional: global error handler (useful for auth/session issues)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized – maybe token expired or invalid.");
      // Optionally: logout user, clear localStorage, redirect, etc.
    }
    return Promise.reject(error);
  }
);

export default api;
