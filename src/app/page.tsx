"use client"

import { AuthGuard } from "@/components/auth-guard"
import VisitorHome from "@/components/visitor-home"

export default function HomePage() {
  //indicando que no se requiere autenticación
  return (
    <AuthGuard requireAuth={false}>
      <VisitorHome />
    </AuthGuard>
  )
}
