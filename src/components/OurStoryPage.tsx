import React from 'react';
import { Feather, Leaf, Sun, Heart, Sparkles, Sprout, Award, ArrowRight } from 'lucide-react';

interface OurStoryPageProps {
  onShopClick: () => void;
  onAyurvedaClick: () => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ onShopClick, onAyurvedaClick }) => {
  return (
    <div className="py-12 sm:py-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Story Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE6D6] border border-[#D5C4A7] text-[#694F32] font-ui text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold">
            <Feather className="w-3.5 h-3.5 text-[#8A6A42]" />
            <span>The Genesis of SHRiTEJ AYURVED</span>
          </div>
          <p className="font-deva text-lg sm:text-2xl text-[#7D5A34] tracking-wider">॥ सत्यं परं धीमहि ॥</p>
          <h1 className="font-brand text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.06em] text-[#222E22] leading-tight">
            Returning to the Classical Roots of Indian Healing
          </h1>
          <p className="font-editorial text-lg sm:text-2xl text-[#594B3C] leading-relaxed max-w-2xl mx-auto">
            Not a commercial beauty house, but a humble revival of sacred botanical knowledge, honest craftsmanship, and deep ecological respect.
          </p>
          <div className="w-20 h-0.5 bg-[#8E6E45] mx-auto mt-3"></div>
        </div>

        {/* Narrative Section 1 */}
        <div className="bg-[#F4EDE2] border border-[#DECDB3] rounded-3xl p-8 sm:p-12 space-y-6 shadow-sm">
          <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#7D5A34] font-bold block">
            The Awakening
          </span>
          <h2 className="font-brand text-2xl sm:text-3xl font-bold text-[#222E22]">
            Why Modern Wellness Needed Genuine Ancient Truth
          </h2>
          <div className="font-editorial text-lg sm:text-xl text-[#453A2F] leading-relaxed space-y-4">
            <p>
              In a world crowded by instant gratification, synthetic foaming agents, artificial fragrances, and chemical bleaching agents masked behind green labels, the true spirit of Ayurveda had become diluted.
            </p>
            <p>
              <strong>SHRiTEJ AYURVED</strong> was born out of a heartfelt resolve: to return entirely to classical Vedic literature — where herbal powders (Churna), healing mud packs (Lepa), cold-pressed oils (Sneha), and steam floral waters (Arka) are prepared with utmost patience and reverence for nature&rsquo;s living intelligence.
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#EBE0CD] flex items-center justify-center text-[#7D5A34]">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="font-brand text-base font-bold tracking-wider text-[#222E22] uppercase">Sacred Ethical Herbs</h3>
            <p className="font-editorial text-base text-[#594B3C] leading-relaxed">
              We work directly with traditional cultivators in regions renowned for botanical potency: Kannauj for sacred Damask roses, Mysore for fragrant sandalwood, and pristine foothill farms for wild Manjishta.
            </p>
          </div>

          <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#EBE0CD] flex items-center justify-center text-[#7D5A34]">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="font-brand text-base font-bold tracking-wider text-[#222E22] uppercase">Zero Rush Preparation</h3>
            <p className="font-editorial text-base text-[#594B3C] leading-relaxed">
              Classical formulas cannot be rushed in industrial chemical factories. We pulverize herbs at low heat, infuse our oils over days, and allow cold-process artisan soaps to cure for 6 weeks.
            </p>
          </div>

          <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#EBE0CD] flex items-center justify-center text-[#7D5A34]">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-brand text-base font-bold tracking-wider text-[#222E22] uppercase">Planetary Harmony</h3>
            <p className="font-editorial text-base text-[#594B3C] leading-relaxed">
              Our commitment goes beyond clean skin — it extends to clean land. We choose biodegradable raw kraft paper, handmade cotton wraps, and recyclable glass, saying no to unnecessary plastic waste.
            </p>
          </div>
        </div>

        {/* Founder / Lineage Reflection */}
        <div className="p-8 sm:p-12 bg-[#2D3E2F] text-[#FAF7F2] rounded-3xl space-y-6 relative overflow-hidden shadow-xl">
          <div className="relative z-10 space-y-4 max-w-2xl">
            <span className="font-ui text-xs uppercase tracking-[0.3em] text-[#C9A24D] font-bold block">
              Our Living Promise
            </span>
            <blockquote className="font-editorial italic text-xl sm:text-2xl leading-relaxed text-[#F3EFE6]">
              &ldquo;We do not innovate by inventing synthetic shortcuts. We innovate by strictly preserving the sacred Ayurvedic methods that our ancestors perfected over millennia.&rdquo;
            </blockquote>
            <p className="font-brand text-sm tracking-widest uppercase text-[#C9A24D] font-semibold">
              — The Guardians of SHRiTEJ AYURVED
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="text-center space-y-4 pt-4">
          <h3 className="font-brand text-2xl font-bold text-[#222E22]">Experience the Formulations</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onShopClick}
              className="px-8 py-4 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-[0.25em] font-semibold transition-all shadow-md flex items-center gap-2"
            >
              Shop Authentic Formulations <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onAyurvedaClick}
              className="px-8 py-4 rounded-full border border-[#9A8162] hover:border-[#6B5336] text-[#423528] bg-transparent hover:bg-[#F0E6D5]/60 font-ui text-xs uppercase tracking-[0.25em] font-semibold transition-all"
            >
              Learn About Ayurveda
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};