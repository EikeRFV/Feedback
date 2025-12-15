import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/services/mock/api';
import { Loader2, Bell } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      const result = await api.get('/notifications');
      if (result.data) {
        setNotifications(result.data as Notification[]);
      }
      setIsLoading(false);
    };

    loadNotifications();
  }, []);

  const markAsRead = async (notifId: string) => {
    const result = await api.patch(`/notifications/${notifId}/read`, {});
    if (result.data) {
      setNotifications(notifications.map(n => n.id === notifId ? { ...n, read: true } : n));
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Notificações</h1>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Nenhuma notificação</p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notif) => (
            <Card key={notif.id} className={notif.read ? 'opacity-50' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      {notif.title}
                    </CardTitle>
                    <CardDescription>{notif.message}</CardDescription>
                  </div>
                  <Badge variant={notif.read ? 'secondary' : 'default'}>{notif.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {!notif.read && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAsRead(notif.id)}
                    className="cursor-pointer"
                  >
                    Marcar como lida
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
