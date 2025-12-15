import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/services/mock/api';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  avatar?: string;
}

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
    const result = await api.put('/users/me', formData);
    if (result.data) {
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
    <div className="max-w-2xl mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Meu Perfil</CardTitle>
          <CardDescription>Gerencie suas informações pessoais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="firstName">Primeiro Nome</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Diga algo sobre você"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveProfile} className="cursor-pointer">Salvar</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="cursor-pointer">Cancelar</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground">Nome Completo</Label>
                <p className="text-lg font-semibold">{profile?.firstName} {profile?.lastName}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Email</Label>
                <p className="text-lg">{profile?.email}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Bio</Label>
                <p className="text-lg">{profile?.bio || 'Nenhuma bio adicionada'}</p>
              </div>
              <Button onClick={() => setIsEditing(true)} className="cursor-pointer">Editar Perfil</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
