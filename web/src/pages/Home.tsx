import { BenefitCard } from "@/components/BenefitCard";
import { Footer } from "@/components/Footer";
import { HomeHeader } from "@/components/HomeHeader";
import { Button } from "@/components/ui/button";
import { Code, MessageSquare, Search, Shield, Users, Zap } from "lucide-react";

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader />
      <main className="flex flex-col items-center gap-24 md:gap-32 my-20 px-4 md:px-8 lg:px-16">

        <section className="w-full text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-linear-to-r from-blue-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">
            Reviews de Código que Elevam seu Projeto
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl mt-6">
            Conecte-se com desenvolvedores experientes para revisar seu código, melhorar a qualidade e acelerar seu aprendizado.
          </p>
        </section>

        <section className="w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">
            Por que escolher Hotfix?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <BenefitCard
              title="Reviews Profissionais"
              description="Receba feedback detalhado de desenvolvedores experientes"
              icon={Code}
            />
            <BenefitCard
              title="Encontre Especialistas"
              description="Busque desenvolvedores por linguagem e expertise"
              icon={Search}
            />
            <BenefitCard
              title="Chat em Tempo Real"
              description="Comunique-se diretamente com revisores e clientes"
              icon={MessageSquare}
            />
            <BenefitCard
              title="Pagamentos Seguros"
              description="Sistema de pagamento confiável e transparente"
              icon={Shield}
            />
            <BenefitCard
              title="Resposta Rápida"
              description="Obtenha reviews em até 24 horas"
              icon={Zap}
            />
            <BenefitCard
              title="Comunidade Ativa"
              description="Milhares de desenvolvedores prontos para ajudar"
              icon={Users}
            />
          </div>
        </section>

        <section className="w-full flex justify-center">
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 via-purple-600 to-purple-700 max-w-7xl w-full px-6 py-16 md:px-16 md:py-20 text-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Pronto para começar?
              </h2>
              <p className="text-blue-50 text-lg">
                Junte-se a milhares de desenvolvedores melhorando seu código
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg"
              >
                Criar Conta Grátis
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
