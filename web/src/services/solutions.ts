import { api } from "./api";


export const SolutionsService = {
  create(data: any) {
    return api.post("/solutions", data);
  },


  accept(id: string) {
    return api.patch(`/solutions/accept/${id}`);
  },


  update(id: string, solution: string) {
    return api.patch(`/solutions/${id}`, { solution });
  },


  findByReview(reviewId: string) {
    return api.get(`/solutions/by-review/${reviewId}`);
  },


  findById(id: string) {
    return api.get(`/solutions/${id}`);
  },
};
