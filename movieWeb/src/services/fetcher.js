import axios from "axios";

const fetcher = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    Tokencybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMTQvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA1MTkwNDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDUzMzgwMDB9.8zD74yVmRZkRs7a_zvhCEo9BEb2UlJzsokkHx22VkXg",
  },
});

//interceptor
fetcher.interceptors.response.use(
  (response) => {
    return response.data.content;
  },

  (error) => {
    return Promise.reject(error.response.data.content);
  }
);

fetcher.interceptors.request.use(
  (config) => {
    // thêm authorization vào header config (nếu có)
    const { accessToken } = JSON.parse(localStorage.getItem("user")) || {};

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default fetcher;
