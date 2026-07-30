import React from 'react';
import { ShoppingBag, User, LogOut, Utensils, Sparkles } from 'lucide-react';

export default function Navbar({ cartCount, onCartClick, user, onAuthClick, onLogout }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-500 to-rose-400 flex items-center justify-center text-white shadow-md shadow-red-200">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-tight text-slate-800 flex items-center gap-1">
              Foodie<span className="text-red-500">Xpress</span>
            </h1>
            <span className="text-[10px] text-slate-400 font-medium block -mt-1">Hot & Fresh Delivered</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-red-500" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Auth Section */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 px-3 py-1.5 rounded-2xl">
                <div className="w-7 h-7 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center uppercase shadow-sm">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-slate-800 line-clamp-1">
                    {user.name}
                  </p>
                  <p className="text-[9px] text-emerald-600 font-semibold flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> Logged In
                  </p>
                </div>
              </div>

              <button
                onClick={onLogout}
                title="Logout"
                className="p-2 rounded-2xl bg-slate-100 hover:bg-red-100 hover:text-red-600 text-slate-500 transition-all active:scale-95"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="px-5 py-2.5 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-200 transition-all active:scale-95"
            >
              <User className="w-4 h-4" />
              <span>Login / Signup</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
}