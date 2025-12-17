import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FormField } from '@/components/FormField';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { ReviewRequestsService } from '@/api/services/review-request';
import { ApiError } from '@/api/errors/api-error';

interface CreateReviewFormData {
  title: string;
  description: string;
  price: string;
  codeSnippet: string;
  language?: number;
  paymentMethod?: number;
}


export const availableLanguages = [
  { value: 1, label: 'JavaScript' },
  { value: 2, label: 'TypeScript' },
  { value: 3, label: 'Python' },
  { value: 4, label: 'Java' },
  { value: 5, label: 'C#' },
  { value: 6, label: 'C' },
  { value: 7, label: 'C++' },
  { value: 8, label: 'Go' },
  { value: 9, label: 'Rust' },
  { value: 10, label: 'PHP' },
  { value: 11, label: 'Ruby' },
  { value: 12, label: 'Kotlin' },
  { value: 13, label: 'Swift' },
  { value: 14, label: 'Dart' },
  { value: 15, label: 'Scala' },
  { value: 16, label: 'R' },
];

export const paymentMethods = [
  { value: 1, label: 'PIX' },
  { value: 2, label: 'Cartão de Crédito' },
];

export function CreateReviewRequest() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CreateReviewFormData, string>>>({});
  const [formData, setFormData] = useState<CreateReviewFormData>({
    title: '',
    description: '',
    price: '',
    codeSnippet: '',
    language: undefined,
    paymentMethod: undefined,
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateReviewFormData, string>> = {};

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

    if (!formData.price) {
      newErrors.price = 'Preço é obrigatório';
    } else if (Number(formData.price) <= 0) {
      newErrors.price = 'Preço inválido';
    }

    if (!formData.language) {
      newErrors.language = 'Selecione uma linguagem';
    }

    if (!formData.codeSnippet.trim()) {
      newErrors.codeSnippet = 'Código é obrigatório';
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Selecione o método de pagamento';
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
    try {

      await ReviewRequestsService.create({
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        codeSnippet: formData.codeSnippet,
        language: formData.language!,
        paymentMethod: formData.paymentMethod!,
      });

      setIsLoading(false);

      toast.success('Solicitação criada com sucesso!');
      navigate('/review-requests');
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      }

      toast.error('Erro ao criar solicitação')
    }
  }

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
                className={`w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                rows={5}
              />
              {errors.description && (
                <p className="text-sm font-medium text-red-500">{errors.description}</p>
              )}
            </div>

            <FormField
              label="Valor (USD)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Ex: 50"
              error={errors.price}
              required
            />

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Método de Pagamento *</Label>

              <select
                id="paymentMethod"
                value={formData.paymentMethod ?? ''}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    paymentMethod: Number(e.target.value),
                  }))
                }
                className={`w-full p-3 border rounded-lg ${errors.paymentMethod ? 'border-red-500' : 'border-gray-300'
                  }`}
              >
                <option value="" disabled>
                  Selecione o método de pagamento
                </option>

                {paymentMethods.map(pm => (
                  <option key={pm.value} value={pm.value}>
                    {pm.label}
                  </option>
                ))}
              </select>

              {errors.paymentMethod && (
                <p className="text-sm text-red-500">{errors.paymentMethod}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Linguagens de Programação *</Label>

              <select
                id="language"
                value={formData.language ?? ""}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    language: Number(e.target.value),
                  }))
                } className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.language ? 'border-red-500' : 'border-gray-300'
                  }`}
              >
                <option value="" disabled>
                  Selecione sua linguagem
                </option>

                {availableLanguages.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>

              {errors.language && (
                <p className="mt-1 text-sm text-red-500">{errors.language}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="codeSnippet">Código *</Label>
              <textarea
                id="codeSnippet"
                name="codeSnippet"
                value={formData.codeSnippet}
                onChange={handleChange}
                placeholder="Cole aqui o código que deseja revisar"
                className={`w-full p-3 border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.codeSnippet ? 'border-red-500' : 'border-gray-300'
                  }`}
                rows={8}
              />
              {errors.codeSnippet && (
                <p className="text-sm text-red-500">{errors.codeSnippet}</p>
              )}
            </div>

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
