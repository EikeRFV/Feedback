import { api } from "../axios-instance";


export const AuthService = {
  login(data: { email: string; password: string }) {
    return api.post("/auth/login", data);
  },


  signup(data: any) {
    return api.post("/auth/signup", data);
  },
};
