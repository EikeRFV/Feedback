import { api } from "../axios-instance";


export const UsersService = {
  async me() {
    return await api.get("/users/me");
  },


  async findAll(params?: any) {
    return await api.get("/users", { params });
  },


  async findAllDevs(params?: any) {
    return await api.get("/users/developers", { params });
  },


  async update(data: any) {
    return await api.put("/users", data);
  },


  updateDevStatus(status: string) {
    return api.put("/users/status/dev", { status });
  },


  remove() {
    return api.delete("/users");
  },
};
