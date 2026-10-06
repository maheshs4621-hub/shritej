const fs = require('fs');
const content = import React from 'react';
import { X, Star, PlusCircle, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  return (
    <div className= fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto>
      <div className=relative w-full max-w-3xl bg-[#0d121f] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto>
        <button 
          onClick={onClose}
          className=absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300
        >
          <X className=w-5 h-5 />
        </button>

        <div className=grid grid-cols-1 md:grid-cols-2 gap-8 items-start>
          <div className=rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-square>
            <img 
              src={product.image} 
              alt={product.name} 
              className=w-full h-full object-cover
            />
          </div>

          <div className=space-y-4>
            <div>
              <div className=inline-block px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase mb-2>
                {product.category}
              </div>
              <h2 className=text-2xl font-bold text-white>{product.name}</h2>
              <p className=text-xs text-indigo-400 mt-1>{product.tagline}</p>
            </div>

            <div className=flex items-center gap-2 text-amber-400 text-sm font-medium>
              <Star className=w-4 h-4 fill-amber-400 />
              <span>{product.rating.toFixed(1)}</span>
              <span className=text-slate-500>({product.reviewsCount} customer reviews)</span>
            </div>

            <div className=text-2xl font-extrabold text-white>
              \
              {product.originalPrice && (
                <span className=text-sm text-slate-500 line-through ml-2 font-normal>
                  \
                </span>
              )}
            </div>

            <p className=text-xs sm:text-sm text-slate-300 leading-relaxed>
              {product.description}
            </p>

            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className=space-y-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs>
                <h4 className=font-bold text-white>Technical Specifications</h4>
                <div className=grid grid-cols-2 gap-2 text-slate-300>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key}>
                      <span className=text-slate-500 block>{key}</span>
                      <span className=font-semibold>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className=pt-2 flex items-center gap-4>
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                disabled={product.stock === 0}
                className=flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-40
              >
                <PlusCircle className=w-4 h-4 />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button
                onClick={() => onToggleWishlist(product.id)}
                className=p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700
              >
                <Heart className={'w-5 h-5 ' + (isWishlisted ? 'fill-rose-500 text-rose-500' : '')} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
;
fs.writeFileSync('src/components/ProductModal.tsx', content, 'utf8');