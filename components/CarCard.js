import Link from "next/link";

export default function CarCard({ car }) {
   return (
      <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
         {car.Photos && car.Photos.length > 0 && (
            <div className="relative overflow-hidden">
               <img src={car.Photos[0].url} alt={car.Nom} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
               <div className="absolute top-4 right-4">
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">Disponible</span>
               </div>
               <div className="absolute bottom-4 left-4">
                  <div className="flex items-center space-x-1">
                     {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current drop-shadow-sm" viewBox="0 0 20 20">
                           <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                     ))}
                  </div>
               </div>
            </div>
         )}

         <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">{car.Nom}</h3>
            <div className="space-y-2 mb-4">
               <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span>{car.Annee || "N/A"}</span>
               </div>
               <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>{car.Kilometrage ? `${car.Kilometrage.toLocaleString()} km` : "N/A"}</span>
               </div>
            </div>

            <div className="flex items-center justify-between">
               <div className="text-2xl font-bold text-red-600">{car.Prix ? `${car.Prix.toLocaleString()} FCFA` : "Prix sur demande"}</div>
               <Link
                  href={`/voiture/${car.id}`}
                  className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all transform hover:scale-105 font-semibold"
               >
                  Voir les détails
               </Link>
            </div>
         </div>
      </div>
   );
}
