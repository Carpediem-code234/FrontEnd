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
  Users,
  Clock,
  Calendar,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
} from "lucide-react"
import Link from "next/link"

interface WaitingListEntry {
  id: number
  clientName: string
  clientEmail: string
  clientPhone: string
  serviceName: string
  preferredEmployeeName?: string
  preferredDate?: string
  preferredTime?: string
  priority: "high" | "medium" | "low"
  status: "waiting" | "contacted" | "scheduled" | "cancelled"
  notes?: string
  createdAt: string
  lastContactedAt?: string
}

export default function WaitingListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [selectedEntry, setSelectedEntry] = useState<WaitingListEntry | null>(null)

  // TODO: Backend Integration - Fetch waiting list from API
  const waitingList: WaitingListEntry[] = [
    {
      id: 1,
      clientName: "Patricia López",
      clientEmail: "patricia@email.com",
      clientPhone: "+57 301 234 5678",
      serviceName: "Coloración Completa",
      preferredEmployeeName: "María García",
      preferredDate: "2024-02-15",
      preferredTime: "14:00",
      priority: "high",
      status: "waiting",
      notes: "Cliente VIP, prefiere citas en la tarde",
      createdAt: "2024-01-20T10:30:00Z",
    },
    {
      id: 2,
      clientName: "Sofía Martín",
      clientEmail: "sofia@email.com",
      clientPhone: "+57 312 345 6789",
      serviceName: "Corte de Cabello",
      preferredDate: "2024-02-10",
      priority: "medium",
      status: "contacted",
      notes: "Flexible con horarios",
      createdAt: "2024-01-22T14:15:00Z",
      lastContactedAt: "2024-01-25T09:00:00Z",
    },
    {
      id: 3,
      clientName: "Valentina Ruiz",
      clientEmail: "valentina@email.com",
      clientPhone: "+57 320 456 7890",
      serviceName: "Mechas",
      preferredEmployeeName: "Ana López",
      preferredTime: "10:00",
      priority: "low",
      status: "waiting",
      notes: "Solo disponible los fines de semana",
      createdAt: "2024-01-23T16:45:00Z",
    },
    {
      id: 4,
      clientName: "Camila Torres",
      clientEmail: "camila@email.com",
      clientPhone: "+57 315 567 8901",
      serviceName: "Peinado Especial",
      preferredDate: "2024-02-14",
      preferredTime: "16:00",
      priority: "high",
      status: "scheduled",
      notes: "Para evento especial - San Valentín",
      createdAt: "2024-01-18T11:20:00Z",
      lastContactedAt: "2024-01-24T15:30:00Z",
    },
    {
      id: 5,
      clientName: "Daniela García",
      clientEmail: "daniela@email.com",
      clientPhone: "+57 318 678 9012",
      serviceName: "Tratamiento Capilar",
      priority: "medium",
      status: "cancelled",
      notes: "Cliente canceló por viaje",
      createdAt: "2024-01-19T13:10:00Z",
      lastContactedAt: "2024-01-23T10:45:00Z",
    },
  ]

  const filteredWaitingList = waitingList.filter((entry) => {
    const matchesSearch =
      entry.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.serviceName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || entry.status === filterStatus
    const matchesPriority = filterPriority === "all" || entry.priority === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      waiting: { label: "En espera", variant: "secondary" as const, icon: Clock },
      contacted: { label: "Contactado", variant: "default" as const, icon: AlertCircle },
      scheduled: { label: "Programado", variant: "outline" as const, icon: CheckCircle },
      cancelled: { label: "Cancelado", variant: "destructive" as const, icon: XCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.waiting
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { label: "Alta", variant: "destructive" as const },
      medium: { label: "Media", variant: "secondary" as const },
      low: { label: "Baja", variant: "outline" as const },
    }

    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium

    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const handleStatusChange = (entryId: number, newStatus: string) => {
    // TODO: Backend Integration - Update waiting list entry status
    console.log("Cambiando estado de entrada:", entryId, "a", newStatus)
    alert(`Estado cambiado a ${newStatus}`)
  }

  const handleContactClient = (entryId: number) => {
    // TODO: Backend Integration - Send notification to client
    console.log("Contactando cliente:", entryId)
    alert("Cliente contactado exitosamente")
  }

  const handleScheduleAppointment = (entryId: number) => {
    // TODO: Backend Integration - Create appointment from waiting list entry
    console.log("Programando cita para entrada:", entryId)
    alert("Cita programada exitosamente")
  }

  const getWaitingListByStatus = (status: string) => {
    return waitingList.filter((entry) => entry.status === status).length
  }

  const getWaitingListByPriority = (priority: string) => {
    return waitingList.filter((entry) => entry.priority === priority).length
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
                <h1 className="text-2xl font-bold text-gray-900">Lista de Espera</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{getWaitingListByStatus("waiting")}</div>
                <div className="text-sm text-gray-600">En Espera</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{getWaitingListByStatus("contacted")}</div>
                <div className="text-sm text-gray-600">Contactados</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{getWaitingListByStatus("scheduled")}</div>
                <div className="text-sm text-gray-600">Programados</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{getWaitingListByPriority("high")}</div>
                <div className="text-sm text-gray-600">Alta Prioridad</div>
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
                    placeholder="Buscar en lista de espera..."
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
                    <SelectItem value="waiting">En espera</SelectItem>
                    <SelectItem value="contacted">Contactados</SelectItem>
                    <SelectItem value="scheduled">Programados</SelectItem>
                    <SelectItem value="cancelled">Cancelados</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las prioridades</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="low">Baja</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setFilterStatus("all")
                    setFilterPriority("all")
                  }}
                >
                  Limpiar Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Waiting List */}
          <div className="space-y-4">
            {filteredWaitingList.map((entry) => (
              <Card key={entry.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{entry.clientName}</h3>
                        <p className="text-sm text-gray-600">{entry.serviceName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPriorityBadge(entry.priority)}
                      {getStatusBadge(entry.status)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{entry.clientEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{entry.clientPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Agregado: {new Date(entry.createdAt).toLocaleDateString("es-ES")}</span>
                    </div>
                  </div>

                  {(entry.preferredDate || entry.preferredTime || entry.preferredEmployeeName) && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {entry.preferredDate && (
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>Fecha preferida: {new Date(entry.preferredDate).toLocaleDateString("es-ES")}</span>
                        </div>
                      )}
                      {entry.preferredTime && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>Hora preferida: {entry.preferredTime}</span>
                        </div>
                      )}
                      {entry.preferredEmployeeName && (
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-gray-500" />
                          <span>Profesional: {entry.preferredEmployeeName}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {entry.notes && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Notas:</strong> {entry.notes}
                      </p>
                    </div>
                  )}

                  {entry.lastContactedAt && (
                    <div className="mb-4 text-sm text-gray-600">
                      <strong>Último contacto:</strong> {new Date(entry.lastContactedAt).toLocaleString("es-ES")}
                    </div>
                  )}

                  <div className="flex gap-2 flex-wrap">
                    {entry.status === "waiting" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleContactClient(entry.id)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Contactar
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleScheduleAppointment(entry.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Programar Cita
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(entry.id, "cancelled")}
                          className="text-red-600"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Cancelar
                        </Button>
                      </>
                    )}
                    {entry.status === "contacted" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleScheduleAppointment(entry.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Programar Cita
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleContactClient(entry.id)}>
                          <Phone className="h-3 w-3 mr-1" />
                          Contactar Nuevamente
                        </Button>
                      </>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => setSelectedEntry(entry)}>
                          Ver Detalles
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Detalles de Lista de Espera #{entry.id}</DialogTitle>
                        </DialogHeader>
                        {selectedEntry && (
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium">Cliente</h4>
                              <p className="text-sm text-gray-600">{selectedEntry.clientName}</p>
                              <p className="text-sm text-gray-600">{selectedEntry.clientEmail}</p>
                              <p className="text-sm text-gray-600">{selectedEntry.clientPhone}</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Servicio Solicitado</h4>
                              <p className="text-sm text-gray-600">{selectedEntry.serviceName}</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Preferencias</h4>
                              {selectedEntry.preferredDate && (
                                <p className="text-sm text-gray-600">
                                  Fecha: {new Date(selectedEntry.preferredDate).toLocaleDateString("es-ES")}
                                </p>
                              )}
                              {selectedEntry.preferredTime && (
                                <p className="text-sm text-gray-600">Hora: {selectedEntry.preferredTime}</p>
                              )}
                              {selectedEntry.preferredEmployeeName && (
                                <p className="text-sm text-gray-600">
                                  Profesional: {selectedEntry.preferredEmployeeName}
                                </p>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">Estado y Prioridad</h4>
                              <div className="flex items-center gap-2">
                                {getStatusBadge(selectedEntry.status)}
                                {getPriorityBadge(selectedEntry.priority)}
                              </div>
                            </div>
                            {selectedEntry.notes && (
                              <div>
                                <h4 className="font-medium">Notas</h4>
                                <p className="text-sm text-gray-600">{selectedEntry.notes}</p>
                              </div>
                            )}
                            <div>
                              <h4 className="font-medium">Fechas</h4>
                              <p className="text-sm text-gray-600">
                                Agregado: {new Date(selectedEntry.createdAt).toLocaleString("es-ES")}
                              </p>
                              {selectedEntry.lastContactedAt && (
                                <p className="text-sm text-gray-600">
                                  Último contacto: {new Date(selectedEntry.lastContactedAt).toLocaleString("es-ES")}
                                </p>
                              )}
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

          {filteredWaitingList.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay entradas en la lista de espera</h3>
                <p className="text-gray-600">Los clientes aparecerán aquí cuando soliciten citas no disponibles</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
