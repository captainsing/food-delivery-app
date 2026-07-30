import React, { useState } from 'react';
import { Star, Clock, Plus, Check } from 'lucide-react';

export default function FoodCard({ food, onAddToCart }) {
  const [added, setAdded] = useState(false);

  if (!food) return null;

  const handleAdd = () => {
    if (onAddToCart) onAddToCart(food);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
        <img 
          src={food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'} 
          alt={food.name || 'Food item'} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Veg / Non-Veg Indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
          <span className={`w-2.5 h-2.5 rounded-full ${food.is_veg === false ? 'bg-red-600' : 'bg-emerald-600'}`}></span>
          <span className="text-[10px] font-extrabold text-slate-700 uppercase">
            {food.is_veg === false ? 'Non-Veg' : 'Veg'}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm text-slate-800">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{food.rating || '4.5'}</span>
        </div>

        {/* Prep Time */}
        <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1">
          <Clock className="w-3 h-3 text-red-500" />
          <span>{food.prep_time || '20 min'}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-lg text-slate-800 line-clamp-1">
              {food.name}
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 font-bold text-slate-600 uppercase">
              {food.category}
            </span>
          </div>
          <p className="text-slate-500 text-xs line-clamp-2">
            {food.description || 'Deliciously crafted meal made with fresh quality ingredients.'}
          </p>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-slate-50">
          <div>
            <span className="text-[10px] text-slate-400 block font-bold uppercase">Price</span>
            <span className="text-xl font-extrabold text-slate-900">₹{food.price}</span>
          </div>

          <button
            onClick={handleAdd}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
              added 
                ? 'bg-emerald-500 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Added
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}