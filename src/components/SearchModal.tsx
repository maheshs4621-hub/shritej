import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onViewAllResults: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onViewAllResults
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = products.filter((p) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.ingredients.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  const popularSearches = ['Ubtan', 'Rose Water', 'Chandan Soap', 'Kumkumadi', 'Neem Lepa', 'Snana Kit'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onViewAllResults(query.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#EFE6D6] text-[#554636] hover:text-[#222E22] transition-colors"
          aria-label="Close search"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Input */}
        <div className="space-y-2">
          <span className="font-ui text-[10px] uppercase tracking-[0.25em] text-[#7D5A34] font-bold block">
            Sacred Apothecary Search
          </span>
          <form onSubmit={handleSubmit} className="relative">
            <Search className="w-5 h-5 text-[#8A7966] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search botanical herbs, ubtan, soaps, hydrosols..."
              className="w-full pl-12 pr-12 py-3.5 rounded-full bg-[#F3ECE0] border border-[#DECDB3] text-[#222E22] text-sm font-ui focus:outline-none focus:border-[#7D5A34]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#7A6B5B] hover:text-[#222E22]"
              >
                ✕
              </button>
            )}
          </form>
        </div>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center gap-2 font-ui text-xs text-[#6B5A47]">
          <span className="font-bold uppercase tracking-wider text-[10px] text-[#222E22]">Popular:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-3 py-1 rounded-full bg-[#F3ECE0] hover:bg-[#EAE0D0] text-[#4A3B2D] border border-[#DECDB3] transition-colors text-xs"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results Area */}
        {query.trim() && (
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            <div className="flex items-center justify-between text-xs font-ui text-[#7A6B5B] pb-1 border-b border-[#DECDB3]">
              <span>Results for &ldquo;{query}&rdquo; ({results.length})</span>
              {results.length > 0 && (
                <button
                  onClick={() => { onViewAllResults(query); onClose(); }}
                  className="text-[#7D5A34] font-bold hover:underline flex items-center gap-1"
                >
                  View in catalogue <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {results.length === 0 ? (
              <p className="text-center py-6 font-editorial text-sm text-[#7A6B5B]">
                No matching Ayurvedic formulations found. Try searching for &ldquo;Ubtan&rdquo; or &ldquo;Rose Water&rdquo;.
              </p>
            ) : (
              results.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  onClick={() => { onSelectProduct(p); onClose(); }}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#F5ECE0] hover:bg-[#EFE5D5] border border-[#DECDB3] cursor-pointer transition-colors"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 object-contain rounded-xl bg-white p-1 border border-[#E3DAC9] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-brand text-xs font-bold text-[#222E22] truncate">{p.name}</h4>
                    <p className="font-editorial text-xs text-[#6E5E4D] truncate">{p.tagline}</p>
                    <span className="font-brand text-xs font-bold text-[#7D5A34]">₹{p.price}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7D5A34] shrink-0" />
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};