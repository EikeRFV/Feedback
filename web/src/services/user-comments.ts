import { api } from "./api";


export const UserCommentsService = {
  create(data: any) {
    return api.post("/user-comments", data);
  },


  findAll() {
    return api.get("/user-comments");
  },


  findById(id: string) {
    return api.get(`/user-comments/${id}`);
  },


  update(id: string, data: any) {
    return api.patch(`/user-comments/${id}`, data);
  },


  remove(id: string) {
    return api.delete(`/user-comments/${id}`);
  },
};
