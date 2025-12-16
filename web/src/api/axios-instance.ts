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
    const status = error.response?.status ?? 500;

    const message = error ?? "Erro interno no servidor, tente novamente depois";
    const data = error.response?.data;

    throw new ApiError(message, status, data);
  }
);

