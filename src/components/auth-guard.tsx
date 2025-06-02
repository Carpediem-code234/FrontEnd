"use client"

import type React from "react"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  allowedRoles?: ("client" | "admin")[]
  redirectTo?: string
}

export function AuthGuard({
  children,
  requireAuth = true,
  allowedRoles = ["client", "admin"],
  redirectTo = "/auth",
}: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !user) {
        router.push(redirectTo)
        return
      }

      if (user && !allowedRoles.includes(user.type)) {
        router.push("/unauthorized")
        return
      }

      if (!requireAuth && user) {
        // Redirect logged-in users away from public pages
        if (user.type === "client") {
          router.push("/dashboard")
        } else {
          router.push("/admin")
        }
      }
    }
  }, [user, isLoading, requireAuth, allowedRoles, redirectTo, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-700"></div>
      </div>
    )
  }

  if (requireAuth && !user) {
    return null
  }

  if (user && !allowedRoles.includes(user.type)) {
    return null
  }

  if (!requireAuth && user) {
    return null
  }

  return <>{children}</>
}
