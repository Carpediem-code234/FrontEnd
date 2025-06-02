"use client"

import { AuthGuard } from "@/components/auth-guard"
import AuthPage from "./auth-page"

export default function AuthPageRoute() {
  return (
    <AuthGuard requireAuth={false}>
      <AuthPage />
    </AuthGuard>
  )
}
