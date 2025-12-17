import axios from "axios";
import { ApiError } from "./errors/api-error";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3030/api';


export const api = axios.create({
  baseURL: API_BASE_URL,
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => (res.data),
  (error) => {
    if (!error.response) {
      throw new ApiError(
        "Servidor indisponível. Tente novamente mais tarde.",
        503,
        null
      );
    }

    const status = error.response.status;
    const data = error.response.data;

    const message =
      data?.error ||
      data?.message ||
      "Erro interno no servidor, tente novamente depois";

    throw new ApiError(message, status, data);
  }
);

