"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import {
  LogOut,
  Users,
  Calendar,
  BarChart3,
  Settings,
  Building2,
  UserCheck,
  Clock,
  Star,
  DollarSign,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const { user, logout } = useAuth()

  // TODO: Backend Integration - Fetch real statistics from API
  const stats = {
    totalClients: 1234,
    todayReservations: 23,
    monthlyRevenue: 12345,
    activeServices: 8,
    totalEmployees: 12,
    pendingReservations: 5,
    averageRating: 4.7,
    blockedDates: 3,
  }

  const recentActivity = [
    { type: "reservation", message: "Nueva reserva de María García", time: "Hace 5 min" },
    { type: "employee", message: "Empleado Juan Pérez actualizado", time: "Hace 15 min" },
    { type: "service", message: "Servicio 'Coloración Premium' agregado", time: "Hace 1 hora" },
    { type: "alert", message: "Cita modificada - Cliente Ana López", time: "Hace 2 horas" },
  ]

  return (
    <AuthGuard requireAuth={true} allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-purple-600">Elegance Admin</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Bienvenido, {user?.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    logout(); // Llama a la función para cerrar sesión
                    window.location.href = "/"; // Redirige al inicio
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clientes Totales</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalClients.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+20.1% desde el mes pasado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reservas Hoy</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.todayReservations}</div>
                <p className="text-xs text-muted-foreground">{stats.pendingReservations} pendientes de confirmación</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+15.2% desde el mes pasado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calificación Promedio</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averageRating}</div>
                <p className="text-xs text-muted-foreground">Basado en 127 reseñas</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Management Sections */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Gestión de Empresa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/admin/company">
                      <Button className="w-full h-20 flex flex-col" variant="outline">
                        <Building2 className="h-6 w-6 mb-2" />
                        Datos de Empresa
                      </Button>
                    </Link>
                    <Link href="/admin/services">
                      <Button className="w-full h-20 flex flex-col" variant="outline">
                        <Settings className="h-6 w-6 mb-2" />
                        Servicios
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Employee Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Gestión de Empleados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/admin/employees">
                      <Button className="w-full h-20 flex flex-col" variant="outline">
                        <Users className="h-6 w-6 mb-2" />
                        Empleados
                        <span className="text-xs text-gray-500">{stats.totalEmployees} activos</span>
                      </Button>
                    </Link>
                    <Link href="/admin/schedules">
                      <Button className="w-full h-20 flex flex-col" variant="outline">
                        <Clock className="h-6 w-6 mb-2" />
                        Horarios
                      </Button>
                    </Link>
                    <Link href="/admin/blocked-dates">
                      <Button className="w-full h-20 flex flex-col" variant="outline">
                        <AlertTriangle className="h-6 w-6 mb-2" />
                        Fechas Bloqueadas
                        <span className="text-xs text-gray-500">{stats.blockedDates} activas</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Reservations Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Gestión de Reservaciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/admin/reservations">
                      <Button className="w-full h-20 flex flex-col" variant="outline">
                        <Calendar className="h-6 w-6 mb-2" />
                        Todas las Reservas
                      </Button>
                    </Link>
                    <Link href="/admin/availability">
                      <Button className="w-full h-20 flex flex-col" variant="outline">
                        <Clock className="h-6 w-6 mb-2" />
                        Disponibilidad
                      </Button>
                    </Link>
                    <Link href="/admin/waiting-list">
                      <Button className="w-full h-20 flex flex-col" variant="outline">
                        <Users className="h-6 w-6 mb-2" />
                        Lista de Espera
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Reports and Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Reportes y Análisis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/admin/reports">
                      <Button className="w-full h-20 flex flex-col" variant="outline">
                        <BarChart3 className="h-6 w-6 mb-2" />
                        Reportes
                      </Button>
                    </Link>
                    <Link href="/admin/reviews">
                      <Button className="w-full h-20 flex flex-col" variant="outline">
                        <Star className="h-6 w-6 mb-2" />
                        Calificaciones
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/admin/employees/new">
                    <Button variant="outline" className="w-full justify-start">
                      <UserCheck className="h-4 w-4 mr-2" />
                      Agregar Empleado
                    </Button>
                  </Link>
                  <Link href="/admin/services/new">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Nuevo Servicio
                    </Button>
                  </Link>
                  <Link href="/admin/blocked-dates/new">
                    <Button variant="outline" className="w-full justify-start">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Bloquear Fecha
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Estado del Sistema</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Notificaciones</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Activas</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Recordatorios</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Activos</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Facturación</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Operativa</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
