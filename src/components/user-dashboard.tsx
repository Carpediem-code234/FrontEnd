"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
//import { useAuth } from "@/context/AuthContext"
import { User, MapPin} from "lucide-react"
import { NavigationBar } from "./navigation-bar"
import { SearchFilters } from "./search-filters"
import { useState } from "react"

interface Filters {
  search?: string
  location?: string
  service?: string
  rating?: string
}

export default function UserDashboard() {
  //const { user, logout } = useAuth()
  const [filters, setFilters] = useState<Filters>({})

  const salons = [
    { id: 1, name: "Elegance Centro", rating: 4.8, distance: "0.5 km", phone: "+57 301 234 5678" },
    { id: 2, name: "Belleza Total", rating: 4.7, distance: "1.2 km", phone: "+57 302 345 6789" },
    { id: 3, name: "Estilo Moderno", rating: 4.9, distance: "0.8 km", phone: "+57 303 456 7890" },
    { id: 4, name: "Glamour Studio", rating: 4.6, distance: "1.5 km", phone: "+57 304 567 8901" },
    { id: 5, name: "Corte Perfecto", rating: 4.8, distance: "2.1 km", phone: "+57 305 678 9012" },
    { id: 6, name: "Salon Premium", rating: 4.7, distance: "1.8 km", phone: "+57 306 789 0123" },
    { id: 7, name: "Beauty Express", rating: 4.5, distance: "2.5 km", phone: "+57 307 890 1234" },
    { id: 8, name: "Tendencias Hair", rating: 4.9, distance: "1.1 km", phone: "+57 308 901 2345" },
    { id: 9, name: "Luxury Salon", rating: 4.8, distance: "3.0 km", phone: "+57 309 012 3456" },
  ]

  //const [totalSalons, setTotalSalons] = useState(salons.length)
  const [totalSalons] = useState(salons.length)


  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters)
    // TODO: Backend Integration - Make API call with filters to fetch filtered salons
    console.log("Filtros aplicados:", newFilters)
  }

  // Filtrar salones basado en los filtros aplicados
  const filteredSalons = salons.filter((salon) => {
    // Filtro de búsqueda
    const matchesSearch = !filters.search || salon.name.toLowerCase().includes(filters.search.toLowerCase())

    // Filtro de ubicación
    const matchesLocation =
      !filters.location ||
      filters.location === "all" ||
      salon.name.toLowerCase().includes(filters.location.toLowerCase())

    // Filtro de servicio (simulado)
    const matchesService = !filters.service || filters.service === "all"

    // Filtro de calificación
    const matchesRating = !filters.rating || salon.rating >= Number.parseFloat(filters.rating)

    return matchesSearch && matchesLocation && matchesService && matchesRating
  })

  const handleViewDetails = (salonId: number) => {
    window.location.href = `/dashboard/salon/${salonId}`
  }

  const handleLoadMore = () => {
    // TODO: Backend Integration - Load more salons from API
    console.log("Cargando más peluquerías...")
    alert("Cargando más resultados...")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Peluquerías Disponibles</h1>
          <p className="text-gray-600">Encuentra y reserva en los mejores salones cerca de ti</p>
        </div>

        {/* Search and Filters */}
        <SearchFilters onFiltersChange={handleFiltersChange} className="mb-6" />

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSalons.map((salon) => (
            <Card key={salon.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-0">
                {/* Image */}
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center">
                  <User className="h-16 w-16 text-white" />
                </div>

                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-purple-700 transition-colors">
                      {salon.name}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      $$$
                    </Badge>
                  </div>

                  {/* Rating and Distance */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{salon.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{salon.distance}</span>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      Corte
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Color
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      +3 más
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleViewDetails(salon.id)}
                    >
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More - Carga más peluquerías de la base de datos */}
        <div className="text-center mt-8">
          <Button variant="outline" className="px-8" onClick={handleLoadMore}>
            Cargar más peluquerías
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Mostrando {filteredSalons.length} de {totalSalons} peluquerías
          </p>
        </div>
      </div>
    </div>
  )
}