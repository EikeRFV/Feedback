import { Bell, Home, MessageSquare, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { NavLink } from "react-router-dom";

export function LoggedHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-indigo-600 text-white">
            <span className="font-mono text-sm font-bold">&lt;/&gt;</span>
          </div>
          <span className="text-lg font-semibold">Hotfix</span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/dashboard" className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/my-reviews" className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
            <Search className="h-4 w-4" />
            <span>Reviews</span>
          </NavLink>
          <NavLink to="/developers" className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
            <User className="h-4 w-4" />
            <span>Buscar Devs</span>
          </NavLink>
          <NavLink to="/chat" className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
            <MessageSquare className="h-4 w-4" />
            <span>Chat</span>
          </NavLink>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="João Cliente" />
              <AvatarFallback>JC</AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium sm:inline-block">João Cliente</span>
          </div>
        </div>
      </div>
    </header>
  )
}
