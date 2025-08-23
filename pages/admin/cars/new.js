import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function NewCar() {
  const [formData, setFormData] = useState({
    Nom: '',
    Prix: '',
    Caractéristiques: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Saisie des URLs d'images (une par ligne)
  const [photosText, setPhotosText] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Préparer les pièces jointes Airtable pour les photos
      const photos = photosText
        .split('\n')
        .map((u) => u.trim())
        .filter((u) => u)
        .map((url) => ({ url }));

      // Convertir les valeurs numériques et inclure les photos
      const dataToSend = {
        ...formData,
        Prix: parseInt(formData.Prix),
        Photos: photos
      };

      const response = await fetch('/api/admin/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        router.push('/admin/dashboard');
      } else {
        setError('Erreur lors de la création du véhicule');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Head>
        <title>Ajouter un véhicule - Admin RAHICO PARC AUTO</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/admin/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 font-medium">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Retour au dashboard</span>
                <span className="sm:hidden">Retour</span>
              </Link>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                <span className="hidden sm:inline">Ajouter un véhicule</span>
                <span className="sm:hidden">Nouveau</span>
              </h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="bg-white rounded-lg shadow">
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Informations générales */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="Nom" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du véhicule *
                  </label>
                  <input
                    type="text"
                    id="Nom"
                    name="Nom"
                    required
                    value={formData.Nom}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Ex: Volkswagen Golf 7 TDI"
                  />
                </div>

                <div>
                  <label htmlFor="Prix" className="block text-sm font-medium text-gray-700 mb-2">
                    Prix (XOF) *
                  </label>
                  <input
                    type="number"
                    id="Prix"
                    name="Prix"
                    required
                    min="0"
                    value={formData.Prix}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="14500000"
                  />
                </div>

                <div>
                  <label htmlFor="Caractéristiques" className="block text-sm font-medium text-gray-700 mb-2">
                    Caractéristiques
                  </label>
                  <textarea
                    id="Caractéristiques"
                    name="Caractéristiques"
                    rows={6}
                    value={formData.Caractéristiques}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Décrivez les caractéristiques du véhicule (année, kilométrage, carburant, transmission, etc.)..."
                  />
                </div>

                {/* Photos (URLs) */}
                <div>
                  <label htmlFor="Photos" className="block text-sm font-medium text-gray-700 mb-2">
                    Photos (URLs, une par ligne)
                  </label>
                  <textarea
                    id="Photos"
                    name="Photos"
                    rows={4}
                    value={photosText}
                    onChange={(e) => setPhotosText(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder={"https://exemple.com/photo1.jpg\nhttps://exemple.com/photo2.jpg"}
                  />

                  {/* Aperçu */}
                  {photosText.trim() && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {photosText
                        .split('\n')
                        .map((u) => u.trim())
                        .filter((u) => u)
                        .map((url, idx) => (
                          <div key={idx} className="relative w-full h-28 border rounded overflow-hidden bg-gray-50">
                            {/* Utiliser <img> pour éviter les restrictions de domaine Next/Image en saisie */}
                            <img
                              src={url}
                              alt={`Photo ${idx + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.opacity = '0.3';
                              }}
                            />
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Boutons */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Link
                  href="/admin/dashboard"
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Création...' : 'Créer le véhicule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
