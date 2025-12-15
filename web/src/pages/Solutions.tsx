import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/services/api';
import { Loader2, Code, ThumbsUp } from 'lucide-react';

interface Solution {
  id: string;
  title?: string;
  description?: string;
  status: string;
  createdAt: string;
  author: { name: string; rating: number };
  requestId: string;
  upvotes?: number;
}

export function Solutions() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSolutions = async () => {
      const result = await api.get('/solutions');
      if (result.data) {
        setSolutions(result.data as Solution[]);
      }
      setIsLoading(false);
    };

    loadSolutions();
  }, []);

  const upvoteSolution = async (solutionId: string) => {
    const result = await api.post(`/solutions/${solutionId}/upvote`, {});
    if (result.data) {
      setSolutions(solutions.map(s => 
        s.id === solutionId ? { ...s, upvotes: (s.upvotes || 0) + 1 } : s
      ));
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Soluções Propostas</h1>
      
      <div className="space-y-4">
        {solutions.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Nenhuma solução encontrada</p>
            </CardContent>
          </Card>
        ) : (
          solutions.map((sol) => (
            <Card key={sol.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <Code className="w-5 h-5 mt-1 text-blue-600" />
                    <div className="flex-1">
                      <CardTitle>{sol.title || 'Solução'}</CardTitle>
                      <CardDescription>{sol.description}</CardDescription>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="outline">{sol.author.name}</Badge>
                        <span className="text-sm text-muted-foreground">★ {sol.author.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Badge>{sol.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {new Date(sol.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => upvoteSolution(sol.id)}
                      className="cursor-pointer flex items-center gap-1"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      {sol.upvotes || 0}
                    </Button>
                    <Button variant="default" size="sm" className="cursor-pointer">
                      Ver Detalhes
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
