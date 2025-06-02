"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  type: "client" | "admin"
}
interface ClientRegisterData {
  firstName: string
  lastName: string
  email: string
  // otros campos si es necesario
}

interface AdminRegisterData {
  ownerName: string
  email: string
  // otros campos si es necesario
}

type RegisterData = ClientRegisterData | AdminRegisterData

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, type: "client" | "admin") => Promise<boolean>
  register: (userData: RegisterData, type: "client" | "admin") => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, type: "client" | "admin"): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: type === "admin" ? "Admin User" : "Cliente Usuario",
        email,
        type,
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      return true
    } catch {
      return false
    }
  }

  const register = async (userData: RegisterData, type: "client" | "admin"): Promise<boolean> => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let name: string
    if (type === "admin" && "ownerName" in userData) {
      name = userData.ownerName
    } else if (type === "client" && "firstName" in userData && "lastName" in userData) {
      name = `${userData.firstName} ${userData.lastName}`
    } else {
      return false // Datos inválidos
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email: userData.email,
      type,
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    return true
  } catch {
    return false
  }
}

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
