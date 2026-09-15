import axios from "axios";

const API = axios.create({
  baseURL: "https://employee-management-backend-1-rfi2.onrender.com",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const publicEndpoints = [
      "/auth/login",
      "/auth/register",
      "/auth/forgot-password",
      "/auth/verify-otp",
      "/auth/reset-password",
    ];

    const isPublicEndpoint = publicEndpoints.includes(config.url);

    console.log(
      "AXIOS REQUEST:",
      config.method?.toUpperCase(),
      config.url,
      "TOKEN EXISTS:",
      !!token
    );

    if (token && !isPublicEndpoint) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;