import { api } from "../axios-instance";
import type { Notification, Paginated, DefaultResponse } from "@/types";


export const NotificationsService = {
	async create(data: any): Promise<Notification> {
		const result = await api.post("/notifications", data);
		return result.data;
	},


	async findAll(params?: any): Promise<Paginated<Notification>> {
		const result = await api.get("/notifications", { params });
		return result.data;
	},


	async findUnread(params?: any): Promise<Paginated<Notification>> {
		const result = await api.get("/notifications/unread", { params });
		return result.data;
	},


	async markAsRead(id: string): Promise<DefaultResponse> {
		const result = await api.patch(`/notifications/${id}/read`);
		return result.data;
	},


	async markAllAsRead(): Promise<DefaultResponse> {
		const result = await api.patch("/notifications/mark-all-read");
		return result.data;
	},


	async update(id: string, data: any): Promise<DefaultResponse> {
		const result = await api.patch(`/notifications/${id}`, data);
		return result.data;
	},


	async remove(id: string): Promise<DefaultResponse> {
		const result = await api.delete(`/notifications/${id}`);
		return result.data;
	},
};
