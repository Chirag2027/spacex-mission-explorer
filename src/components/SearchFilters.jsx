import React, { useState, useEffect } from 'react';
import { Search, Star, Calendar, CheckCircle } from 'lucide-react';

const SearchFilters = ({
  searchTerm,
  onSearchChange,
  yearFilter,
  onYearChange,
  successFilter,
  onSuccessChange,
  years,
  showFavorites,
  onShowFavoritesChange
}) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  const toggleFavorites = () => {
    onShowFavoritesChange(!showFavorites);
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg border border-gray-200 p-8 mb-8 relative overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-blue-50/50 to-purple-50/50 -z-10 rounded-t-3xl"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        
        {/* Search Input */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search missions..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all font-medium text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {/* Year Filter */}
        <div className="relative group">
          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none group-focus-within:text-purple-500 transition-colors" />
          <select
            value={yearFilter}
            onChange={(e) => onYearChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white transition-all font-medium text-gray-700 appearance-none cursor-pointer"
          >
            <option value="">All Years</option>
            {years.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Success Filter Checkbox */}
        <label className="flex items-center space-x-3 px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={successFilter}
              onChange={(e) => onSuccessChange(e.target.checked)}
              className="w-5 h-5 rounded-md border-2 border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-0 transition-all cursor-pointer"
            />
            {successFilter && (
              <CheckCircle className="absolute h-5 w-5 text-green-600 pointer-events-none" />
            )}
          </div>
          <span className="text-sm font-semibold text-gray-700 group-hover:text-green-600 transition-colors">
            Successful only
          </span>
        </label>

        {/* Favorites Toggle Button */}
        <button
          onClick={toggleFavorites}
          className={`flex items-center justify-center space-x-2 px-5 py-3 rounded-xl transition-all font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 ${
            showFavorites
              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white border-2 border-yellow-300'
              : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
          }`}
        >
          <Star className={`h-5 w-5 transition-all ${showFavorites ? 'fill-white drop-shadow-md' : ''}`} />
          <span>{showFavorites ? 'Favorites' : 'Favorites'}</span>
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;