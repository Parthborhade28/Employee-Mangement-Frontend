// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8080",
// });

// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: "https://employee-management-backend-1-rfi2.onrender.com",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;