import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ReviewRequestStatus, type ReviewRequest } from '@/types';
import { AcceptReviewsService } from '@/api/services/accept-reviews';
import { ReviewRequestsService } from '@/api/services/review-request';
import { useAuth } from '@/hooks/useAuth';

interface DashboardStats {
  activeRequests?: number;
  completedReviews?: number;
  completedRequests?: number;
  pendingProposals?: number;
  totalSpent?: number;
  activeReviews?: number;
  earnings?: number;
  rating?: number;
}

export function Dashboard() {
  const [requests, setRequests] = useState<ReviewRequest[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth()

  const findReviewRequest = async (reviewId: string) => {
    return await ReviewRequestsService.findById(reviewId);
  }

  const loadStats = async () => {
    let stats: DashboardStats = {};

    if (user?.roleId === 1) {
      const reviewRequests = await ReviewRequestsService.findByUser({ limit: 1000, offset: 0 })

      const {
        openingRequests,
        completedRequests,
        pendingRequests,
        totalSpent,
      } = reviewRequests.results.reduce(
        (
          acc: {
            openingRequests: number,
            completedRequests: number;
            pendingRequests: number;
            totalSpent: number;
          },
          review
        ) => {
          switch (review.status) {
            case 2:
              acc.pendingRequests++;
              break;

            case 3:
              acc.completedRequests++;
              acc.totalSpent += review.price;
              break;
          }

          return acc;
        },
        {
          openingRequests: 0,
          completedRequests: 0,
          pendingRequests: 0,
          totalSpent: 0,
        }
      );

      stats = {
        activeRequests: openingRequests + pendingRequests,
        pendingProposals: pendingRequests,
        completedRequests,
        totalSpent,
      }
    } else {
      const acceptsReviews = await AcceptReviewsService.findAllByDev();

      let earnings: number = 0;
      let completedReviews: number = 0;
      let activeReviews: number = 0;
      for (const acceptReview of acceptsReviews) {
        const reviewRequest =
          await findReviewRequest(acceptReview.reviewId);

        if (!reviewRequest) continue;

        if (reviewRequest.status === 3) {
          completedReviews++;
          earnings += reviewRequest.price;
        }

        if (reviewRequest.status === 2) {
          activeReviews++;
        }
      }

      stats = {
        rating: user?.rating,
        earnings,
        completedReviews,
        activeReviews
      }
    }

    setStats(stats)
    setIsLoading(false);
  };

  const loadRequests = async () => {
    let result: ReviewRequest[] = [];
    if (user?.roleId === 1) {
      const reviews = await ReviewRequestsService.findByUser();
      result = reviews.results;
    } else if (user?.roleId === 2) {
      const acceptsReviews = await AcceptReviewsService.findAllByDev();
      result = (
        await Promise.all(
          acceptsReviews.map((acceptReview) =>
            ReviewRequestsService.findById(acceptReview.reviewId)
          )
        )
      ).filter((r): r is ReviewRequest => r !== null);
    }

    if (result) {
      setRequests(result);
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
        <p className="text-muted-foreground mt-1">Bem-vindo, {`${user?.firstName} ${user?.lastName}`}</p>
      </div>

      {user && (
        user.roleId === 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card key="activeRequests">
              <CardHeader>
                <CardTitle className="text-sm font-medium capitalize">
                  Solicitações Ativas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats?.activeRequests || 0}</p>
              </CardContent>
            </Card>

            <Card key="completedRequests">
              <CardHeader>
                <CardTitle className="text-sm font-medium capitalize">
                  Solicitações Concluídas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats?.completedRequests || 0}</p>
              </CardContent>
            </Card>

            <Card key="pendingProposals">
              <CardHeader>
                <CardTitle className="text-sm font-medium capitalize">
                  Propostas Pendentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats?.pendingProposals || 0}</p>
              </CardContent>
            </Card>

            <Card key="totalSpent">
              <CardHeader>
                <CardTitle className="text-sm font-medium capitalize">
                  Total Investido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">R$ {stats?.totalSpent || 0}</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card key="rating">
              <CardHeader>
                <CardTitle className="text-sm font-medium capitalize">
                  Avaliação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats?.rating || 0.0}</p>
              </CardContent>
            </Card>

            <Card key="earnings">
              <CardHeader>
                <CardTitle className="text-sm font-medium capitalize">
                  Ganhos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">R$ {stats?.earnings || 0.00}</p>
              </CardContent>
            </Card>

            <Card key="activeReviews">
              <CardHeader>
                <CardTitle className="text-sm font-medium capitalize">
                  Revisões Ativas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats?.activeReviews || 0}</p>
              </CardContent>
            </Card>

            <Card key="completedReviews">
              <CardHeader>
                <CardTitle className="text-sm font-medium capitalize">
                  Revisões Concluídas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats?.completedReviews || 0}</p>
              </CardContent>
            </Card>
          </div>
        )
      )}

      <Card>
        <CardContent className="px-6">
          <h2 className="text-2xl font-semibold mb-6">
            {user?.roleId === 1 ? (
              'Minhas Solicitações'
            ) : (
              'Minhas Revisões'
            )}
          </h2>
          <div className="space-y-4">
            {requests.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg bg-white p-10 text-center ">
                <h3 className="text-lg font-semibold text-gray-700">
                  Nenhuma solicitação ainda 📭
                </h3>
                <p className="mt-2 max-w-sm text-sm text-gray-500">
                  Assim que houver solicitações, elas aparecerão aqui para você acompanhar.
                </p>
              </div>
            ) : (
              requests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">
                      {request.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>R$ {request.price}</span>
                    </div>
                  </div>

                  <Badge
                    className={
                      request.status === 1
                        ? 'bg-gray-400 text-white'
                        : 'bg-gray-50 text-gray-700'
                    }
                  >
                    {ReviewRequestStatus[request.status as keyof typeof ReviewRequestStatus]}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div >
  );
}
