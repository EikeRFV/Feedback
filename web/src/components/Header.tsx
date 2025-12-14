import { Code } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold">Hotfix</span>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="default">
            Entrar
          </Button>
          <Button variant="default" size="default">
            Criar Conta
          </Button>
        </div>
      </div>
    </header>
  )
}
