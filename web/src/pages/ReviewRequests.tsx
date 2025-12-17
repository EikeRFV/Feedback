import { useEffect, useState } from 'react';
import type { DataTableColumn, DataTableAction } from '@/components/DataTable';
import { DataTable } from '@/components/DataTable';
import { Badge } from '@/components/ui/badge';
import { Code, Plus } from 'lucide-react';
import { RedirectButton } from '@/components/RedirectButton';
import { Languages, ReviewRequestStatus, type ReviewRequest } from '@/types';
import { ReviewRequestsService } from '@/api/services/review-request';
import { useAuth } from '@/hooks/useAuth';
import { AcceptReviewsService } from '@/api/services/accept-reviews';
import { ApiError } from '@/api/errors/api-error';
import { toast } from 'sonner';


export function ReviewRequests() {
  const [requests, setRequests] = useState<ReviewRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth()


  const loadRequests = async () => {
    if (!user) return;

    setIsLoading(true);

    let result: ReviewRequest[] = [];

    try {
      if (user.roleId === 1) {
        const reviews = await ReviewRequestsService.findByUser();
        result = reviews.results;
      } else if (user.roleId === 2) {
        const acceptsReviews = await AcceptReviewsService.findAllByDev();
        result = (
          await Promise.all(
            acceptsReviews.map((acceptReview) =>
              ReviewRequestsService.findById(acceptReview.reviewId)
            )
          )
        ).filter((r): r is ReviewRequest => r !== null);
      }

      setRequests(result);
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message)
        setRequests([]);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadRequests();
  }, [user]);


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
      key: 'language',
      label: 'Linguagem',
      sortable: true,
      render: (value: number) => (
        <Badge
          variant="outline"
          key={value}
        >
          {Languages[value as keyof typeof Languages]}
        </Badge>
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
      key: 'price',
      label: 'Valor',
      sortable: true,
      render: (value) => <span className="font-semibold">R$ {value}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <Badge variant={value === 1 ? 'default' : 'secondary'}>
          {ReviewRequestStatus[value as keyof typeof ReviewRequestStatus]}
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
  ];

  return (
    <div className="p-8">
      <div className='flex justify-between mb-6'>
        <h2 className="text-3xl font-bold">Reviews</h2>
        {user?.roleId === 1 && (
          <RedirectButton redirectPage='/review-requests/create' icon={Plus} text='Criar Review Request' />
        )}
      </div>
      <DataTable<ReviewRequest>
        columns={columns}
        data={requests}
        actions={actions}
        isLoading={isLoading}
        searchFields={['title', 'description', 'language']}
        itemsPerPage={10}
      />
    </div>
  );
}
