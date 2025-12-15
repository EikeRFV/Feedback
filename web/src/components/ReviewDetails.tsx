import { Download, FileText } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";

export function ReviewDetails() {
  const [solutions, setSolutions] = useState<String[]>([])

  return (
    <Card className="shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge className="bg-gray-900 text-white hover:bg-gray-800">Em Andamento</Badge>
          <span className="text-sm text-muted-foreground">Criado em 15/11/2025</span>
        </div>
        <CardTitle className="text-2xl">Review de código React - E-commerce</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="font-normal">
            React
          </Badge>
          <Badge variant="secondary" className="font-normal">
            TypeScript
          </Badge>
          <Badge variant="secondary" className="font-normal">
            Redux
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="mb-2 font-semibold">Descrição</h3>
          <p className="text-sm text-muted-foreground">
            Preciso de uma revisão completa do meu projeto de e-commerce em React. Tenho problemas de performance e
            gostaria de feedback sobre a arquitetura.
          </p>
        </div>

        <div>
          <h3 className="mb-2 font-semibold">Repositório</h3>
          <a
            href="https://github.com/exemplo/e-commerce-react"
            className="text-sm text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/exemplo/e-commerce-react
          </a>
        </div>

        <div>
          <h3 className="mb-2 font-semibold">Arquivos Anexados</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <span className="text-sm">arquitetura.pdf</span>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <span className="text-sm">componentes.zip</span>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="text-sm text-muted-foreground">Preço</div>
          <div className="text-2xl font-semibold">R$ 500,00</div>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="mb-4 font-semibold">Soluções (2)</h3>
          <div className="space-y-4">
            {solutions.map((solution) => (
              <Card key={solution.id} className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={solution.avatar || "/placeholder.svg"} alt={solution.name} />
                      <AvatarFallback>
                        {solution.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <div className="font-semibold">{solution.name}</div>
                          <div className="text-xs text-muted-foreground">{solution.date}</div>
                        </div>
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground">{solution.message}</p>
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">{solution.price}</div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                          {solution.accepted ? (
                            <Button size="sm" className="bg-gray-900 text-white hover:bg-gray-800">
                              Aceitar Solução
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              Aceitar
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
