import axios from "axios";

const API = axios.create({
  baseURL: "https://employee-management-backend-1-rfi2.onrender.com",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Don't attach JWT to public authentication endpoints
    const publicEndpoints = [
      "/auth/login",
      "/auth/register",
      "/auth/forgot-password",
      "/auth/verify-otp",
      "/auth/reset-password",
    ];

    if (
      token &&
      !publicEndpoints.includes(config.url)
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;