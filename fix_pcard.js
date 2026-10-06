const fs = require('fs');
const content = import React from 'react';
import { Star, Heart, Eye, PlusCircle } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelect,
  onAddToCart,
}) => {
  return (
    <div className= group bg-gradient-to-b from-slate-900 to-[#0c1220] rounded-2xl border border-slate-800/80 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-950/50 flex flex-col overflow-hidden relative>
      <div className=relative aspect-[4/3] bg-slate-950 overflow-hidden cursor-pointer onClick={() => onSelect(product)}>
        <img 
          src={product.image} 
          alt={product.name}
          className=w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500
          loading=lazy
        />
        <div className=absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 />
        
        <div className=absolute top-3 left-3 flex flex-col gap-1.5>
          {product.isNewArrival && (
            <span className=px-2 py-0.5 rounded-md bg-cyan-500/90 text-slate-950 text-[10px] font-bold uppercase tracking-wider shadow-sm>
              New
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className=px-2 py-0.5 rounded-md bg-amber-500/90 text-slate-950 text-[10px] font-bold uppercase tracking-wider shadow-sm>
              Only {product.stock} left
            </span>
          )}
          {product.stock === 0 && (
            <span className=px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm>
              Sold Out
            </span>
          )}
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className=absolute top-3 right-3 p-2 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/10 text-slate-300 hover:text-rose-400 transition-colors
        >
          <Heart className={'w-4 h-4 ' + (isWishlisted ? 'fill-rose-500 text-rose-500' : '')} />
        </button>

        <div className=absolute bottom-3 left-3>
          <span className=px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-slate-300 text-xs font-medium>
            {product.category}
          </span>
        </div>
      </div>

      <div className=p-5 flex-1 flex flex-col justify-between space-y-4>
        <div>
          <div className=flex items-center gap-1.5 mb-1 text-amber-400 text-xs font-medium>
            <Star className=w-3.5 h-3.5 fill-amber-400 />
            <span>{product.rating.toFixed(1)}</span>
            <span className=text-slate-500>({product.reviewsCount} reviews)</span>
          </div>

          <h3 
            onClick={() => onSelect(product)}
            className=text-base font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-1 cursor-pointer
          >
            {product.name}
          </h3>
          <p className=text-xs text-slate-400 line-clamp-2 mt-1>
            {product.tagline || product.description}
          </p>
        </div>

        {product.specs && (
          <div className=grid grid-cols-2 gap-2 text-[11px] bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60>
            {Object.entries(product.specs).slice(0, 2).map(([k, v]) => (
              <div key={k} className=truncate>
                <span className=text-slate-500 block truncate>{k}:</span>
                <span className=text-slate-300 font-medium truncate>{v}</span>
              </div>
            ))}
          </div>
        )}

        <div className=pt-2 border-t border-slate-800/70 flex items-center justify-between gap-2>
          <div>
            <div className=text-lg font-bold text-white tracking-tight>
              
            </div>
            {product.originalPrice && (
              <div className=text-xs text-slate-500 line-through>
                
              </div>
            )}
          </div>

          <div className=flex items-center gap-2>
            <button
              onClick={() => onSelect(product)}
              className=p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700
              title=View Details
            >
              <Eye className=w-4 h-4 />
            </button>

            <button
              onClick={() => onAddToCart(product)}
              disabled={product.stock === 0}
              className={'px-4 py-2 rounded-xl font-medium text-xs flex items-center gap-1.5 transition-all ' + (product.stock === 0 ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 active:scale-95')}
            >
              <PlusCircle className=w-4 h-4 />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
;
fs.writeFileSync('src/components/ProductCard.tsx', content, 'utf8');