import React from 'react';
import { Home, Utensils, ShoppingBag, User } from 'lucide-react';

export default function BottomNav({ cartCount, onCartClick, onAuthClick, user }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-slate-100 px-6 py-3 shadow-lg flex justify-between items-center">
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center gap-1 text-slate-600 active:text-primary">
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-bold">Home</span>
      </button>

      <button onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })} className="flex flex-col items-center gap-1 text-slate-600 active:text-primary">
        <Utensils className="w-5 h-5" />
        <span className="text-[10px] font-bold">Menu</span>
      </button>

      <button onClick={onCartClick} className="relative flex flex-col items-center gap-1 text-slate-600 active:text-primary">
        <ShoppingBag className="w-5 h-5" />
        <span className="text-[10px] font-bold">Cart</span>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full border border-white">
            {cartCount}
          </span>
        )}
      </button>

      <button onClick={onAuthClick} className="flex flex-col items-center gap-1 text-slate-600 active:text-primary">
        <User className="w-5 h-5" />
        <span className="text-[10px] font-bold">{user ? user.name.split(' ')[0] : 'Account'}</span>
      </button>
    </div>
  );
}