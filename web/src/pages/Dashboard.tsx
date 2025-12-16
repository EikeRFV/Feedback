import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ReviewRequest } from '@/types';
import { api } from '@/services/mock/api';

interface DashboardStats {
  activeRequests?: number;
  completedReviews?: number;
  pendingProposals?: number;
  totalSpent?: number;
  activeReviews?: number;
  earnings?: number;
  rating?: number;
}

export function Dashboard() {
  const [requests, setRequests] = useState<ReviewRequest[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadStats = async () => {
    const result = await api.get('/dashboard/stats');
    if (result.data) {
      setStats(result.data);
    }
    setIsLoading(false);
  };

  const loadRequests = async () => {
    const result = await api.get('/review-requests/my-requests');
    if (result.data) {
      setRequests(result.data as ReviewRequest[]);
    }
    setIsLoading(false);
  };


  useEffect(() => {
    loadStats();
    loadRequests();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="grid gap-4 p-8">
      <div className='mb-6'>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Bem-vindo, João Cliente!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats && (
          Object.entries(stats).map(([key, value]) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="text-sm font-medium capitalize">{key}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{value}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-6">Minhas Solicitações</h2>
          <div className="space-y-4">
            {requests.map((request, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">{request.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{new Date(request.createdAt).toLocaleDateString("pt-BR")}</span>
                    <span>R$ {request.budget}</span>
                  </div>
                </div>
                <Badge className={request.status === 'pending' ? 'bg-gray-400' : 'bg-gray-50'}>{request.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
