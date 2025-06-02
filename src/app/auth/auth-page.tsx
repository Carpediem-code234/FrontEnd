"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Home, Scissors, Sparkles, ScissorsIcon as Cut, Facebook, Mail, Apple, AlertCircle } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [clientView, setClientView] = useState<"login" | "register">("login")
  const [adminView, setAdminView] = useState<"login" | "register">("login")

  const { login, register } = useAuth()
  const router = useRouter()

  const handleClientLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const success = await login(email, password, "client")
    if (success) {
      router.push("/dashboard")
    } else {
      alert("Error en el inicio de sesión")
    }
  }

  const handleClientRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const userData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      password: formData.get("password") as string,
    }

    const success = await register(userData, "client")
    if (success) {
      router.push("/dashboard")
    } else {
      alert("Error en el registro")
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    const success = await login(username, password, "admin")
    if (success) {
      router.push("/admin")
    } else {
      alert("Error en el acceso administrativo")
    }
  }

  const handleAdminRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const userData = {
      businessName: formData.get("businessName") as string,
      ownerName: formData.get("ownerName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    }

    const success = await register(userData, "admin")
    if (success) {
      router.push("/admin")
    } else {
      alert("Error en el registro administrativo")
    }
  }

  return (
    <>
      <style jsx global>{`
        :root {
          --primary: #6d28d9;
          --primary-dark: #5b21b6;
          --secondary: #f59e0b;
        }

        .gradient-bg {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
        }

        .btn-primary {
          background-color: var(--primary);
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background-color: var(--primary-dark);
          transform: translateY(-2px);
        }

        .input-focus:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(109, 40, 217, 0.2);
        }

        .floating-label {
          position: absolute;
          pointer-events: none;
          left: 12px;
          top: 12px;
          transition: 0.2s ease all;
          color: #9ca3af;
          font-size: 14px;
          background-color: white;
          padding: 0 4px;
          z-index: 10;
        }

        .input-container input:focus ~ .floating-label,
        .input-container input:not(:placeholder-shown) ~ .floating-label {
          top: -8px;
          left: 10px;
          font-size: 12px;
          color: var(--primary);
        }

        .input-container {
          position: relative;
        }

        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .social-btn {
          transition: all 0.3s ease;
        }

        .social-btn:hover {
          transform: translateY(-3px);
        }

        .home-btn {
          background-color: rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .home-btn:hover {
          background-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .admin-register-section {
          background-color: #f9fafb;
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin-top: 1.5rem;
          border: 1px solid #e5e7eb;
        }

        .admin-register-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .admin-register-toggle {
          color: var(--primary);
          cursor: pointer;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .admin-register-toggle svg {
          transition: transform 0.3s ease;
        }

        .admin-register-toggle.active svg {
          transform: rotate(180deg);
        }
      `}</style>

      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <Card className="w-full max-w-6xl overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row">
            {/* Branding Section */}
            <div className="w-full md:w-1/2 gradient-bg text-white p-10 relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 left-4 text-white home-btn"
                onClick={() => (window.location.href = "/")}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>

              <div className="flex flex-col justify-between h-full">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Elegance</h1>
                  <p className="text-xl opacity-90">Peluquería & Estética</p>
                </div>

                <div className="my-8">
                  <h2 className="text-2xl font-semibold mb-4">Transforma tu estilo con nosotros</h2>
                  <p className="opacity-90 mb-6">
                    Reserva citas, gestiona tu perfil y descubre nuestros servicios exclusivos.
                  </p>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-bounce-slow">
                      <Scissors className="w-6 h-6" />
                    </div>
                    <div
                      className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-bounce-slow"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div
                      className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-bounce-slow"
                      style={{ animationDelay: "0.4s" }}
                    >
                      <Cut className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="hidden md:block">
                  <p className="text-sm opacity-80">© 2025 Elegance Peluquería. Todos los derechos reservados.</p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="w-full md:w-1/2 p-8">
              <Tabs defaultValue="client" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="client">Cliente</TabsTrigger>
                  <TabsTrigger value="admin">Administrador</TabsTrigger>
                </TabsList>

                {/* Client Forms */}
                <TabsContent value="client">
                  {clientView === "login" ? (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Iniciar sesión</h2>

                      <form onSubmit={handleClientLogin} className="space-y-5">
                        <div className="input-container">
                          <Input
                            id="login-email"
                            type="email"
                            placeholder=" "
                            className="input-focus"
                            required
                            name="email"
                          />
                          <label htmlFor="login-email" className="floating-label">
                            Correo electrónico
                          </label>
                        </div>

                        <div className="input-container">
                          <Input
                            id="login-password"
                            type="password"
                            placeholder=" "
                            className="input-focus"
                            required
                            name="password"
                          />
                          <label htmlFor="login-password" className="floating-label">
                            Contraseña
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <Button variant="link" className="text-sm text-purple-600 p-0">
                            ¿Olvidaste tu contraseña?
                          </Button>
                        </div>

                        <Button type="submit" className="w-full btn-primary text-white">
                          Iniciar sesión
                        </Button>
                      </form>

                      <div className="mt-6">
                        <p className="text-center text-gray-600 mb-4">O inicia sesión con</p>
                        <div className="flex justify-center space-x-4">
                          <Button size="icon" variant="outline" className="rounded-full social-btn">
                            <Facebook className="w-4 h-4 text-blue-600" />
                          </Button>
                          <Button size="icon" variant="outline" className="rounded-full social-btn">
                            <Mail className="w-4 h-4 text-red-600" />
                          </Button>
                          <Button size="icon" variant="outline" className="rounded-full social-btn">
                            <Apple className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-center mt-6 text-gray-600">
                        ¿No tienes una cuenta?{" "}
                        <Button
                          variant="link"
                          className="text-purple-600 p-0"
                          onClick={() => setClientView("register")}
                        >
                          Regístrate
                        </Button>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear cuenta</h2>

                      <form onSubmit={handleClientRegister} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="input-container">
                            <Input
                              id="register-firstname"
                              placeholder=" "
                              className="input-focus"
                              required
                              name="firstName"
                            />
                            <label htmlFor="register-firstname" className="floating-label">
                              Nombre
                            </label>
                          </div>
                          <div className="input-container">
                            <Input
                              id="register-lastname"
                              placeholder=" "
                              className="input-focus"
                              required
                              name="lastName"
                            />
                            <label htmlFor="register-lastname" className="floating-label">
                              Apellido
                            </label>
                          </div>
                        </div>

                        <div className="input-container">
                          <Input
                            id="register-email"
                            type="email"
                            placeholder=" "
                            className="input-focus"
                            required
                            name="email"
                          />
                          <label htmlFor="register-email" className="floating-label">
                            Correo electrónico
                          </label>
                        </div>

                        <div className="input-container">
                          <Input id="register-phone" type="tel" placeholder=" " className="input-focus" name="phone" />
                          <label htmlFor="register-phone" className="floating-label">
                            Teléfono (opcional)
                          </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="input-container">
                            <Input
                              id="register-password"
                              type="password"
                              placeholder=" "
                              className="input-focus"
                              required
                              name="password"
                            />
                            <label htmlFor="register-password" className="floating-label">
                              Contraseña
                            </label>
                          </div>
                          <div className="input-container">
                            <Input
                              id="register-confirm"
                              type="password"
                              placeholder=" "
                              className="input-focus"
                              required
                            />
                            <label htmlFor="register-confirm" className="floating-label">
                              Confirmar contraseña
                            </label>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="accept-terms" required />
                          <Label htmlFor="accept-terms" className="text-sm">
                            Acepto los{" "}
                            <Button variant="link" className="text-purple-600 p-0 h-auto">
                              Términos de servicio
                            </Button>{" "}
                            y{" "}
                            <Button variant="link" className="text-purple-600 p-0 h-auto">
                              Política de privacidad
                            </Button>
                          </Label>
                        </div>

                        <Button type="submit" className="w-full btn-primary text-white">
                          Registrarse
                        </Button>
                      </form>

                      <p className="text-center mt-6 text-gray-600">
                        ¿Ya tienes una cuenta?{" "}
                        <Button variant="link" className="text-purple-600 p-0" onClick={() => setClientView("login")}>
                          Inicia sesión
                        </Button>
                      </p>
                    </div>
                  )}
                </TabsContent>

                {/* Admin Forms */}
                {adminView === "login" ? (
                  <TabsContent value="admin">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Acceso administrador</h2>

                      <form onSubmit={handleAdminLogin} className="space-y-5">
                        <div className="input-container">
                          <Input id="admin-username" placeholder=" " className="input-focus" required name="username" />
                          <label htmlFor="admin-username" className="floating-label">
                            Usuario
                          </label>
                        </div>

                        <div className="input-container">
                          <Input
                            id="admin-password"
                            type="password"
                            placeholder=" "
                            className="input-focus"
                            required
                            name="password"
                          />
                          <label htmlFor="admin-password" className="floating-label">
                            Contraseña
                          </label>
                        </div>

                        <Button type="submit" className="w-full btn-primary text-white">
                          Acceder al panel
                        </Button>
                      </form>

                      <Alert className="mt-6 border-yellow-200 bg-yellow-50">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <AlertDescription className="text-yellow-800">
                          <strong>Acceso restringido</strong>
                          <br />
                          Esta área es solo para personal autorizado de la peluquería.
                        </AlertDescription>
                      </Alert>

                      <p className="text-center mt-6 text-gray-600">
                        ¿No tienes una cuenta de administrador?{" "}
                        <Button variant="link" className="text-purple-600 p-0" onClick={() => setAdminView("register")}>
                          Regístrate
                        </Button>
                      </p>
                    </div>
                  </TabsContent>
                ) : (
                  <TabsContent value="admin">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Registro de administrador</h2>

                      <form onSubmit={handleAdminRegister} className="space-y-5">
                        <div className="input-container">
                          <Input
                            id="admin-business-name"
                            placeholder=" "
                            className="input-focus"
                            required
                            name="businessName"
                          />
                          <label htmlFor="admin-business-name" className="floating-label">
                            Nombre de la peluquería
                          </label>
                        </div>

                        <div className="input-container">
                          <Input
                            id="admin-owner-name"
                            placeholder=" "
                            className="input-focus"
                            required
                            name="ownerName"
                          />
                          <label htmlFor="admin-owner-name" className="floating-label">
                            Nombre del propietario
                          </label>
                        </div>

                        <div className="input-container">
                          <Input
                            id="admin-register-email"
                            type="email"
                            placeholder=" "
                            className="input-focus"
                            required
                            name="email"
                          />
                          <label htmlFor="admin-register-email" className="floating-label">
                            Correo electrónico
                          </label>
                        </div>

                        <div className="input-container">
                          <Input
                            id="admin-phone"
                            type="tel"
                            placeholder=" "
                            className="input-focus"
                            required
                            name="phone"
                          />
                          <label htmlFor="admin-phone" className="floating-label">
                            Teléfono de contacto
                          </label>
                        </div>

                        <div className="input-container">
                          <Input id="admin-address" placeholder=" " className="input-focus" required name="address" />
                          <label htmlFor="admin-address" className="floating-label">
                            Dirección de la peluquería
                          </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="input-container">
                            <Input
                              id="admin-register-username"
                              placeholder=" "
                              className="input-focus"
                              required
                              name="username"
                            />
                            <label htmlFor="admin-register-username" className="floating-label">
                              Nombre de usuario
                            </label>
                          </div>
                          <div className="input-container">
                            <Input
                              id="admin-register-password"
                              type="password"
                              placeholder=" "
                              className="input-focus"
                              required
                              name="password"
                            />
                            <label htmlFor="admin-register-password" className="floating-label">
                              Contraseña
                            </label>
                          </div>
                        </div>

                        <div className="input-container">
                          <Input
                            id="admin-register-confirm"
                            type="password"
                            placeholder=" "
                            className="input-focus"
                            required
                          />
                          <label htmlFor="admin-register-confirm" className="floating-label">
                            Confirmar contraseña
                          </label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="admin-accept-terms" required />
                          <Label htmlFor="admin-accept-terms" className="text-sm">
                            Acepto los{" "}
                            <Button variant="link" className="text-purple-600 p-0 h-auto">
                              Términos de servicio
                            </Button>{" "}
                            y{" "}
                            <Button variant="link" className="text-purple-600 p-0 h-auto">
                              Política de privacidad
                            </Button>
                          </Label>
                        </div>

                        <Button type="submit" className="w-full btn-primary text-white">
                          Registrar peluquería
                        </Button>
                      </form>

                      <p className="text-center mt-6 text-gray-600">
                        ¿Ya tienes una cuenta?{" "}
                        <Button variant="link" className="text-purple-600 p-0" onClick={() => setAdminView("login")}>
                          Inicia sesión
                        </Button>
                      </p>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
