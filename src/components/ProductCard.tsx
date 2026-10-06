import React from 'react';
import { Star, ShoppingBag, Heart } from 'lucide-react';
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

  // Single badge priority logic to eliminate clutter
  let badgeText: string | null = null;
  let badgeStyle = '';

  if (isOutOfStock) {
    badgeText = 'Sold Out';
    badgeStyle = 'bg-rose-700/90 text-white border-rose-600';
  } else if (product.isFeatured) {
    badgeText = 'Bestseller';
    badgeStyle = 'bg-[#7D5A34] text-white border-[#8E6E45]';
  } else if (product.isNewArrival) {
    badgeText = 'New Formulation';
    badgeStyle = 'bg-[#2D3E2F] text-white border-[#3D523F]';
  }

  // Calculate discount percent
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => onViewDetails(product, 'overview')}
      className="group relative bg-[#FAF7F2] border border-[#DECDB3] hover:border-[#7D5A34]/60 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#7D5A34]/8 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Product Image Stage */}
        <div className="relative aspect-[4/5] w-full bg-[#F5ECE0] overflow-hidden flex items-center justify-center p-6 border-b border-[#EAE1D1]">
          <img
            src={product.image}
            alt={product.name}
            className={
              'max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-xl drop-shadow-md ' +
              (isOutOfStock ? 'opacity-60 grayscale-[30%]' : '')
            }
          />

          {/* Single High-Priority Badge (Zero Clutter) */}
          {badgeText && (
            <div className="absolute top-3.5 left-3.5">
              <span
                className={
                  'inline-block px-3 py-1 rounded-full font-ui text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm border ' +
                  badgeStyle
                }
              >
                {badgeText}
              </span>
            </div>
          )}

          {/* Wishlist Icon */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="absolute top-3.5 right-3.5 p-2 rounded-full bg-[#FAF7F2]/90 hover:bg-[#FAF7F2] text-[#7D6B58] hover:text-rose-600 border border-[#D5C4A7] transition-all shadow-sm active:scale-95"
            aria-label="Wishlist"
          >
            <Heart
              className={
                'w-4 h-4 transition-colors ' +
                (isWishlisted ? 'fill-rose-600 text-rose-600' : '')
              }
            />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-2">
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between text-xs font-ui">
            <span className="text-[#7D5A34] font-bold uppercase tracking-[0.2em] text-[10px]">
              {product.category}
            </span>

            <div
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(product, 'reviews');
              }}
              className="flex items-center gap-1 text-[#8A6D47] hover:text-[#5C452A] transition-colors"
            >
              <Star className="w-3.5 h-3.5 fill-[#C9A24D] text-[#C9A24D]" />
              <span className="font-bold text-xs">{product.rating}</span>
              <span className="text-[#8A7966] text-[11px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-brand text-base sm:text-lg font-bold text-[#222E22] group-hover:text-[#7D5A34] transition-colors line-clamp-1 tracking-wide">
            {product.name}
          </h3>

          {/* Botanical Subtitle */}
          <p className="font-editorial text-xs sm:text-sm text-[#5C4F40] line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>
      </div>

      {/* Footer Pricing & Single Clear CTA */}
      <div className="p-5 sm:p-6 pt-0 mt-2 flex items-center justify-between border-t border-[#EAE1D1]/80 pt-4">
        {/* Pricing */}
        <div className="flex flex-col">
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
          {discountPercent > 0 && (
            <span className="font-ui text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Primary Action Button */}
        <div>
          {isOutOfStock ? (
            <span className="inline-block px-4 py-2 rounded-full bg-neutral-200 text-neutral-500 font-ui text-[11px] uppercase tracking-wider font-semibold cursor-not-allowed border border-neutral-300">
              Sold Out
            </span>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="px-4 sm:px-5 py-2.5 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-[#F9F6F0] font-ui text-xs uppercase tracking-wider font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-1.5 active:scale-95"
              aria-label="Add to Basket"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#C9A24D]" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
