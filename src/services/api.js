import axios from "axios";

// axios instance
// base URL .env se aa raha hai

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor
// protected request ke sath JWT token auto send hoga

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
// unauthorized response pe auth clear karenge

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;