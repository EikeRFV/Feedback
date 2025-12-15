import { api } from "./api";


export const ChatService = {
  createRoom(data: any) {
    return api.post("/chat/room", data);
  },


  getRooms() {
    return api.get("/chat/rooms");
  },


  getMessages(roomId: string, params?: { limit?: number; offset?: number }) {
    return api.get(`/chat/room/${roomId}/messages`, { params });
  },


  sendMessage(roomId: string, data: any) {
    return api.post(`/chat/room/${roomId}/message`, data);
  },


  updateMessage(messageId: string, data: any) {
    return api.put(`/chat/message/${messageId}`, data);
  },


  deleteMessage(messageId: string) {
    return api.delete(`/chat/message/${messageId}`);
  },
};
