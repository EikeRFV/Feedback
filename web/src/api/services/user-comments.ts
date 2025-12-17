import { api } from "../axios-instance";
import type { Comment } from "@/types";


export const UserCommentsService = {
	async create(data: any): Promise<Comment> {
		const result = await api.post("/user-comments", data);
		return result.data;
	},


	async findAll(): Promise<Comment[]> {
		const result = await api.get("/user-comments");
		return result.data;
	},


	async findById(id: string): Promise<Comment> {
		const result = await api.get(`/user-comments/${id}`);
		return result.data;
	},


	async update(id: string, data: any): Promise<Comment> {
		const result = await api.patch(`/user-comments/${id}`, data);
		return result.data;
	},


	async remove(id: string): Promise<void> {
		await api.delete(`/user-comments/${id}`);
	},
};
