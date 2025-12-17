import { api } from "../axios-instance";
import type { AcceptReview, AcceptReviewResponse } from "@/types";


export const AcceptReviewsService = {
  async create(data: { reviewId: string }): Promise<AcceptReviewResponse> {
    const result = await api.post("/accepts-reviews", data);
    return result.data;
  },

  async reject(reviewId: string, devId: string): Promise<AcceptReviewResponse> {
    const result = await api.put(`/accepts-reviews/${reviewId}/${devId}/reject`);
    return result.data;
  },

  async accept(reviewId: string, devId: string): Promise<AcceptReviewResponse> {
    const result = await api.put(`/accepts-reviews/${reviewId}/${devId}/accept`);
    return result.data;
  },

  async findAllByDev(): Promise<AcceptReview[]> {
    const result = await api.get("/accepts-reviews/dev");
    return result.data;
  },

  async findCompletedCountByDev(): Promise<number> {
    const result = await api.get("/accepts-reviews/dev/completed/count");
    return result.data;
  },

  async findCountByDev(): Promise<number> {
    const result = await api.get("/accepts-reviews/dev/count");
    return result.data;
  },
};
