import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Check, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  onBrowseCatalogue: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onBrowseCatalogue
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * appliedDiscount);
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'AYURVEDA10' || code === 'SHRITEJ10') {
      setAppliedDiscount(0.10);
      setCouponMsg({ text: '10% Sacred Heritage discount applied!', isError: false });
    } else if (code === 'FIRSTCARE' || code === 'PURE20') {
      setAppliedDiscount(0.15);
      setCouponMsg({ text: '15% First Order discount applied!', isError: false });
    } else {
      setCouponMsg({ text: 'Invalid code. Try coupon "AYURVEDA10" for 10% off.', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#DECDB3] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#EAE1D1] flex items-center justify-between bg-[#F4EDE2]">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#7D5A34]" />
              <h2 className="font-brand text-base font-bold text-[#222E22] tracking-wider uppercase">Ayurvedic Basket</h2>
              <span className="font-ui text-xs px-2.5 py-0.5 rounded-full bg-[#E5D7C2] text-[#694E2F] font-bold">
                {cart.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#6D5E4D] hover:text-[#222E22] hover:bg-[#EAE0D0] transition-colors"
              aria-label="Close Basket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#F3ECE0] flex items-center justify-center text-[#9A8973]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-brand text-lg font-bold text-[#222E22]">Your Basket is Empty</h3>
                <p className="font-editorial text-base text-[#6E5E4D] max-w-xs leading-relaxed">
                  Explore our classical Ayurvedic Ubtan or pure botanical floral waters to begin your sacred snana ritual.
                </p>
                <button
                  onClick={() => { onClose(); onBrowseCatalogue(); }}
                  className="px-6 py-2.5 rounded-full bg-[#2D3E2F] text-white font-ui text-xs uppercase tracking-wider font-semibold shadow-sm hover:bg-[#202E22]"
                >
                  Browse Catalogue
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3.5 p-3.5 bg-[#F3ECE0] border border-[#DECDB3] rounded-2xl relative"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-contain rounded-xl bg-[#FAF7F2] p-1 border border-[#E3DAC9] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-brand text-xs font-bold text-[#222E22] truncate tracking-wide">
                        {item.product.name}
                      </h4>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="font-brand text-sm text-[#7D5A34] font-bold">₹{item.product.price}</span>
                        {item.product.originalPrice && (
                          <span className="font-ui text-[10px] text-[#8A7966] line-through">₹{item.product.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="p-1 rounded-md bg-[#FAF7F2] text-[#554636] border border-[#DECDB3] hover:text-[#222E22]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-ui text-xs font-bold text-[#222E22] min-w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="p-1 rounded-md bg-[#FAF7F2] text-[#554636] border border-[#DECDB3] hover:text-[#222E22]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-2 text-[#9A8973] hover:text-rose-600 transition-colors shrink-0"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Coupon Input */}
                <form onSubmit={handleApplyCoupon} className="pt-2">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-[#8A7966] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon: AYURVEDA10"
                        className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#DECDB3] text-xs font-ui text-[#222E22] uppercase tracking-wider focus:outline-none focus:border-[#7D5A34]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#2D3E2F] text-white font-ui text-xs uppercase tracking-wider font-semibold hover:bg-[#202E22] shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <p className={'text-[11px] font-ui mt-1.5 ' + (couponMsg.isError ? 'text-rose-700' : 'text-emerald-800 font-semibold')}>
                      {couponMsg.text}
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Footer Summary & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-[#EAE1D1] space-y-4 bg-[#F4EDE2]">
              <div className="space-y-1.5 font-ui text-xs text-[#635342]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-brand font-bold text-[#222E22]">₹{subtotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-semibold">
                    <span>Ayurvedic Coupon Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Plastic-Free Express Courier</span>
                  <span className="font-bold text-[#2D3E2F]">FREE</span>
                </div>
                <div className="border-t border-[#DECDB3] pt-2 flex justify-between text-base font-bold">
                  <span className="font-brand text-[#222E22]">Total Due</span>
                  <span className="font-brand text-2xl text-[#7D5A34]">₹{total}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => { onClose(); onCheckout(); }}
                  className="w-full py-4 px-6 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-[#F9F6F0] font-ui text-xs uppercase tracking-[0.25em] font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { onClose(); onBrowseCatalogue(); }}
                  className="w-full py-2.5 text-center font-ui text-xs text-[#6B5A46] hover:text-[#222E22] uppercase tracking-wider font-semibold transition-colors"
                >
                  Continue Browsing Formulations
                </button>
              </div>

              <div className="pt-1 flex items-center justify-center gap-1.5 text-[10px] font-ui text-[#7A6B5B]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2D3E2F]" />
                <span>100% Genuine Ayurvedic Products • Biodegradable Wrap</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};