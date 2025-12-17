import type { ChatMessage, ChatRoom, Paginated } from "@/types";
import { api } from "../axios-instance";


export const ChatService = {
	async createRoom(data: any): Promise<ChatRoom> {
		const result = await api.post("/chat/room", data);
		return result.data;
	},


	async getRooms(): Promise<ChatRoom[]> {
		const result = await api.get("/chat/rooms");
		return result.data;
	},


	async getMessages(roomId: string, params?: { limit?: number; offset?: number }): Promise<Paginated<ChatMessage>> {
		const result = await api.get(`/chat/room/${roomId}/messages`, { params });
		return result.data;
	},


	async sendMessage(roomId: string, data: { content: string }): Promise<ChatMessage> {
		const result = await api.post(`/chat/room/${roomId}/messages`, data);
		return result.data;
	},


	async updateMessage(messageId: string, data: any): Promise<ChatMessage> {
		const result = await api.put(`/chat/message/${messageId}`, data);
		return result.data;
	},


	async deleteMessage(messageId: string): Promise<void> {
		await api.delete(`/chat/message/${messageId}`);
	},
};
