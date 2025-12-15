import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/services/api';
import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ReviewRequest {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: string;
  language: string;
  createdAt: string;
  proposalsCount?: number;
}

export function MyRequests() {
  const [requests, setRequests] = useState<ReviewRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      const result = await api.get('/review-requests/my-requests');
      if (result.data) {
        setRequests(result.data as ReviewRequest[]);
      }
      setIsLoading(false);
    };

    loadRequests();
  }, []);

  const deleteRequest = async (requestId: string) => {
    if (!window.confirm('Tem certeza que quer deletar esta solicitação?')) return;

    const result = await api.delete(`/review-requests/${requestId}`);
    if (result.data) {
      setRequests(requests.filter(r => r.id !== requestId));
      toast.success('Solicitação deletada com sucesso');
    } else {
      toast.error('Erro ao deletar solicitação');
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Minhas Solicitações</h1>
        <Button className="cursor-pointer">Criar Nova Solicitação</Button>
      </div>
      
      <div className="space-y-4">
        {requests.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Você ainda não criou nenhuma solicitação</p>
            </CardContent>
          </Card>
        ) : (
          requests.map((req) => (
            <Card key={req.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle>{req.title}</CardTitle>
                    <CardDescription>{req.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge>{req.status}</Badge>
                    <Badge variant="outline">{req.language}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Orçamento</p>
                      <p className="text-lg font-bold">${req.budget}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Propostas</p>
                      <p className="text-lg font-bold">{req.proposalsCount || 0}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="cursor-pointer">Editar</Button>
                    <Button 
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteRequest(req.id)}
                      className="cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
