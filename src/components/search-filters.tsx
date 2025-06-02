"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, X, MapPin, DollarSign, Clock, Star } from "lucide-react"

interface Filters {
  search: string
  location: string
  service: string
  priceRange: [number, number]
  rating: string
  availability: string
  distance: [number, number]
}

interface SearchFiltersProps {
  onFiltersChange?: (filters: Filters) => void
  className?: string
}

export function SearchFilters({ onFiltersChange, className = "" }: SearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    search: "",
    location: "all",
    service: "all",
    priceRange: [0, 200000],
    rating: "all",
    availability: "all",
    distance: [0, 10],
  })

  // TODO: Backend Integration - These options will come from API endpoints
  const serviceOptions = [
    "Corte de Cabello",
    "Coloración",
    "Peinados",
    "Tratamientos",
    "Manicure",
    "Pedicure",
    "Depilación",
    "Masajes",
  ]

  const locationOptions = ["Chapinero", "Zona Rosa", "Centro", "Norte", "Sur"]

  const handleFilterChange = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    const newFilters: Filters = { ...filters, [key]: value }
    setFilters(newFilters)

    // TODO: Backend Integration - Send filters to parent component for API call
    onFiltersChange?.(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters: Filters = {
      search: "",
      location: "all", // Cambiar de "" a "all"
      service: "all", // Cambiar de "" a "all"
      priceRange: [0, 200000],
      rating: "all", // Cambiar de "" a "all"
      availability: "all", // Cambiar de "" a "all"
      distance: [0, 10],
    }
    setFilters(clearedFilters)
    onFiltersChange?.(clearedFilters)
  }

  const activeFiltersCount = Object.values(filters).filter((value) => {
    if (Array.isArray(value)) {
      return value[0] !== 0 || value[1] !== (value === filters.priceRange ? 200000 : 10)
    }
    return value !== "" && value !== "all"
  }).length

  return (
    <Card className={className}>
      <CardContent className="p-4">
        {/* Search Bar */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar peluquerías o servicios..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)} className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="space-y-4 border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location Filter */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Ubicación
                </Label>
                <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar zona" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationOptions.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Service Filter */}
              <div className="space-y-2">
                <Label>Tipo de Servicio</Label>
                <Select value={filters.service} onValueChange={(value) => handleFilterChange("service", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rating Filter */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Calificación Mínima
                </Label>
                <Select value={filters.rating} onValueChange={(value) => handleFilterChange("rating", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Cualquier calificación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4.5">4.5+ estrellas</SelectItem>
                    <SelectItem value="4.0">4.0+ estrellas</SelectItem>
                    <SelectItem value="3.5">3.5+ estrellas</SelectItem>
                    <SelectItem value="3.0">3.0+ estrellas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Availability Filter */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Disponibilidad
                </Label>
                <Select
                  value={filters.availability}
                  onValueChange={(value) => handleFilterChange("availability", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Cualquier horario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Disponible ahora</SelectItem>
                    <SelectItem value="today">Disponible hoy</SelectItem>
                    <SelectItem value="tomorrow">Disponible mañana</SelectItem>
                    <SelectItem value="week">Esta semana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Rango de Precio: ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}{" "}
                COP
              </Label>
              <Slider
                value={filters.priceRange as [number, number]}
                onValueChange={(value) => handleFilterChange("priceRange", value as [number, number])}
                max={200000} // 200,000 pesos colombianos
                min={0}
                step={5000} // Incrementos de 5,000 pesos
                className="w-full"
              />
            </div>

            {/* Distance Range */}
            <div className="space-y-2">
              <Label>Distancia máxima: {filters.distance[1]} km</Label>
              <Slider
                value={filters.distance as [number, number]}
                onValueChange={(value) => handleFilterChange("distance", value as [number, number])}
                max={10}
                min={0}
                step={0.5}
                className="w-full"
              />
            </div>

            {/* Clear Filters */}
            <div className="flex justify-end">
              <Button variant="outline" onClick={clearFilters} className="flex items-center gap-2">
                <X className="h-4 w-4" />
                Limpiar Filtros
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
