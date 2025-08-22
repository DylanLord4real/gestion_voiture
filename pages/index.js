
"use client";
import { getCars } from "../lib/airtable";
import Link from "next/link";
import { useState } from "react";
import CarCarousel from "../components/CarCarousel";
import SearchFilters from "../components/SearchFilters";

export default function Home({ cars }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.Nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = !maxPrice || car.Prix <= parseInt(maxPrice);
    return matchesSearch && matchesPrice;
  });

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handlePriceFilterChange = (price) => {
    setMaxPrice(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-red-600 to-orange-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              {/* Logo RAHICO */}
              <div className="relative">
                <img 
                  src="./../docs/icon.png" 
                  alt="RAHICO PARC AUTO" 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold tracking-wider">RAHICO</div>
                <div className="text-sm font-medium opacity-90 -mt-1">PARC AUTO</div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#hero" className="text-white/90 hover:text-white transition-colors font-medium">Accueil</a>
              <a href="#vehicules" className="text-white/90 hover:text-white transition-colors font-medium">Véhicules</a>
              <a href="#services" className="text-white/90 hover:text-white transition-colors font-medium">Services</a>
              <a href="#contact" className="text-white/90 hover:text-white transition-colors font-medium">Contact</a>
            </div>
            {/* Contact Info */}
            <div className="hidden lg:flex items-center space-x-4 text-white/90 text-sm">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>+225 07 89 13 38 97</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative py-20 overflow-hidden bg-gradient-to-br from-red-600 via-orange-600 to-red-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Véhicules
                <span className="block text-orange-200">
                  d'Occasion
                </span>
                <span className="block text-3xl md:text-4xl font-normal text-orange-100">
                  de Qualité
                </span>
              </h1>
              <p className="text-xl text-orange-100 mb-8 leading-relaxed">
                Découvrez notre sélection de véhicules d'occasion soigneusement inspectés 
                à Cocody 2 Plateaux Vallon.
              </p>
              
              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span className="font-semibold">+225 07 89 13 38 97</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span className="font-semibold">Cocody 2 Plateaux</span>
                </div>
              </div>
            </div>
            
            {/* Right Content - Search */}
            <SearchFilters 
              onSearchChange={handleSearchChange}
              onPriceFilterChange={handlePriceFilterChange}
            />
          </div>
        </div>
      </section>

      {/* Catalogue Section */}
      <section id="vehicules" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nos Véhicules d'Occasion</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">{filteredCars.length} véhicule{filteredCars.length > 1 ? 's' : ''} disponible{filteredCars.length > 1 ? 's' : ''}</p>
          </div>
          
          <div className="px-4">
            <CarCarousel cars={filteredCars} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nos Services</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Des services complets pour votre satisfaction</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Véhicules Contrôlés</h3>
              <p className="text-gray-600">Tous nos véhicules sont soigneusement inspectés et contrôlés avant la vente</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Garantie Qualité</h3>
              <p className="text-gray-600">Garantie sur tous nos véhicules pour votre tranquillité d'esprit</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Support Client</h3>
              <p className="text-gray-600">Accompagnement personnalisé avant, pendant et après votre achat</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Contactez-Nous</h2>
            <p className="text-orange-100 text-lg">Nous sommes là pour vous accompagner</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contact Info */}
            <div className="text-white space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Téléphone</h3>
                  <p className="text-orange-100">+225 07 89 13 38 97</p>
                  <p className="text-orange-100">+225 07 78 29 94 28</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Adresse</h3>
                  <p className="text-orange-100">Cocody 2 Plateaux Vallon</p>
                  <p className="text-orange-100">Abidjan, Côte d'Ivoire</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Horaires</h3>
                  <p className="text-orange-100">Lun - Sam: 8h00 - 18h00</p>
                  <p className="text-orange-100">Dimanche: Sur rendez-vous</p>
                </div>
              </div>
            </div>
            
            {/* WhatsApp Contact */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">Contactez-nous sur WhatsApp</h3>
                <p className="text-orange-100">Scannez le QR code ou cliquez sur le bouton</p>
              </div>
              
              {/* QR Code Placeholder */}
              <div className="bg-white rounded-2xl p-6 mb-6 flex items-center justify-center">
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21l1.5-4.5h11L19 21H5z"/>
                    </svg>
                    <p className="text-gray-600 text-sm">QR Code WhatsApp</p>
                    <p className="text-gray-500 text-xs">+225 07 89 13 38 97</p>
                  </div>
                </div>
              </div>
              
              <a
                href="https://wa.me/22507891338977?text=Bonjour, je suis intéressé par vos véhicules d'occasion. Pouvez-vous me donner plus d'informations ?"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 text-white px-6 py-4 rounded-xl hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-3 font-semibold transform hover:scale-105"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Ouvrir WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo et Description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="/docs/icon.png" 
                  alt="RAHICO PARC AUTO" 
                  className="w-12 h-12 object-contain"
                />
                <div className="text-white">
                  <div className="text-xl font-bold tracking-wider">RAHICO</div>
                  <div className="text-sm font-medium opacity-90 -mt-1">PARC AUTO</div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Votre partenaire de confiance pour l'achat de véhicules d'occasion de qualité à Abidjan.
              </p>
            </div>
            
            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span>+225 07 89 13 38 97</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span>Cocody 2 Plateaux Vallon</span>
                </div>
              </div>
            </div>
            
            {/* Liens */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg mb-4">Liens Rapides</h3>
              <div className="space-y-2">
                <a href="#hero" className="block text-gray-300 hover:text-white transition-colors">Accueil</a>
                <a href="#vehicules" className="block text-gray-300 hover:text-white transition-colors">Véhicules</a>
                <a href="#services" className="block text-gray-300 hover:text-white transition-colors">Services</a>
                <a href="#contact" className="block text-gray-300 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 RAHICO PARC AUTO. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const cars = await getCars();
  return { 
    props: { cars },
    revalidate: 300 // Revalidate every 5 minutes
  };
}
