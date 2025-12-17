import { api } from "../axios-instance";
import type { Solution, DefaultResponse } from "@/types";


export const SolutionsService = {
	async create(data: any): Promise<DefaultResponse> {
		const result = await api.post("/solutions", data);
		return result.data;
	},


	async accept(id: string): Promise<DefaultResponse> {
		const result = await api.patch(`/solutions/accept/${id}`);
		return result.data;
	},


	async update(id: string, solution: string): Promise<DefaultResponse> {
		const result = await api.patch(`/solutions/${id}`, { solution });
		return result.data;
	},


	async findByReview(reviewId: string): Promise<Solution | null> {
		const result = await api.get(`/solutions/by-review/${reviewId}`);
		return result.data;
	},


	async findById(id: string): Promise<Solution | null> {
		const result = await api.get(`/solutions/${id}`);
		return result.data;
	},
};
