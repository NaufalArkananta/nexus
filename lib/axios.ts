import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(
      "Request URL:",
      config.baseURL + config.url
    );

    console.log(
      "Request Headers:",
      config.headers
    );

    // Kalau bukan FormData, gunakan JSON
    if (!(config.data instanceof FormData)) {
      config.headers.set(
        "Content-Type",
        "application/json"
      );
    }

    return config;
  },
  (error) => {
    console.error(
      "Request Error:",
      error
    );

    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(
      "Response:",
      response.status
    );

    return response;
  },
  (error) => {
    console.error(
      "Response Error:",
      {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        url: error.config?.url,
      }
    );

    return Promise.reject(error);
  }
);

// Authorization interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Hindari error localStorage saat SSR
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("token");

      if (token) {
        config.headers.Authorization =
          `Bearer ${token}`;
      }
    }

    return config;
  }
);