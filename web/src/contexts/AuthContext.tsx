import { ApiError } from "@/api/errors/api-error"
import { UsersService } from "@/api/services/users"
import type { User } from "@/types"
import {
  createContext,
  useEffect,
  useState,
  type ReactNode
} from "react"
import { toast } from "sonner"

type AuthContextData = {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
  loadUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextData | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar dados ao montar o componente
  useEffect(() => {
    const loadInitialData = async () => {
      const storedToken = localStorage.getItem("accessToken")
      if (storedToken) {
        setToken(storedToken)

        try {
          const response = await UsersService.me()

          setUser(response)
        } catch (error) {
          if (error instanceof ApiError) {
            toast.error(error.message)
            logout()
          }
        }
      }

      setIsLoading(false)
    }

    loadInitialData()
  }, [token])

  function login(token: string) {
    localStorage.setItem("accessToken", token)
    setToken(token)
  }

  function logout() {
    localStorage.removeItem("accessToken")
    setToken(null)
    setUser(null)
  }

  async function loadUser() {
    const response = await UsersService.me()
    if (response) {
      setUser(response)
    }
  }

  if (isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: token !== null,
        login,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
