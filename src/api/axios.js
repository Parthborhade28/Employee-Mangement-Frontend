import axios from "axios";

const API = axios.create({
  baseURL:
    "https://employee-management-backend-1-rfi2.onrender.com",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Password reset APIs should work without login token
    const publicAuthEndpoints = [
      "/auth/login",
      "/auth/register",
      "/auth/forgot-password",
      "/auth/verify-otp",
      "/auth/reset-password",
      "/auth/test-email",
    ];

    const isPublicEndpoint =
      publicAuthEndpoints.includes(config.url);

    if (token && !isPublicEndpoint) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;