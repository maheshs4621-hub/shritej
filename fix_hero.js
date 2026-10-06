const fs = require('fs');
const content = import React from 'react';
import { Sparkles, ArrowRight, Plus, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onOpenAdd: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOpenAdd }) => {
  return (
    <div className= relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-[#0d1527] border border-indigo-500/20 p-8 sm:p-12 mb-12 shadow-2xl shadow-indigo-950/50>
      <div className=absolute -right-24 -top-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none />
      <div className=absolute -left-20 -bottom-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none />
      
      <div className=max-w-2xl relative z-10 space-y-4>
        <div className=inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider>
          <Sparkles className=w-3.5 h-3.5 text-indigo-400 /> Next-Generation Flagships 2026
        </div>
        <h1 className=text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight>
          Designed for Perfection. <br/>
          <span className=bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-300 to-pink-400>
            Engineered to Inspire.
          </span>
        </h1>
        <p className=text-slate-300 text-sm sm:text-base leading-relaxed>
          Discover our flagship collection of acoustic hardware, neural computing rigs, and titanium wearables crafted for demanding professionals.
        </p>
        <div className=pt-2 flex flex-wrap items-center gap-4>
          <button 
            onClick={onExplore}
            className=px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 hover:translate-y-[-1px]
          >
            Explore Catalog <ArrowRight className=w-4 h-4 />
          </button>
          <button 
            onClick={onOpenAdd}
            className=px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium text-sm transition-all flex items-center gap-2
          >
            <Plus className=w-4 h-4 text-indigo-400 /> Add New Product
          </button>
        </div>
      </div>

      <div className=mt-10 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-400>
        <div className=flex items-center gap-2.5>
          <ShieldCheck className=w-4 h-4 text-indigo-400 />
          <span>2-Year Full Hardware Coverage</span>
        </div>
        <div className=flex items-center gap-2.5>
          <Truck className=w-4 h-4 text-cyan-400 />
          <span>Free Overnight Priority Delivery</span>
        </div>
        <div className=hidden sm:flex items-center gap-2.5>
          <RotateCcw className=w-4 h-4 text-pink-400 />
          <span>30-Day Hassle-Free Returns</span>
        </div>
      </div>
    </div>
  );
};
;
fs.writeFileSync('src/components/Hero.tsx', content, 'utf8');