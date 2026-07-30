import React from 'react';
import { motion } from 'framer-motion';

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 rounded-3xl my-6 text-white p-8 md:p-12 shadow-xl">
      <div className="relative z-10 max-w-xl">
        <motion.span 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-4"
        >
          🔥 Free Delivery on First Order
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-black leading-tight mb-4"
        >
          Delicious Food Delivered Hot & Fresh!
        </motion.h1>

        <p className="text-white/90 text-sm md:text-base mb-6">
          Order top-rated meals delivered right to your doorstep in under 30 minutes.
        </p>
      </div>

      <img 
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjY5OWo1cGF3bzU0M3YzbTNidG9lZmJtMngybzlsNW1mNzM2ejNvbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/u3uLdKq6gU5Yin4v1E/giphy.gif" 
        alt="Delivery GIF"
        className="absolute -right-4 -bottom-6 w-60 md:w-80 pointer-events-none hidden sm:block object-contain"
      />
    </div>
  );
}