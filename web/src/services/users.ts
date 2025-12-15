import { api } from "./api";


export const UsersService = {
  me() {
    return api.get("/users/me");
  },


  findAll(params?: any) {
    return api.get("/users", { params });
  },


  update(data: any) {
    return api.put("/users", data);
  },


  updateDevStatus(status: string) {
    return api.put("/users/status/dev", { status });
  },


  remove() {
    return api.delete("/users");
  },
};
