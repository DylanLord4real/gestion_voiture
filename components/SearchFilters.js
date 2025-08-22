import { useState } from 'react';

export default function SearchFilters({ onSearchChange, onPriceFilterChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);
    onPriceFilterChange(value);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Trouvez votre véhicule</h3>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        <div className="md:col-span-5">
          <label className="block text-white/90 text-sm font-medium mb-2">Recherche</label>
          <input
            type="text"
            placeholder="Marque, modèle..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent backdrop-blur-sm"
          />
        </div>
        <div className="md:col-span-5">
          <label className="block text-white/90 text-sm font-medium mb-2">Prix maximum</label>
          <select
            value={maxPrice}
            onChange={handlePriceChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent backdrop-blur-sm"
          >
            <option value="" className="bg-gray-800">Tous les prix</option>
            <option value="5000000" className="bg-gray-800">Moins de 5M FCFA</option>
            <option value="10000000" className="bg-gray-800">Moins de 10M FCFA</option>
            <option value="15000000" className="bg-gray-800">Moins de 15M FCFA</option>
            <option value="20000000" className="bg-gray-800">Moins de 20M FCFA</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <button className="w-full h-12 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full font-semibold hover:from-red-700 hover:to-orange-700 transition-all transform hover:scale-105 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
