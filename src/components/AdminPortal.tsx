import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Package, CheckCircle2, Clock, Truck, ShieldCheck, Mail, Database, 
  RefreshCw, X, ArrowRight, Eye, AlertCircle, Lock, LogOut, Check, Search, Filter, 
  MessageSquare, Star, Settings, ExternalLink, Save, ToggleLeft, ToggleRight
} from 'lucide-react';
import { Product, Order } from '../types';

interface AdminPortalProps {
  products: Product[];
  orders: Order[];
  onAddProduct: (newProd: Product) => void;
  onUpdateProduct: (updatedProd: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: 'Processing' | 'Packed' | 'Shipped' | 'Delivered', awb?: string, courier?: string) => void;
  onClose: () => void;
  announcementText?: string;
  onUpdateAnnouncement?: (text: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  products,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onClose,
  announcementText = '🌿 Complimentary Kannauj Rose Mist with orders above ₹999 | Free Plastic-Free Express Shipping',
  onUpdateAnnouncement,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'database' | 'settings'>('products');
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formName, setFormName] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formPrice, setFormPrice] = useState(299);
  const [formOriginalPrice, setFormOriginalPrice] = useState(449);
  const [formCategory, setFormCategory] = useState('Ubtan & Lepa');
  const [formStock, setFormStock] = useState(50);
  const [formImage, setFormImage] = useState('/images/shritej-ubtan.jpg');
  const [formDesc, setFormDesc] = useState('');
  const [formIngredients, setFormIngredients] = useState('');
  const [formQuantity, setFormQuantity] = useState('100g');
  const [formSku, setFormSku] = useState('STA-NEW-100');
  const [formIsAvailable, setFormIsAvailable] = useState(true);

  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'All' | 'Processing' | 'Packed' | 'Shipped' | 'Delivered'>('All');
  const [editingOrderAwb, setEditingOrderAwb] = useState<{ [orderId: string]: { awb: string; courier: string } }>({});

  const [dbStatus, setDbStatus] = useState<any>(null);
  const [isCheckingDb, setIsCheckingDb] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState('');

  const [currentAnnouncement, setCurrentAnnouncement] = useState(announcementText);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(499);
  const [isCodEnabled, setIsCodEnabled] = useState(true);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const CATEGORIES = ['All', 'Ubtan & Lepa', 'Toners & Mists', 'Bathing Rituals', 'Combos & Kits', 'Facial Oils'];
  const COURIERS = ['Blue Dart Express', 'Delhivery Express', 'DTDC Prime', 'India Post Speed'];

  useEffect(() => {
    try {
      const auth = localStorage.getItem('shritej_admin_auth');
      if (auth === 'true') setIsAuthenticated(true);
    } catch (e) {}
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanEmail = adminEmail.trim().toLowerCase();
    const cleanPassword = adminPassword.trim();

    const isValidAdminEmail = (
      cleanEmail === 'admin@shritejayurveda.com' ||
      cleanEmail === 'administrator@shritejayurveda.com' ||
      cleanEmail === 'mahesh@shritejayurveda.com'
    );
    const isValidAdminPassword = cleanPassword === 'shritej@2026';

    if (isValidAdminEmail && isValidAdminPassword) {
      setIsAuthenticated(true);
      setLoginError('');
      try { localStorage.setItem('shritej_admin_auth', 'true'); } catch (e) {}
    } else {
      setLoginError('Access Denied: Invalid administrator email or master security password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminEmail('');
    setAdminPassword('');
    setLoginError('');
    try { localStorage.removeItem('shritej_admin_auth'); } catch (e) {}
  };

  const checkDatabaseHealth = async () => {
    setIsCheckingDb(true);
    try {
      const res = await fetch('/api/db-status');
      const data = await res.json();
      setDbStatus(data);
    } catch (e) {
      setDbStatus({ error: 'DB status check note' });
    } finally {
      setIsCheckingDb(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && activeTab === 'database') {
      checkDatabaseHealth();
    }
  }, [isAuthenticated, activeTab]);

  // Product status toggle: Available <-> Out of Stock
  const handleToggleProductStatus = (product: Product) => {
    const isCurrentlyOut = product.stock === 0;
    const newStock = isCurrentlyOut ? 50 : 0;
    const updated = { ...product, stock: newStock };
    onUpdateProduct(updated);
    setSyncFeedback(product.name + (newStock > 0 ? ' is now marked AVAILABLE (In Stock: 50)' : ' is now marked OUT OF STOCK'));
    setTimeout(() => setSyncFeedback(''), 3000);
    fetch('/api/products', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch(() => {});
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormName('');
    setFormTagline('');
    setFormPrice(299);
    setFormOriginalPrice(449);
    setFormCategory('Ubtan & Lepa');
    setFormStock(50);
    setFormIsAvailable(true);
    setFormImage('/images/shritej-ubtan.jpg');
    setFormDesc('');
    setFormIngredients('');
    setFormQuantity('100g');
    setFormSku('STA-NEW-' + Math.floor(100 + Math.random() * 900));
    setIsFormOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormTagline(p.tagline);
    setFormPrice(p.price);
    setFormOriginalPrice(p.originalPrice || Math.round(p.price * 1.4));
    setFormCategory(p.category);
    setFormStock(p.stock);
    setFormIsAvailable(p.stock > 0);
    setFormImage(p.image);
    setFormDesc(p.description);
    setFormIngredients(p.ingredients);
    setFormQuantity(p.netQuantity);
    setFormSku(p.sku);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;
    const effectiveStock = formIsAvailable ? Math.max(1, formStock) : 0;

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: formName.trim(),
        tagline: formTagline.trim(),
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        category: formCategory,
        stock: Number(effectiveStock),
        image: formImage.trim() || editingProduct.image,
        description: formDesc.trim() || editingProduct.description,
        ingredients: formIngredients.trim() || editingProduct.ingredients,
        netQuantity: formQuantity.trim() || editingProduct.netQuantity,
        sku: formSku.trim() || editingProduct.sku,
      };
      onUpdateProduct(updated);
      fetch('/api/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      }).catch(() => {});
    } else {
      const newProd: Product = {
        id: 'prod-' + Date.now(),
        name: formName.trim(),
        tagline: formTagline.trim(),
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        rating: 5.0,
        reviewsCount: 1,
        category: formCategory,
        image: formImage.trim() || '/images/shritej-ubtan.jpg',
        stock: Number(effectiveStock),
        isFeatured: true,
        isNewArrival: true,
        description: formDesc.trim() || 'Authentic traditional Ayurvedic formulation.',
        ingredients: formIngredients.trim() || 'Pure Ayurvedic Botanicals.',
        ayurvedicBenefits: ['Harmonizes Doshas', '100% Native Pure Botanical'],
        howToUse: 'Apply gently as recommended.',
        suitableFor: 'All Dosha & Skin Types',
        netQuantity: formQuantity.trim() || '100g',
        shelfLife: '24 Months',
        storage: 'Cool dry place',
        packagingDetails: 'Plastic-free recyclable apothecary packaging',
        sustainabilityInfo: '100% Biodegradable',
        disclaimer: 'Classical Ayurvedic formulation.',
        sku: formSku.trim() || ('STA-NEW-' + Date.now().toString().slice(-4)),
        weight: '150g',
        specs: { Category: formCategory },
      };
      onAddProduct(newProd);
      fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProd),
      }).catch(() => {});
    }
    setIsFormOpen(false);
  };

  const handleSaveOrderAwb = (order: Order) => {
    const custom = editingOrderAwb[order.id];
    const awb = custom?.awb || order.awbNumber || ('STA-' + order.id.replace(/\D/g, '').slice(-6));
    const courier = custom?.courier || order.courier || 'Blue Dart Express';
    onUpdateOrderStatus(order.id, order.status, awb, courier);
    setSyncFeedback('Saved dispatch details for ' + order.id + ': ' + courier + ' (' + awb + ')');
    setTimeout(() => setSyncFeedback(''), 3000);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.category.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = orderStatusFilter === 'All' || o.status === orderStatusFilter;
    const matchesSearch = 
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerPhone.includes(orderSearch);
    return matchesFilter && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl max-w-md w-full p-8 sm:p-10 shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-[#2D3E2F] text-[#E8DFD0] flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-8 h-8" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE6D6] text-[#7D5A34] font-ui text-[10px] tracking-[0.25em] uppercase font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Super Admin Portal</span>
            </div>
            <h1 className="font-brand text-2xl sm:text-3xl font-bold text-[#222E22]">
              SHRITEJ AYURVED
            </h1>
            <p className="font-editorial text-xs sm:text-sm text-[#6A5947]">
              Central administration, inventory, and logistics console
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-ui flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 font-ui text-xs">
            <div>
              <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">
                Administrator Email
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="Enter administrator email"
                autoComplete="username"
                className="w-full px-4 py-3 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">
                Master Security Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter master security password"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6B5B] hover:text-[#222E22]"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md flex items-center justify-center gap-2"
            >
              Authenticate &amp; Enter Console <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-[#DECDB3] text-center space-y-3">
            
            <button
              onClick={onClose}
              type="button"
              className="text-xs text-[#7A6B5B] hover:text-[#222E22] underline"
            >
              Return to Customer Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#2D3E2F] text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-7 h-7 text-[#E8DFD0]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-brand text-xl sm:text-2xl font-bold text-[#222E22]">
                  SHRITEJ Central Console
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E3EBDC] text-[#2D3E2F] font-ui text-[10px] font-bold uppercase tracking-wider">
                  Super Admin Live
                </span>
              </div>
              <p className="font-ui text-xs text-[#7A6B5B]">
                Full store catalog control, real-time dispatch management, and stock availability toggle
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-full bg-[#F4EDE2] hover:bg-[#EAE0D0] border border-[#DECDB3] text-xs font-ui font-semibold uppercase tracking-wider text-[#453A2D] transition-all flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Storefront
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-full bg-[#FAF7F2] hover:bg-rose-50 border border-rose-200 text-xs font-ui font-semibold uppercase tracking-wider text-rose-700 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>

        {syncFeedback && (
          <div className="p-3 bg-[#E3EBDC] border border-[#C5D8B8] rounded-2xl text-[#2D3E2F] text-xs font-ui font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{syncFeedback}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#DECDB3] pb-2 font-ui text-xs uppercase tracking-wider font-bold">
          <button
            onClick={() => setActiveTab('products')}
            className={
              'px-5 py-2.5 rounded-2xl transition-all ' +
              (activeTab === 'products' ? 'bg-[#2D3E2F] text-white shadow-sm' : 'bg-[#F4EDE2] text-[#554636] hover:bg-[#EAE0D0]')
            }
          >
            📦 Products &amp; Stock ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={
              'px-5 py-2.5 rounded-2xl transition-all ' +
              (activeTab === 'orders' ? 'bg-[#2D3E2F] text-white shadow-sm' : 'bg-[#F4EDE2] text-[#554636] hover:bg-[#EAE0D0]')
            }
          >
            🚚 Shipments &amp; Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={
              'px-5 py-2.5 rounded-2xl transition-all ' +
              (activeTab === 'database' ? 'bg-[#2D3E2F] text-white shadow-sm' : 'bg-[#F4EDE2] text-[#554636] hover:bg-[#EAE0D0]')
            }
          >
            🗄️ Supabase DB Health
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={
              'px-5 py-2.5 rounded-2xl transition-all ' +
              (activeTab === 'settings' ? 'bg-[#2D3E2F] text-white shadow-sm' : 'bg-[#F4EDE2] text-[#554636] hover:bg-[#EAE0D0]')
            }
          >
            ⚙️ Storefront Banners
          </button>
        </div>

        {/* TAB 1: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <div className="relative min-w-[220px] flex-1">
                  <Search className="w-4 h-4 text-[#8A7966] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search product by name or category..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-xs font-ui text-[#222E22] focus:border-[#7D5A34] focus:outline-none"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-xs font-ui text-[#222E22]"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleOpenAdd}
                className="px-5 py-2.5 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-wider font-semibold transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" /> Add New Formulation
              </button>
            </div>

            <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-ui text-xs">
                  <thead className="bg-[#EFE6D6] border-b border-[#DECDB3] text-[#453A2D] uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4">Formulation</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Price / MRP</th>
                      <th className="py-3.5 px-4 text-center">Availability Status</th>
                      <th className="py-3.5 px-4 text-center">Live Units</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DECDB3]">
                    {filteredProducts.map((p) => {
                      const isOutOfStock = p.stock === 0;
                      return (
                        <tr key={p.id} className="hover:bg-[#F4EDE2]/60 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <img src={p.image} alt={p.name} className="w-12 h-12 object-contain rounded-xl bg-white border border-[#DECDB3] p-1 shrink-0" />
                              <div className="max-w-xs">
                                <span className="font-brand text-sm font-bold text-[#222E22] block">{p.name}</span>
                                <span className="text-[11px] text-[#7A6B5B] block truncate">{p.tagline}</span>
                                <span className="text-[10px] text-[#8E7E6D] font-mono">SKU: {p.sku} • {p.netQuantity}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-semibold text-[#554636]">
                            {p.category}
                          </td>
                          <td className="py-4 px-4">
                            <strong className="text-sm font-brand text-[#7D5A34]">₹{p.price}</strong>
                            {p.originalPrice && (
                              <span className="text-[10px] text-[#8E7E6D] line-through block">₹{p.originalPrice}</span>
                            )}
                          </td>
                          
                          {/* Admin Product Status Toggle: In Stock vs Out of Stock */}
                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={() => handleToggleProductStatus(p)}
                              className={
                                'px-3 py-1.5 rounded-full font-ui text-[11px] font-bold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5 mx-auto ' +
                                (isOutOfStock
                                  ? 'bg-rose-100 text-rose-700 border border-rose-300 hover:bg-rose-200'
                                  : 'bg-[#E3EBDC] text-[#2D3E2F] border border-[#C5D8B8] hover:bg-[#D5E3CC]')
                              }
                              title={isOutOfStock ? 'Click to make Available' : 'Click to make Out of Stock'}
                            >
                              {isOutOfStock ? (
                                <>
                                  <span className="w-2 h-2 rounded-full bg-rose-600 inline-block"></span>
                                  <span>Out of Stock</span>
                                </>
                              ) : (
                                <>
                                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
                                  <span>Available</span>
                                </>
                              )}
                            </button>
                          </td>

                          {/* Stock Counter */}
                          <td className="py-4 px-4 text-center">
                            <span className={'font-mono font-bold text-xs ' + (isOutOfStock ? 'text-rose-600' : 'text-[#2D3E2F]')}>
                              {p.stock} units
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={() => handleOpenEdit(p)}
                                className="p-2 rounded-lg bg-[#F4EDE2] hover:bg-[#EAE0D0] text-[#7D5A34] transition-colors"
                                title="Edit Formulation"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm('Delete ' + p.name + '?')) onDeleteProduct(p.id);
                                }}
                                className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                                title="Delete Formulation"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SHIPMENTS & ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <div className="relative min-w-[240px] flex-1">
                  <Search className="w-4 h-4 text-[#8A7966] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search order ID, customer name, phone, or email..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-xs font-ui text-[#222E22] focus:border-[#7D5A34] focus:outline-none"
                  />
                </div>
                
                <div className="flex flex-wrap gap-1.5 font-ui text-xs">
                  {(['All', 'Processing', 'Packed', 'Shipped', 'Delivered'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={
                        'px-3 py-1.5 rounded-full border transition-all ' +
                        (orderStatusFilter === st
                          ? 'bg-[#2D3E2F] text-white border-[#2D3E2F]'
                          : 'bg-[#F4EDE2] text-[#554636] border-[#DECDB3] hover:bg-[#EAE0D0]')
                      }
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center space-y-3 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3]">
                <Package className="w-10 h-10 text-[#9A8973] mx-auto" />
                <h3 className="font-brand text-base font-bold text-[#222E22]">No Orders Match Filter</h3>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((ord) => {
                  const custom = editingOrderAwb[ord.id] || {
                    awb: ord.awbNumber || ('STA-' + ord.id.replace(/\D/g, '').slice(-6)),
                    courier: ord.courier || 'Blue Dart Express',
                  };

                  return (
                    <div key={ord.id} className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-6 shadow-sm space-y-5">
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#DECDB3]">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-brand text-lg font-bold text-[#222E22]">{ord.id}</span>
                            <span className="font-ui text-[11px] text-[#7A6B5B]">• {new Date(ord.date).toLocaleDateString()}</span>
                          </div>
                          <p className="font-ui text-xs text-[#524436] mt-0.5">
                            <strong>{ord.customerName}</strong> ({ord.customerEmail}) • {ord.customerPhone}
                          </p>
                        </div>

                        {/* Status selector */}
                        <div className="flex items-center gap-2">
                          <label className="font-ui text-[10px] uppercase font-bold text-[#7D5A34]">Shipment Status:</label>
                          <select
                            value={ord.status}
                            onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as any, custom.awb, custom.courier)}
                            className="px-3 py-1.5 rounded-full bg-[#E3EBDC] border border-[#C5D8B8] text-xs font-ui font-bold text-[#2D3E2F] focus:outline-none"
                          >
                            <option value="Processing">Processing</option>
                            <option value="Packed">Packed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>
                      </div>

                      {/* Courier & AWB */}
                      <div className="p-4 bg-[#F4EDE2] rounded-2xl border border-[#DECDB3] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 font-ui text-xs">
                        <div className="flex flex-wrap items-center gap-3 flex-1">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-[#7D5A34] mb-1">Carrier Partner</label>
                            <select
                              value={custom.courier}
                              onChange={(e) => setEditingOrderAwb({
                                ...editingOrderAwb,
                                [ord.id]: { ...custom, courier: e.target.value }
                              })}
                              className="px-3 py-1.5 rounded-xl bg-white border border-[#DECDB3] text-xs text-[#222E22]"
                            >
                              {COURIERS.map((c) => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </div>

                          <div className="flex-1 min-w-[180px]">
                            <label className="block text-[10px] font-bold uppercase text-[#7D5A34] mb-1">AWB Tracking Number</label>
                            <input
                              type="text"
                              value={custom.awb}
                              onChange={(e) => setEditingOrderAwb({
                                ...editingOrderAwb,
                                [ord.id]: { ...custom, awb: e.target.value }
                              })}
                              className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#DECDB3] text-xs text-[#222E22]"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleSaveOrderAwb(ord)}
                            className="mt-4 px-4 py-2 rounded-xl bg-[#2D3E2F] text-white hover:bg-[#202E22] font-ui text-xs uppercase font-semibold flex items-center gap-1.5"
                          >
                            <Save className="w-3.5 h-3.5" /> Save AWB
                          </button>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-brand text-xl font-bold text-[#7D5A34]">₹{ord.totalAmount}</span>
                          <span className="text-[10px] text-[#7A6B5B] block font-mono">{ord.paymentMethod}</span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="text-xs font-ui space-y-1">
                        <span className="font-bold text-[#7D5A34] uppercase tracking-wider text-[10px]">Package Items:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {ord.items.map((itm, i) => (
                            <div key={i} className="flex justify-between p-2 bg-[#F8F4EC] rounded-lg">
                              <span>{itm.product.name}</span>
                              <strong className="text-[#7D5A34]">Qty: {itm.quantity}</strong>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Direct UPI Settlement & UTR Verification */}
                      <div className="p-3.5 bg-[#EFE6D6] rounded-2xl border border-[#DECDB3] flex flex-wrap items-center justify-between gap-3 text-xs font-ui">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="font-bold text-[#2D3E2F] uppercase text-[10px] tracking-wider">UPI Settlement:</span>
                          <span className="font-mono text-[#7D5A34] font-semibold">{ord.upiId || '8888091910@ybl'}</span>
                          {ord.utrNumber ? (
                            <span className="px-2.5 py-1 rounded-lg bg-[#2D3E2F] text-white font-mono text-[11px] font-bold">
                              UTR: {ord.utrNumber}
                            </span>
                          ) : (
                            <span className="text-[#8A7966] italic text-[11px]">No UTR provided</span>
                          )}
                        </div>
                        {ord.paymentScreenshot && (
                          <a
                            href={ord.paymentScreenshot}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#7D5A34] hover:text-[#222E22] font-bold text-[11px] underline flex items-center gap-1"
                          >
                            <span>🖼️ View Payment Proof</span>
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DB STATUS */}
        {activeTab === 'database' && (
          <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#DECDB3] pb-4">
              <div>
                <h2 className="font-brand text-xl font-bold text-[#222E22]">Supabase Database Health</h2>
                <p className="font-ui text-xs text-[#7A6B5B]">Real-time cloud database status check</p>
              </div>
              <button
                onClick={checkDatabaseHealth}
                disabled={isCheckingDb}
                className="px-4 py-2 rounded-full bg-[#2D3E2F] text-white font-ui text-xs uppercase font-semibold flex items-center gap-1.5"
              >
                <RefreshCw className={'w-3.5 h-3.5 ' + (isCheckingDb ? 'animate-spin' : '')} /> Refresh Health
              </button>
            </div>
            {dbStatus && (
              <div className="p-4 bg-[#2D3E2F] text-[#E8DFD0] rounded-2xl font-mono text-xs overflow-x-auto">
                <pre>{JSON.stringify(dbStatus, null, 2)}</pre>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm max-w-3xl">
            <h2 className="font-brand text-xl font-bold text-[#222E22]">Storefront Announcement Banner</h2>
            <div className="space-y-4 font-ui text-xs">
              <div>
                <label className="block font-bold text-[#453A2E] mb-1.5 uppercase text-[10px]">Announcement Banner Message</label>
                <input
                  type="text"
                  value={currentAnnouncement}
                  onChange={(e) => setCurrentAnnouncement(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22]"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (onUpdateAnnouncement) onUpdateAnnouncement(currentAnnouncement);
                  setSettingsSaved(true);
                  setTimeout(() => setSettingsSaved(false), 3000);
                }}
                className="px-6 py-3 rounded-full bg-[#2D3E2F] text-white hover:bg-[#202E22] font-ui text-xs uppercase tracking-wider font-semibold flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Banner Text
              </button>
              {settingsSaved && (
                <p className="text-[#2D3E2F] font-bold text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Banner updated!
                </p>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Modal for Add / Edit Product */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#EFE6D6] text-[#695A48]"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-brand text-2xl font-bold text-[#222E22] mb-4">
              {editingProduct ? 'Edit Formulation' : 'Add New Formulation'}
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-4 font-ui text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#453A2E] mb-1 uppercase text-[10px]">Product Name *</label>
                  <input
                    required
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#453A2E] mb-1 uppercase text-[10px]">Tagline</label>
                  <input
                    type="text"
                    value={formTagline}
                    onChange={(e) => setFormTagline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-bold text-[#453A2E] mb-1 uppercase text-[10px]">Price (₹) *</label>
                  <input
                    required
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#453A2E] mb-1 uppercase text-[10px]">MRP (₹)</label>
                  <input
                    type="number"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#453A2E] mb-1 uppercase text-[10px]">Stock Count</label>
                  <input
                    required
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#453A2E] mb-1 uppercase text-[10px]">Availability</label>
                  <select
                    value={formIsAvailable ? 'yes' : 'no'}
                    onChange={(e) => setFormIsAvailable(e.target.value === 'yes')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22]"
                  >
                    <option value="yes">Available</option>
                    <option value="no">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#453A2E] mb-1 uppercase text-[10px]">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22]"
                  >
                    {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#453A2E] mb-1 uppercase text-[10px]">Net Quantity</label>
                  <input
                    type="text"
                    value={formQuantity}
                    onChange={(e) => setFormQuantity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#453A2E] mb-1 uppercase text-[10px]">Description</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2 rounded-full border border-[#DECDB3] text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#2D3E2F] text-white text-xs font-semibold shadow-md"
                >
                  {editingProduct ? 'Save Changes' : 'Create Formulation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
