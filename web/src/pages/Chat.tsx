import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Send } from 'lucide-react';
import { ChatService } from '@/api/services/chat';
import type { ChatMessage, ChatRoom } from '@/types';

export function Chat() {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadRooms = async () => {
    const result = await ChatService.getRooms();
    if (result) {
      setRooms(result);

      if ((result).length > 0) {
        setSelectedRoom(result[0].id);
      }
    }
    setIsLoading(false);
  };


  const loadMessages = async () => {
    if (selectedRoom) {
      const result = await ChatService.getMessages(selectedRoom);
      if (result.results) {
        setMessages(result.results);
      }
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    loadMessages();
  }, [selectedRoom]);

  const sendMessage = async () => {
    if (!messageInput.trim() || !selectedRoom) return;

    const result = await ChatService.sendMessage(selectedRoom, {
      content: messageInput,
    });
    if (result) {
      setMessages((prev) => [...prev, result]);
      setMessageInput('');
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-8 h-fit">
      <div className="col-span-1 border-r px-6">
        <h2 className="text-3xl font-bold mb-6">Conversas</h2>
        <div className="space-y-2">
          {rooms.map((room) => (
            <Card
              key={room.id}
              className={`cursor-pointer transition-colors ${selectedRoom === room.id ? 'bg-primary text-white' : ''}`}
              onClick={() => setSelectedRoom(room.id)}
            >
              <CardContent className="pt-4">
                <p className="font-semibold">{`${room.client?.firstName} ${room.client?.lastName}`}</p>
                {messages.length > 0 && (
                  <p className="text-sm truncate opacity-70">
                    {messages[messages.length - 1].content}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="col-span-2 flex flex-col px-6">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 border rounded-lg p-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col">
              <span className="text-sm font-semibold">{msg.user && `${msg.user.firstName} ${msg.user.lastName}`}</span>
              <p className="bg-gray-100 rounded p-2">{msg.content}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Digite uma mensagem..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button onClick={sendMessage} className="cursor-pointer">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
