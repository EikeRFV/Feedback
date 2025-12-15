import { useAuth } from "@/hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom"

export function PublicRoutes() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
