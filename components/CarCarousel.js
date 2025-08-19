import { useState } from 'react';
import CarCard from './CarCard';

export default function CarCarousel({ cars }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3; // Nombre de cartes visibles à la fois
  const totalPages = Math.ceil(cars.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + itemsPerPage >= cars.length ? 0 : prevIndex + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - itemsPerPage < 0 ? Math.max(0, cars.length - itemsPerPage) : prevIndex - itemsPerPage
    );
  };

  const goToSlide = (pageIndex) => {
    setCurrentIndex(pageIndex * itemsPerPage);
  };

  const visibleCars = cars.slice(currentIndex, currentIndex + itemsPerPage);

  if (cars.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucun véhicule trouvé</h3>
        <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${(currentIndex / cars.length) * 100}%)` }}
        >
          {cars.map((car, index) => (
            <div 
              key={car.id} 
              className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
            >
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {cars.length > itemsPerPage && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-10 group"
            aria-label="Véhicule précédent"
          >
            <svg className="w-6 h-6 text-gray-600 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-10 group"
            aria-label="Véhicule suivant"
          >
            <svg className="w-6 h-6 text-gray-600 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {cars.length > itemsPerPage && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => goToSlide(pageIndex)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / itemsPerPage) === pageIndex
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller à la page ${pageIndex + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {cars.length > itemsPerPage && (
        <div className="mt-4 bg-gray-200 rounded-full h-1 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-600 to-orange-600 transition-all duration-500 ease-out"
            style={{ 
              width: `${((currentIndex + itemsPerPage) / cars.length) * 100}%` 
            }}
          />
        </div>
      )}

      {/* Counter */}
      <div className="text-center mt-4 text-gray-600 text-sm">
        {cars.length > itemsPerPage ? (
          <span>
            {currentIndex + 1} - {Math.min(currentIndex + itemsPerPage, cars.length)} sur {cars.length} véhicules
          </span>
        ) : (
          <span>{cars.length} véhicule{cars.length > 1 ? 's' : ''} disponible{cars.length > 1 ? 's' : ''}</span>
        )}
      </div>
    </div>
  );
}
