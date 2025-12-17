import { Code, Home, MessageSquare, Search, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { NotificationsPopover } from "./NotificationsPopover";
import { useEffect, useState } from "react";
import type { User as UserProfile } from "@/types";
import { UsersService } from "@/api/services/users";

export function LoggedHeader() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    const loadProfile = async () => {
      const result = await UsersService.me();
      if (result) {
        setProfile(result);
      }
    };

    loadProfile();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-indigo-600" strokeWidth={3} />
          <span className="text-lg font-semibold">Hotfix</span>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/dashboard" className={({ isActive }) => (
            isActive ? 'bg-accent text-accent-foreground rounded-md' : ''
          )}>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 cursor-pointer">
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
          </NavLink>

          <NavLink to="/review-requests" className={({ isActive }) => (
            isActive ? 'bg-accent text-accent-foreground rounded-md' : ''
          )}>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 cursor-pointer">
              <Search className="h-4 w-4" />
              <span>Reviews</span>
            </Button>
          </NavLink>

          <NavLink to="/developers" className={({ isActive }) => (
            isActive ? 'bg-accent text-accent-foreground rounded-md' : ''
          )}>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              <span>Buscar Devs</span>
            </Button>
          </NavLink>

          <NavLink to="/chat" className={({ isActive }) => (
            isActive ? 'bg-accent text-accent-foreground rounded-md' : ''
          )}>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 cursor-pointer">
              <MessageSquare className="h-4 w-4" />
              <span>Chat</span>
            </Button>
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <NotificationsPopover />

          <div
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 cursor-pointer hover:bg-accent py-1 px-2 rounded-xl"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt={`${profile?.firstName} ${profile?.lastName}`} />
              <AvatarFallback>
                <User className="h-8 w-8 text-zinc-400" fill="currentColor" stroke="none" />
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium sm:inline-block">{`${profile?.firstName} ${profile?.lastName}`}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
