import { api } from "../axios-instance";
import type { Paginated, User, ReviewRequest, Solution } from "@/types";


export const SearchService = {
	async devs(params: any): Promise<Paginated<User>> {
		const result = await api.get("/search/devs", { params });
		return result.data;
	},


	async reviews(params: any): Promise<Paginated<ReviewRequest>> {
		const result = await api.get("/search/reviews", { params });
		return result.data;
	},


	async solutions(params: any): Promise<Paginated<Solution>> {
		const result = await api.get("/search/solutions", { params });
		return result.data;
	},
};
