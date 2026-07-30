import React from 'react';
import { Tag, Sparkles, Percent } from 'lucide-react';

export default function OffersBanner() {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      
      {/* Offer Card 1 */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg relative overflow-hidden flex items-center justify-between">
        <div className="space-y-1 z-10">
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">
            FLAT 50% OFF
          </span>
          <h3 className="font-extrabold text-lg">First Order Offer</h3>
          <p className="text-xs text-orange-100">Use Code: <span className="font-bold underline">WELCOME50</span></p>
        </div>
        <Percent className="w-16 h-16 text-white/20 absolute -right-2 -bottom-2" />
      </div>

      {/* Offer Card 2 */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg relative overflow-hidden flex items-center justify-between">
        <div className="space-y-1 z-10">
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">
            FREE DELIVERY
          </span>
          <h3 className="font-extrabold text-lg">Orders Above ₹499</h3>
          <p className="text-xs text-rose-100">Automatic discount at checkout</p>
        </div>
        <Sparkles className="w-16 h-16 text-white/20 absolute -right-2 -bottom-2" />
      </div>

      {/* Offer Card 3 */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg relative overflow-hidden flex items-center justify-between">
        <div className="space-y-1 z-10">
          <span className="px-2.5 py-0.5 rounded-full bg-red-500 text-[10px] font-bold uppercase tracking-wider">
            UPI CASHBACK
          </span>
          <h3 className="font-extrabold text-lg">Payvia BHIM UPI</h3>
          <p className="text-xs text-slate-300">Get up to ₹100 instant cashback</p>
        </div>
        <Tag className="w-16 h-16 text-white/10 absolute -right-2 -bottom-2" />
      </div>

    </div>
  );
}