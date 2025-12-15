import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FormField } from '@/components/FormField';
import { api } from '@/services/api';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface CreateReviewFormData {
  title: string;
  description: string;
  budget: string;
  language: string;
  repositoryUrl: string;
}

/**
 * Página com exemplo de formulário com validação
 * Usa o componente FormField para validação em tempo real
 */
export function CreateReviewRequest() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<CreateReviewFormData>>({});
  const [formData, setFormData] = useState<CreateReviewFormData>({
    title: '',
    description: '',
    budget: '',
    language: '',
    repositoryUrl: '',
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateReviewFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Título deve ter pelo menos 5 caracteres';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Descrição deve ter pelo menos 20 caracteres';
    }

    if (!formData.budget) {
      newErrors.budget = 'Orçamento é obrigatório';
    } else if (Number(formData.budget) < 10) {
      newErrors.budget = 'Orçamento mínimo é $10';
    }

    if (!formData.language) {
      newErrors.language = 'Linguagem é obrigatória';
    }

    if (!formData.repositoryUrl.trim()) {
      newErrors.repositoryUrl = 'URL do repositório é obrigatória';
    } else if (!formData.repositoryUrl.match(/^https?:\/\/.+/)) {
      newErrors.repositoryUrl = 'URL inválida. Deve começar com http:// ou https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpar erro do campo quando usuário começa a digitar
    if (errors[name as keyof CreateReviewFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Preencha todos os campos corretamente');
      return;
    }

    setIsLoading(true);
    const result = await api.post('/review-requests', {
      title: formData.title,
      description: formData.description,
      budget: Number(formData.budget),
      language: formData.language,
      repositoryUrl: formData.repositoryUrl,
    });

    setIsLoading(false);

    if (result.data) {
      toast.success('Solicitação criada com sucesso!');
      navigate('/review-requests');
    } else {
      toast.error(result.error || 'Erro ao criar solicitação');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Criar Solicitação de Review</CardTitle>
          <CardDescription>
            Preencha os dados para solicitar uma revisão de código
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Título"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Review de API REST em Node.js"
              error={errors.title}
              required
              minLength={5}
            />

            <div className="space-y-2">
              <Label htmlFor="description">Descrição *</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreva o projeto e o que você gostaria de melhorar"
                className={`w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={5}
              />
              {errors.description && (
                <p className="text-sm font-medium text-red-500">{errors.description}</p>
              )}
            </div>

            <FormField
              label="Orçamento (USD)"
              name="budget"
              type="number"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Ex: 50"
              error={errors.budget}
              required
            />

            <div className="space-y-2">
              <Label htmlFor="language">Linguagem de Programação *</Label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.language ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione uma linguagem</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="cpp">C++</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
              </select>
              {errors.language && (
                <p className="text-sm font-medium text-red-500">{errors.language}</p>
              )}
            </div>

            <FormField
              label="URL do Repositório"
              name="repositoryUrl"
              type="url"
              value={formData.repositoryUrl}
              onChange={handleChange}
              placeholder="https://github.com/seu-usuario/seu-repo"
              error={errors.repositoryUrl}
              required
            />

            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/review-requests')}
                className="cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando...
                  </>
                ) : (
                  'Criar Solicitação'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
