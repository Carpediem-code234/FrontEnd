"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Building2, Edit, Save, Trash2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function CompanyManagementPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [companyData, setCompanyData] = useState({
    businessName: "Elegance Centro",
    ownerName: "María García Rodríguez",
    email: "info@elegancecentro.com",
    phone: "+57 301 234 5678",
    address: "Carrera 13 #85-32, Chapinero, Bogotá, Colombia",
    taxId: "900123456-7", // NIT colombiano
    description:
      "Salon de belleza premium ubicado en el corazón de Bogotá. Ofrecemos servicios de alta calidad con los mejores profesionales.",
    website: "www.elegancecentro.com",
    socialMedia: {
      instagram: "@elegancecentro",
      facebook: "EleganceCentroBogota",
    },
    businessHours: {
      monday: { open: "09:00", close: "20:00", closed: false },
      tuesday: { open: "09:00", close: "20:00", closed: false },
      wednesday: { open: "09:00", close: "20:00", closed: false },
      thursday: { open: "09:00", close: "21:00", closed: false },
      friday: { open: "09:00", close: "21:00", closed: false },
      saturday: { open: "10:00", close: "18:00", closed: false },
      sunday: { open: "", close: "", closed: true },
    },
    isActive: true,
  })

  type CompanyField = keyof typeof companyData;
  type CompanyValue =
    | string
    | boolean
    | {
        instagram: string;
        facebook: string;
      }
    | {
        [key: string]: {
          open: string;
          close: string;
          closed: boolean;
        };
      };

  const handleInputChange = (field: CompanyField, value: CompanyValue) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleHoursChange = (day: string, field: string, value: string | boolean) => {
    setCompanyData((prev) => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day as keyof typeof prev.businessHours],
          [field]: value,
        },
      },
    }))
  }

  const handleSave = () => {
    // TODO: Backend Integration - Update company data via API (CU07)
    console.log("Actualizando datos de empresa:", companyData)
    setIsEditing(false)
    alert("Datos de empresa actualizados exitosamente")
  }

  const handleDelete = () => {
    if (confirm("¿Estás seguro de que quieres eliminar los datos de la empresa? Esta acción no se puede deshacer.")) {
      // TODO: Backend Integration - Delete company data via API (CU08)
      console.log("Eliminando empresa")
      alert("Empresa eliminada del sistema")
    }
  }

  const toggleVisibility = () => {
    // TODO: Backend Integration - Toggle company visibility
    setCompanyData((prev) => ({ ...prev, isActive: !prev.isActive }))
  }

  const dayNames = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
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
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Empresa</h1>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={companyData.isActive ? "default" : "secondary"}>
                  {companyData.isActive ? "Visible" : "Oculta"}
                </Badge>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Guardar
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Información Básica
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessName">Nombre de la Empresa *</Label>
                      <Input
                        id="businessName"
                        value={companyData.businessName}
                        onChange={(e) => handleInputChange("businessName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ownerName">Nombre del Propietario *</Label>
                      <Input
                        id="ownerName"
                        value={companyData.ownerName}
                        onChange={(e) => handleInputChange("ownerName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={companyData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input
                        id="phone"
                        value={companyData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        disabled={!isEditing}
                        placeholder="+57 301 234 5678"
                      />
                    </div>
                    <div>
                      <Label htmlFor="taxId">NIT *</Label>
                      <Input
                        id="taxId"
                        value={companyData.taxId}
                        onChange={(e) => handleInputChange("taxId", e.target.value)}
                        disabled={!isEditing}
                        placeholder="900123456-7"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Sitio Web</Label>
                      <Input
                        id="website"
                        value={companyData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Dirección Completa *</Label>
                    <Input
                      id="address"
                      value={companyData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      disabled={!isEditing}
                      placeholder="Carrera 13 #85-32, Chapinero, Bogotá, Colombia"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Descripción de la Empresa</Label>
                    <Textarea
                      id="description"
                      value={companyData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card>
                <CardHeader>
                  <CardTitle>Horarios de Atención</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(companyData.businessHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center gap-4">
                        <div className="w-24">
                          <Label>{dayNames[day as keyof typeof dayNames]}</Label>
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                          {hours.closed ? (
                            <span className="text-gray-500">Cerrado</span>
                          ) : (
                            <>
                              <Input
                                type="time"
                                value={hours.open}
                                onChange={(e) => handleHoursChange(day, "open", e.target.value)}
                                disabled={!isEditing}
                                className="w-32"
                              />
                              <span>-</span>
                              <Input
                                type="time"
                                value={hours.close}
                                onChange={(e) => handleHoursChange(day, "close", e.target.value)}
                                disabled={!isEditing}
                                className="w-32"
                              />
                            </>
                          )}
                          {isEditing && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleHoursChange(day, "closed", !hours.closed)}
                            >
                              {hours.closed ? "Abrir" : "Cerrar"}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Redes Sociales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={companyData.socialMedia.instagram}
                      onChange={(e) =>
                        handleInputChange("socialMedia", {
                          ...companyData.socialMedia,
                          instagram: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      placeholder="@usuario"
                    />
                  </div>
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={companyData.socialMedia.facebook}
                      onChange={(e) =>
                        handleInputChange("socialMedia", {
                          ...companyData.socialMedia,
                          facebook: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      placeholder="Página de Facebook"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Visibility Control */}
              <Card>
                <CardHeader>
                  <CardTitle>Control de Visibilidad</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Estado de la Empresa</Label>
                      <p className="text-sm text-gray-600">
                        {companyData.isActive ? "Visible para clientes" : "Oculta del público"}
                      </p>
                    </div>
                    <Button variant="outline" onClick={toggleVisibility}>
                      {companyData.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Zona de Peligro</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Eliminar la empresa del sistema. Esta acción no se puede deshacer.
                  </p>
                  <Button variant="destructive" onClick={handleDelete} className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar Empresa
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
