import {
  createContext,
  useEffect,
  useState,
  type ReactNode
} from "react"
import { UsersService } from "@/services/users"
import { api } from "@/services/mock/api"

type AuthContextData = {
  token: string | null
  user: any | null
  isAuthenticated: boolean
  login: (token: string, user: any) => void
  logout: () => void
  loadUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextData | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar dados ao montar o componente
  useEffect(() => {
    const loadInitialData = async () => {
      const storedToken = localStorage.getItem("accessToken")
      if (storedToken) {
        setToken(storedToken)

        const response = await api.getCurrentUser()
        if (response.data) {
          setUser(response.data)
        }
      }

      setIsLoading(false)
    }

    loadInitialData()
  }, [])

  function login(token: string, userData: any) {
    localStorage.setItem("accessToken", token)
    setToken(token)
    setUser(userData)
  }

  function logout() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    setToken(null)
    setUser(null)
  }

  async function loadUser() {
    const response = await UsersService.me()
    if (response.data) {
      setUser(response.data)
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
