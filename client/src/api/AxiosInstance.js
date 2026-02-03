// axiosInstance.js - FIXED FOR VITE
import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

// For Vite projects, use import.meta.env instead of process.env
export const base_url =
  import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";
console.log("url", base_url);

// Public instance for endpoints without auth
export const publicAxiosInstance = axios.create({
  baseURL: base_url,
});

// Private instance for authenticated requests
const axiosInstance = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add access token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from cookies
    const token = cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor with logging
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // You might want to add error handling here
    // For example, redirect to login on 401 Unauthorized
    if (error.response?.status === 401) {
      // Clear cookies and redirect to login
      cookies.remove("token");
      window.location.href = "/home";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
