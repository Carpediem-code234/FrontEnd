"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

interface TimeSlot {
  time: string
  isAvailable: boolean
  isBooked: boolean
  clientName?: string
  serviceName?: string
  duration?: number
}

interface DayAvailability {
  date: string
  dayName: string
  employeeId: number
  employeeName: string
  timeSlots: TimeSlot[]
  totalSlots: number
  availableSlots: number
  bookedSlots: number
}

export default function AvailabilityPage() {
  const [selectedEmployee, setSelectedEmployee] = useState("all")
  const [selectedWeek, setSelectedWeek] = useState("current")

  // TODO: Backend Integration - Fetch employees from API
  const employees = [
    { id: 1, name: "Ana López" },
    { id: 2, name: "María García" },
    { id: 3, name: "Carmen Ruiz" },
    { id: 4, name: "Laura Martín" },
  ]

  // TODO: Backend Integration - Fetch availability data from API
  const availabilityData: DayAvailability[] = [
    {
      date: "2024-01-29",
      dayName: "Lunes",
      employeeId: 1,
      employeeName: "Ana López",
      timeSlots: [
        { time: "09:00", isAvailable: true, isBooked: false },
        { time: "09:30", isAvailable: true, isBooked: false },
        {
          time: "10:00",
          isAvailable: false,
          isBooked: true,
          clientName: "María García",
          serviceName: "Corte de Cabello",
          duration: 45,
        },
        {
          time: "10:30",
          isAvailable: false,
          isBooked: true,
          clientName: "María García",
          serviceName: "Corte de Cabello",
          duration: 45,
        },
        { time: "11:00", isAvailable: true, isBooked: false },
        { time: "11:30", isAvailable: true, isBooked: false },
        { time: "12:00", isAvailable: true, isBooked: false },
        { time: "12:30", isAvailable: true, isBooked: false },
        { time: "14:00", isAvailable: true, isBooked: false },
        {
          time: "14:30",
          isAvailable: false,
          isBooked: true,
          clientName: "Carmen Ruiz",
          serviceName: "Peinado Especial",
          duration: 60,
        },
        {
          time: "15:00",
          isAvailable: false,
          isBooked: true,
          clientName: "Carmen Ruiz",
          serviceName: "Peinado Especial",
          duration: 60,
        },
        { time: "15:30", isAvailable: true, isBooked: false },
        { time: "16:00", isAvailable: true, isBooked: false },
        { time: "16:30", isAvailable: true, isBooked: false },
        { time: "17:00", isAvailable: true, isBooked: false },
        { time: "17:30", isAvailable: true, isBooked: false },
      ],
      totalSlots: 16,
      availableSlots: 12,
      bookedSlots: 4,
    },
    {
      date: "2024-01-30",
      dayName: "Martes",
      employeeId: 1,
      employeeName: "Ana López",
      timeSlots: [
        {
          time: "09:00",
          isAvailable: false,
          isBooked: true,
          clientName: "Laura Martín",
          serviceName: "Corte de Cabello",
          duration: 45,
        },
        {
          time: "09:30",
          isAvailable: false,
          isBooked: true,
          clientName: "Laura Martín",
          serviceName: "Corte de Cabello",
          duration: 45,
        },
        { time: "10:00", isAvailable: true, isBooked: false },
        { time: "10:30", isAvailable: true, isBooked: false },
        {
          time: "11:00",
          isAvailable: false,
          isBooked: true,
          clientName: "Ana Fernández",
          serviceName: "Peinado Especial",
          duration: 60,
        },
        {
          time: "11:30",
          isAvailable: false,
          isBooked: true,
          clientName: "Ana Fernández",
          serviceName: "Peinado Especial",
          duration: 60,
        },
        { time: "12:00", isAvailable: true, isBooked: false },
        { time: "12:30", isAvailable: true, isBooked: false },
        { time: "14:00", isAvailable: true, isBooked: false },
        { time: "14:30", isAvailable: true, isBooked: false },
        { time: "15:00", isAvailable: true, isBooked: false },
        { time: "15:30", isAvailable: true, isBooked: false },
        {
          time: "16:00",
          isAvailable: false,
          isBooked: true,
          clientName: "Isabel Torres",
          serviceName: "Tratamiento Capilar",
          duration: 75,
        },
        {
          time: "16:30",
          isAvailable: false,
          isBooked: true,
          clientName: "Isabel Torres",
          serviceName: "Tratamiento Capilar",
          duration: 75,
        },
        {
          time: "17:00",
          isAvailable: false,
          isBooked: true,
          clientName: "Isabel Torres",
          serviceName: "Tratamiento Capilar",
          duration: 75,
        },
        { time: "17:30", isAvailable: true, isBooked: false },
      ],
      totalSlots: 16,
      availableSlots: 9,
      bookedSlots: 7,
    },
    {
      date: "2024-01-29",
      dayName: "Lunes",
      employeeId: 2,
      employeeName: "María García",
      timeSlots: [
        { time: "10:00", isAvailable: true, isBooked: false },
        { time: "10:30", isAvailable: true, isBooked: false },
        {
          time: "11:00",
          isAvailable: false,
          isBooked: true,
          clientName: "Patricia López",
          serviceName: "Coloración Completa",
          duration: 150,
        },
        {
          time: "11:30",
          isAvailable: false,
          isBooked: true,
          clientName: "Patricia López",
          serviceName: "Coloración Completa",
          duration: 150,
        },
        {
          time: "12:00",
          isAvailable: false,
          isBooked: true,
          clientName: "Patricia López",
          serviceName: "Coloración Completa",
          duration: 150,
        },
        {
          time: "12:30",
          isAvailable: false,
          isBooked: true,
          clientName: "Patricia López",
          serviceName: "Coloración Completa",
          duration: 150,
        },
        {
          time: "13:00",
          isAvailable: false,
          isBooked: true,
          clientName: "Patricia López",
          serviceName: "Coloración Completa",
          duration: 150,
        },
        { time: "15:00", isAvailable: true, isBooked: false },
        { time: "15:30", isAvailable: true, isBooked: false },
        {
          time: "16:00",
          isAvailable: false,
          isBooked: true,
          clientName: "Sofía Martín",
          serviceName: "Mechas",
          duration: 105,
        },
        {
          time: "16:30",
          isAvailable: false,
          isBooked: true,
          clientName: "Sofía Martín",
          serviceName: "Mechas",
          duration: 105,
        },
        {
          time: "17:00",
          isAvailable: false,
          isBooked: true,
          clientName: "Sofía Martín",
          serviceName: "Mechas",
          duration: 105,
        },
        {
          time: "17:30",
          isAvailable: false,
          isBooked: true,
          clientName: "Sofía Martín",
          serviceName: "Mechas",
          duration: 105,
        },
        { time: "18:00", isAvailable: true, isBooked: false },
        { time: "18:30", isAvailable: true, isBooked: false },
        { time: "19:00", isAvailable: true, isBooked: false },
      ],
      totalSlots: 16,
      availableSlots: 7,
      bookedSlots: 9,
    },
  ]

  const filteredAvailability = availabilityData.filter((day) => {
    return selectedEmployee === "all" || day.employeeId === Number.parseInt(selectedEmployee)
  })

  const getSlotStatus = (slot: TimeSlot) => {
    if (slot.isBooked) {
      return { label: "Ocupado", variant: "destructive" as const, icon: XCircle }
    } else if (slot.isAvailable) {
      return { label: "Disponible", variant: "default" as const, icon: CheckCircle }
    } else {
      return { label: "No disponible", variant: "secondary" as const, icon: AlertCircle }
    }
  }

  const getAvailabilityPercentage = (day: DayAvailability) => {
    return Math.round((day.availableSlots / day.totalSlots) * 100)
  }

  const groupedByDate = filteredAvailability.reduce(
    (acc, day) => {
      if (!acc[day.date]) {
        acc[day.date] = []
      }
      acc[day.date].push(day)
      return acc
    },
    {} as Record<string, DayAvailability[]>,
  )

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
                <h1 className="text-2xl font-bold text-gray-900">Disponibilidad</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Filtrar por empleado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los empleados</SelectItem>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id.toString()}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Seleccionar semana" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Semana actual</SelectItem>
                    <SelectItem value="next">Próxima semana</SelectItem>
                    <SelectItem value="previous">Semana anterior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Availability Overview */}
          <div className="space-y-6">
            {Object.entries(groupedByDate).map(([date, dayData]) => (
              <Card key={date}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {new Date(date).toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {dayData.map((day) => (
                      <div key={`${day.date}-${day.employeeId}`} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{day.employeeName}</h3>
                              <p className="text-sm text-gray-600">
                                {day.availableSlots} de {day.totalSlots} espacios disponibles
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{getAvailabilityPercentage(day)}% disponible</Badge>
                            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500 transition-all duration-300"
                                style={{ width: `${getAvailabilityPercentage(day)}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-16 gap-2">
                          {day.timeSlots.map((slot) => {
                            const status = getSlotStatus(slot)
                            const Icon = status.icon
                            return (
                              <div
                                key={slot.time}
                                className={`p-2 rounded-lg border text-center cursor-pointer transition-all hover:shadow-md ${
                                  slot.isBooked
                                    ? "bg-red-50 border-red-200"
                                    : slot.isAvailable
                                      ? "bg-green-50 border-green-200"
                                      : "bg-gray-50 border-gray-200"
                                }`}
                                title={
                                  slot.isBooked
                                    ? `${slot.clientName} - ${slot.serviceName}`
                                    : slot.isAvailable
                                      ? "Disponible"
                                      : "No disponible"
                                }
                              >
                                <div className="flex flex-col items-center gap-1">
                                  <Icon
                                    className={`h-3 w-3 ${
                                      slot.isBooked
                                        ? "text-red-600"
                                        : slot.isAvailable
                                          ? "text-green-600"
                                          : "text-gray-400"
                                    }`}
                                  />
                                  <span className="text-xs font-medium">{slot.time}</span>
                                  {slot.isBooked && (
                                    <div className="text-xs text-gray-600 text-center">
                                      <div className="truncate w-full">{slot.clientName}</div>
                                      <div className="truncate w-full">{slot.serviceName}</div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        {/* Summary */}
                        <div className="mt-4 flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span>{day.availableSlots} disponibles</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <XCircle className="h-4 w-4 text-red-600" />
                              <span>{day.bookedSlots} ocupados</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <AlertCircle className="h-4 w-4 text-gray-400" />
                              <span>{day.totalSlots - day.availableSlots - day.bookedSlots} no disponibles</span>
                            </div>
                          </div>
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {day.totalSlots * 30} min total
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAvailability.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay datos de disponibilidad</h3>
                <p className="text-gray-600">Selecciona un empleado para ver su disponibilidad</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
