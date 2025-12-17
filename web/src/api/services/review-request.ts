import type { Paginated, ReviewRequest, DefaultResponse, CreateReviewRequest } from "@/types";
import { api } from "../axios-instance";


export const ReviewRequestsService = {
  async create(data: CreateReviewRequest): Promise<DefaultResponse> {
    const result = await api.post("/review-requests", data);
    return result.data;
  },

  async findAll(params?: any): Promise<Paginated<ReviewRequest>> {
    const result = await api.get("/review-requests", { params });
    return result.data;
  },

  async findByUser(params?: any): Promise<Paginated<ReviewRequest>> {
    const result = await api.get<Paginated<ReviewRequest>>("/review-requests/by-user", { params });
    return result.data;
  },

  async findById(id: string): Promise<ReviewRequest | null> {
    const result = await api.get(`/review-requests/${id}`);
    return result.data;
  },

  async remove(id: string): Promise<DefaultResponse> {
    const result = await api.delete(`/review-requests/${id}`);
    return result.data;
  },
};
