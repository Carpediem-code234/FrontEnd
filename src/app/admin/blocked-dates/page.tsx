"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Calendar, AlertTriangle, Edit, Trash2, Clock, User } from "lucide-react"
import Link from "next/link"

interface BlockedDate {
  id: number
  date: string
  startTime?: string
  endTime?: string
  reason: string
  type: "full-day" | "partial" | "employee-specific"
  employeeId?: number
  employeeName?: string
  isActive: boolean
  createdAt: string
}

interface Employee {
  id: number
  name: string
}

export default function BlockedDatesManagementPage() {
  const [filterType, setFilterType] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [, setEditingBlockedDate] = useState<BlockedDate | null>(null)
  const [newBlockedDate, setNewBlockedDate] = useState({
    date: "",
    startTime: "",
    endTime: "",
    reason: "",
    type: "full-day" as "full-day" | "partial" | "employee-specific",
    employeeId: 0,
    isActive: true,
  })

  // TODO: Backend Integration - Fetch employees from API
  const employees: Employee[] = [
    { id: 1, name: "Ana López" },
    { id: 2, name: "María García" },
    { id: 3, name: "Carmen Ruiz" },
    { id: 4, name: "Laura Martín" },
  ]

  // TODO: Backend Integration - Fetch blocked dates from API
  const blockedDates: BlockedDate[] = [
    {
      id: 1,
      date: "2024-01-25",
      reason: "Día festivo - Día de la Conversión de San Pablo",
      type: "full-day",
      isActive: true,
      createdAt: "2024-01-15T10:00:00Z",
    },
    {
      id: 2,
      date: "2024-02-05",
      reason: "Mantenimiento del salón",
      type: "full-day",
      isActive: true,
      createdAt: "2024-01-20T14:30:00Z",
    },
    {
      id: 3,
      date: "2024-01-30",
      startTime: "14:00",
      endTime: "16:00",
      reason: "Reunión de equipo",
      type: "partial",
      isActive: true,
      createdAt: "2024-01-22T09:15:00Z",
    },
    {
      id: 4,
      date: "2024-02-10",
      employeeId: 2,
      employeeName: "María García",
      reason: "Vacaciones",
      type: "employee-specific",
      isActive: true,
      createdAt: "2024-01-18T16:45:00Z",
    },
    {
      id: 5,
      date: "2024-02-12",
      startTime: "09:00",
      endTime: "12:00",
      employeeId: 1,
      employeeName: "Ana López",
      reason: "Cita médica",
      type: "employee-specific",
      isActive: true,
      createdAt: "2024-01-25T11:20:00Z",
    },
  ]

  const filteredBlockedDates = blockedDates.filter((blockedDate) => {
    return filterType === "all" || blockedDate.type === filterType
  })

  const handleAddBlockedDate = () => {
    // TODO: Backend Integration - Add new blocked date via API
    console.log("Agregando fecha bloqueada:", newBlockedDate)
    setIsAddDialogOpen(false)
    setNewBlockedDate({
      date: "",
      startTime: "",
      endTime: "",
      reason: "",
      type: "full-day",
      employeeId: 0,
      isActive: true,
    })
    alert("Fecha bloqueada agregada exitosamente")
  }

  const handleEditBlockedDate = (blockedDate: BlockedDate) => {
    setEditingBlockedDate(blockedDate)
    console.log("Editando fecha bloqueada:", blockedDate)
  }

  const handleDeleteBlockedDate = (blockedDateId: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta fecha bloqueada?")) {
      // TODO: Backend Integration - Delete blocked date via API
      console.log("Eliminando fecha bloqueada:", blockedDateId)
      alert("Fecha bloqueada eliminada exitosamente")
    }
  }

  const toggleBlockedDateStatus = (blockedDateId: number) => {
    // TODO: Backend Integration - Toggle blocked date status
    console.log("Cambiando estado de fecha bloqueada:", blockedDateId)
  }

  const getTypeLabel = (type: string) => {
    const types = {
      "full-day": "Día completo",
      partial: "Parcial",
      "employee-specific": "Empleado específico",
    }
    return types[type as keyof typeof types] || type
  }

  const getTypeBadgeVariant = (type: string) => {
    const variants = {
      "full-day": "destructive" as const,
      partial: "secondary" as const,
      "employee-specific": "outline" as const,
    }
    return variants[type as keyof typeof variants] || ("default" as const)
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
                <h1 className="text-2xl font-bold text-gray-900">Fechas Bloqueadas</h1>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Bloquear Fecha
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Bloquear Nueva Fecha</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="date">Fecha</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newBlockedDate.date}
                        onChange={(e) => setNewBlockedDate((prev) => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Tipo de Bloqueo</Label>
                      <Select
                        value={newBlockedDate.type}
                        onValueChange={(value) => setNewBlockedDate((prev) => ({ ...prev, type: value as "full-day" | "partial" | "employee-specific" }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-day">Día completo</SelectItem>
                          <SelectItem value="partial">Parcial</SelectItem>
                          <SelectItem value="employee-specific">Empleado específico</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {newBlockedDate.type === "partial" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startTime">Hora Inicio</Label>
                          <Input
                            id="startTime"
                            type="time"
                            value={newBlockedDate.startTime}
                            onChange={(e) => setNewBlockedDate((prev) => ({ ...prev, startTime: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="endTime">Hora Fin</Label>
                          <Input
                            id="endTime"
                            type="time"
                            value={newBlockedDate.endTime}
                            onChange={(e) => setNewBlockedDate((prev) => ({ ...prev, endTime: e.target.value }))}
                          />
                        </div>
                      </div>
                    )}
                    {newBlockedDate.type === "employee-specific" && (
                      <>
                        <div>
                          <Label htmlFor="employee">Empleado</Label>
                          <Select
                            value={newBlockedDate.employeeId.toString()}
                            onValueChange={(value) =>
                              setNewBlockedDate((prev) => ({ ...prev, employeeId: Number.parseInt(value) }))
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
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="startTime">Hora Inicio (opcional)</Label>
                            <Input
                              id="startTime"
                              type="time"
                              value={newBlockedDate.startTime}
                              onChange={(e) => setNewBlockedDate((prev) => ({ ...prev, startTime: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="endTime">Hora Fin (opcional)</Label>
                            <Input
                              id="endTime"
                              type="time"
                              value={newBlockedDate.endTime}
                              onChange={(e) => setNewBlockedDate((prev) => ({ ...prev, endTime: e.target.value }))}
                            />
                          </div>
                        </div>
                      </>
                    )}
                    <div>
                      <Label htmlFor="reason">Motivo</Label>
                      <Textarea
                        id="reason"
                        value={newBlockedDate.reason}
                        onChange={(e) => setNewBlockedDate((prev) => ({ ...prev, reason: e.target.value }))}
                        rows={3}
                        placeholder="Describe el motivo del bloqueo..."
                      />
                    </div>
                    <Button onClick={handleAddBlockedDate} className="w-full">
                      Bloquear Fecha
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
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="full-day">Día completo</SelectItem>
                    <SelectItem value="partial">Parcial</SelectItem>
                    <SelectItem value="employee-specific">Empleado específico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Blocked Dates List */}
          <div className="space-y-4">
            {filteredBlockedDates.map((blockedDate) => (
              <Card key={blockedDate.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {new Date(blockedDate.date).toLocaleDateString("es-ES", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </h3>
                        <p className="text-sm text-gray-600">{blockedDate.reason}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getTypeBadgeVariant(blockedDate.type)}>{getTypeLabel(blockedDate.type)}</Badge>
                      <Badge variant={blockedDate.isActive ? "default" : "secondary"}>
                        {blockedDate.isActive ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{new Date(blockedDate.date).toLocaleDateString("es-ES")}</span>
                    </div>
                    {(blockedDate.startTime || blockedDate.endTime) && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>
                          {blockedDate.startTime && blockedDate.endTime
                            ? `${blockedDate.startTime} - ${blockedDate.endTime}`
                            : blockedDate.startTime
                              ? `Desde ${blockedDate.startTime}`
                              : `Hasta ${blockedDate.endTime}`}
                        </span>
                      </div>
                    )}
                    {blockedDate.employeeName && (
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{blockedDate.employeeName}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditBlockedDate(blockedDate)}
                      className="flex-1"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleBlockedDateStatus(blockedDate.id)}
                      className={blockedDate.isActive ? "text-orange-600" : "text-green-600"}
                    >
                      {blockedDate.isActive ? "Desactivar" : "Activar"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteBlockedDate(blockedDate.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredBlockedDates.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay fechas bloqueadas</h3>
                <p className="text-gray-600">Agrega fechas bloqueadas para gestionar la disponibilidad</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
