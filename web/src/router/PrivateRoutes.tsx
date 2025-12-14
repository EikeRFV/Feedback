import { useAuth } from "@/hooks/useAuth"
import { Navigate, Outlet } from "react-router"

export function PrivateRoutes() {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
} 
