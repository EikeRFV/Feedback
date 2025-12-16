import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { DeveloperInfoCard } from '@/components/DeveloperInfoCard';
import { api } from '@/services/mock/api';

interface Developer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  languages?: string[];
  rating: number;
  reviewCount: number;
  solutionCount: number;
  location: string;
  hourlyRate: number;
  memberSince: string;
}

export function Developers() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("")


  const filteredDevelopers = developers.filter((dev) => {
    const fullName = `${dev.name}`.toLowerCase();
    const languages = dev.languages?.map((lang) => lang.toLowerCase()) || [];
    const query = search.toLowerCase();

    return fullName.includes(query) || languages.some((lang) => lang.includes(query));
  });

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

      <input
        type="text"
        placeholder="Buscar por nome ou linguagem..."
        className="w-full mb-6 p-2 border rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDevelopers.map((dev) => (
          <DeveloperInfoCard {...dev} key={dev.name} />
        ))}
        {filteredDevelopers.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground">
            Nenhum desenvolvedor encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
