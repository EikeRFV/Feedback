import { useEffect, useState } from 'react';
import { Calendar, Loader2, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Profile } from '@/types';
import { UsersService } from '@/api/services/users';
import { AcceptReviewsService } from '@/api/services/accept-reviews';
import { useAuth } from '@/hooks/useAuth';
import { ReviewRequestsService } from '@/api/services/review-request';


export function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<Comment>()
  const { user } = useAuth()

  useEffect(() => {
    const loadProfile = async () => {
      const result = await UsersService.me();

      let solutionCount: number = 0;
      let reviewCount: number = 0;
      let requestCount: number = 0;

      if (user?.roleId === 2) {
        solutionCount = await AcceptReviewsService.findCompletedCountByDev()
        reviewCount = await AcceptReviewsService.findCountByDev()
      } else if (user?.roleId === 1) {
        const paginatedResult = await ReviewRequestsService.findByUser();
        requestCount = paginatedResult.results.length
      }

      if (result) {
        setProfile({
          ...result,
          solutionCount,
          reviewCount
        });
      }
      setIsLoading(false);
    };

    loadProfile();
  }, []);

  //
  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex gap-6">

              <Avatar className="h-30 w-30">
                <AvatarImage
                  src={profile?.avatar}
                  alt={`${profile?.firstName} ${profile?.lastName}`}
                />
                <AvatarFallback>
                  <User className="h-8 w-8 text-zinc-400" fill="currentColor" stroke="none" />
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-gray-900">{`${profile?.firstName} ${profile?.lastName}`}</h1>
                <p className="text-sm text-gray-600">{profile?.roleId === 2 ? 'Desenvolvedor' : 'Cliente'}</p>

                <div className="flex flex-col gap-1 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Membro desde {new Date(profile!.createdAt).getFullYear()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-semibold text-gray-900">
                <span className="text-yellow-500">⭐</span>
                <span>{profile?.rating}</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">Avaliação</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <div className="text-2xl font-semibold text-gray-900">
                {user?.roleId === 2 ?
                  profile?.reviewCount :
                  profile?.requestCount || 0}
              </div>
              <p className="mt-1 text-sm text-gray-600">Reviews</p>
            </div>
            {user?.roleId === 2 && (
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-2xl font-semibold text-gray-900">{profile?.solutionCount || 0}</div>
                <p className="mt-1 text-sm text-gray-600">Soluções</p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm text-gray-600">Linguagens:</p>
            <div className="flex flex-wrap gap-2">
              {profile?.languages.map((lang) => (
                <Badge variant="outline" className="rounded-md bg-white px-3 py-1" key={lang.description}>
                  {lang.description}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Tabs defaultValue="sobre" className="w-full">
            <TabsList
              className={`grid w-full rounded-lg bg-white p-1 shadow-sm ${user?.roleId === 2 ? 'grid-cols-3' : 'grid-cols-2'
                }`}
            >
              <TabsTrigger
                value="sobre"
                className="rounded-md data-[state=active]:bg-gray-100"
              >
                Sobre
              </TabsTrigger>

              {profile?.roleId === 2 && (
                <TabsTrigger
                  value="reviews"
                  className="rounded-md data-[state=active]:bg-gray-100"
                >
                  Reviews
                </TabsTrigger>
              )}

              <TabsTrigger
                value="comentarios"
                className="rounded-md data-[state=active]:bg-gray-100"
              >
                Comentários
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sobre" className="mt-4">
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">Biografia</h2>
                <p className="mt-3 text-gray-700 leading-relaxed">
                  {profile?.bio}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <p className="text-gray-600">Reviews content...</p>
              </div>
            </TabsContent>

            <TabsContent value="comentarios" className="mt-4">
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <p className="text-gray-600">Comentários content...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
