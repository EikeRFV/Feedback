import { Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function Header() {
  const navigate = useNavigate()
  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold">Hotfix</span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="default"
            onClick={() => navigate('/login')}
            className="cursor-pointer"
          >
            Entrar
          </Button>
          <Button
            variant="default"
            size="default"
            onClick={() => navigate('/signup')}
            className="cursor-pointer"
          >
            Criar Conta
          </Button>
        </div>
      </div>
    </header>
  )
}
