import React from 'react';
import { Product } from '../types';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

interface WishlistPageProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (p: Product) => void;
  onViewProduct: (p: Product) => void;
  onBrowseCatalogue: () => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onViewProduct,
  onBrowseCatalogue
}) => {
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="py-12 sm:py-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE6D6] border border-[#D5C4A7] text-[#694F32] font-ui text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>Saved Formulations</span>
          </div>
          <h1 className="font-brand text-3xl sm:text-5xl font-bold tracking-[0.06em] text-[#222E22]">
            Your Sacred Wishlist
          </h1>
          <p className="font-editorial text-lg text-[#594B3C]">
            Carefully curated Ayurvedic items saved for your personal snana or gifting rituals.
          </p>
          <div className="w-16 h-0.5 bg-[#8E6E45] mx-auto mt-2"></div>
        </div>

        {/* Content */}
        {wishlistedProducts.length === 0 ? (
          <div className="p-16 text-center space-y-4 bg-[#F5EDE1] rounded-3xl border border-[#DECDB3] max-w-xl mx-auto">
            <Heart className="w-12 h-12 text-[#9A8973] mx-auto" />
            <h3 className="font-brand text-xl font-bold text-[#222E22]">Your Wishlist is Empty</h3>
            <p className="font-editorial text-base text-[#6A5A48]">
              You haven&rsquo;t saved any Ayurvedic formulations yet. Tap the heart icon on any product to save it here.
            </p>
            <button
              onClick={onBrowseCatalogue}
              className="px-8 py-3.5 rounded-full bg-[#2D3E2F] text-white font-ui text-xs uppercase tracking-wider font-semibold transition-all shadow-md inline-flex items-center gap-2"
            >
              Explore Catalogue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistedProducts.map((p) => (
              <div
                key={p.id}
                className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl overflow-hidden p-5 flex flex-col justify-between space-y-4 shadow-sm hover:border-[#8E6E45] transition-all"
              >
                <div className="space-y-3">
                  <div className="relative h-56 bg-[#F3ECE0] rounded-2xl flex items-center justify-center p-4">
                    <img src={p.image} alt={p.name} className="max-h-full object-contain" />
                    <button
                      onClick={() => onToggleWishlist(p.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-[#FAF7F2] text-rose-600 border border-[#D5C4A7] hover:bg-rose-50 transition-colors"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <span className="font-ui text-[9px] uppercase tracking-wider font-bold text-[#7D5A34]">{p.category}</span>
                    <h3
                      onClick={() => onViewProduct(p)}
                      className="font-brand text-base font-bold text-[#222E22] hover:text-[#7D5A34] cursor-pointer line-clamp-1 mt-0.5"
                    >
                      {p.name}
                    </h3>
                    <p className="font-editorial text-xs text-[#5C4F40] line-clamp-2 mt-1">{p.tagline}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#DECDB3] flex items-center justify-between">
                  <span className="font-brand text-xl font-bold text-[#202E22]">₹{p.price}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewProduct(p)}
                      className="px-3 py-1.5 rounded-full border border-[#DECDB3] text-xs font-ui uppercase font-semibold text-[#4A3B2C] hover:bg-[#F3ECE0]"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onAddToCart(p)}
                      className="px-4 py-1.5 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white text-xs font-ui uppercase tracking-wider font-semibold flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};