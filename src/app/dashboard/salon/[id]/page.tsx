"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { NavigationBar } from "@/components/navigation-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Star, MapPin, Phone, User, Heart, Share2} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function SalonDetailPage() {
  const params = useParams()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  // TODO: Backend Integration - Fetch salon data by ID from API
  const salon = {
    id: params.id,
    name: "Elegance Centro",
    rating: 4.8,
    reviewCount: 127,
    distance: "0.5 km",
    address: "Calle Gran Vía 123, Madrid, 28013",
    phone: "+57 301 234 5678",
    email: "info@elegancecentro.com",
    website: "www.elegancecentro.com",
    description:
      "Salon de belleza premium ubicado en el corazón de Madrid. Ofrecemos servicios de alta calidad con los mejores profesionales y productos de primera línea.",
    openingHours: {
      monday: "9:00 - 20:00",
      tuesday: "9:00 - 20:00",
      wednesday: "9:00 - 20:00",
      thursday: "9:00 - 21:00",
      friday: "9:00 - 21:00",
      saturday: "10:00 - 18:00",
      sunday: "Cerrado",
    },
    services: [
      { id: 1, name: "Corte de Cabello", price: 45000, duration: "45 min" },
      { id: 2, name: "Coloración Completa", price: 120000, duration: "2h 30min" },
      { id: 3, name: "Mechas", price: 85000, duration: "1h 45min" },
      { id: 4, name: "Peinado Especial", price: 65000, duration: "1h" },
      { id: 5, name: "Tratamiento Capilar", price: 75000, duration: "1h 15min" },
      { id: 6, name: "Manicure", price: 35000, duration: "45min" },
    ],
    amenities: ["WiFi Gratis", "Aire Acondicionado", "Música Ambiente", "Café Gratis", "Parking"],
    staff: [
      { name: "María García", specialty: "Coloración", experience: "8 años" },
      { name: "Ana López", specialty: "Cortes", experience: "5 años" },
      { name: "Carmen Ruiz", specialty: "Tratamientos", experience: "10 años" },
    ],
  }

  // TODO: Backend Integration - Fetch available time slots from API
  const availableTimeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
  ]

  const handleBooking = () => {
    if (!selectedService || !selectedTime) {
      alert("Por favor selecciona un servicio y horario")
      return
    }

    // TODO: Backend Integration - Send booking request to API
    const bookingData = {
      salonId: salon.id,
      serviceId: selectedService,
      date: selectedDate,
      time: selectedTime,
      // Additional user data will be added from auth context
    }

    console.log("Datos de reserva:", bookingData)
    alert("¡Reserva realizada con éxito!")
    setIsBookingOpen(false)
  }

  return (
    <AuthGuard requireAuth={true} allowedRoles={["client"]}>
      <div className="min-h-screen bg-gray-50">
        <NavigationBar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/dashboard">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver a la búsqueda
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{salon.name}</h1>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="font-medium">{salon.rating}</span>
                          <span className="ml-1">({salon.reviewCount} reseñas)</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{salon.distance}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Image Gallery */}
                  <div className="aspect-video bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
                    <User className="h-24 w-24 text-white" />
                  </div>

                  <p className="text-gray-600">{salon.description}</p>
                </CardContent>
              </Card>

              {/* Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Servicios Disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {salon.services.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div>
                          <h3 className="font-medium">{service.name}</h3>
                          <p className="text-sm text-gray-600">{service.duration}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${service.price.toLocaleString()} COP</div>
                          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                className="mt-1"
                                onClick={() => setSelectedService(service.id.toString())}
                              >
                                Reservar
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Reservar {service.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Selecciona una fecha</label>
                                  <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={(date) => date < new Date()}
                                    className="rounded-md border"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Selecciona un horario</label>
                                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Horario disponible" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {availableTimeSlots.map((time) => (
                                        <SelectItem key={time} value={time}>
                                          {time}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="border-t pt-4">
                                  <div className="flex justify-between text-sm">
                                    <span>Servicio:</span>
                                    <span>{service.name}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Duración:</span>
                                    <span>{service.duration}</span>
                                  </div>
                                  <div className="flex justify-between font-semibold">
                                    <span>Total:</span>
                                    <span>${service.price.toLocaleString()} COP</span>
                                  </div>
                                </div>
                                <Button onClick={handleBooking} className="w-full">
                                  Confirmar Reserva
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Staff */}
              <Card>
                <CardHeader>
                  <CardTitle>Nuestro Equipo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {salon.staff.map((member, index) => (
                      <div key={index} className="text-center p-4 border rounded-lg">
                        <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                          <User className="h-8 w-8 text-purple-600" />
                        </div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.specialty}</p>
                        <p className="text-xs text-gray-500">{member.experience}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{salon.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{salon.phone}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Opening Hours */}
              <Card>
                <CardHeader>
                  <CardTitle>Horarios de Atención</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    {Object.entries(salon.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize">{day}:</span>
                        <span className={hours === "Cerrado" ? "text-red-600" : "text-gray-600"}>{hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle>Servicios Adicionales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {salon.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
