const fs = require('fs');
const content = import React from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  cartCount,
  cartTotal,
  updateQuantity,
  removeFromCart,
  onProceedCheckout,
}) => {
  if (!isOpen) return null;

  return (
    <div className= fixed inset-0 z-50 overflow-hidden>
      <div 
        className=absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity
        onClick={onClose}
      />
      <div className=fixed inset-y-0 right-0 max-w-full flex pl-10>
        <div className=w-screen max-w-md bg-[#0d121f] border-l border-slate-800 shadow-2xl flex flex-col text-slate-100>
          <div className=p-6 border-b border-slate-800 flex items-center justify-between>
            <div className=flex items-center gap-2>
              <ShoppingBag className=w-5 h-5 text-indigo-400 />
              <h2 className=text-lg font-bold text-white>Your Cart ({cartCount})</h2>
            </div>
            <button 
              onClick={onClose}
              className=p-2 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-400 hover:text-white
            >
              <X className=w-5 h-5 />
            </button>
          </div>

          <div className=flex-1 overflow-y-auto p-6 space-y-4>
            {cart.length === 0 ? (
              <div className=text-center py-20 text-slate-400 space-y-3>
                <ShoppingBag className=w-12 h-12 mx-auto text-slate-600 />
                <p className=font-medium>Your shopping bag is empty</p>
                <button 
                  onClick={onClose}
                  className=px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold
                >
                  Browse Featured Products
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.product.id} className=flex gap-4 p-3 rounded-2xl bg-slate-900/70 border border-slate-800/80 items-center>
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className=w-16 h-16 rounded-xl object-cover border border-slate-700
                  />
                  <div className=flex-1 min-w-0>
                    <h4 className=text-sm font-semibold text-white truncate>{item.product.name}</h4>
                    <div className=text-xs text-indigo-400 font-bold mt-0.5>
                      
                    </div>

                    <div className=flex items-center gap-2 mt-2>
                      <button 
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className=p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300
                      >
                        <Minus className=w-3 h-3 />
                      </button>
                      <span className=text-xs font-semibold px-2>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, 1)}
                        disabled={item.quantity >= item.product.stock}
                        className=p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40
                      >
                        <Plus className=w-3 h-3 />
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className=p-2 text-slate-500 hover:text-rose-400 transition-colors
                  >
                    <Trash2 className=w-4 h-4 />
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className=p-6 border-t border-slate-800 bg-slate-950/80 space-y-4>
              <div className=space-y-1.5 text-xs text-slate-400>
                <div className=flex justify-between>
                  <span>Subtotal</span>
                  <span className=text-slate-200 font-semibold></span>
                </div>
                <div className=flex justify-between>
                  <span>Shipping</span>
                  <span className=text-emerald-400 font-semibold>FREE</span>
                </div>
                <div className=flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800>
                  <span>Total Amount</span>
                  <span className=text-indigo-400></span>
                </div>
              </div>

              <button
                onClick={onProceedCheckout}
                className=w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all
              >
                <CreditCard className=w-4 h-4 />
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
;
fs.writeFileSync('src/components/CartDrawer.tsx', content, 'utf8');