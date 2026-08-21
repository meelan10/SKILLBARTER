import axios from "axios";

// Backend always responds { success: true, data } or { success: false, message }.
// See backend/src/utils/apiResponse.js — this client is built around that shape.

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const client = axios.create({ baseURL });

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("skillbarter_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Unwrap { success, data } → data, and { success: false, message } → thrown Error.
client.interceptors.response.use(
  (response) => response.data.data,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    if (error.response?.status === 401) {
      localStorage.removeItem("skillbarter_token");
      localStorage.removeItem("skillbarter_user");
    }
    return Promise.reject(new Error(message));
  }
);

export default client;
