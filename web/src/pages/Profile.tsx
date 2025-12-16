import { useEffect, useState } from 'react';
import { UsersService } from '@/services/users';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, Loader2, MapPin, User } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User as UserProfile } from '@/types';
import { api } from '@/services/mock/api';


export function Profile() {
  const { loadUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
  });

  useEffect(() => {
    const loadProfile = async () => {
      const result = await api.getCurrentUser();
      if (result.data) {
        setProfile(result.data as UserProfile);
        setFormData({
          firstName: result.data.firstName || '',
          lastName: result.data.lastName || '',
          bio: result.data.bio || '',
        });
      }
      setIsLoading(false);
    };

    loadProfile();
  }, []);

  const handleSaveProfile = async () => {
    const result = await api.put('/users/me', formData); if (result.data) {
      setProfile(result.data as UserProfile);
      setIsEditing(false);
      await loadUser();
      toast.success('Perfil atualizado com sucesso!');
    } else {
      toast.error('Erro ao atualizar perfil');
    }
  };

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
                  alt={profile?.name}
                />
                <AvatarFallback>
                  <User className="h-8 w-8 text-zinc-400" fill="currentColor" stroke="none" />
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-gray-900">{profile?.name}</h1>
                <p className="text-sm text-gray-600">{profile?.role === "dev" ? 'Desenvolvedor' : 'Cliente'}</p>

                <div className="flex flex-col gap-1 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profile?.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Membro desde {new Date(profile!.memberSince).getFullYear()}</span>
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
              <div className="text-2xl font-semibold text-gray-900">{profile?.reviewCount}</div>
              <p className="mt-1 text-sm text-gray-600">Reviews</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <div className="text-2xl font-semibold text-gray-900">{profile?.solutionCount}</div>
              <p className="mt-1 text-sm text-gray-600">Soluções</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm text-gray-600">Linguagens:</p>
            <div className="flex flex-wrap gap-2">
              {profile?.languages.map((lang) => (
                <Badge variant="outline" className="rounded-md bg-white px-3 py-1">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Tabs defaultValue="sobre" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-lg bg-white p-1 shadow-sm">
              <TabsTrigger
                value="sobre"
                className="rounded-md data-[state=active]:bg-gray-100"
              >
                Sobre
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-md data-[state=active]:bg-gray-100"
              >
                Reviews
              </TabsTrigger>
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
