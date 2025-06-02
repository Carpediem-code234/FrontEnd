"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Clock, User, Edit, Trash2, Calendar } from "lucide-react"
import Link from "next/link"

interface Schedule {
  id: number
  employeeId: number
  employeeName: string
  dayOfWeek: string
  startTime: string
  endTime: string
  isActive: boolean
  breakStart?: string
  breakEnd?: string
  maxAppointments: number
}

interface Employee {
  id: number
  name: string
  specialties: string[]
}

export default function SchedulesManagementPage() {
  const [selectedEmployee, setSelectedEmployee] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  //const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null)
  const [, setEditingSchedule] = useState<Schedule | null>(null)
  const [newSchedule, setNewSchedule] = useState({
    employeeId: 0,
    dayOfWeek: "",
    startTime: "09:00",
    endTime: "18:00",
    breakStart: "13:00",
    breakEnd: "14:00",
    maxAppointments: 8,
    isActive: true,
  })

  // TODO: Backend Integration - Fetch employees from API
  const employees: Employee[] = [
    { id: 1, name: "Ana López", specialties: ["Cortes", "Peinados"] },
    { id: 2, name: "María García", specialties: ["Coloración", "Tratamientos"] },
    { id: 3, name: "Carmen Ruiz", specialties: ["Manicure", "Pedicure"] },
    { id: 4, name: "Laura Martín", specialties: ["Cortes", "Coloración"] },
  ]

  // TODO: Backend Integration - Fetch schedules from API
  const schedules: Schedule[] = [
    {
      id: 1,
      employeeId: 1,
      employeeName: "Ana López",
      dayOfWeek: "Lunes",
      startTime: "09:00",
      endTime: "18:00",
      breakStart: "13:00",
      breakEnd: "14:00",
      maxAppointments: 8,
      isActive: true,
    },
    {
      id: 2,
      employeeId: 1,
      employeeName: "Ana López",
      dayOfWeek: "Martes",
      startTime: "09:00",
      endTime: "18:00",
      breakStart: "13:00",
      breakEnd: "14:00",
      maxAppointments: 8,
      isActive: true,
    },
    {
      id: 3,
      employeeId: 2,
      employeeName: "María García",
      dayOfWeek: "Lunes",
      startTime: "10:00",
      endTime: "19:00",
      breakStart: "14:00",
      breakEnd: "15:00",
      maxAppointments: 6,
      isActive: true,
    },
    {
      id: 4,
      employeeId: 2,
      employeeName: "María García",
      dayOfWeek: "Miércoles",
      startTime: "10:00",
      endTime: "19:00",
      breakStart: "14:00",
      breakEnd: "15:00",
      maxAppointments: 6,
      isActive: false,
    },
  ]

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

  const filteredSchedules = schedules.filter((schedule) => {
    return selectedEmployee === "all" || schedule.employeeId === Number.parseInt(selectedEmployee)
  })

  const handleAddSchedule = () => {
    // TODO: Backend Integration - Add new schedule via API
    console.log("Agregando horario:", newSchedule)
    setIsAddDialogOpen(false)
    setNewSchedule({
      employeeId: 0,
      dayOfWeek: "",
      startTime: "09:00",
      endTime: "18:00",
      breakStart: "13:00",
      breakEnd: "14:00",
      maxAppointments: 8,
      isActive: true,
    })
    alert("Horario agregado exitosamente")
  }

  const handleEditSchedule = (schedule: Schedule) => {
    setEditingSchedule(schedule)
    console.log("Editando horario:", schedule)
  }

  const handleDeleteSchedule = (scheduleId: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este horario?")) {
      // TODO: Backend Integration - Delete schedule via API
      console.log("Eliminando horario:", scheduleId)
      alert("Horario eliminado exitosamente")
    }
  }

  const toggleScheduleStatus = (scheduleId: number) => {
    // TODO: Backend Integration - Toggle schedule status
    console.log("Cambiando estado del horario:", scheduleId)
  }

  /*
  const getEmployeeName = (employeeId: number) => {
    return employees.find((emp) => emp.id === employeeId)?.name || "Empleado no encontrado"
  }*/

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
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Horarios</h1>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Horario
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Agregar Nuevo Horario</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="employee">Empleado</Label>
                      <Select
                        value={newSchedule.employeeId.toString()}
                        onValueChange={(value) =>
                          setNewSchedule((prev) => ({ ...prev, employeeId: Number.parseInt(value) }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar empleado" />
                        </SelectTrigger>
                        <SelectContent>
                          {employees.map((employee) => (
                            <SelectItem key={employee.id} value={employee.id.toString()}>
                              {employee.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dayOfWeek">Día de la Semana</Label>
                      <Select
                        value={newSchedule.dayOfWeek}
                        onValueChange={(value) => setNewSchedule((prev) => ({ ...prev, dayOfWeek: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar día" />
                        </SelectTrigger>
                        <SelectContent>
                          {daysOfWeek.map((day) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startTime">Hora Inicio</Label>
                        <Input
                          id="startTime"
                          type="time"
                          value={newSchedule.startTime}
                          onChange={(e) => setNewSchedule((prev) => ({ ...prev, startTime: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="endTime">Hora Fin</Label>
                        <Input
                          id="endTime"
                          type="time"
                          value={newSchedule.endTime}
                          onChange={(e) => setNewSchedule((prev) => ({ ...prev, endTime: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="breakStart">Descanso Inicio</Label>
                        <Input
                          id="breakStart"
                          type="time"
                          value={newSchedule.breakStart}
                          onChange={(e) => setNewSchedule((prev) => ({ ...prev, breakStart: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="breakEnd">Descanso Fin</Label>
                        <Input
                          id="breakEnd"
                          type="time"
                          value={newSchedule.breakEnd}
                          onChange={(e) => setNewSchedule((prev) => ({ ...prev, breakEnd: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="maxAppointments">Máximo de Citas</Label>
                      <Input
                        id="maxAppointments"
                        type="number"
                        value={newSchedule.maxAppointments}
                        onChange={(e) =>
                          setNewSchedule((prev) => ({ ...prev, maxAppointments: Number.parseInt(e.target.value) }))
                        }
                      />
                    </div>
                    <Button onClick={handleAddSchedule} className="w-full">
                      Agregar Horario
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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
              </div>
            </CardContent>
          </Card>

          {/* Schedules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchedules.map((schedule) => (
              <Card key={schedule.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {schedule.employeeName}
                    </CardTitle>
                    <Badge variant={schedule.isActive ? "default" : "secondary"}>
                      {schedule.isActive ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{schedule.dayOfWeek}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        Horario: {schedule.startTime} - {schedule.endTime}
                      </span>
                    </div>
                    {schedule.breakStart && schedule.breakEnd && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span className="text-sm">
                          Descanso: {schedule.breakStart} - {schedule.breakEnd}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Máximo de citas:</strong> {schedule.maxAppointments}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditSchedule(schedule)} className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleScheduleStatus(schedule.id)}
                      className={schedule.isActive ? "text-orange-600" : "text-green-600"}
                    >
                      {schedule.isActive ? "Desactivar" : "Activar"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteSchedule(schedule.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSchedules.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron horarios</h3>
                <p className="text-gray-600">Agrega horarios para los empleados</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
