import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api } from '@/services/mock/api';
import { Loader2, Star } from 'lucide-react';

interface Developer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  rating: number;
  avatar?: string;
}

export function Developers() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDevelopers = async () => {
      const result = await api.get('/developers');
      if (result.data) {
        setDevelopers(result.data as Developer[]);
      }
      setIsLoading(false);
    };

    loadDevelopers();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Encontre Desenvolvedores</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developers.map((dev) => (
          <Card key={dev.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{dev.firstName} {dev.lastName}</CardTitle>
                  <CardDescription>{dev.email}</CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{dev.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full cursor-pointer">Solicitar Review</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
