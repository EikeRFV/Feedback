import axios, { AxiosError } from "axios";
import type { ApiError } from "./errors/api-error";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3030/api';


export const api = axios.create({
  baseURL: API_BASE_URL,
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    if (error.response?.data) {
      const data = error.response.data;

      const message = () => {
        if (typeof data.message === "string") {
          return data.message
        }
        if (Array.isArray(data.message)) {
          return data.message[0]
        }

        return "Erro inesperado"
      }

      const normalizedError: ApiError = {
        message: message(),
        statusCode: data.statusCode ?? error.response.status,
      };

      return Promise.reject(normalizedError);
    }

    const fallbackError: ApiError = {
      message: "Erro de conexão com o servidor",
    };

    return Promise.reject(fallbackError);
  }
);

