import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import OffersBanner from './components/OffersBanner';
import FilterBar from './components/FilterBar';
import FoodCard from './components/FoodCard';
import CartModal from './components/CartModal';
import AuthModal from './components/AuthModal';
import DeveloperCard from './components/DeveloperCard';

export default function App() {
  const [foods, setFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch (e) { localStorage.removeItem('user'); }
    }

    axios.get('http://localhost:5000/api/foods')
      .then((res) => setFoods(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAuthSuccess = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  };

  const addToCart = (food) => {
    setCart((prev) => [...prev, food]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = async () => {
    const totalAmount = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    try {
      await axios.post('http://localhost:5000/api/orders', {
        userId: user ? user.id : null,
        items: cart,
        totalAmount
      });
      alert('🎉 Order Placed Successfully!');
      setCart([]);
      setIsCartOpen(false);
    } catch (err) {
      alert('Failed to place order');
    }
  };

  // Filter & Sort Logic
  const filteredFoods = foods
    .filter((food) => {
      const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
      const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = vegOnly ? food.is_veg === true : true;
      return matchesCategory && matchesSearch && matchesVeg;
    })
    .sort((a, b) => {
      if (sortBy === 'low-to-high') return parseFloat(a.price) - parseFloat(b.price);
      if (sortBy === 'high-to-low') return parseFloat(b.price) - parseFloat(a.price);
      if (sortBy === 'rating') return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
      return 0;
    });

  return (
    <div className="min-h-screen pb-16 bg-slate-50/50">
      <Navbar cartCount={cart.length} onCartClick={() => setIsCartOpen(true)} user={user} onAuthClick={() => setIsAuthOpen(true)} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4">
        <HeroBanner />
        <OffersBanner />

        <FilterBar 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          vegOnly={vegOnly}
          setVegOnly={setVegOnly}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} onAddToCart={addToCart} />
          ))}
        </div>

        <DeveloperCard />
      </main>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} onRemove={removeFromCart} onCheckout={handleCheckout} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onAuthSuccess={handleAuthSuccess} />
    </div>
  );
}