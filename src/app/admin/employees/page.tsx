"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, UserPlus, Search, Edit, Trash2, User, Phone, Mail, Calendar } from "lucide-react"
import Link from "next/link"

interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  specialties: string[]
  hireDate: string
  status: "active" | "inactive" | "vacation"
  avatar?: string
}

export default function EmployeesManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    specialties: [] as string[],
  })

  // TODO: Backend Integration - Fetch employees from API (CU11)
  const employees: Employee[] = [
    {
      id: 1,
      firstName: "María",
      lastName: "García",
      email: "maria.garcia@elegance.com",
      phone: "+34 123 456 789",
      position: "Estilista Senior",
      specialties: ["Coloración", "Cortes"],
      hireDate: "2022-01-15",
      status: "active",
    },
    {
      id: 2,
      firstName: "Ana",
      lastName: "López",
      email: "ana.lopez@elegance.com",
      phone: "+34 987 654 321",
      position: "Colorista",
      specialties: ["Coloración", "Mechas"],
      hireDate: "2022-03-20",
      status: "active",
    },
    {
      id: 3,
      firstName: "Carmen",
      lastName: "Ruiz",
      email: "carmen.ruiz@elegance.com",
      phone: "+34 555 123 456",
      position: "Especialista en Tratamientos",
      specialties: ["Tratamientos", "Masajes"],
      hireDate: "2021-11-10",
      status: "vacation",
    },
    {
      id: 4,
      firstName: "Laura",
      lastName: "Martín",
      email: "laura.martin@elegance.com",
      phone: "+34 777 888 999",
      position: "Manicurista",
      specialties: ["Manicure", "Pedicure"],
      hireDate: "2023-02-01",
      status: "active",
    },
  ]

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || employee.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const handleAddEmployee = () => {
    // TODO: Backend Integration - Add new employee via API (CU10)
    console.log("Agregando empleado:", newEmployee)
    setIsAddDialogOpen(false)
    setNewEmployee({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      specialties: [],
    })
    alert("Empleado agregado exitosamente")
  }

  const handleUpdateEmployee = (employeeId: number) => {
    // TODO: Backend Integration - Update employee via API (CU12)
    console.log("Actualizando empleado:", employeeId)
    alert("Funcionalidad de edición próximamente")
  }

  const handleDeleteEmployee = (employeeId: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este empleado?")) {
      // TODO: Backend Integration - Delete employee via API (CU13)
      console.log("Eliminando empleado:", employeeId)
      alert("Empleado eliminado exitosamente")
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Activo", variant: "default" as const },
      inactive: { label: "Inactivo", variant: "secondary" as const },
      vacation: { label: "Vacaciones", variant: "outline" as const },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active
    return <Badge variant={config.variant}>{config.label}</Badge>
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
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Empleados</h1>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Agregar Empleado
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Agregar Nuevo Empleado</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input
                          id="firstName"
                          value={newEmployee.firstName}
                          onChange={(e) => setNewEmployee((prev) => ({ ...prev, firstName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input
                          id="lastName"
                          value={newEmployee.lastName}
                          onChange={(e) => setNewEmployee((prev) => ({ ...prev, lastName: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        value={newEmployee.phone}
                        onChange={(e) => setNewEmployee((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Posición</Label>
                      <Select
                        value={newEmployee.position}
                        onValueChange={(value) => setNewEmployee((prev) => ({ ...prev, position: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar posición" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Estilista Senior">Estilista Senior</SelectItem>
                          <SelectItem value="Estilista">Estilista</SelectItem>
                          <SelectItem value="Colorista">Colorista</SelectItem>
                          <SelectItem value="Especialista en Tratamientos">Especialista en Tratamientos</SelectItem>
                          <SelectItem value="Manicurista">Manicurista</SelectItem>
                          <SelectItem value="Recepcionista">Recepcionista</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddEmployee} className="w-full">
                      Agregar Empleado
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
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar empleados..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="active">Activos</SelectItem>
                    <SelectItem value="inactive">Inactivos</SelectItem>
                    <SelectItem value="vacation">En vacaciones</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Employees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {employee.firstName} {employee.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">{employee.position}</p>
                      </div>
                    </div>
                    {getStatusBadge(employee.status)}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-3 w-3" />
                      <span>{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-3 w-3" />
                      <span>{employee.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-3 w-3" />
                      <span>Desde {new Date(employee.hireDate).toLocaleDateString("es-ES")}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Especialidades:</p>
                    <div className="flex flex-wrap gap-1">
                      {employee.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateEmployee(employee.id)}
                      className="flex-1"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteEmployee(employee.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEmployees.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron empleados</h3>
                <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
