'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Product, CartItem, Order, ViewType, UserProfile } from '../types';
import { INITIAL_PRODUCTS } from '../initialData';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { BrandStory } from '../components/BrandStory';
import { PhilosophySection } from '../components/PhilosophySection';
import { SustainablePackaging } from '../components/SustainablePackaging';
import { TraditionalMethods } from '../components/TraditionalMethods';
import { AuthenticitySection } from '../components/AuthenticitySection';
import { ProductCard } from '../components/ProductCard';
import { ProductsPage } from '../components/ProductsPage';
import { ProductDetailPage } from '../components/ProductDetailPage';
import { OurStoryPage } from '../components/OurStoryPage';
import { AyurvedaPage } from '../components/AyurvedaPage';
import { SustainabilityPage } from '../components/SustainabilityPage';
import { ContactPage } from '../components/ContactPage';
import { FAQPage } from '../components/FAQPage';
import { WishlistPage } from '../components/WishlistPage';
import { AccountPage } from '../components/AccountPage';
import { PolicyPage } from '../components/PolicyPage';
import { CartDrawer } from '../components/CartDrawer';
import { ProductModal } from '../components/ProductModal';
import { CheckoutModal } from '../components/CheckoutModal';
import { SearchModal } from '../components/SearchModal';
import { AdminPortal } from '../components/AdminPortal';
import { ShipmentTracker } from '../components/ShipmentTracker';
import { SplashScreen } from '../components/SplashScreen';
import { AuthModal } from '../components/AuthModal';
import { Footer } from '../components/Footer';
import { Check, ArrowRight, Star, ShieldCheck, Mail, Send, ChevronRight, Truck, Sparkles } from 'lucide-react';

export default function ShritejAyurvedaApp() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Auth & User State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Splash Screen State
  const [showSplash, setShowSplash] = useState(true);

  // Announcement Bar Text
  const [announcementText, setAnnouncementText] = useState(
    'ðŸŒ¿ Complimentary Kannauj Rose Mist with all orders above â‚¹999 | Free Plastic-Free Express Shipping Pan-India'
  );

  // View Router State
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [catalogueInitialCategory, setCatalogueInitialCategory] = useState<string>('All');
  const [catalogueInitialSearch, setCatalogueInitialSearch] = useState<string>('');
  const [trackedOrderId, setTrackedOrderId] = useState<string | undefined>(undefined);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewInitialTab, setQuickViewInitialTab] = useState<'overview' | 'reviews'>('overview');

  // Checkout Success notification
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const c = localStorage.getItem('shritej_cart');
      if (c) setCart(JSON.parse(c));
      const w = localStorage.getItem('shritej_wishlist');
      if (w) setWishlist(JSON.parse(w));
      const o = localStorage.getItem('shritej_orders');
      if (o) setOrders(JSON.parse(o));
      const u = localStorage.getItem('shritej_user');
      if (u) setCurrentUser(JSON.parse(u));
      const a = localStorage.getItem('shritej_announcement');
      if (a) setAnnouncementText(a);
    } catch (e) {}
  }, []);

  // Save to local storage
  useEffect(() => { localStorage.setItem('shritej_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('shritej_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('shritej_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('shritej_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // Read ?view= query param if opened directly
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('view') as ViewType | null;
      if (v) setActiveView(v);
    } catch (e) {}
  }, []);

  // View Navigation Handlers
  const handleNavigate = (view: ViewType, category?: string) => {
    if (category) {
      setCatalogueInitialCategory(category);
    } else {
      setCatalogueInitialCategory('All');
    }
    setCatalogueInitialSearch('');
    setActiveView(view);
    try {
      const url = view === 'home' ? '/' : '/?view=' + view;
      window.history.pushState({ view }, '', url);
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductDetail = (p: Product) => {
    setSelectedProduct(p);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickView = (p: Product, tab: 'overview' | 'reviews' = 'overview') => {
    setQuickViewProduct(p);
    setQuickViewInitialTab(tab);
  };

  // Cart operations
  const handleAddToCart = (product: Product, qty: number = 1) => {
    if (product.stock === 0) return;
    setCart((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (product: Product, qty: number = 1) => {
    if (product.stock === 0) return;
    setCart((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  };

  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Order Complete
  const handleOrderComplete = (orderDetails: {
    name: string;
    email: string;
    phone: string;
    address: {
      address: string;
      apartment?: string;
      city: string;
      state: string;
      pincode: string;
    };
    paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
    paymentId?: string;
  }) => {
    const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
    const orderNum = 'ORD-' + Date.now().toString().slice(-6);
    const newOrder: Order = {
      id: orderNum,
      date: new Date().toISOString(),
      customerName: orderDetails.name,
      customerEmail: orderDetails.email,
      customerPhone: orderDetails.phone,
      items: [...cart],
      subtotal,
      discount: 0,
      shipping: 0,
      totalAmount: subtotal,
      status: 'Processing',
      shippingAddress: orderDetails.address,
      paymentMethod: orderDetails.paymentMethod,
      estimatedDelivery: '3 to 5 business days',
      awbNumber: 'STA-' + orderNum.replace(/\D/g, ''),
      courier: 'Blue Dart Express',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setIsCheckoutOpen(false);
    setConfirmedOrder(newOrder);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Sync to Supabase
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    }).catch(() => {});

    try {
      confetti({ particleCount: 140, spread: 85, origin: { y: 0.6 } });
    } catch (e) {}
  };

  // Admin Operations
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedProduct && selectedProduct.id === updated.id) {
      setSelectedProduct(updated);
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct(null);
    }
  };

  const handleUpdateOrderStatus = (
    orderId: string,
    newStatus: 'Processing' | 'Packed' | 'Shipped' | 'Delivered',
    awb?: string,
    courier?: string
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            status: newStatus,
            awbNumber: awb || o.awbNumber,
            courier: courier || o.courier,
          };
        }
        return o;
      })
    );
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('shritej_user');
      localStorage.removeItem('shritej_admin_auth');
    } catch (e) {}
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setNewsletterSuccess(true);
      fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      }).catch(() => {});
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#2C2723] flex flex-col justify-between selection:bg-[#C9A24D]/30">
      <div>
        
        {/* Top Storewide Announcement Banner */}
        <div className="bg-[#2D3E2F] text-[#FAF7F2] py-2 px-4 text-center font-ui text-[10px] sm:text-[11px] tracking-widest uppercase font-semibold flex items-center justify-center gap-2 border-b border-[#3D523F]">
          <span>{announcementText}</span>
        </div>

        {/* Sticky Header / Navigation */}
        <Navbar
          cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
          wishlistCount={wishlist.length}
          activeView={activeView}
          onNavigate={handleNavigate}
          openCart={() => setIsCartOpen(true)}
          onSearchOpen={() => setIsSearchOpen(true)}
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
        />

        {/* Order Placed Confirmation Toast / Banner */}
        {confirmedOrder && (
          <div className="max-w-4xl mx-auto my-6 p-6 sm:p-8 bg-[#EBE4D5] border-2 border-[#7D5A34]/60 rounded-3xl text-[#2E2419] shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D5C2A4] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#2D3E2F] text-white flex items-center justify-center font-bold shrink-0">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-ui text-[10px] uppercase tracking-wider text-[#7D5A34] font-bold">Order Confirmed</span>
                  <h3 className="font-brand font-bold text-xl text-[#222E22]">Thank you for your order!</h3>
                  <p className="font-ui text-xs text-[#5C4F40]">Consignment ID: <strong>#{confirmedOrder.id}</strong></p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setTrackedOrderId(confirmedOrder.id);
                    handleNavigate('track-order');
                  }}
                  className="px-4 py-2 rounded-full bg-[#2D3E2F] text-white text-xs font-ui uppercase font-semibold flex items-center gap-1.5"
                >
                  <Truck className="w-3.5 h-3.5" /> Track Live
                </button>
                <button
                  onClick={() => setConfirmedOrder(null)}
                  className="px-4 py-2 rounded-full border border-[#9A8162] text-xs font-ui uppercase font-semibold hover:bg-[#FAF7F2]"
                >
                  Dismiss
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-ui text-[#4E4032]">
              <div>
                <span className="font-bold text-[#222E22] block mb-0.5">Patron:</span>
                <p>{confirmedOrder.customerName}</p>
                <p>{confirmedOrder.customerEmail}</p>
                <p>{confirmedOrder.customerPhone}</p>
              </div>
              <div>
                <span className="font-bold text-[#222E22] block mb-0.5">Shipping Destination:</span>
                <p>{confirmedOrder.shippingAddress.address}, {confirmedOrder.shippingAddress.city}</p>
                <p>{confirmedOrder.shippingAddress.state} - {confirmedOrder.shippingAddress.pincode}</p>
              </div>
              <div>
                <span className="font-bold text-[#222E22] block mb-0.5">Summary:</span>
                <p>Items: {confirmedOrder.items.length} formulations</p>
                <p>Total Paid: <strong className="font-brand text-sm text-[#7D5A34]">â‚¹{confirmedOrder.totalAmount}</strong></p>
                <p className="text-[#2D3E2F] font-semibold mt-1">Est. Arrival: {confirmedOrder.estimatedDelivery}</p>
              </div>
            </div>
          </div>
        )}

        {/* View Router */}
        {activeView === 'home' && (
          <div>
            <Hero
              onExplore={() => handleNavigate('products')}
              onStory={() => handleNavigate('story')}
              onAyurveda={() => handleNavigate('ayurveda')}
            />

            <section className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#E3DAC8]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                  <span className="font-ui text-xs uppercase tracking-[0.3em] text-[#7D5A34] font-bold block">
                    Sacred Apothecary
                  </span>
                  <h2 className="font-brand text-3xl sm:text-5xl font-bold tracking-[0.06em] text-[#202E22]">
                    Featured Ayurvedic Formulations
                  </h2>
                  <p className="font-editorial text-lg sm:text-xl text-[#594B3C] max-w-2xl mx-auto leading-relaxed">
                    Handcrafted with potent botanicals, cold-pressed seed oils, and steam hydrosols inspired by classical Indian wellness.
                  </p>
                  <div className="w-16 h-0.5 bg-[#8E6E45] mx-auto mt-2"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.slice(0, 3).map((prod) => (
                    <div key={prod.id} className="flex flex-col">
                      <ProductCard
                        product={prod}
                        onAddToCart={handleAddToCart}
                        onViewDetails={handleQuickView}
                        isWishlisted={wishlist.includes(prod.id)}
                        onToggleWishlist={handleToggleWishlist}
                      />
                      <div className="mt-2.5 flex items-center gap-2">
                        {prod.stock > 0 ? (
                          <button
                            onClick={() => handleBuyNow(prod)}
                            className="flex-1 py-2 rounded-full bg-[#7D5A34] hover:bg-[#684928] text-white font-ui text-[10px] sm:text-[11px] uppercase tracking-wider font-bold transition-all shadow-sm text-center"
                          >
                            âš¡ Buy Now
                          </button>
                        ) : (
                          <button
                            disabled
                            className="flex-1 py-2 rounded-full bg-neutral-200 text-neutral-500 font-ui text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-center cursor-not-allowed"
                          >
                            Sold Out
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenProductDetail(prod)}
                          className="px-4 py-2 rounded-full border border-[#B5A187] hover:border-[#7D5A34] text-[#473A2D] font-ui text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold hover:bg-[#FAF7F2] transition-all"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-4">
                  <button
                    onClick={() => handleNavigate('products')}
                    className="px-8 py-4 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-[0.25em] font-semibold transition-all shadow-md inline-flex items-center gap-2"
                  >
                    Explore Complete Catalogue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            <BrandStory />
            <PhilosophySection />

            <section className="py-16 bg-[#F4EDE2] border-b border-[#DECDB3]">
              <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
                <span className="font-ui text-xs uppercase tracking-[0.3em] text-[#7D5A34] font-bold block">
                  Vedic Living
                </span>
                <h3 className="font-brand text-2xl sm:text-4xl font-bold text-[#222E22]">
                  The Living Wisdom of Tridoshas
                </h3>
                <p className="font-editorial text-lg text-[#594B3C] max-w-xl mx-auto">
                  Learn how authentic Ayurveda balances Vata, Pitta, and Kapha energies through mindful daily rituals.
                </p>
                <button
                  onClick={() => handleNavigate('ayurveda')}
                  className="mt-2 px-7 py-3.5 rounded-full border border-[#7D5A34] text-[#4E3922] font-ui text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#EAE0D0] transition-all inline-flex items-center gap-2"
                >
                  Discover Ayurveda <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            <SustainablePackaging />
            <TraditionalMethods />
            <AuthenticitySection />

            <section className="py-20 bg-[#FAF7F2] border-b border-[#DECDB3]">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <span className="font-ui text-xs uppercase tracking-[0.3em] text-[#7D5A34] font-bold block">
                  Sacred Chronicle
                </span>
                <h3 className="font-brand text-3xl sm:text-4xl font-bold text-[#222E22]">
                  Join the Ayurvedic Sanctuary
                </h3>
                <p className="font-editorial text-lg text-[#594B3C] max-w-xl mx-auto leading-relaxed">
                  Receive classical Ayurvedic seasonal wisdom and early access to micro-batch harvests.
                </p>

                {newsletterSuccess ? (
                  <div className="p-4 bg-[#E2EBDD] text-[#2D3E2F] rounded-2xl border border-[#C5D9BE] font-ui text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" /> Welcome to the SHRiTEJ Sanctuary.
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex items-center gap-2">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-[#8A7966] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        required
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Enter your email address..."
                        className="w-full pl-10 pr-4 py-3.5 rounded-full bg-[#F3ECE0] border border-[#DECDB3] text-xs font-ui text-[#222E22] focus:outline-none focus:border-[#7D5A34]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3.5 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-wider font-semibold transition-all shadow-md shrink-0 flex items-center gap-1.5"
                    >
                      Subscribe <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </section>
          </div>
        )}

        {/* Dedicated Products Catalogue View */}
        {activeView === 'products' && (
          <ProductsPage
            products={products}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onViewDetails={handleOpenProductDetail}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            initialCategory={catalogueInitialCategory}
            initialSearch={catalogueInitialSearch}
          />
        )}

        {/* Dedicated Product Detail View */}
        {activeView === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => handleNavigate('products')}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            isWishlisted={wishlist.includes(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            relatedProducts={products.filter((p) => p.id !== selectedProduct.id)}
            onSelectProduct={handleOpenProductDetail}
          />
        )}

        {/* Dedicated Our Story Page */}
        {activeView === 'story' && (
          <OurStoryPage
            onShopClick={() => handleNavigate('products')}
            onAyurvedaClick={() => handleNavigate('ayurveda')}
          />
        )}

        {/* Dedicated Ayurveda Page */}
        {activeView === 'ayurveda' && (
          <AyurvedaPage
            onShopClick={() => handleNavigate('products')}
          />
        )}

        {/* Dedicated Sustainability Page */}
        {activeView === 'sustainability' && (
          <SustainabilityPage
            onShopClick={() => handleNavigate('products')}
          />
        )}

        {/* Dedicated Contact Page */}
        {activeView === 'contact' && (
          <ContactPage />
        )}

        {/* Dedicated FAQ Page */}
        {activeView === 'faq' && (
          <FAQPage
            onContactClick={() => handleNavigate('contact')}
          />
        )}

        {/* Dedicated Wishlist View */}
        {activeView === 'wishlist' && (
          <WishlistPage
            products={products}
            wishlistIds={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onViewProduct={handleOpenProductDetail}
            onBrowseCatalogue={() => handleNavigate('products')}
          />
        )}

        {/* Dedicated Account / Patron View */}
        {activeView === 'account' && (
          <AccountPage
            orders={orders}
            onBrowseCatalogue={() => handleNavigate('products')}
            onTrackOrder={(id) => {
              setTrackedOrderId(id);
              handleNavigate('track-order');
            }}
            currentUser={currentUser}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onLogout={handleLogout}
          />
        )}

        {/* Dedicated Shipment Tracker View */}
        {activeView === 'track-order' && (
          <ShipmentTracker
            orders={orders}
            onBrowse={() => handleNavigate('products')}
            onClose={() => handleNavigate('home')}
            initialOrderId={trackedOrderId}
          />
        )}

        {/* Dedicated Admin Portal View */}
        {activeView === 'admin' && (
          <AdminPortal
            products={products}
            orders={orders}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onClose={() => handleNavigate('home')}
            announcementText={announcementText}
            onUpdateAnnouncement={(t) => {
              setAnnouncementText(t);
              try { localStorage.setItem('shritej_announcement', t); } catch (e) {}
            }}
          />
        )}

        {/* Policy & Legal Views */}
        {(activeView === 'privacy' ||
          activeView === 'terms' ||
          activeView === 'shipping-policy' ||
          activeView === 'returns-policy' ||
          activeView === 'disclaimer') && (
          <PolicyPage
            type={activeView}
            onBack={() => handleNavigate('home')}
          />
        )}

      </div>

      {/* Global Comprehensive Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Splash Screen */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}

      {/* Google / Email Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          try { localStorage.setItem('shritej_user', JSON.stringify(user)); } catch (e) {}
        }}
        onOpenAdminPortal={() => handleNavigate('admin')}
      />

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => setIsCheckoutOpen(true)}
        onBrowseCatalogue={() => handleNavigate('products')}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onComplete={handleOrderComplete}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => {
          setIsSearchOpen(false);
          handleOpenProductDetail(p);
        }}
        onViewAllResults={(q) => {
          setIsSearchOpen(false);
          setCatalogueInitialSearch(q);
          handleNavigate('products');
        }}
      />

      <ProductModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        initialTab={quickViewInitialTab}
      />

    </div>
  );
}
