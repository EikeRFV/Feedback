import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Bell } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { api } from '@/services/mock/api';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export function NotificationsPopover() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const loadNotifications = async () => {
    setIsLoading(true)
    const result = await api.get('/notifications');
    if (result.data) {
      setNotifications(result.data as Notification[])
    }
    setIsLoading(false)
  }

  const markAsRead = async (notifId: string) => {
    await api.patch(`/notifications/${notifId}/read`, {});
    setNotifications(prev =>
      prev.map(n =>
        n.id === notifId ? { ...n, read: true } : n
      )
    )
  }

  useEffect(() => {
    loadNotifications()
  }, [])

  return (
    <Popover onOpenChange={(open) => open && loadNotifications()}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative cursor-pointer">
          <Bell className="h-5 w-5" />

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-0">
        <div className="p-4 border-b font-semibold">
          Notificações
        </div>

        {isLoading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="animate-spin h-5 w-5" />
          </div>
        ) : notifications.length === 0 ? (
          <p className="p-4 text-sm text-muted-foreground text-center">
            Nenhuma notificação
          </p>
        ) : (
          <div className="max-h-80 overflow-auto">
            {notifications.map(notif => (
              <div
                key={notif.id}
                className={`p-4 border-b hover:bg-muted cursor-pointer ${notif.read ? "opacity-60" : ""
                  }`}
                onClick={() => {
                  if (!notif.read) markAsRead(notif.id)
                }}
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="font-medium text-sm">
                      {notif.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notif.message}
                    </p>
                  </div>

                  {!notif.read && (
                    <Badge variant="default" className="text-xs">
                      Novo
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
