import React, { useState } from 'react';
import { Product } from '../types';
import { Star, ShoppingBag, Heart, Share2, Check, ArrowLeft, ShieldCheck, Leaf, Recycle, Clock, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (p: Product, qty: number) => void;
  onBuyNow: (p: Product, qty: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  relatedProducts: Product[];
  onSelectProduct: (p: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  relatedProducts,
  onSelectProduct
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'howToUse' | 'sustainability' | 'reviews'>('benefits');
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);

  // Review submission state
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [revAuthor, setRevAuthor] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewListState, setReviewListState] = useState(product.reviewsList || []);

  React.useEffect(() => {
    setReviewListState(product.reviewsList || []);
  }, [product]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revAuthor.trim() || !revComment.trim()) return;
    setIsSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          author: revAuthor.trim(),
          rating: revRating,
          comment: revComment.trim(),
        }),
      });
      const data = await res.json();
      if (data?.success && data.review) {
        setReviewListState(prev => [data.review, ...prev]);
        setRevAuthor('');
        setRevComment('');
        setIsReviewFormOpen(false);
      }
    } catch (err) {
      console.warn('Review submission note:', err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  const fallbackReviews = [
    { id: 'r1', author: 'Pooja Kulkarni', rating: 5, date: '2 days ago', comment: 'This authentic Ayurvedic formulation gave my skin an instant radiant golden glow! Pure botanical feel.', verified: true },
    { id: 'r2', author: 'Aniket Deshmukh', rating: 5, date: '5 days ago', comment: 'Gently cleared deep sun tanning within days. The fragrance is pure natural sandalwood and herbs.', verified: true },
    { id: 'r3', author: 'Sneha Patil', rating: 5, date: '1 week ago', comment: 'Truly authentic. Mixed with pure Kannauj Rose Water, it leaves skin glowing without dryness.', verified: true }
  ];
  const reviews = reviewListState.length > 0 ? reviewListState : fallbackReviews;

  return (
    <div className="py-8 sm:py-16 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Breadcrumb / Back */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-wider text-[#7D5A34] hover:text-[#523B22] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </button>
          <span className="font-ui text-xs text-[#8A7966]">SKU: {product.sku}</span>
        </div>

        {/* Main Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-[#FAF7F2]">
          
          {/* Gallery / Image Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative bg-[#F3ECE0] rounded-3xl p-8 sm:p-12 border border-[#E3DAC9] flex items-center justify-center min-h-[380px] sm:min-h-[460px] shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[320px] sm:max-h-[420px] max-w-full object-contain rounded-2xl drop-shadow-2xl"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNewArrival && (
                  <span className="bg-[#2D3E2F] text-white font-ui text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.2em]">
                    Authentic Formulation
                  </span>
                )}
                {product.isFeatured && (
                  <span className="bg-[#7D5A34] text-white font-ui text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.2em]">
                    Sacred Botanicals
                  </span>
                )}
              </div>
              <button
                onClick={() => onToggleWishlist(product.id)}
                className="absolute top-4 right-4 p-3 rounded-full bg-[#FAF7F2]/90 border border-[#D5C6AF] text-[#7A6B5B] hover:text-rose-600 transition-colors shadow-sm"
                aria-label="Wishlist"
              >
                <Heart className={'w-5 h-5 ' + (isWishlisted ? 'fill-rose-600 text-rose-600' : '')} />
              </button>
            </div>
            
            {/* Quick Badges below image */}
            <div className="grid grid-cols-3 gap-3 text-center font-ui text-[11px] text-[#5C4F40]">
              <div className="p-3 bg-[#F4EDE2] rounded-2xl border border-[#DECDB3]">
                <Leaf className="w-4 h-4 mx-auto text-[#2D3E2F] mb-1" />
                <span>100% Natural</span>
              </div>
              <div className="p-3 bg-[#F4EDE2] rounded-2xl border border-[#DECDB3]">
                <Recycle className="w-4 h-4 mx-auto text-[#7D5A34] mb-1" />
                <span>Biodegradable</span>
              </div>
              <div className="p-3 bg-[#F4EDE2] rounded-2xl border border-[#DECDB3]">
                <ShieldCheck className="w-4 h-4 mx-auto text-[#2D3E2F] mb-1" />
                <span>Zero Harsh Additives</span>
              </div>
            </div>
          </div>

          {/* Product Details & Actions */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-ui text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full bg-[#EBE0CE] text-[#7D5A34]">
                  {product.category}
                </span>
                <span className="font-ui text-xs text-[#7A6B5B]">
                  Net Qty: <strong className="text-[#222E22]">{product.netQuantity}</strong>
                </span>
              </div>

              <h1 className="font-brand text-2xl sm:text-4xl font-bold text-[#222E22] tracking-wide leading-tight">
                {product.name}
              </h1>

              <p className="font-editorial italic text-base sm:text-lg text-[#6B5742] leading-relaxed">
                {product.tagline}
              </p>

              {/* Price & Rating */}
              <div className="flex items-center justify-between py-3 border-y border-[#DECDB3]">
                <div className="flex items-baseline gap-3">
                  <span className="font-brand text-3xl sm:text-4xl font-bold text-[#202E22]">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="font-ui text-base text-[#8A7966] line-through">₹{product.originalPrice}</span>
                  )}
                  <span className="font-ui text-xs font-bold text-[#2D3E2F] bg-[#E2EBDD] px-2.5 py-0.5 rounded-full">
                    {Math.round((((product.originalPrice || product.price) - product.price) / (product.originalPrice || product.price)) * 100)}% OFF
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3ECE0] text-[#7D5A34] font-ui text-xs font-bold">
                  <Star className="w-4 h-4 fill-[#C9A24D] text-[#C9A24D]" />
                  <span>{product.rating}</span>
                  <span className="text-[#8A7966] font-normal">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Description */}
              <p className="font-editorial text-base sm:text-lg text-[#4A3D2F] leading-relaxed">
                {product.description}
              </p>

              {/* Action Controls: Quantity, Add to Cart, Buy Now */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  {product.stock > 0 ? (
                    <>
                      <span className="font-ui text-xs font-bold uppercase tracking-wider text-[#45392D]">Quantity:</span>
                      <div className="flex items-center border border-[#DECDB3] rounded-full bg-[#FAF7F2] p-1">
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="w-8 h-8 rounded-full bg-[#F1E8DC] hover:bg-[#E5DAC8] text-[#3D3226] flex items-center justify-center font-bold text-sm transition-colors"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-ui text-sm font-bold text-[#222E22]">{quantity}</span>
                        <button
                          onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                          className="w-8 h-8 rounded-full bg-[#F1E8DC] hover:bg-[#E5DAC8] text-[#3D3226] flex items-center justify-center font-bold text-sm transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-ui text-xs text-[#2D3E2F] font-semibold">✓ In Stock ({product.stock} available)</span>
                    </>
                  ) : (
                    <span className="font-ui text-xs text-rose-700 font-bold bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full uppercase tracking-wider">
                      ✕ Out of Stock (Currently Unavailable)
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {product.stock > 0 ? (
                    <>
                      <button
                        onClick={() => onAddToCart(product, quantity)}
                        className="py-4 px-6 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" /> Add to Basket
                      </button>
                      <button
                        onClick={() => onBuyNow(product, quantity)}
                        className="py-4 px-6 rounded-full bg-[#7D5A34] hover:bg-[#684928] text-white font-ui text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-md text-center"
                      >
                        ⚡ Buy Now (₹{product.price * quantity})
                      </button>
                    </>
                  ) : (
                    <button
                      disabled
                      className="col-span-full py-4 px-6 rounded-full bg-neutral-200 text-neutral-500 font-ui text-xs uppercase tracking-[0.2em] font-bold cursor-not-allowed text-center"
                    >
                      Sold Out / Currently Unavailable
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 font-ui text-xs text-[#6B5945] hover:text-[#222E22] transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{shareSuccess ? 'Link Copied to Clipboard!' : 'Share Formulation'}</span>
                  </button>
                  <span className="font-ui text-xs text-[#8A7966]">Shelf Life: {product.shelfLife}</span>
                </div>
              </div>

            </div>

            {/* Micro Details Grid */}
            <div className="p-4 bg-[#F5ECE0] rounded-2xl border border-[#DECDB3] space-y-2 text-xs font-ui text-[#524436]">
              <div className="flex justify-between">
                <span><strong>Suitable For:</strong> {product.suitableFor}</span>
              </div>
              <div className="flex justify-between">
                <span><strong>Storage:</strong> {product.storage}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Tabs: Benefits, Ingredients, How To Use, Sustainability, Reviews */}
        <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="flex flex-wrap border-b border-[#DECDB3] gap-4 sm:gap-8 font-ui text-xs uppercase tracking-[0.18em] font-bold">
            <button
              onClick={() => setActiveTab('benefits')}
              className={'pb-3 border-b-2 transition-all ' + (activeTab === 'benefits' ? 'border-[#7D5A34] text-[#7D5A34]' : 'border-transparent text-[#7A6B5B] hover:text-[#222E22]')}
            >
              Ayurvedic Benefits
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={'pb-3 border-b-2 transition-all ' + (activeTab === 'ingredients' ? 'border-[#7D5A34] text-[#7D5A34]' : 'border-transparent text-[#7A6B5B] hover:text-[#222E22]')}
            >
              Botanical Ingredients
            </button>
            <button
              onClick={() => setActiveTab('howToUse')}
              className={'pb-3 border-b-2 transition-all ' + (activeTab === 'howToUse' ? 'border-[#7D5A34] text-[#7D5A34]' : 'border-transparent text-[#7A6B5B] hover:text-[#222E22]')}
            >
              How To Use
            </button>
            <button
              onClick={() => setActiveTab('sustainability')}
              className={'pb-3 border-b-2 transition-all ' + (activeTab === 'sustainability' ? 'border-[#7D5A34] text-[#7D5A34]' : 'border-transparent text-[#7A6B5B] hover:text-[#222E22]')}
            >
              Packaging &amp; Earth
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={'pb-3 border-b-2 transition-all ' + (activeTab === 'reviews' ? 'border-[#7D5A34] text-[#7D5A34]' : 'border-transparent text-[#7A6B5B] hover:text-[#222E22]')}
            >
              Reviews ({reviews.length})
            </button>
          </div>

          <div className="pt-2">
            {activeTab === 'benefits' && (
              <div className="space-y-4">
                <h3 className="font-brand text-lg font-bold text-[#222E22]">Traditional Ayurvedic Indications</h3>
                <ul className="space-y-2.5">
                  {product.ayurvedicBenefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-editorial text-base sm:text-lg text-[#473B2E]">
                      <span className="w-5 h-5 rounded-full bg-[#E5D7C2] text-[#7D5A34] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-4 bg-[#F2EADA] rounded-2xl border border-[#DECDB3] text-xs font-ui text-[#6B5A46] italic">
                  <strong>Ayurvedic Context:</strong> {product.disclaimer}
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-4">
                <h3 className="font-brand text-lg font-bold text-[#222E22]">100% Disclosed Ingredients</h3>
                <p className="font-editorial text-base sm:text-lg text-[#473B2E] leading-relaxed">
                  {product.ingredients}
                </p>
                <div className="p-4 bg-[#F4EDE2] rounded-2xl border border-[#DECDB3] space-y-1">
                  <h4 className="font-ui text-xs font-bold uppercase tracking-wider text-[#7D5A34]">Purity Assurance</h4>
                  <p className="font-ui text-xs text-[#5C4F40]">Zero synthetic perfumes, no petrochemicals, no artificial thickening gums, no parabens.</p>
                </div>
              </div>
            )}

            {activeTab === 'howToUse' && (
              <div className="space-y-4">
                <h3 className="font-brand text-lg font-bold text-[#222E22]">The Application Ritual</h3>
                <p className="font-editorial text-base sm:text-lg text-[#473B2E] leading-relaxed">
                  {product.howToUse}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-[#F4EDE2] rounded-2xl border border-[#DECDB3]">
                    <span className="font-ui text-xs font-bold uppercase text-[#7D5A34] block mb-1">Recommended Consistency</span>
                    <span className="font-ui text-xs text-[#524436]">Follow with pure cold water rinse. Do not use chemical foaming soap immediately after ubtan.</span>
                  </div>
                  <div className="p-4 bg-[#F4EDE2] rounded-2xl border border-[#DECDB3]">
                    <span className="font-ui text-xs font-bold uppercase text-[#7D5A34] block mb-1">Ritual Rhythm</span>
                    <span className="font-ui text-xs text-[#524436]">Best applied during classical morning snana or quiet evening unwind.</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sustainability' && (
              <div className="space-y-4">
                <h3 className="font-brand text-lg font-bold text-[#222E22]">Biodegradable Packaging Philosophy</h3>
                <p className="font-editorial text-base sm:text-lg text-[#473B2E] leading-relaxed">
                  {product.packagingDetails}
                </p>
                <div className="p-4 bg-[#F0E6D5] rounded-2xl border border-[#D5C4A7] space-y-1">
                  <h4 className="font-ui text-xs font-bold uppercase tracking-wider text-[#2D3E2F]">Responsible Earth Commitment</h4>
                  <p className="font-editorial text-base text-[#473A2B]">{product.sustainabilityInfo}</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#DECDB3]">
                  <div>
                    <h3 className="font-brand text-lg font-bold text-[#222E22]">Verified Patron Experiences</h3>
                    <div className="flex items-center gap-1 text-[#C9A24D] font-bold text-xs font-ui mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-[#C9A24D]" /> {product.rating} average based on {reviews.length} experiences
                    </div>
                  </div>
                  <button
                    onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
                    className="px-4 py-2 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-[11px] uppercase tracking-wider font-semibold transition-all shadow-sm"
                  >
                    {isReviewFormOpen ? 'Close Form' : '✍️ Write an Experience'}
                  </button>
                </div>

                {isReviewFormOpen && (
                  <form onSubmit={handleReviewSubmit} className="p-4 sm:p-5 bg-[#F4EDE2] border border-[#DECDB3] rounded-2xl space-y-3 font-ui text-xs">
                    <h4 className="font-brand font-bold text-sm text-[#222E22]">Share Your Authentic Experience</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">Your Name *</label>
                        <input
                          required
                          type="text"
                          value={revAuthor}
                          onChange={(e) => setRevAuthor(e.target.value)}
                          placeholder="e.g. Pooja Kulkarni"
                          className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#DECDB3] text-xs focus:outline-none focus:border-[#7D5A34]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">Ayurvedic Rating (1 to 5 Stars)</label>
                        <select
                          value={revRating}
                          onChange={(e) => setRevRating(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#DECDB3] text-xs focus:outline-none focus:border-[#7D5A34] cursor-pointer"
                        >
                          <option value={5}>⭐⭐⭐⭐⭐ (5 - Divine formulation)</option>
                          <option value={4.9}>⭐⭐⭐⭐⭐ (4.9 - Highly recommend)</option>
                          <option value={4}>⭐⭐⭐⭐ (4 - Very good)</option>
                          <option value={3}>⭐⭐⭐ (3 - Satisfactory)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">Your Experience / Botanical Review *</label>
                      <textarea
                        required
                        rows={3}
                        value={revComment}
                        onChange={(e) => setRevComment(e.target.value)}
                        placeholder="Describe how the formulation felt on your skin..."
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#DECDB3] text-xs focus:outline-none focus:border-[#7D5A34]"
                      />
                    </div>
                    <button
                      disabled={isSubmittingReview}
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[#7D5A34] hover:bg-[#684928] text-white font-ui text-[11px] uppercase tracking-wider font-bold transition-all shadow-sm disabled:opacity-50"
                    >
                      {isSubmittingReview ? 'Submitting to Supabase...' : 'Submit Review'}
                    </button>
                  </form>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-[#F5ECE0] border border-[#DECDB3] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-brand font-bold text-[#222E22]">{rev.author}</span>
                        <span className="font-ui text-[10px] text-[#8A7966]">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#C9A24D] text-[#C9A24D]" />
                        ))}
                        {rev.verified && (
                          <span className="ml-2 font-ui text-[9px] uppercase tracking-wider text-[#2D3E2F] font-bold flex items-center gap-0.5">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Verified Patron
                          </span>
                        )}
                      </div>
                      <p className="font-editorial text-sm sm:text-base text-[#4C4033] leading-relaxed">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Formulations Carousel/Grid */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="text-center space-y-1">
              <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#7D5A34] font-bold">Holistic Ritual Pairs</span>
              <h2 className="font-brand text-2xl sm:text-3xl font-bold text-[#202E22]">You May Also Revere</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.slice(0, 3).map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => { onSelectProduct(rel); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="bg-[#F8F5EE] border border-[#DECDB3] hover:border-[#8E6E45] p-5 rounded-3xl cursor-pointer transition-all hover:shadow-lg space-y-3 group"
                >
                  <div className="h-44 bg-[#F2EADB] rounded-2xl flex items-center justify-center p-3">
                    <img src={rel.image} alt={rel.name} className="max-h-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <span className="font-ui text-[9px] font-bold uppercase tracking-wider text-[#7D5A34]">{rel.category}</span>
                    <h4 className="font-brand text-sm font-bold text-[#222E22] group-hover:text-[#7D5A34] line-clamp-1">{rel.name}</h4>
                    <p className="font-brand text-base font-bold text-[#202E22] mt-1">₹{rel.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};