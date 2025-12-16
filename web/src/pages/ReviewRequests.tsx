import { useEffect, useState } from 'react';
import type { DataTableColumn, DataTableAction } from '@/components/DataTable';
import { DataTable } from '@/components/DataTable';
import { Badge } from '@/components/ui/badge';
import { ReviewRequestsService } from '@/services/review-request';
import { Code, Plus } from 'lucide-react';
import { RedirectButton } from '@/components/RedirectButton';
import { api } from '@/services/mock/api';

interface ReviewRequest {
  id: string;
  title: string;
  description: string;
  budget: number;
  languages: string[];
  status: string;
  author?: { name: string };
  createdAt: string;
}

export function ReviewRewquests() {
  const [requests, setRequests] = useState<ReviewRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      const result = await api.get('/review-requests');
      if (result.data) {
        setRequests(Array.isArray(result.data) ? result.data : []);
      }
      setIsLoading(false);

    };

    loadRequests();
  }, []);


  const columns: DataTableColumn<ReviewRequest>[] = [
    {
      key: 'title',
      label: 'Título',
      sortable: true,
      filterable: true,
      render: (value) => (
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-blue-600" />
          {value}
        </div>
      ),
    },
    {
      key: 'languages',
      label: 'Linguagem',
      sortable: true,
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.map((lang) => (
            <Badge
              variant="outline"
              key={lang}
            >
              {lang}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: 'description',
      label: 'Descricao',
      sortable: true,
      render: (value) => (
        <Badge variant="outline" className="truncate max-w-xs">
          {value}
        </Badge>
      ),
    },
    {
      key: 'budget',
      label: 'Orçamento',
      sortable: true,
      render: (value) => <span className="font-semibold">${value}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <Badge variant={value === 'open' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      label: 'Data',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString('pt-BR'),
    },
  ];

  const actions: DataTableAction<ReviewRequest>[] = [
    {
      label: 'Ver Detalhes',
      onClick: (row) => console.log('Ver:', row.id),
    },
    {
      label: 'Oferecer',
      onClick: (row) => console.log('Oferecer:', row.id),
      condition: (row) => row.status === 'open',
    },
  ];

  return (
    <div className="p-8">
      <div className='flex justify-between mb-6'>
        <h2 className="text-3xl font-bold">Review Requests</h2>
        <RedirectButton redirectPage='/review-requests/create' icon={Plus} text='Criar Review Request' />
      </div>
      <DataTable<ReviewRequest>
        columns={columns}
        data={requests}
        actions={actions}
        isLoading={isLoading}
        searchFields={['title', 'description', 'languages']}
        itemsPerPage={10}
      />
    </div>
  );
}
