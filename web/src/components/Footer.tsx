import { Code } from "lucide-react"
import { FooterDialog } from "./FooterDialog"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Code className="h-4 w-4" />
            <span>Hotfix © 2025</span>
          </div>

          <nav className="flex items-center gap-6">
            <FooterDialog title="Sobre">
              Somos uma plataforma focada em qualidade, performance e boas práticas
              de desenvolvimento.
            </FooterDialog>

            <FooterDialog title="Termos">
              Ao utilizar a plataforma, você concorda com nossos termos de uso,
              políticas de acesso e responsabilidades.
            </FooterDialog>

            <FooterDialog title="Privacidade">
              Seus dados são tratados com segurança e nunca compartilhados com
              terceiros sem consentimento.
            </FooterDialog>

            <FooterDialog title="Suporte">
              Entre em contato pelo e-mail suporte@hotfix.dev ou pelo nosso Discord
              oficial.
            </FooterDialog>
          </nav>
        </div>
      </div>
    </footer>
  )
}
