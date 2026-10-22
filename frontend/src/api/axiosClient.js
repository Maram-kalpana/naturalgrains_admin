import axios from "axios";

const axiosClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    // "http://localhost:5000/api",
    "https://naturalgrains-api.easybizcart.com/api",

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  timeout: 15000,
});

/* ADD JWT */

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* RESPONSE */

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("admin_token");
    }

    return Promise.reject(error);
  }
);

export default axiosClient;