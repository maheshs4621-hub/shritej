import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Search, Filter, SlidersHorizontal, Sparkles } from 'lucide-react';

interface ProductsPageProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
  onViewDetails: (p: Product, tab?: 'overview' | 'reviews') => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  initialCategory?: string;
  initialSearch?: string;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  onAddToCart,
  onBuyNow,
  onViewDetails,
  wishlist,
  onToggleWishlist,
  initialCategory = 'All',
  initialSearch = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');

  const categories = ['All', 'Ubtan & Lepa', 'Toners & Mists', 'Bathing Rituals', 'Combos & Kits', 'Facial Oils'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch = 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.ingredients.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="py-12 sm:py-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Banner */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="font-ui text-xs uppercase tracking-[0.3em] text-[#7D5A34] font-bold block">
            Sacred Formulations
          </span>
          <h1 className="font-brand text-3xl sm:text-5xl font-bold tracking-[0.06em] text-[#202E22]">
            Authentic Ayurvedic Catalogue
          </h1>
          <p className="font-editorial text-lg sm:text-xl text-[#594B3C] max-w-2xl mx-auto leading-relaxed">
            Time-honoured recipes prepared with cold-cured botanical oils, stone-pulverized wildcrafted herbs, and pure floral hydrosols.
          </p>
          <div className="w-16 h-0.5 bg-[#8E6E45] mx-auto mt-2"></div>
        </div>

        {/* Search, Filter & Sort Controls */}
        <div className="bg-[#F3ECE0] border border-[#DECDB3] rounded-3xl p-4 sm:p-6 space-y-4 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#7A6B5B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search herbs, ubtan, gulab jal..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#D5C6B0] text-[#222E22] text-xs font-ui focus:outline-none focus:border-[#7D5A34]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7A6B5B] hover:text-[#222E22]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <span className="font-ui text-xs text-[#635342] font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 rounded-full bg-[#FAF7F2] border border-[#D5C6B0] text-[#222E22] text-xs font-ui font-semibold focus:outline-none focus:border-[#7D5A34] cursor-pointer"
              >
                <option value="featured">Featured Formulations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">New Arrivals First</option>
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#DECDB3]/70">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={
                  'px-4 py-2 rounded-full font-ui text-[11px] sm:text-xs uppercase tracking-[0.15em] font-semibold transition-all ' +
                  (selectedCategory === cat
                    ? 'bg-[#2D3E2F] text-white shadow-sm'
                    : 'bg-[#FAF7F2] text-[#554737] hover:bg-[#E8DCC9] hover:text-[#222E22] border border-[#D8C7AF]')
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs font-ui text-[#7A6B5B] px-2">
          <span>Showing <strong className="text-[#222E22]">{filteredProducts.length}</strong> authentic formulations</span>
          {searchQuery && (
            <span>Filtered by: &ldquo;{searchQuery}&rdquo;</span>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-16 text-center space-y-4 bg-[#F5EDE1] rounded-3xl border border-[#DECDB3]">
            <p className="font-brand text-lg text-[#222E22]">No formulations match your search criteria</p>
            <p className="font-editorial text-sm text-[#6A5A48]">Try clearing your search or browsing our all-natural Ubtan &amp; Lepa category.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="px-6 py-2.5 rounded-full bg-[#2D3E2F] text-white font-ui text-xs uppercase tracking-wider font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => (
              <div key={prod.id} className="flex flex-col">
                <ProductCard
                  product={prod}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                  isWishlisted={wishlist.includes(prod.id)}
                  onToggleWishlist={onToggleWishlist}
                />
                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    onClick={() => onBuyNow(prod)}
                    className="flex-1 py-2 rounded-full bg-[#7D5A34] hover:bg-[#684928] text-white font-ui text-[10px] sm:text-[11px] uppercase tracking-wider font-bold transition-all shadow-sm text-center"
                  >
                    ⚡ Buy Now
                  </button>
                  <button
                    onClick={() => onViewDetails(prod, 'overview')}
                    className="px-4 py-2 rounded-full border border-[#B5A187] hover:border-[#7D5A34] text-[#473A2D] font-ui text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold hover:bg-[#FAF7F2] transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};