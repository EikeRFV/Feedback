import { DollarSign, MapPin, Star, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
interface DeveloperInfoCardProps {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  languages?: string[];
  rating: number;
  reviewCount: number;
  solutionCount: number;
  memberSince: string;
  location: string;
  hourlyRate: number;
}

export function DeveloperInfoCard({
  name,
  avatar,
  rating,
  reviewCount,
  bio,
  languages,
  location,
  hourlyRate,
  memberSince,
}: DeveloperInfoCardProps) {
  return (
    <Card className="w-full max-full p-6">
      <div className="flex gap-6">
        <Avatar className="h-20 w-20 shrink-0">
          <AvatarImage
            src={avatar}
            alt={name}
          />
          <AvatarFallback>
            <User className="h-8 w-8 text-zinc-400" fill="currentColor" stroke="none" />
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-1">
              {name}
            </h1>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-foreground">{rating}</span>
              <span className="text-muted-foreground text-sm">({reviewCount} reviews)</span>
            </div>
          </div>

          {bio && (
            <p className="text-foreground leading-relaxed">
              {bio}
            </p>
          )}

          {languages && languages.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {languages.map((language) => (
                <Badge key={language} variant="secondary" className="bg-white border border-border font-normal">
                  {language}
                </Badge>
              ))}
              {languages.length > 4 && (
                <Badge variant="secondary" className="bg-white border border-border font-normal">
                  +{languages.length - 4}
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-4 w-4" />
              <span>R$ {hourlyRate}/hora</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>Membro desde {new Date(memberSince).getFullYear()}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
