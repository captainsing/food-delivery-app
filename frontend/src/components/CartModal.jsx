import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CartModal({ isOpen, onClose, cartItems, onRemove, onCheckout }) {
  const [paymentMethod, setPaymentMethod] = useState('upi');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const deliveryFee = subtotal > 0 ? (subtotal > 499 ? 0 : 40) : 0;
  const taxes = subtotal * 0.05; // 5% GST
  const grandTotal = subtotal + deliveryFee + taxes;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-extrabold text-lg text-slate-800">Your Order Cart</h3>
            <p className="text-xs text-slate-500">{cartItems.length} Items Selected</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                🛒
              </div>
              <p className="text-slate-600 font-bold text-sm">Your cart is empty</p>
              <p className="text-xs text-slate-400">Add delicious items from the menu to start ordering.</p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-white shadow-sm hover:border-slate-200 transition-all">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-800 line-clamp-1">{item.name}</h4>
                        <span className="text-xs font-extrabold text-slate-900">₹{item.price}</span>
                      </div>
                    </div>
                    <button onClick={() => onRemove(idx)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Indian Payment Options Selector */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">Select Payment Method (India)</h4>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'upi' ? 'border-red-500 bg-red-50/50 text-red-600' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-xs">BHIM UPI</p>
                      <p className="text-[9px] text-slate-400">GPay / PhonePe / Paytm</p>
                    </div>
                    {paymentMethod === 'upi' && <CheckCircle2 className="w-4 h-4 text-red-500" />}
                  </button>

                  <button
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'cod' ? 'border-red-500 bg-red-50/50 text-red-600' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-xs">Cash on Delivery</p>
                      <p className="text-[9px] text-slate-400">Pay cash at doorstep</p>
                    </div>
                    {paymentMethod === 'cod' && <CheckCircle2 className="w-4 h-4 text-red-500" />}
                  </button>

                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'card' ? 'border-red-500 bg-red-50/50 text-red-600' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-xs">Debit / Credit Card</p>
                      <p className="text-[9px] text-slate-400">Visa, Mastercard, RuPay</p>
                    </div>
                    {paymentMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-red-500" />}
                  </button>

                  <button
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'netbanking' ? 'border-red-500 bg-red-50/50 text-red-600' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-xs">Net Banking</p>
                      <p className="text-[9px] text-slate-400">SBI, HDFC, ICICI, Axis</p>
                    </div>
                    {paymentMethod === 'netbanking' && <CheckCircle2 className="w-4 h-4 text-red-500" />}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Order Summary Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee {subtotal > 499 && <span className="text-emerald-600 font-bold">(FREE)</span>}</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>₹{taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-extrabold text-sm text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-red-500 text-base">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm shadow-lg shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Pay & Place Order
            </button>
          </div>
        )}

      </div>
    </div>
  );
}