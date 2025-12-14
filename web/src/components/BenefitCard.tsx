import type { ComponentType } from "react";
import { Card, CardContent } from "./ui/card";

interface BenefitCardProps {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

export function BenefitCard({ title, icon, description }: BenefitCardProps) {
  const Icon = icon;

  return (
    <Card className="border-border hover:border-primary/50 transition-colors">
      <CardContent className="pt-6 pb-6 text-center space-y-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>

        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
