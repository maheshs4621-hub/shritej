const fs = require('fs');
const content = import React from 'react';
import { ShoppingBag, Search, X, Store, LayoutDashboard, PackageCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: 'shop' | 'admin' | 'orders';
  setActiveTab: (tab: 'shop' | 'admin' | 'orders') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  cartCount: number;
  ordersCount: number;
  openCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  cartCount,
  ordersCount,
  openCart,
}) => {
  return (
    <header className= sticky top-0 z-40 backdrop-blur-xl bg-[#090d16]/85 border-b border-slate-800/80 transition-all>
      <div className=max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4>
        <div className=flex items-center gap-3 cursor-pointer onClick={() => setActiveTab('shop')}>
          <div className=w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20>
            <ShoppingBag className=w-6 h-6 text-white stroke-[2.2] />
          </div>
          <div>
            <span className=text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-300>
              NOVA
            </span>
            <span className=text-[10px] tracking-widest uppercase ml-1 px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-bold border border-indigo-500/30>
              STORE
            </span>
          </div>
        </div>

        <div className=hidden md:flex flex-1 max-w-md mx-6 relative>
          <Search className=w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 />
          <input 
            type=text 
            placeholder=Search devices audio laptops...
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-900/90 border border-slate-700/70 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm placeholder:text-slate-500 text-white transition-all
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className=absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white>
              <X className=w-4 h-4 />
            </button>
          )}
        </div>

        <div className=flex items-center gap-3 sm:gap-4>
          <nav className=flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs sm:text-sm font-medium>
            <button 
              onClick={() => setActiveTab('shop')}
              className={'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ' + (activeTab === 'shop' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50')}
            >
              <Store className=w-4 h-4 />
              <span className=hidden sm:inline>Shop</span>
            </button>
            <button 
              onClick={() => setActiveTab('admin')}
              className={'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ' + (activeTab === 'admin' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50')}
            >
              <LayoutDashboard className=w-4 h-4 />
              <span className=hidden sm:inline>Manage</span>
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ' + (activeTab === 'orders' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50')}
            >
              <PackageCheck className=w-4 h-4 />
              <span className=hidden sm:inline>Orders ({ordersCount})</span>
            </button>
          </nav>

          <button 
            onClick={openCart}
            className=relative p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all hover:border-slate-700 flex items-center justify-center
            aria-label=Shopping Cart
          >
            <ShoppingBag className=w-5 h-5 text-indigo-400 />
            {cartCount > 0 && (
              <span className=absolute -top-1 .5 -right-1 .5 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-[11px] font-bold h-5 min-w-5 px-1 rounded-full flex items-center justify-center border-2 border-[#090d16] animate-bounce>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className=md:hidden px-4 pb-3>
        <div className=relative w-full>
          <Search className=w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 />
          <input 
            type=text 
            placeholder=Search devices audio laptops...
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700/70 focus:outline-none focus:border-indigo-500 text-sm text-white
          />
        </div>
      </div>
    </header>
  );
};
;
fs.writeFileSync('src/components/Navbar.tsx', content, 'utf8');