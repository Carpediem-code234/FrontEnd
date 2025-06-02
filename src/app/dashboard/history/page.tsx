"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { NavigationBar } from "@/components/navigation-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, TrendingUp, Star, Filter, Search } from "lucide-react"

interface HistoryItem {
  id: number
  date: string
  salonName: string
  service: string
  stylist: string
  price: number
  duration: string
  rating: number
  notes: string
}

export default function HistoryPage() {
  const [filters, setFilters] = useState({
    salon: "",
    service: "",
    search: "",
  })

  // TODO: Backend Integration - Fetch user history and statistics from API
  const historyData: HistoryItem[] = [
    {
      id: 1,
      date: "2024-01-05",
      salonName: "Elegance Centro",
      service: "Corte de Cabello",
      stylist: "María García",
      price: 45000,
      duration: "45 min",
      rating: 5,
      notes: "Excelente servicio",
    },
    {
      id: 2,
      date: "2023-12-28",
      salonName: "Belleza Total",
      service: "Coloración",
      stylist: "Ana López",
      price: 65000,
      duration: "2h 30min",
      rating: 4,
      notes: "Muy profesional",
    },
    {
      id: 3,
      date: "2023-12-15",
      salonName: "Estilo Moderno",
      service: "Peinado Especial",
      stylist: "Carmen Ruiz",
      price: 35000,
      duration: "1h",
      rating: 5,
      notes: "Perfecto para la ocasión",
    },
    {
      id: 4,
      date: "2023-11-20",
      salonName: "Glamour Studio",
      service: "Manicure",
      stylist: "Laura Martín",
      price: 20000,
      duration: "45min",
      rating: 4,
      notes: "Buen trabajo",
    },
    {
      id: 5,
      date: "2023-11-05",
      salonName: "Elegance Centro",
      service: "Tratamiento Capilar",
      stylist: "María García",
      price: 40000,
      duration: "1h 15min",
      rating: 5,
      notes: "Cabello muy suave después",
    },
  ]

  // Statistics calculations
  const totalSpent = historyData.reduce((sum, item) => sum + item.price, 0)
  const totalVisits = historyData.length
  const averageRating = historyData.reduce((sum, item) => sum + item.rating, 0) / historyData.length
  const favoriteService = historyData.reduce((acc: Record<string, number>, item) => {
    acc[item.service] = (acc[item.service] || 0) + 1
    return acc
  }, {})
  const mostUsedService = Object.keys(favoriteService).reduce((a, b) =>
    favoriteService[a] > favoriteService[b] ? a : b,
  )

  const filteredHistory = historyData.filter((item) => {
    const matchesSearch =
      !filters.search ||
      item.salonName.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.service.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.stylist.toLowerCase().includes(filters.search.toLowerCase())

    const matchesSalon = !filters.salon || filters.salon === "all" || item.salonName === filters.salon
    const matchesService = !filters.service || filters.service === "all" || item.service === filters.service

    return matchesSearch && matchesSalon && matchesService
  })

  return (
    <AuthGuard requireAuth={true} allowedRoles={["client"]}>
      <div className="min-h-screen bg-gray-50">
        <NavigationBar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Historial de Servicios</h1>
                <p className="text-gray-600">Revisa tu actividad y estadísticas</p>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.9999 2.75C6.46986 2.75 2.7499 6.47 2.7499 12C2.7499 17.53 6.46986 21.25 11.9999 21.25C17.5299 21.25 21.2499 17.53 21.2499 12C21.2499 6.47 17.5299 2.75 11.9999 2.75ZM11.9999 19.75C7.30986 19.75 3.7499 16.19 3.7499 12C3.7499 7.81 7.30986 4.25 11.9999 4.25C16.6899 4.25 20.2499 7.81 20.2499 12C20.2499 16.19 16.6899 19.75 11.9999 19.75ZM11.9999 6.25C9.28986 6.25 7.07986 8.46 7.07986 11.17C7.07986 13.88 9.28986 16.09 11.9999 16.09C14.7099 16.09 16.9199 13.88 16.9199 11.17C16.9199 8.46 14.7099 6.25 11.9999 6.25ZM11.9999 14.59C10.1199 14.59 8.57986 13.05 8.57986 11.17C8.57986 9.29 10.1199 7.75 11.9999 7.75C13.8799 7.75 15.4199 9.29 15.4199 11.17C15.4199 13.05 13.8799 14.59 11.9999 14.59Z"
                      fill="#22C55E"
                    />
                  </svg>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Gastado</p>
                    <p className="text-2xl font-bold text-gray-900">${totalSpent.toLocaleString()} COP</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CalendarIcon className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Visitas</p>
                    <p className="text-2xl font-bold text-gray-900">{totalVisits}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Calificación Promedio</p>
                    <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Servicio Favorito</p>
                    <p className="text-lg font-bold text-gray-900">{mostUsedService}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros de Búsqueda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="search">Buscar</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="search"
                      placeholder="Salón, servicio, estilista..."
                      value={filters.search}
                      onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label>Salón</Label>
                  <Select
                    value={filters.salon}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, salon: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todos los salones" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los salones</SelectItem>
                      <SelectItem value="Elegance Centro">Elegance Centro</SelectItem>
                      <SelectItem value="Belleza Total">Belleza Total</SelectItem>
                      <SelectItem value="Estilo Moderno">Estilo Moderno</SelectItem>
                      <SelectItem value="Glamour Studio">Glamour Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Servicio</Label>
                  <Select
                    value={filters.service}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, service: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todos los servicios" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los servicios</SelectItem>
                      <SelectItem value="Corte de Cabello">Corte de Cabello</SelectItem>
                      <SelectItem value="Coloración">Coloración</SelectItem>
                      <SelectItem value="Peinado Especial">Peinado Especial</SelectItem>
                      <SelectItem value="Manicure">Manicure</SelectItem>
                      <SelectItem value="Tratamiento Capilar">Tratamiento Capilar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* History List */}
          <Card>
            <CardHeader>
              <CardTitle>Historial Detallado ({filteredHistory.length} registros)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredHistory.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{item.salonName}</h3>
                        <p className="text-sm text-gray-600">
                          {item.service} • {item.stylist}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${item.price.toLocaleString()} COP</div>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= item.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {new Date(item.date).toLocaleDateString("es-ES")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.duration}
                        </span>
                      </div>
                      {item.notes && (
                        <Badge variant="outline" className="text-xs">
                          {item.notes}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  )
}
