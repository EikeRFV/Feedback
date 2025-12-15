import { api } from "./api";


export const NotificationsService = {
  create(data: any) {
    return api.post("/notifications", data);
  },


  findAll(params?: any) {
    return api.get("/notifications", { params });
  },


  findUnread(params?: any) {
    return api.get("/notifications/unread", { params });
  },


  markAsRead(id: string) {
    return api.patch(`/notifications/${id}/read`);
  },


  markAllAsRead() {
    return api.patch("/notifications/mark-all-read");
  },


  update(id: string, data: any) {
    return api.patch(`/notifications/${id}`, data);
  },


  remove(id: string) {
    return api.delete(`/notifications/${id}`);
  },
};
