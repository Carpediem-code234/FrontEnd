"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Search, Star, User, Calendar, MessageSquare, ThumbsUp, Flag, Eye, Reply } from "lucide-react"
import Link from "next/link"

interface Review {
  id: number
  clientName: string
  serviceName: string
  employeeName: string
  rating: number
  comment: string
  date: string
  status: "published" | "pending" | "hidden" | "flagged"
  isVerified: boolean
  helpfulVotes: number
  reportCount: number
  adminResponse?: string
  adminResponseDate?: string
}

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRating, setFilterRating] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [adminResponse, setAdminResponse] = useState("")

  // TODO: Backend Integration - Fetch reviews from API
  const reviews: Review[] = [
    {
      id: 1,
      clientName: "María García",
      serviceName: "Corte de Cabello",
      employeeName: "Ana López",
      rating: 5,
      comment: "Excelente servicio, Ana es muy profesional y el resultado quedó perfecto. Definitivamente regresaré.",
      date: "2024-01-25T14:30:00Z",
      status: "published",
      isVerified: true,
      helpfulVotes: 12,
      reportCount: 0,
    },
    {
      id: 2,
      clientName: "Carmen Ruiz",
      serviceName: "Coloración Completa",
      employeeName: "María García",
      rating: 4,
      comment: "Muy buen trabajo, aunque el tiempo de espera fue un poco largo. El color quedó como lo esperaba.",
      date: "2024-01-24T16:45:00Z",
      status: "published",
      isVerified: true,
      helpfulVotes: 8,
      reportCount: 0,
      adminResponse: "Gracias por tu comentario Carmen. Trabajaremos en mejorar los tiempos de espera.",
      adminResponseDate: "2024-01-25T09:00:00Z",
    },
    {
      id: 3,
      clientName: "Laura Martín",
      serviceName: "Peinado Especial",
      employeeName: "Carmen Ruiz",
      rating: 5,
      comment: "¡Increíble! Carmen hizo un trabajo espectacular para mi evento. Recibí muchos cumplidos.",
      date: "2024-01-23T18:20:00Z",
      status: "published",
      isVerified: true,
      helpfulVotes: 15,
      reportCount: 0,
    },
    {
      id: 4,
      clientName: "Ana Fernández",
      serviceName: "Manicure Clásica",
      employeeName: "Laura Martín",
      rating: 3,
      comment: "El servicio estuvo bien, pero esperaba un poco más de atención al detalle.",
      date: "2024-01-22T11:15:00Z",
      status: "pending",
      isVerified: false,
      helpfulVotes: 2,
      reportCount: 0,
    },
    {
      id: 5,
      clientName: "Isabel Torres",
      serviceName: "Tratamiento Capilar",
      employeeName: "Carmen Ruiz",
      rating: 2,
      comment: "No quedé satisfecha con el resultado. El tratamiento no tuvo el efecto esperado.",
      date: "2024-01-21T15:30:00Z",
      status: "flagged",
      isVerified: true,
      helpfulVotes: 1,
      reportCount: 2,
    },
    {
      id: 6,
      clientName: "Sofía Martín",
      serviceName: "Mechas",
      employeeName: "Ana López",
      rating: 5,
      comment: "Ana es una artista! Las mechas quedaron perfectas y el ambiente del salón es muy agradable.",
      date: "2024-01-20T13:45:00Z",
      status: "published",
      isVerified: true,
      helpfulVotes: 20,
      reportCount: 0,
    },
  ]

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRating = filterRating === "all" || review.rating === Number.parseInt(filterRating)
    const matchesStatus = filterStatus === "all" || review.status === filterStatus

    return matchesSearch && matchesRating && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { label: "Publicada", variant: "default" as const },
      pending: { label: "Pendiente", variant: "secondary" as const },
      hidden: { label: "Oculta", variant: "outline" as const },
      flagged: { label: "Reportada", variant: "destructive" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const handleStatusChange = (reviewId: number, newStatus: string) => {
    // TODO: Backend Integration - Update review status
    console.log("Cambiando estado de reseña:", reviewId, "a", newStatus)
    alert(`Estado cambiado a ${newStatus}`)
  }

  const handleAdminResponse = (reviewId: number) => {
    // TODO: Backend Integration - Add admin response to review
    console.log("Agregando respuesta admin a reseña:", reviewId, adminResponse)
    setAdminResponse("")
    alert("Respuesta agregada exitosamente")
  }

  const getReviewsByRating = (rating: number) => {
    return reviews.filter((review) => review.rating === rating).length
  }

  const getReviewsByStatus = (status: string) => {
    return reviews.filter((review) => review.status === status).length
  }

  const getAverageRating = () => {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0)
    return (total / reviews.length).toFixed(1)
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
                <h1 className="text-2xl font-bold text-gray-900">Calificaciones y Reseñas</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{getAverageRating()}</div>
                <div className="text-sm text-gray-600">Promedio General</div>
                <div className="flex justify-center mt-1">
                  {renderStars(Math.round(Number.parseFloat(getAverageRating())))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{getReviewsByStatus("published")}</div>
                <div className="text-sm text-gray-600">Publicadas</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{getReviewsByStatus("pending")}</div>
                <div className="text-sm text-gray-600">Pendientes</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{getReviewsByStatus("flagged")}</div>
                <div className="text-sm text-gray-600">Reportadas</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{getReviewsByRating(5)}</div>
                <div className="text-sm text-gray-600">5 Estrellas</div>
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
                    placeholder="Buscar reseñas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por calificación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las calificaciones</SelectItem>
                    <SelectItem value="5">5 estrellas</SelectItem>
                    <SelectItem value="4">4 estrellas</SelectItem>
                    <SelectItem value="3">3 estrellas</SelectItem>
                    <SelectItem value="2">2 estrellas</SelectItem>
                    <SelectItem value="1">1 estrella</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="published">Publicadas</SelectItem>
                    <SelectItem value="pending">Pendientes</SelectItem>
                    <SelectItem value="hidden">Ocultas</SelectItem>
                    <SelectItem value="flagged">Reportadas</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setFilterRating("all")
                    setFilterStatus("all")
                  }}
                >
                  Limpiar Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <Card key={review.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          {review.clientName}
                          {review.isVerified && (
                            <Badge variant="outline" className="text-xs">
                              Verificado
                            </Badge>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {review.serviceName} • {review.employeeName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(review.status)}
                      <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700">{review.comment}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(review.date).toLocaleDateString("es-ES")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{review.helpfulVotes} útiles</span>
                      </div>
                      {review.reportCount > 0 && (
                        <div className="flex items-center gap-1 text-red-600">
                          <Flag className="h-4 w-4" />
                          <span>{review.reportCount} reportes</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {review.adminResponse && (
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Reply className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-900">Respuesta del Administrador</span>
                        <span className="text-xs text-blue-600">
                          {new Date(review.adminResponseDate!).toLocaleDateString("es-ES")}
                        </span>
                      </div>
                      <p className="text-blue-800">{review.adminResponse}</p>
                    </div>
                  )}

                  <div className="flex gap-2 flex-wrap">
                    {review.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(review.id, "published")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Publicar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(review.id, "hidden")}
                          className="text-orange-600"
                        >
                          Ocultar
                        </Button>
                      </>
                    )}
                    {review.status === "published" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(review.id, "hidden")}
                        className="text-orange-600"
                      >
                        Ocultar
                      </Button>
                    )}
                    {review.status === "hidden" && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(review.id, "published")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Publicar
                      </Button>
                    )}
                    {review.status === "flagged" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(review.id, "published")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Aprobar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(review.id, "hidden")}
                          className="text-red-600"
                        >
                          Rechazar
                        </Button>
                      </>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => setSelectedReview(review)}>
                          <Reply className="h-3 w-3 mr-1" />
                          {review.adminResponse ? "Editar Respuesta" : "Responder"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Responder a Reseña</DialogTitle>
                        </DialogHeader>
                        {selectedReview && (
                          <div className="space-y-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex">{renderStars(selectedReview.rating)}</div>
                                <span className="font-medium">{selectedReview.clientName}</span>
                              </div>
                              <p className="text-sm text-gray-600">{selectedReview.comment}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Tu respuesta:</label>
                              <Textarea
                                value={adminResponse}
                                onChange={(e) => setAdminResponse(e.target.value)}
                                placeholder="Escribe tu respuesta profesional..."
                                rows={4}
                              />
                            </div>
                            <Button onClick={() => handleAdminResponse(selectedReview.id)} className="w-full">
                              {selectedReview.adminResponse ? "Actualizar Respuesta" : "Enviar Respuesta"}
                            </Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron reseñas</h3>
                <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
