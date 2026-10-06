import React from 'react';
import { ViewType } from '../types';
import { Mail, Phone, MessageSquare, ShieldCheck, Heart, Leaf } from 'lucide-react';
const CONTACT_PHONE = '+91 80802 18728';
const WHATSAPP_NUMBER = '918080218728';
const CONTACT_EMAIL = 'care@shritejayurveda.com';
const INSTAGRAM_HANDLE = 'shritejayurved';

interface FooterProps {
  onNavigate: (view: ViewType, category?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLink = (view: ViewType, category?: string) => {
    onNavigate(view, category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF7F2] border-t border-[#E3DAC8] pt-16 sm:pt-20 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#7D5A34] flex items-center justify-center bg-[#2D3E2F] text-[#FAF7F2]">
                <svg viewBox="0 0 100 100" className="w-6 h-6 fill-current text-[#EBE0CE]">
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
              <h3 className="font-brand text-xl sm:text-2xl font-bold tracking-[0.25em] text-[#222E22]">
                SHRiTEJ AYURVED
              </h3>
            </div>
            <p className="font-editorial italic text-base text-[#6E5943] leading-relaxed max-w-sm">
              Authentic Ayurveda • Ancient Indian Wisdom • Pure Botanical Herbs • Biodegradable Packaging.
            </p>
            <p className="font-ui text-xs text-[#7A6B5B] leading-relaxed max-w-sm">
              A sacred revival of traditional Indian skincare formulations, honoring living ecosystems through zero-plastic stewardship.
            </p>
          </div>

          {/* Col 2: Shop Categories */}
          <div className="space-y-3 font-ui text-xs">
            <h4 className="font-brand text-sm font-bold uppercase tracking-[0.2em] text-[#222E22]">
              Shop
            </h4>
            <div className="flex flex-col space-y-2 text-[#5A4A39]">
              <button onClick={() => handleLink('products')} className="text-left hover:text-[#7D5A34] transition-colors">
                All Formulations
              </button>
              <button onClick={() => handleLink('products', 'Ubtan & Lepa')} className="text-left hover:text-[#7D5A34] transition-colors">
                Ubtan &amp; Lepa
              </button>
              <button onClick={() => handleLink('products', 'Toners & Mists')} className="text-left hover:text-[#7D5A34] transition-colors">
                Kannauj Rose Water
              </button>
              <button onClick={() => handleLink('products', 'Bathing Rituals')} className="text-left hover:text-[#7D5A34] transition-colors">
                Mysore Sandalwood Soap
              </button>
              <button onClick={() => handleLink('products', 'Combos & Kits')} className="text-left hover:text-[#7D5A34] transition-colors">
                Complete Snana Box
              </button>
            </div>
          </div>

          {/* Col 3: About & Mission */}
          <div className="space-y-3 font-ui text-xs">
            <h4 className="font-brand text-sm font-bold uppercase tracking-[0.2em] text-[#222E22]">
              About
            </h4>
            <div className="flex flex-col space-y-2 text-[#5A4A39]">
              <button onClick={() => handleLink('story')} className="text-left hover:text-[#7D5A34] transition-colors">
                Our Story
              </button>
              <button onClick={() => handleLink('ayurveda')} className="text-left hover:text-[#7D5A34] transition-colors">
                Ayurveda Philosophy
              </button>
              <button onClick={() => handleLink('sustainability')} className="text-left hover:text-[#7D5A34] transition-colors">
                Sustainability Charter
              </button>
              <button onClick={() => handleLink('account')} className="text-left hover:text-[#7D5A34] transition-colors">
                Patron Portal / Orders
              </button>
              <button onClick={() => handleLink('track-order')} className="text-left hover:text-[#7D5A34] transition-colors font-semibold">
                🚚 Track Shipment
              </button>
              <button onClick={() => handleLink('admin')} className="text-left hover:text-[#7D5A34] transition-colors font-semibold text-[#7D5A34]">
                🛡️ Super Admin Portal
              </button>
            </div>
          </div>

          {/* Col 4: Support & Legal */}
          <div className="space-y-3 font-ui text-xs">
            <h4 className="font-brand text-sm font-bold uppercase tracking-[0.2em] text-[#222E22]">
              Care &amp; Policies
            </h4>
            <div className="flex flex-col space-y-2 text-[#5A4A39]">
              <button onClick={() => handleLink('contact')} className="text-left hover:text-[#7D5A34] transition-colors">
                Contact Care Desk
              </button>
              <button onClick={() => handleLink('faq')} className="text-left hover:text-[#7D5A34] transition-colors">
                FAQ &amp; Help Desk
              </button>
              <button onClick={() => handleLink('shipping-policy')} className="text-left hover:text-[#7D5A34] transition-colors">
                Shipping Policy
              </button>
              <button onClick={() => handleLink('returns-policy')} className="text-left hover:text-[#7D5A34] transition-colors">
                Returns &amp; Refunds
              </button>
              <button onClick={() => handleLink('privacy')} className="text-left hover:text-[#7D5A34] transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => handleLink('terms')} className="text-left hover:text-[#7D5A34] transition-colors">
                Terms &amp; Conditions
              </button>
              <button onClick={() => handleLink('disclaimer')} className="text-left hover:text-[#7D5A34] transition-colors">
                Ayurvedic Disclaimer
              </button>
            </div>
          </div>

        </div>

        {/* Connect Bar: Direct Phone, WhatsApp, Email, Instagram */}
        <div className="pt-8 border-t border-[#DECDB3] flex flex-wrap items-center justify-between gap-4 font-ui text-xs text-[#524436]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="font-bold uppercase tracking-wider text-[#222E22]">Connect:</span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-1.5 hover:text-[#7D5A34] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#7D5A34]" /> Email
            </a>
            <a
              href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 hover:text-[#7D5A34] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#7D5A34]" /> Call
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#2D3E2F] font-semibold transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#2D3E2F]" /> WhatsApp
            </a>
            <a
              href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#7D5A34] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 text-[#7D5A34]">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>Instagram</span>
            </a>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#7A6B5B]">
            <Leaf className="w-3.5 h-3.5 text-[#2D3E2F]" />
            <span>Zero Unnecessary Plastic • 100% Biodegradable Shipping</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-ui text-[10px] sm:text-[11px] text-[#7A6B5B] text-center sm:text-left border-t border-[#DECDB3]/60 pt-6">
          <p>© 2026 SHRiTEJ AYURVED. Handcrafted in India. Inspired by Classical Traditions.</p>
          <p>Authentic Ayurveda • Traditional Preparation • Earth Stewardship</p>
        </div>

      </div>
    </footer>
  );
};