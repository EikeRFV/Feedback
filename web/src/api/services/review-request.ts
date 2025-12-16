import { api } from "../axios-instance";


export const ReviewRequestsService = {
  create(data: any) {
    return api.post("/review-requests", data);
  },


  findAll(params?: any) {
    return api.get("/review-requests", { params });
  },


  findByUser(params?: any) {
    return api.get("/review-requests/by-user", { params });
  },


  findById(id: string) {
    return api.get(`/review-requests/${id}`);
  },


  remove(id: string) {
    return api.delete(`/review-requests/${id}`);
  },
};
