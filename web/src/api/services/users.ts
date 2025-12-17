import { api } from "../axios-instance";
import type { User, Paginated, DefaultResponse } from "@/types";


export const UsersService = {
	async me(): Promise<User> {
		const result = await api.get("/users/me");
		return result.data;
	},


	async findAll(params?: any): Promise<Paginated<User>> {
		const result = await api.get("/users", { params });
		return result.data;
	},


	async findAllDevs(params?: any): Promise<Paginated<User>> {
		const result = await api.get("/users/developers", { params });
		return result.data;
	},


	async update(data: any): Promise<DefaultResponse> {
		const result = await api.put("/users", data);
		return result.data;
	},


	async updateDevStatus(status: string): Promise<DefaultResponse> {
		const result = await api.put("/users/status/dev", { status });
		return result.data;
	},


	async remove(): Promise<DefaultResponse> {
		const result = await api.delete("/users");
		return result.data;
	},
};
