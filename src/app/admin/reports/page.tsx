"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Euro,
  Download,
  Filter,
  Star,
} from "lucide-react"
import Link from "next/link"

interface ReportData {
  period: string
  totalRevenue: number
  totalAppointments: number
  totalClients: number
  averageRating: number
  topServices: { name: string; count: number; revenue: number }[]
  topEmployees: { name: string; appointments: number; revenue: number }[]
  monthlyTrends: { month: string; revenue: number; appointments: number }[]
}

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("current-month")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reportType, setReportType] = useState("general")

  // TODO: Backend Integration - Fetch report data from API
  const reportData: ReportData = {
    period: "Enero 2024",
    totalRevenue: 45680,
    totalAppointments: 342,
    totalClients: 156,
    averageRating: 4.7,
    topServices: [
      { name: "Corte de Cabello", count: 89, revenue: 2225 },
      { name: "Coloración Completa", count: 45, revenue: 2925 },
      { name: "Mechas", count: 38, revenue: 1710 },
      { name: "Peinado Especial", count: 32, revenue: 1120 },
      { name: "Tratamiento Capilar", count: 28, revenue: 1120 },
    ],
    topEmployees: [
      { name: "Ana López", appointments: 95, revenue: 12450 },
      { name: "María García", appointments: 87, revenue: 15680 },
      { name: "Carmen Ruiz", appointments: 76, revenue: 8920 },
      { name: "Laura Martín", appointments: 84, revenue: 8630 },
    ],
    monthlyTrends: [
      { month: "Sep", revenue: 38500, appointments: 285 },
      { month: "Oct", revenue: 42300, appointments: 312 },
      { month: "Nov", revenue: 39800, appointments: 298 },
      { month: "Dic", revenue: 48200, appointments: 356 },
      { month: "Ene", revenue: 45680, appointments: 342 },
    ],
  }

  const handleGenerateReport = () => {
    // TODO: Backend Integration - Generate report with selected parameters
    console.log("Generando reporte:", { selectedPeriod, startDate, endDate, reportType })
    alert("Reporte generado exitosamente")
  }

  const handleDownloadReport = (format: string) => {
    // TODO: Backend Integration - Download report in specified format
    console.log("Descargando reporte en formato:", format)
    alert(`Descargando reporte en formato ${format.toUpperCase()}`)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  }

  const revenueGrowth = calculateGrowth(45680, 39800)
  const appointmentsGrowth = calculateGrowth(342, 298)

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
                <h1 className="text-2xl font-bold text-gray-900">Reportes y Análisis</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => handleDownloadReport("pdf")}>
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" onClick={() => handleDownloadReport("excel")}>
                  <Download className="h-4 w-4 mr-2" />
                  Excel
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros de Reporte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="reportType">Tipo de Reporte</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="revenue">Ingresos</SelectItem>
                      <SelectItem value="services">Servicios</SelectItem>
                      <SelectItem value="employees">Empleados</SelectItem>
                      <SelectItem value="clients">Clientes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="period">Período</Label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current-month">Mes actual</SelectItem>
                      <SelectItem value="last-month">Mes anterior</SelectItem>
                      <SelectItem value="current-quarter">Trimestre actual</SelectItem>
                      <SelectItem value="current-year">Año actual</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {selectedPeriod === "custom" && (
                  <>
                    <div>
                      <Label htmlFor="startDate">Fecha Inicio</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">Fecha Fin</Label>
                      <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                  </>
                )}
              </div>
              <div className="mt-4">
                <Button onClick={handleGenerateReport}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generar Reporte
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                <Euro className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(reportData.totalRevenue)}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {revenueGrowth >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                  )}
                  <span className={revenueGrowth >= 0 ? "text-green-600" : "text-red-600"}>
                    {Math.abs(revenueGrowth).toFixed(1)}%
                  </span>
                  <span className="ml-1">vs mes anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Citas</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.totalAppointments}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {appointmentsGrowth >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                  )}
                  <span className={appointmentsGrowth >= 0 ? "text-green-600" : "text-red-600"}>
                    {Math.abs(appointmentsGrowth).toFixed(1)}%
                  </span>
                  <span className="ml-1">vs mes anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clientes Únicos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.totalClients}</div>
                <p className="text-xs text-muted-foreground">
                  {(reportData.totalAppointments / reportData.totalClients).toFixed(1)} citas promedio
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calificación Promedio</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.averageRating}</div>
                <p className="text-xs text-muted-foreground">Basado en reseñas del período</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Services */}
            <Card>
              <CardHeader>
                <CardTitle>Servicios Más Populares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.topServices.map((service, index) => (
                    <div key={service.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-purple-600">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-gray-600">{service.count} citas</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(service.revenue)}</p>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(service.revenue / service.count)} promedio
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Employees */}
            <Card>
              <CardHeader>
                <CardTitle>Empleados Destacados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.topEmployees.map((employee, index) => (
                    <div key={employee.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-green-600">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-gray-600">{employee.appointments} citas</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(employee.revenue)}</p>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(employee.revenue / employee.appointments)} promedio
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trends */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Tendencias Mensuales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.monthlyTrends.map((trend) => (
                  <div key={trend.month} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">{trend.month}</span>
                      </div>
                      <div>
                        <p className="font-medium">{formatCurrency(trend.revenue)}</p>
                        <p className="text-sm text-gray-600">{trend.appointments} citas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">
                        {formatCurrency(trend.revenue / trend.appointments)} promedio por cita
                      </Badge>
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
