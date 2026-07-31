import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await axios.post(`https://food-delivery-backend-h4w7.onrender.com${endpoint}`, formData);
      onAuthSuccess(res.data.user, res.data.token);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-2">{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
        <p className="text-xs text-center text-slate-500 mb-6">{isLogin ? 'Enter credentials to access account' : 'Sign up to start ordering'}</p>

        {error && <div className="bg-red-50 text-red-500 text-xs p-3 rounded-xl mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Full Name</label>
              <input type="text" required className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">Email Address</label>
            <input type="email" required className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">Password</label>
            <input type="password" required className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          </div>

          <button className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-red-600 transition-colors">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-slate-500">
          {isLogin ? "Don't have an account? " : "Already registered? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-bold underline">
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  );
}