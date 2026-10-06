import React from 'react';
import { Star, ShoppingBag, Eye, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product, initialTab?: 'overview' | 'reviews') => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  isWishlisted,
  onToggleWishlist,
}) => {
  const isOutOfStock = product.stock === 0;

  return (
    <div
      className="group relative bg-[#FAF7F2] border border-[#DECDB3] hover:border-[#8E6E45] rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#7D5A34]/10 flex flex-col justify-between cursor-pointer"
      onClick={() => onViewDetails(product, 'overview')}
    >
      <div>
        <div className="relative h-64 sm:h-72 w-full bg-[#F3EDE2] overflow-hidden flex items-center justify-center p-5 border-b border-[#E8DFC9]">
          <img
            src={product.image}
            alt={product.name}
            className={'max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-xl drop-shadow-md ' + (isOutOfStock ? 'opacity-60 grayscale-[30%]' : '')}
          />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-1.5">
            {isOutOfStock ? (
              <span className="bg-rose-700 text-white font-ui text-[9px] font-bold px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-[0.2em] shadow-sm">
                Out of Stock
              </span>
            ) : (
              <>
                {product.isNewArrival && (
                  <span className="bg-[#2D3E2F] text-white font-ui text-[9px] font-bold px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-[0.2em]">
                    Authentic
                  </span>
                )}
                {product.isFeatured && (
                  <span className="bg-[#7D5A34] text-white font-ui text-[9px] font-bold px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-[0.2em]">
                    Sacred Herbs
                  </span>
                )}
              </>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-2.5 rounded-full bg-[#FAF7F2]/90 text-[#7D6B58] hover:text-rose-600 border border-[#D5C4A7] transition-colors shadow-sm"
            aria-label="Wishlist"
          >
            <Heart className={'w-4 h-4 ' + (isWishlisted ? 'fill-rose-600 text-rose-600' : '')} />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-2.5 sm:space-y-3">
          <div className="flex items-center justify-between text-xs font-ui">
            <span className="text-[#7D5A34] font-bold uppercase tracking-[0.2em] text-[10px]">
              {product.category}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(product, 'reviews');
              }}
              className="flex items-center gap-1 text-[#8A6D47] font-bold hover:text-[#5C452A] transition-colors cursor-pointer group/rev"
              title="Customer Reviews"
            >
              <Star className="w-3.5 h-3.5 fill-[#C9A24D] text-[#C9A24D]" /> {product.rating}
              <span className="text-[#8A7966] text-[11px] underline decoration-[#D0C0A8]">
                ({product.reviewsCount})
              </span>
            </button>
          </div>
          <h3 className="font-brand text-base sm:text-lg font-bold text-[#222E22] group-hover:text-[#7D5A34] transition-colors line-clamp-1 tracking-wider">
            {product.name}
          </h3>
          <p className="font-editorial text-xs sm:text-sm text-[#5C4F40] line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6 pt-0 mt-1 flex items-center justify-between border-t border-[#EAE1D1] pt-4">
        <div className="flex items-baseline gap-2">
          <span className="font-brand text-xl sm:text-2xl font-bold text-[#202E22]">
            ₹{product.price}
          </span>
          {product.originalPrice && (
            <span className="font-ui text-xs text-[#8A7966] line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product, 'overview');
            }}
            className="px-3 py-1.5 sm:py-2 rounded-full border border-[#C5B49C] hover:border-[#7D5A34] text-[#473A2D] font-ui text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold hover:bg-[#F3EBE0] transition-all"
          >
            Info
          </button>
          {isOutOfStock ? (
            <button
              disabled
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-neutral-200 text-neutral-500 font-ui text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold cursor-not-allowed"
            >
              Sold Out
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-[#F9F6F0] font-ui text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold transition-all shadow-sm flex items-center gap-1.5"
              aria-label="Add to Basket"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};