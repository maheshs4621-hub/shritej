import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Search, Heart, User, Truck, ShieldCheck, LogIn, ChevronDown, LogOut } from 'lucide-react';
import { ViewType, UserProfile } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  activeView: ViewType;
  onNavigate: (view: ViewType, category?: string) => void;
  openCart: () => void;
  onSearchOpen: () => void;
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  activeView,
  onNavigate,
  openCart,
  onSearchOpen,
  currentUser,
  onOpenAuth,
  onLogout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const handleNavClick = (view: ViewType, category?: string) => {
    onNavigate(view, category);
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { label: string; view: ViewType }[] = [
    { label: 'HOME', view: 'home' },
    { label: 'OUR STORY', view: 'story' },
    { label: 'AYURVEDA', view: 'ayurveda' },
    { label: 'PRODUCTS', view: 'products' },
    { label: 'TRACK ORDER', view: 'track-order' },
    { label: 'SUSTAINABILITY', view: 'sustainability' },
    { label: 'CONTACT', view: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF7F2]/95 border-b border-[#E3DAC9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <div
          className="cursor-pointer flex items-center gap-2.5 sm:gap-3.5 group"
          onClick={() => handleNavClick('home')}
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-[#7D5A34]/50 flex items-center justify-center bg-[#2D3E2F] text-[#FAF7F2] shadow-md shrink-0 relative overflow-hidden group-hover:border-[#7D5A34] transition-all">
            <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current text-[#EBE0CE]">
              <path
                d="M50 15 C45 35 30 45 20 50 C30 55 45 65 50 85 C55 65 70 55 80 50 C70 45 55 35 50 15 Z"
                fill="#C9A24D"
                opacity="0.9"
              />
              <path
                d="M50 30 C48 42 40 48 35 50 C40 52 48 58 50 70 C52 58 60 52 65 50 C60 48 52 42 50 30 Z"
                fill="#F8F5EE"
              />
              <circle cx="50" cy="50" r="4" fill="#7D5A34" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-brand text-lg sm:text-2xl font-extrabold tracking-[0.22em] sm:tracking-[0.25em] text-[#222E22] group-hover:text-[#7D5A34] transition-colors uppercase">
              SHRITEJ
            </span>
            <span className="font-ui text-[8px] sm:text-[9px] tracking-[0.28em] sm:tracking-[0.35em] text-[#7D6B58] uppercase font-bold">
              AYURVED
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 font-ui text-[12px] uppercase tracking-[0.18em] font-semibold text-[#574B3D]">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.view)}
              className={
                'transition-colors py-1 relative ' +
                (activeView === item.view
                  ? 'text-[#7D5A34] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#7D5A34]'
                  : 'hover:text-[#7D5A34]')
              }
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action Icons: Search, User / Auth, Wishlist, Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          
          {/* Search Icon */}
          <button
            onClick={onSearchOpen}
            className="p-2 sm:p-2.5 rounded-full text-[#524436] hover:text-[#222E22] hover:bg-[#EFE5D6] transition-colors"
            title="Search formulations"
            aria-label="Search"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* User Profile / Auth Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFE6D6] hover:bg-[#E8DFCF] text-[#2D3E2F] border border-[#DECDB3] transition-all font-ui text-xs font-semibold"
                aria-label="User Account"
              >
                <div className="w-6 h-6 rounded-full bg-[#2D3E2F] text-white flex items-center justify-center text-[11px] font-bold">
                  {(currentUser.name || 'P').charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-[80px] truncate">{currentUser.name.split(' ')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#7D6B58]" />
              </button>

              {/* User Dropdown */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#FAF7F2] border border-[#DECDB3] shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 font-ui text-xs">
                  <div className="px-4 py-2 border-b border-[#DECDB3]">
                    <p className="font-bold text-[#222E22] truncate">{currentUser.name}</p>
                    <p className="text-[#7A6B5B] text-[11px] truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => handleNavClick('account')}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#F4EDE2] text-[#453A2E] flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-[#7D5A34]" /> My Orders &amp; Profile
                  </button>
                  <button
                    onClick={() => handleNavClick('track-order')}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#F4EDE2] text-[#453A2E] flex items-center gap-2"
                  >
                    <Truck className="w-4 h-4 text-[#7D5A34]" /> Live Shipment Tracker
                  </button>
                  {currentUser.isAdmin && (
                    <button
                      onClick={() => handleNavClick('admin')}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#F4EDE2] text-[#2D3E2F] font-bold flex items-center gap-2 border-t border-[#DECDB3]/60"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#2D3E2F]" /> Super Admin Console
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                      if (onLogout) onLogout();
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-rose-50 text-rose-600 flex items-center gap-2 border-t border-[#DECDB3]"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => { if (onOpenAuth) onOpenAuth(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFE6D6] hover:bg-[#E8DFCF] text-[#2D3E2F] border border-[#DECDB3] transition-all font-ui text-xs font-semibold"
              title="Sign in with Google or Email"
            >
              <LogIn className="w-3.5 h-3.5 text-[#7D5A34]" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          {/* Wishlist Icon */}
          <button
            onClick={() => handleNavClick('wishlist')}
            className={
              'relative p-2 sm:p-2.5 rounded-full transition-colors ' +
              (activeView === 'wishlist'
                ? 'bg-[#EAE0D0] text-[#7D5A34]'
                : 'text-[#524436] hover:text-[#222E22] hover:bg-[#EFE5D6]')
            }
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className={'w-4 h-4 sm:w-5 sm:h-5 ' + (wishlistCount > 0 ? 'text-rose-600 fill-rose-600' : '')} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-rose-600 text-white font-ui text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon / Basket */}
          <button
            onClick={openCart}
            className="relative px-3 sm:px-4 py-2 rounded-full border border-[#D5C9B3] hover:border-[#8E6E45] bg-[#F4EDE2] hover:bg-[#EFE5D6] text-[#332A21] flex items-center gap-2 transition-all shadow-sm"
            aria-label="Shopping Basket"
          >
            <ShoppingBag className="w-4 h-4 text-[#7D5A34]" />
            <span className="font-ui text-xs tracking-wider uppercase font-semibold hidden md:inline">Basket</span>
            {cartCount > 0 && (
              <span className="bg-[#7D5A34] text-white font-ui text-[10px] font-bold h-5 min-w-5 px-1.5 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full border border-[#D5C9B3] bg-[#F4EDE2] text-[#4A3B2C] hover:bg-[#EAE0D0] transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E3DAC9] px-6 py-5 shadow-lg space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 font-ui text-xs uppercase tracking-[0.2em] font-bold text-[#574B3D]">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view)}
                className={
                  'text-left py-2 border-b border-[#EAE1D1] ' +
                  (activeView === item.view ? 'text-[#7D5A34] font-bold' : 'hover:text-[#7D5A34]')
                }
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              {currentUser ? (
                <button
                  onClick={() => handleNavClick('account')}
                  className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#2D3E2F] text-white text-xs font-ui uppercase"
                >
                  <User className="w-3.5 h-3.5" /> {currentUser.name.split(' ')[0]}
                </button>
              ) : (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); if (onOpenAuth) onOpenAuth(); }}
                  className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#2D3E2F] text-white text-xs font-ui uppercase"
                >
                  <LogIn className="w-3.5 h-3.5" /> Sign In
                </button>
              )}
              <button
                onClick={() => handleNavClick('track-order')}
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#F4EDE2] border border-[#DECDB3] text-xs font-ui uppercase"
              >
                <Truck className="w-3.5 h-3.5 text-[#7D5A34]" /> Track Order
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#F4EDE2] border border-[#DECDB3] text-xs font-ui uppercase text-[#7D5A34]"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};