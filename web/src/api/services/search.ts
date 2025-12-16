import { api } from "../axios-instance";


export const SearchService = {
  devs(params: any) {
    return api.get("/search/devs", { params });
  },


  reviews(params: any) {
    return api.get("/search/reviews", { params });
  },


  solutions(params: any) {
    return api.get("/search/solutions", { params });
  },
};
