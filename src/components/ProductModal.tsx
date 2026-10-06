import React, { useState } from 'react';
import { X, Check, ShoppingBag, Star, CheckCircle2, MessageSquare } from 'lucide-react';
import { Product } from '../types';
interface ProductModalProps { product: Product | null; isOpen: boolean; onClose: () => void; onAddToCart: (p: Product) => void; initialTab?: 'overview' | 'reviews'; }
export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart, initialTab = 'overview' }) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'reviews'>(initialTab);
  React.useEffect(() => { if (isOpen) setActiveSubTab(initialTab); }, [isOpen, initialTab]);
  if (!isOpen || !product) return null;
  const reviews = product.reviewsList || [
    { id: 'r1', author: 'Pooja Kulkarni', rating: 5, date: '2 days ago', comment: 'This authentic Ayurvedic formulation gave my skin an instant radiant golden glow! Pure botanical feel.', verified: true },
    { id: 'r2', author: 'Aniket Deshmukh', rating: 5, date: '5 days ago', comment: 'Gently cleared deep sun tanning within days. The fragrance is pure natural sandalwood and herbs.', verified: true },
    { id: 'r3', author: 'Sneha Patil', rating: 4.9, date: '1 week ago', comment: 'Truly authentic. Mixed with pure Kannauj Rose Water, it leaves skin glowing without dryness.', verified: true },
    { id: 'r4', author: 'Rahul Shinde', rating: 5, date: '2 weeks ago', comment: 'Unbeatable craftsmanship and earth-conscious biodegradable wrap. Genuine Indian wellness.', verified: true }
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl sm:rounded-[2rem] overflow-hidden shadow-2xl my-auto flex flex-col max-h-[92vh]">
        <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-[#EFE6D6] text-[#5A4B3C] hover:text-[#222E22] transition-colors shadow-sm"><X className="w-4 h-4 sm:w-5 sm:h-5" /></button>
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
          <div className="relative bg-[#F3ECE0] p-6 sm:p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#E5DAC8]">
            <img src={product.image} alt={product.name} className="w-full max-h-[260px] sm:max-h-[380px] object-contain rounded-xl drop-shadow-xl" />
          </div>
          <div className="p-5 sm:p-8 flex flex-col justify-between space-y-4 sm:space-y-5 bg-[#FAF7F2]">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-ui text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-[#EBE0CE] text-[#7D5A34]">{product.category}</span>
                {product.stock > 0 ? (
                  <span className="font-ui text-xs text-[#7A6B5B]">In Stock: {product.stock} units</span>
                ) : (
                  <span className="font-ui text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full uppercase tracking-wider">Out of Stock</span>
                )}
              </div>
              <h2 className="font-brand text-xl sm:text-2xl font-bold text-[#222E22] tracking-wider">{product.name}</h2>
              <p className="font-editorial italic text-sm sm:text-base text-[#6E5943]">{product.tagline}</p>
              <div className="flex items-center justify-between pt-1 border-b border-[#EAE1D1] pb-3">
                <div className="flex items-baseline gap-2 sm:gap-3">
                  <span className="font-brand text-2xl sm:text-3xl font-bold text-[#202E22]">₹{product.price}</span>
                  {product.originalPrice && <span className="font-ui text-xs sm:text-sm text-[#8A7966] line-through">₹{product.originalPrice}</span>}
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F3ECE0] text-[#7D5A34] font-ui text-[11px] sm:text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-[#C9A24D] text-[#C9A24D]" /> {product.rating} ({product.reviewsCount})
                </div>
              </div>
              <div className="flex border-b border-[#EAE1D1] text-[11px] sm:text-xs font-ui uppercase tracking-wider font-semibold gap-4 sm:gap-6 pt-1">
                <button onClick={() => setActiveSubTab('overview')} className={'pb-2 border-b-2 transition-all ' + (activeSubTab === 'overview' ? 'border-[#7D5A34] text-[#7D5A34]' : 'border-transparent text-[#7A6B5B] hover:text-[#222E22]')}>Overview</button>
                <button onClick={() => setActiveSubTab('reviews')} className={'pb-2 border-b-2 transition-all flex items-center gap-1.5 ' + (activeSubTab === 'reviews' ? 'border-[#7D5A34] text-[#7D5A34]' : 'border-transparent text-[#7A6B5B] hover:text-[#222E22]')}>
                  <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Reviews ({reviews.length})
                </button>
              </div>
              {activeSubTab === 'overview' ? (
                <div className="space-y-3">
                  <p className="font-editorial text-sm sm:text-base text-[#4C4033] leading-relaxed">{product.description}</p>
                  {product.specs && Object.keys(product.specs).length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <h4 className="font-ui text-[9px] sm:text-[10px] font-bold text-[#7D5A34] uppercase tracking-[0.2em]">Specifications</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {Object.entries(product.specs).map(([key, val]) => (
                          <div key={key} className="flex items-start text-[11px] sm:text-xs text-[#524436] gap-2 font-ui">
                            <Check className="w-3 h-3 text-[#2D3E2F] shrink-0 mt-0.5" />
                            <span><strong className="text-[#222E22] font-semibold">{key}:</strong> {val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-3 rounded-xl bg-[#F3ECE0] border border-[#DECDB3] space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="font-brand font-bold text-[#222E22]">{rev.author}</span>
                          {rev.verified && <span className="flex items-center gap-0.5 text-[8px] text-[#2D3E2F] font-bold font-ui uppercase tracking-wider"><CheckCircle2 className="w-2.5 h-2.5" /> Verified</span>}
                        </div>
                        <span className="font-ui text-[9px] text-[#8A7966]">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-[#C9A24D]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-[#C9A24D] text-[#C9A24D]" />
                        ))}
                        <span className="font-ui text-[9px] text-[#7A6B5B] ml-1">{rev.rating}</span>
                      </div>
                      <p className="font-editorial text-xs text-[#4E4133] leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="pt-3 border-t border-[#EAE1D1]">
              {product.stock > 0 ? (
                <button onClick={() => { onAddToCart(product); onClose(); }} className="w-full py-3.5 px-6 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-[#F9F6F0] font-ui text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> Add to Basket (₹{product.price})
                </button>
              ) : (
                <button disabled className="w-full py-3.5 px-6 rounded-full bg-neutral-200 text-neutral-500 font-ui text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold cursor-not-allowed">
                  Sold Out (Currently Unavailable)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
