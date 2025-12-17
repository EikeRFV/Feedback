import { api } from "../axios-instance";
import type { LoginResponse, DefaultResponse } from "@/types";


export const AuthService = {
	async login(data: { email: string; password: string }): Promise<LoginResponse> {
		const result = await api.post("/auth/login", data);
		return result.data;
	},


	async signup(data: any): Promise<DefaultResponse> {
		const result = await api.post("/auth/signup", data);
		return result.data;
	},
};
