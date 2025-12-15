import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Star } from "lucide-react";
import { Button } from "./ui/button";

export function ReviewSidebar() {
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Solicitado por</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" alt="João Cliente" />
              <AvatarFallback>JC</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-semibold">João Cliente</div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>4.5</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Ações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 bg-transparent"
          >
            Editar Request
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 bg-transparent"
          >
            Fechar Request
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
