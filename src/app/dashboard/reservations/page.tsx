"use client"

//import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { NavigationBar } from "@/components/navigation-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react"

interface Reservation {
  id: number
  salonName: string
  salonAddress: string
  salonPhone: string
  service: string
  date: string
  time: string
  duration: string
  price: number
  status: "confirmed" | "pending" | "cancelled" | "completed"
  stylist: string
  notes?: string
  rating?: number
}

export default function ReservationsPage() {
  //const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)

  // TODO: Backend Integration - Fetch user reservations from API
  const reservations = {
    upcoming: [
      {
        id: 1,
        salonName: "Elegance Centro",
        salonAddress: "Calle Gran Vía 123, Madrid",
        salonPhone: "+57 301 234 5678",
        service: "Corte de Cabello",
        date: "2024-01-15",
        time: "10:30",
        duration: "45 min",
        price: 45000,
        status: "confirmed" as const,
        stylist: "María García",
        notes: "Corte moderno, no muy corto",
      },
      {
        id: 2,
        salonName: "Belleza Total",
        salonAddress: "Avenida de la Paz 45, Madrid",
        salonPhone: "+57 301 234 5678",
        service: "Coloración Completa",
        date: "2024-01-20",
        time: "14:00",
        duration: "2h 30min",
        price: 65,
        status: "pending" as const,
        stylist: "Ana López",
        notes: "Rubio ceniza",
      },
    ],
    past: [
      {
        id: 3,
        salonName: "Estilo Moderno",
        salonAddress: "Plaza Mayor 12, Madrid",
        salonPhone: "+57 301 234 5678",
        service: "Peinado Especial",
        date: "2024-01-05",
        time: "16:00",
        duration: "1h",
        price: 35,
        status: "completed" as const,
        stylist: "Carmen Ruiz",
        rating: 5,
      },
      {
        id: 4,
        salonName: "Glamour Studio",
        salonAddress: "Calle Serrano 89, Madrid",
        salonPhone: "+57 301 234 5678",
        service: "Manicure",
        date: "2023-12-28",
        time: "11:00",
        duration: "45min",
        price: 20,
        status: "completed" as const,
        stylist: "Laura Martín",
        rating: 4,
      },
    ],
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { label: "Confirmada", variant: "default" as const, icon: CheckCircle },
      pending: { label: "Pendiente", variant: "secondary" as const, icon: AlertCircle },
      cancelled: { label: "Cancelada", variant: "destructive" as const, icon: XCircle },
      completed: { label: "Completada", variant: "outline" as const, icon: CheckCircle },
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

  const handleCancelReservation = (reservationId: number) => {
    // TODO: Backend Integration - Cancel reservation via API
    console.log("Cancelando reserva:", reservationId)
    alert("Reserva cancelada exitosamente")
  }

  const handleRescheduleReservation = (reservationId: number) => {
    // TODO: Backend Integration - Reschedule reservation via API
    console.log("Reprogramando reserva:", reservationId)
    alert("Funcionalidad de reprogramación próximamente")
  }

  const ReservationCard = ({
    reservation,
    showActions = true,
  }: { reservation: Reservation; showActions?: boolean }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{reservation.salonName}</h3>
            <p className="text-sm text-gray-600">{reservation.service}</p>
          </div>
          {getStatusBadge(reservation.status)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>
                {new Date(reservation.date).toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>
                {reservation.time} ({reservation.duration})
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-gray-500" />
              <span>{reservation.stylist}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{reservation.salonAddress}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{reservation.salonPhone}</span>
            </div>
            <div className="text-sm font-semibold">Total: ${reservation.price.toLocaleString()} COP</div>
          </div>
        </div>

        {reservation.notes && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Notas:</strong> {reservation.notes}
            </p>
          </div>
        )}

        {showActions && reservation.status !== "completed" && reservation.status !== "cancelled" && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleRescheduleReservation(reservation.id)}>
              <Edit className="h-4 w-4 mr-2" />
              Reprogramar
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleCancelReservation(reservation.id)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Ver Detalles
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Detalles de la Reserva</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <ReservationCard reservation={reservation} showActions={false} />
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <MapPin className="h-4 w-4 mr-2" />
                      Ver Ubicación
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {reservation.status === "completed" && reservation.rating && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-gray-600">Tu calificación:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-lg ${star <= reservation.rating! ? "text-yellow-500" : "text-gray-300"}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <AuthGuard requireAuth={true} allowedRoles={["client"]}>
      <div className="min-h-screen bg-gray-50">
        <NavigationBar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Reservas</h1>
            <p className="text-gray-600">Gestiona tus citas y revisa tu historial</p>
          </div>

          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="upcoming">Próximas ({reservations.upcoming.length})</TabsTrigger>
              <TabsTrigger value="past">Historial ({reservations.past.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {reservations.upcoming.length > 0 ? (
                reservations.upcoming.map((reservation) => (
                  <ReservationCard key={reservation.id} reservation={reservation} />
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes reservas próximas</h3>
                    <p className="text-gray-600 mb-4">¡Es hora de reservar tu próxima cita de belleza!</p>
                    <Button asChild>
                      <a href="/dashboard">Buscar Peluquerías</a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {reservations.past.length > 0 ? (
                reservations.past.map((reservation) => (
                  <ReservationCard key={reservation.id} reservation={reservation} showActions={false} />
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay historial disponible</h3>
                    <p className="text-gray-600">Tus reservas completadas aparecerán aquí</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  )
}
