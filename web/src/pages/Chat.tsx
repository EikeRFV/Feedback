import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/services/api';
import { Loader2, Send } from 'lucide-react';

interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  participants: number;
}

interface Message {
  id: string;
  content: string;
  author: { name: string };
  createdAt: string;
}

export function Chat() {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRooms = async () => {
      const result = await api.get('/chat/rooms');
      if (result.data) {
        setRooms(result.data as ChatRoom[]);
        if ((result.data as ChatRoom[]).length > 0) {
          setSelectedRoom((result.data as ChatRoom[])[0].id);
        }
      }
      setIsLoading(false);
    };

    loadRooms();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      const loadMessages = async () => {
        const result = await api.get(`/chat/room/${selectedRoom}/messages`);
        if (result.data) {
          setMessages(result.data as Message[]);
        }
      };

      loadMessages();
    }
  }, [selectedRoom]);

  const sendMessage = async () => {
    if (!messageInput.trim() || !selectedRoom) return;

    const result = await api.post(`/chat/room/${selectedRoom}/messages`, {
      content: messageInput,
    });

    if (result.data) {
      setMessages([...messages, result.data as Message]);
      setMessageInput('');
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-8 h-screen">
      <div className="col-span-1 border-r">
        <h2 className="text-xl font-bold mb-4">Conversas</h2>
        <div className="space-y-2">
          {rooms.map((room) => (
            <Card 
              key={room.id}
              className={`cursor-pointer transition-colors ${selectedRoom === room.id ? 'bg-primary text-white' : ''}`}
              onClick={() => setSelectedRoom(room.id)}
            >
              <CardContent className="pt-4">
                <p className="font-semibold">{room.name}</p>
                <p className="text-sm truncate opacity-70">{room.lastMessage}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="col-span-2 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 border rounded-lg p-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col">
              <span className="text-sm font-semibold">{msg.author.name}</span>
              <p className="bg-gray-100 rounded p-2">{msg.content}</p>
              <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleTimeString()}</span>
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
