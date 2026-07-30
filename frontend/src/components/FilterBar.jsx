import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export default function FilterBar({ 
  selectedCategory, 
  setSelectedCategory, 
  vegOnly, 
  setVegOnly, 
  sortBy, 
  setSortBy,
  searchQuery,
  setSearchQuery 
}) {
  const categories = ['All', 'Biryani', 'Burger', 'Pizza', 'Pasta', 'Chinese', 'South Indian', 'Sides', 'Dessert', 'Drinks'];

  return (
    <div className="my-8 space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="w-full md:w-96 relative">
          <input 
            type="text" 
            placeholder="Search Biryani, Dosa, Pizza..." 
            className="w-full px-5 py-3 rounded-2xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-red-500 outline-none text-sm font-medium transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Veg Only Switch */}
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`px-4 py-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all active:scale-95 ${
              vegOnly 
                ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' 
                : 'bg-white border-slate-200 text-slate-600'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${vegOnly ? 'bg-emerald-600' : 'bg-slate-300'}`}></span>
            <span>Pure Veg</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-3 py-1.5 shadow-sm text-xs font-bold text-slate-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent outline-none cursor-pointer py-1 text-slate-700"
            >
              <option value="default">Relevance</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
              <option value="rating">Top Rated ⭐</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 justify-start no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
              selectedCategory === cat 
                ? 'bg-red-500 text-white shadow-md shadow-red-200' 
                : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50 shadow-sm'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}