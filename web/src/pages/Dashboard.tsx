import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/services/mock/api';
import { Loader2 } from 'lucide-react';

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
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const result = await api.get('/dashboard/stats');
      if (result.data) {
        setStats(result.data);
      }
      setIsLoading(false);
    };

    loadStats();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="grid gap-4 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(stats).map(([key, value]) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="text-sm font-medium capitalize">{key}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
