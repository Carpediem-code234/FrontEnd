"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { NavigationBar } from "@/components/navigation-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/AuthContext"
import { User, Bell, Shield, Heart, Edit, Save, Camera } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "Juan Pérez",
    email: user?.email || "juan.perez@email.com",
    phone: "+57 301 234 5678",
    address: "Calle Mayor 123, Madrid",
    birthDate: "1990-05-15",
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      promotionalEmails: true,
      reminderNotifications: true,
    },
    favoriteServices: ["Corte de Cabello", "Coloración"],
    bio: "Me encanta probar nuevos estilos y mantenerme al día con las últimas tendencias en belleza.",
  })

  // TODO: Backend Integration - Fetch user profile data from API
  const userStats = {
    totalReservations: 12,
    favoritesSalons: 3,
    totalSpent: 680000, // En pesos colombianos
    memberSince: "2023-06-15",
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePreferenceChange = (preference: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: value,
      },
    }))
  }

  const handleSave = () => {
    // TODO: Backend Integration - Update user profile via API
    console.log("Guardando perfil:", formData)
    setIsEditing(false)
    alert("Perfil actualizado exitosamente")
  }

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: user?.name || "Juan Pérez",
      email: user?.email || "juan.perez@email.com",
      phone: "+57 301 234 5678",
      address: "Calle Mayor 123, Madrid",
      birthDate: "1990-05-15",
      preferences: {
        emailNotifications: true,
        smsNotifications: false,
        promotionalEmails: true,
        reminderNotifications: true,
      },
      favoriteServices: ["Corte de Cabello", "Coloración"],
      bio: "Me encanta probar nuevos estilos y mantenerme al día con las últimas tendencias en belleza.",
    })
    setIsEditing(false)
  }

  return (
    <AuthGuard requireAuth={true} allowedRoles={["client"]}>
      <div className="min-h-screen bg-gray-50">
        <NavigationBar />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
            <p className="text-gray-600">Gestiona tu información personal y preferencias</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto flex items-center justify-center">
                      <User className="h-12 w-12 text-purple-600" />
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-semibold mb-1">{formData.name}</h2>
                  <p className="text-gray-600 text-sm mb-4">{formData.email}</p>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{userStats.totalReservations}</div>
                      <div className="text-xs text-gray-600">Reservas</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{userStats.favoritesSalons}</div>
                      <div className="text-xs text-gray-600">Favoritos</div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="text-sm text-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <span>Total gastado:</span>
                      <span className="font-semibold">${userStats.totalSpent.toLocaleString()} COP</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Miembro desde:</span>
                      <span>{new Date(userStats.memberSince).toLocaleDateString("es-ES")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Favorite Services */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Servicios Favoritos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {formData.favoriteServices.map((service) => (
                      <Badge key={service} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Información Personal
                  </CardTitle>
                  {!isEditing ? (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleCancel}>
                        Cancelar
                      </Button>
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Guardar
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nombre Completo</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange("birthDate", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Biografía</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Preferencias de Notificación
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications">Notificaciones por Email</Label>
                      <p className="text-sm text-gray-600">Recibe confirmaciones y recordatorios por email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={formData.preferences.emailNotifications}
                      onCheckedChange={(checked) => handlePreferenceChange("emailNotifications", checked)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="promotionalEmails">Emails Promocionales</Label>
                      <p className="text-sm text-gray-600">Recibe ofertas especiales y promociones</p>
                    </div>
                    <Switch
                      id="promotionalEmails"
                      checked={formData.preferences.promotionalEmails}
                      onCheckedChange={(checked) => handlePreferenceChange("promotionalEmails", checked)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="reminderNotifications">Recordatorios de Citas</Label>
                      <p className="text-sm text-gray-600">Recibe recordatorios antes de tus citas</p>
                    </div>
                    <Switch
                      id="reminderNotifications"
                      checked={formData.preferences.reminderNotifications}
                      onCheckedChange={(checked) => handlePreferenceChange("reminderNotifications", checked)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Configuración de Seguridad
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Cambiar Contraseña
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    Eliminar Cuenta
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
