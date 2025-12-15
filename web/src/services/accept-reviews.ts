import { api } from "./api";


export const AcceptReviewsService = {
  create(data: { reviewId: string }) {
    return api.post("/accepts-reviews", data);
  },


  reject(reviewId: string, devId: string) {
    return api.put(`/accepts-reviews/${reviewId}/${devId}/reject`);
  },


  accept(reviewId: string, devId: string) {
    return api.put(`/accepts-reviews/${reviewId}/${devId}/accept`);
  },


  findAllByDev() {
    return api.get("/accepts-reviews");
  },


  findPendingByReview(reviewId: string) {
    return api.get(`/accepts-reviews/${reviewId}`);
  },
};
