import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, ChevronDown, Code2, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { AuthService } from '@/api/services/auth';
import { ApiError } from '@/api/errors/api-error';
import type { Signup } from '@/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { availableLanguages } from '../CreateReviewRequest';
import { Badge } from '@/components/ui/badge';

type RoleId = 1 | 2;

export function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Signup>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roleId: 1 as RoleId,
    languages: []
  });
  const navigate = useNavigate();

  function handleChange<K extends keyof typeof formData>(
    field: K,
    value: typeof formData[K]
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function toggleLanguage(languageId: number) {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(languageId)
        ? prev.languages.filter((id) => id !== languageId)
        : [...prev.languages, languageId],
    }));
  }

  function removeLanguage(languageId: number) {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((id) => id !== languageId),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      roleId,
      languages,
    } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    if (password.length < 8) {
      toast.error('A senha deve ter pelo menos 8 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    try {
      setIsLoading(true);

      await AuthService.signup({
        firstName,
        lastName,
        email,
        password,
        roleId,
        languages
      });

      toast.success('Conta criada com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message)
        return
      }

      toast.error('Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-white to-gray-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Code2 className="size-10 text-blue-600" />
            <span className="text-3xl">Hotfix</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Criar sua conta</CardTitle>
            <CardDescription>
              Preencha os dados para começar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Primeiro Nome</Label>
                <Input
                  id="firstName"
                  placeholder="João"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  disabled={isLoading}
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor="name">Sobrenome</Label>
                <Input
                  id="lastName"
                  placeholder="Da Silva"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label>Linguagens</Label>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                      disabled={isLoading}
                    >
                      {formData.languages.length > 0
                        ? `${formData.languages.length} selecionada(s)`
                        : 'Selecionar linguagens'}
                      <ChevronDown className="ml-2 size-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    align="start"
                    side="bottom"
                    sideOffset={4}
                    className="p-2 min-w-[--radix-popover-trigger-width]"
                  >
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {availableLanguages.map((language) => {
                        const selected = formData.languages.includes(language.value);

                        return (
                          <button
                            key={language.value}
                            type="button"
                            onClick={() => toggleLanguage(language.value)}
                            className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                          >
                            <span>{language.label}</span>

                            {selected && (
                              <Check className="size-4 text-blue-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>

                {formData.languages.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.languages.map((id) => {
                      const language = availableLanguages.find(
                        (l) => l.value === id
                      );

                      if (!language) return null;

                      return (
                        <Badge
                          key={id}
                          variant="secondary"
                          className="flex items-center gap-1 bg-blue-100 text-blue-700"
                        >
                          {language.label}
                          <button
                            type="button"
                            onClick={() => removeLanguage(id)}
                            className="ml-1 rounded-full hover:bg-blue-200 p-0.5"
                          >
                            <X className="size-3" />
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo de conta</Label>
                <RadioGroup
                  value={String(formData.roleId)}
                  onValueChange={(value) => handleChange('roleId', Number(value) as RoleId)}
                  disabled={isLoading}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="client" />
                    <Label htmlFor="client">Cliente</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="dev" />
                    <Label htmlFor="dev">Desenvolvedor</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  'Criar conta'
                )}
              </Button>

              <div className="text-center text-sm">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Entrar
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
