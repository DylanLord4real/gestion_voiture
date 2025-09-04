import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function AdminDashboard() {
   const [cars, setCars] = useState([]);
   const [loading, setLoading] = useState(true);
   const [deleting, setDeleting] = useState(null);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [carToDelete, setCarToDelete] = useState(null);
   const [stats, setStats] = useState({ total: 0, available: 0, sold: 0 });
   const router = useRouter();

   useEffect(() => {
      fetchCars();
   }, []);

   const fetchCars = async () => {
      try {
         const response = await fetch("/api/admin/cars");
         if (response.ok) {
            const data = await response.json();
            setCars(data);

            // Calculer les statistiques
            const total = data.length;
            const available = data.filter((car) => car.Statut !== "Vendu").length;
            const sold = data.filter((car) => car.Statut === "Vendu").length;
            setStats({ total, available, sold });
         }
      } catch (error) {
         console.error("Erreur lors du chargement des voitures:", error);
      } finally {
         setLoading(false);
      }
   };

   const handleDeleteClick = (car) => {
      setCarToDelete(car);
      setShowDeleteModal(true);
   };

   const handleDelete = async () => {
      if (!carToDelete) return;

      setDeleting(carToDelete.id);
      try {
         const response = await fetch("/api/admin/cars", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: carToDelete.id }),
         });

         if (response.ok) {
            fetchCars(); // Recharger la liste
            setShowDeleteModal(false);
            setCarToDelete(null);
         } else {
            alert("Erreur lors de la suppression");
         }
      } catch (error) {
         alert("Erreur lors de la suppression");
      } finally {
         setDeleting(null);
      }
   };

   const handleCancelDelete = () => {
      setShowDeleteModal(false);
      setCarToDelete(null);
   };

   const handleLogout = () => {
      document.cookie = "admin-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push("/admin/login");
   };

   if (loading) {
      return (
         <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
               <p>Chargement...</p>
            </div>
         </div>
      );
   }

   return (
      <>
         <Head>
            <title>Dashboard Admin - RAHICO PARC AUTO</title>
            <meta name="robots" content="noindex, nofollow" />
         </Head>

         <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-50">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                     <div className="flex items-center space-x-2 sm:space-x-3">
                        <Image src="/images/icon.png" alt="RAHICO PARC AUTO" width={32} height={32} className="sm:w-10 sm:h-10" />
                        <div>
                           <h1 className="text-lg sm:text-xl font-bold text-gray-900">Admin</h1>
                           <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">RAHICO PARC AUTO</p>
                        </div>
                     </div>

                     <div className="flex items-center space-x-2 sm:space-x-4">
                        <Link href="/" target="_blank" className="text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base hidden sm:inline">
                           Voir le site
                        </Link>
                        <Link href="/" target="_blank" className="text-gray-600 hover:text-gray-900 transition-colors sm:hidden">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                           </svg>
                        </Link>
                        <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-2 sm:px-4 rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base">
                           <span className="hidden sm:inline">Déconnexion</span>
                           <svg className="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                           </svg>
                        </button>
                     </div>
                  </div>
               </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
               {/* Statistiques */}
               <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
                  <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                     <div className="flex items-center">
                        <div className="flex-shrink-0">
                           <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                 <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                              </svg>
                           </div>
                        </div>
                        <div className="ml-3 sm:ml-5 w-0 flex-1">
                           <dl>
                              <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">Total</dt>
                              <dd className="text-lg sm:text-xl font-bold text-gray-900">{cars.length}</dd>
                           </dl>
                        </div>
                     </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-4 sm:p-6 col-span-2 lg:col-span-1">
                     <div className="flex items-center">
                        <div className="flex-shrink-0">
                           <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                 <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </div>
                        </div>
                        <div className="ml-3 sm:ml-5 w-0 flex-1">
                           <dl>
                              <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">Véhicules</dt>
                              <dd className="text-lg sm:text-xl font-bold text-purple-600">{cars.length}</dd>
                           </dl>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Actions */}
               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Véhicules</h2>
                  <Link href="/admin/cars/new" className="bg-blue-600 text-white px-4 py-3 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium shadow-lg">
                     <span className="sm:hidden">+ Ajouter un nouveau véhicule</span>
                     <span className="hidden sm:inline">Ajouter un véhicule</span>
                  </Link>
               </div>

               {/* Liste des voitures - Version Mobile */}
               <div className="block sm:hidden space-y-4">
                  {cars.map((car) => (
                     <div key={car.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                        <div className="flex items-start space-x-3">
                           {car.Photos && car.Photos.length > 0 && (
                              <div className="flex-shrink-0">
                                 <img className="h-16 w-16 rounded-lg object-cover" src={car.Photos[0].url} alt={car.Nom} />
                              </div>
                           )}
                           <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-2">
                                 <div>
                                    <h3 className="text-sm font-semibold text-gray-900 truncate">{car.Nom}</h3>
                                    <p className="text-xs text-gray-500">Véhicule</p>
                                 </div>
                                 <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Actif</span>
                              </div>
                              <div className="flex justify-between items-center">
                                 <span className="text-sm font-bold text-gray-900">{car.Prix?.toLocaleString()} XOF</span>
                                 <div className="flex space-x-2">
                                    <Link href={`/admin/cars/edit/${car.id}`} className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50">
                                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth={2}
                                             d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                          />
                                       </svg>
                                    </Link>
                                    <button onClick={() => handleDeleteClick(car)} className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50" disabled={deleting === car.id}>
                                       {deleting === car.id ? (
                                          <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                       ) : (
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                             <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                             />
                                          </svg>
                                       )}
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Liste des voitures - Version Desktop */}
               <div className="hidden sm:block bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                     <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                           <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Véhicule</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                           </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                           {cars.map((car) => (
                              <tr key={car.id} className="hover:bg-gray-50">
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                       {car.Photos && car.Photos.length > 0 && (
                                          <div className="flex-shrink-0 h-12 w-12">
                                             <img className="h-12 w-12 rounded-lg object-cover" src={car.Photos[0].url} alt={car.Nom} />
                                          </div>
                                       )}
                                       <div className="ml-4">
                                          <div className="text-sm font-medium text-gray-900">{car.Nom}</div>
                                          <div className="text-sm text-gray-500">Véhicule</div>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{car.Prix?.toLocaleString()} XOF</div>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Actif</span>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    <Link href={`/admin/cars/edit/${car.id}`} className="text-indigo-600 hover:text-indigo-900">
                                       Modifier
                                    </Link>
                                    <button onClick={() => handleDeleteClick(car)} className="text-red-600 hover:text-red-900">
                                       Supprimer
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>

            {/* Modal de confirmation de suppression */}
            {showDeleteModal && (
               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg max-w-md w-full mx-4">
                     <div className="p-6">
                        <div className="flex items-center mb-4">
                           <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"
                                 />
                              </svg>
                           </div>
                        </div>
                        <div className="text-center">
                           <h3 className="text-lg font-medium text-gray-900 mb-2">Confirmer la suppression</h3>
                           <p className="text-sm text-gray-500 mb-6">Êtes-vous sûr de vouloir supprimer le véhicule "{carToDelete?.Nom}" ? Cette action est irréversible.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                           <button type="button" onClick={handleCancelDelete} className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                              Annuler
                           </button>
                           <button
                              type="button"
                              onClick={handleDelete}
                              disabled={deleting}
                              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                           >
                              {deleting ? (
                                 <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Suppression...
                                 </>
                              ) : (
                                 "Supprimer"
                              )}
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </>
   );
}
