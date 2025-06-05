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
import { ArrowLeft, Plus, Search, Edit, Trash2, Clock, DollarSign, Tag } from "lucide-react"
import Link from "next/link"

interface Service {
  id: number
  name: string
  description: string
  price: number
  duration: number // in minutes
  category: string
  isActive: boolean
  employeeSpecialties: string[]
}

export default function ServicesManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  //const [editingService, setEditingService] = useState<Service | null>(null)
  const [, setEditingService] = useState<Service | null>(null)
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: 0,
    duration: 60,
    category: "",
    isActive: true,
  })

  // TODO: Backend Integration - Fetch services from API (CU19)
  const services: Service[] = [
    {
      id: 1,
      name: "Corte de Cabello",
      description: "Corte personalizado según tu estilo y tipo de cabello",
      price: 25,
      duration: 45,
      category: "Cortes",
      isActive: true,
      employeeSpecialties: ["Cortes"],
    },
    {
      id: 2,
      name: "Coloración Completa",
      description: "Cambio de color completo con productos de alta calidad",
      price: 65,
      duration: 150,
      category: "Coloración",
      isActive: true,
      employeeSpecialties: ["Coloración"],
    },
    {
      id: 3,
      name: "Mechas",
      description: "Mechas profesionales para iluminar tu cabello",
      price: 45,
      duration: 105,
      category: "Coloración",
      isActive: true,
      employeeSpecialties: ["Coloración", "Mechas"],
    },
    {
      id: 4,
      name: "Peinado Especial",
      description: "Peinado para eventos especiales y ocasiones importantes",
      price: 35,
      duration: 60,
      category: "Peinados",
      isActive: true,
      employeeSpecialties: ["Peinados"],
    },
    {
      id: 5,
      name: "Tratamiento Capilar",
      description: "Tratamiento nutritivo y reparador para todo tipo de cabello",
      price: 40,
      duration: 75,
      category: "Tratamientos",
      isActive: true,
      employeeSpecialties: ["Tratamientos"],
    },
    {
      id: 6,
      name: "Manicure Clásica",
      description: "Manicure completa con esmaltado tradicional",
      price: 20,
      duration: 45,
      category: "Manicure",
      isActive: true,
      employeeSpecialties: ["Manicure"],
    },
  ]

  const categories = ["Cortes", "Coloración", "Peinados", "Tratamientos", "Manicure", "Pedicure"]

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filterCategory === "all" || service.category === filterCategory

    return matchesSearch && matchesCategory
  })

  const handleAddService = () => {
    // TODO: Backend Integration - Add new service via API (CU18)
    console.log("Agregando servicio:", newService)
    setIsAddDialogOpen(false)
    setNewService({
      name: "",
      description: "",
      price: 0,
      duration: 60,
      category: "",
      isActive: true,
    })
    alert("Servicio agregado exitosamente")
  }

  const handleUpdateService = (service: Service) => {
    // TODO: Backend Integration - Update service via API (CU20)
    setEditingService(service)
    console.log("Editando servicio:", service)
  }

  const handleDeleteService = (serviceId: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este servicio?")) {
      // TODO: Backend Integration - Delete service via API (CU21)
      console.log("Eliminando servicio:", serviceId)
      alert("Servicio eliminado exitosamente")
    }
  }

  const toggleServiceStatus = (serviceId: number) => {
    // TODO: Backend Integration - Toggle service status
    console.log("Cambiando estado del servicio:", serviceId)
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}min` : ""}`
    }
    return `${mins}min`
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
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Servicios</h1>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Servicio
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Agregar Nuevo Servicio</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="serviceName">Nombre del Servicio</Label>
                      <Input
                        id="serviceName"
                        value={newService.name}
                        onChange={(e) => setNewService((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="serviceDescription">Descripción</Label>
                      <Textarea
                        id="serviceDescription"
                        value={newService.description}
                        onChange={(e) => setNewService((prev) => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="servicePrice">Precio ($)</Label>
                        <Input
                          id="servicePrice"
                          type="number"
                          value={newService.price}
                          onChange={(e) => setNewService((prev) => ({ ...prev, price: Number(e.target.value) }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="serviceDuration">Duración (min)</Label>
                        <Input
                          id="serviceDuration"
                          type="number"
                          value={newService.duration}
                          onChange={(e) => setNewService((prev) => ({ ...prev, duration: Number(e.target.value) }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="serviceCategory">Categoría</Label>
                      <Select
                        value={newService.category}
                        onValueChange={(value) => setNewService((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddService} className="w-full">
                      Agregar Servicio
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
                      placeholder="Buscar servicios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {service.category}
                      </Badge>
                    </div>
                    <Badge variant={service.isActive ? "default" : "secondary"}>
                      {service.isActive ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-semibold">${service.price}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{formatDuration(service.duration)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Especialidades requeridas:</p>
                    <div className="flex flex-wrap gap-1">
                      {service.employeeSpecialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleUpdateService(service)} className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleServiceStatus(service.id)}
                      className={service.isActive ? "text-orange-600" : "text-green-600"}
                    >
                      {service.isActive ? "Desactivar" : "Activar"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteService(service.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron servicios</h3>
                <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
