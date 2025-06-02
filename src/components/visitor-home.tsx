"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Scissors, Sparkles, Clock, MapPin, Star, Users } from "lucide-react"
import Link from "next/link"

export default function VisitorHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Scissors className="h-8 w-8 text-purple-700 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Elegance</h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/auth">
                <Button variant="outline">Iniciar Sesión</Button>
              </Link>
              <Link href="/auth">
                <Button className="bg-purple-700 hover:bg-purple-800">Registrarse</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Transforma tu estilo con
            <span className="text-purple-700"> Elegance</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Descubre las mejores peluquerías y salones de belleza en Colombia. Reserva tu cita online y disfruta de
            servicios de calidad profesional.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth">
              <Button size="lg" className="bg-purple-700 hover:bg-purple-800">
                Reservar Cita
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">¿Por qué elegir Elegance?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-purple-700 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Reservas Online</h4>
                <p className="text-gray-600">Reserva tu cita las 24 horas, los 7 días de la semana</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-purple-700 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Profesionales Expertos</h4>
                <p className="text-gray-600">Estilistas certificados con años de experiencia</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 text-purple-700 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Calidad Garantizada</h4>
                <p className="text-gray-600">Servicios de alta calidad con productos premium</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestros Servicios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Scissors, title: "Corte de Cabello", price: "Desde $45.000" },
              { icon: Sparkles, title: "Coloración", price: "Desde $85.000" },
              { icon: Scissors, title: "Peinados", price: "Desde $65.000" },
              { icon: Sparkles, title: "Tratamientos", price: "Desde $75.000" },
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <service.icon className="h-10 w-10 text-purple-700 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">{service.title}</h4>
                  <p className="text-purple-700 font-bold">{service.price} COP</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-700 to-amber-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">¿Listo para tu transformación?</h3>
          <p className="text-xl mb-8">Únete a miles de clientes satisfechos en Colombia</p>
          <Link href="/auth">
            <Button size="lg" variant="secondary">
              Comenzar Ahora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Scissors className="h-6 w-6 mr-2" />
                <span className="text-xl font-bold">Elegance</span>
              </div>
              <p className="text-gray-400">Tu belleza, nuestra pasión</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Corte de Cabello</li>
                <li>Coloración</li>
                <li>Peinados</li>
                <li>Tratamientos</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sobre Nosotros</li>
                <li>Contacto</li>
                <li>Términos</li>
                <li>Privacidad</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Bogotá, Colombia</span>
                </div>
                <p>info@elegance.com</p>
                <p>+57 301 234 5678</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Elegance Peluquería. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
