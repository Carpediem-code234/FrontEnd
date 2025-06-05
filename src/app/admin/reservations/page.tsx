"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Search,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
} from "lucide-react"
import Link from "next/link"

interface Reservation {
  id: number
  clientName: string
  clientEmail: string
  clientPhone: string
  serviceName: string
  employeeName: string
  date: string
  time: string
  duration: number
  price: number
  status: "confirmed" | "pending" | "cancelled" | "completed" | "no-show"
  notes?: string
  createdAt: string
}

export default function ReservationsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDate, setFilterDate] = useState("")
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)

  // TODO: Backend Integration - Fetch reservations from API (CU30)
  const reservations: Reservation[] = [
    {
      id: 1,
      clientName: "María García",
      clientEmail: "maria@email.com",
      clientPhone: "+34 123 456 789",
      serviceName: "Corte de Cabello",
      employeeName: "Ana López",
      date: "2024-01-15",
      time: "10:30",
      duration: 45,
      price: 25,
      status: "confirmed",
      notes: "Cliente prefiere corte no muy corto",
      createdAt: "2024-01-10T09:00:00Z",
    },
    {
      id: 2,
      clientName: "Carmen Ruiz",
      clientEmail: "carmen@email.com",
      clientPhone: "+34 987 654 321",
      serviceName: "Coloración Completa",
      employeeName: "María García",
      date: "2024-01-15",
      time: "14:00",
      duration: 150,
      price: 65,
      status: "pending",
      notes: "Quiere rubio ceniza",
      createdAt: "2024-01-12T15:30:00Z",
    },
    {
      id: 3,
      clientName: "Laura Martín",
      clientEmail: "laura@email.com",
      clientPhone: "+34 555 123 456",
      serviceName: "Peinado Especial",
      employeeName: "Carmen Ruiz",
      date: "2024-01-16",
      time: "16:00",
      duration: 60,
      price: 35,
      status: "confirmed",
      notes: "Para evento de noche",
      createdAt: "2024-01-11T11:15:00Z",
    },
    {
      id: 4,
      clientName: "Ana Fernández",
      clientEmail: "ana@email.com",
      clientPhone: "+34 777 888 999",
      serviceName: "Manicure Clásica",
      employeeName: "Laura Martín",
      date: "2024-01-14",
      time: "11:00",
      duration: 45,
      price: 20,
      status: "completed",
      createdAt: "2024-01-09T14:20:00Z",
    },
    {
      id: 5,
      clientName: "Isabel Torres",
      clientEmail: "isabel@email.com",
      clientPhone: "+34 666 555 444",
      serviceName: "Tratamiento Capilar",
      employeeName: "Carmen Ruiz",
      date: "2024-01-13",
      time: "15:30",
      duration: 75,
      price: 40,
      status: "no-show",
      notes: "No se presentó a la cita",
      createdAt: "2024-01-08T10:45:00Z",
    },
  ]

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.employeeName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || reservation.status === filterStatus
    const matchesDate = !filterDate || reservation.date === filterDate

    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { label: "Confirmada", variant: "default" as const, icon: CheckCircle },
      pending: { label: "Pendiente", variant: "secondary" as const, icon: AlertCircle },
      cancelled: { label: "Cancelada", variant: "destructive" as const, icon: XCircle },
      completed: { label: "Completada", variant: "outline" as const, icon: CheckCircle },
      "no-show": { label: "No se presentó", variant: "destructive" as const, icon: XCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  const handleStatusChange = (reservationId: number, newStatus: string) => {
    // TODO: Backend Integration - Update reservation status via API (CU31)
    console.log("Cambiando estado de reserva:", reservationId, "a", newStatus)
    alert(`Estado cambiado a ${newStatus}`)
  }

  const handleSendReminder = (reservationId: number) => {
    // TODO: Backend Integration - Send reminder notification (CU32)
    console.log("Enviando recordatorio para reserva:", reservationId)
    alert("Recordatorio enviado exitosamente")
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}min` : ""}`
    }
    return `${mins}min`
  }

  const getReservationsByStatus = (status: string) => {
    return reservations.filter((r) => r.status === status).length
  }

  return (
    <AuthGuard requireAuth={true} allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-4">
                <Link href="/admin">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver
                  </Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Reservaciones</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{getReservationsByStatus("confirmed")}</div>
                <div className="text-sm text-gray-600">Confirmadas</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{getReservationsByStatus("pending")}</div>
                <div className="text-sm text-gray-600">Pendientes</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{getReservationsByStatus("completed")}</div>
                <div className="text-sm text-gray-600">Completadas</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{getReservationsByStatus("cancelled")}</div>
                <div className="text-sm text-gray-600">Canceladas</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{getReservationsByStatus("no-show")}</div>
                <div className="text-sm text-gray-600">No Show</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar reservas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="confirmed">Confirmadas</SelectItem>
                    <SelectItem value="pending">Pendientes</SelectItem>
                    <SelectItem value="completed">Completadas</SelectItem>
                    <SelectItem value="cancelled">Canceladas</SelectItem>
                    <SelectItem value="no-show">No Show</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  placeholder="Filtrar por fecha"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setFilterStatus("all")
                    setFilterDate("")
                  }}
                >
                  Limpiar Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reservations List */}
          <div className="space-y-4">
            {filteredReservations.map((reservation) => (
              <Card key={reservation.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{reservation.clientName}</h3>
                        <p className="text-sm text-gray-600">{reservation.serviceName}</p>
                      </div>
                    </div>
                    {getStatusBadge(reservation.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>
                        {new Date(reservation.date).toLocaleDateString("es-ES", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>
                        {reservation.time} ({formatDuration(reservation.duration)})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{reservation.employeeName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <span>${reservation.price}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{reservation.clientEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{reservation.clientPhone}</span>
                    </div>
                  </div>

                  {reservation.notes && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Notas:</strong> {reservation.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 flex-wrap">
                    {reservation.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(reservation.id, "confirmed")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Confirmar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(reservation.id, "cancelled")}
                          className="text-red-600"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Cancelar
                        </Button>
                      </>
                    )}
                    {reservation.status === "confirmed" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(reservation.id, "completed")}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Marcar Completada
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(reservation.id, "no-show")}
                          className="text-orange-600"
                        >
                          No Show
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleSendReminder(reservation.id)}>
                          Enviar Recordatorio
                        </Button>
                      </>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => setSelectedReservation(reservation)}>
                          <Edit className="h-3 w-3 mr-1" />
                          Ver Detalles
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Detalles de la Reserva #{reservation.id}</DialogTitle>
                        </DialogHeader>
                        {selectedReservation && (
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium">Cliente</h4>
                              <p className="text-sm text-gray-600">{selectedReservation.clientName}</p>
                              <p className="text-sm text-gray-600">{selectedReservation.clientEmail}</p>
                              <p className="text-sm text-gray-600">{selectedReservation.clientPhone}</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Servicio</h4>
                              <p className="text-sm text-gray-600">{selectedReservation.serviceName}</p>
                              <p className="text-sm text-gray-600">Profesional: {selectedReservation.employeeName}</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Fecha y Hora</h4>
                              <p className="text-sm text-gray-600">
                                {new Date(selectedReservation.date).toLocaleDateString("es-ES")} a las{" "}
                                {selectedReservation.time}
                              </p>
                              <p className="text-sm text-gray-600">
                                Duración: {formatDuration(selectedReservation.duration)}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium">Estado y Precio</h4>
                              <div className="flex items-center gap-2">
                                {getStatusBadge(selectedReservation.status)}
                                <span className="font-semibold">${selectedReservation.price}</span>
                              </div>
                            </div>
                            {selectedReservation.notes && (
                              <div>
                                <h4 className="font-medium">Notas</h4>
                                <p className="text-sm text-gray-600">{selectedReservation.notes}</p>
                              </div>
                            )}
                            <div>
                              <h4 className="font-medium">Creada</h4>
                              <p className="text-sm text-gray-600">
                                {new Date(selectedReservation.createdAt).toLocaleString("es-ES")}
                              </p>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredReservations.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron reservas</h3>
                <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
