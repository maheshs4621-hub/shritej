import React from 'react';
import { Package, Recycle, Feather, Globe2, Leaf, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

interface SustainabilityPageProps {
  onShopClick: () => void;
}

export const SustainabilityPage: React.FC<SustainabilityPageProps> = ({ onShopClick }) => {
  return (
    <div className="py-12 sm:py-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE6D6] border border-[#D5C4A7] text-[#694F32] font-ui text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold">
            <Leaf className="w-3.5 h-3.5 text-[#2D3E2F]" />
            <span>Our Sacred Ecological Charter</span>
          </div>
          <p className="font-deva text-lg sm:text-2xl text-[#7D5A34] tracking-wider">॥ माता भूमिः पुत्रोऽहं पृथिव्याः ॥</p>
          <h1 className="font-brand text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.06em] text-[#222E22] leading-tight">
            Earth-First Ayurvedic Living
          </h1>
          <p className="font-editorial text-lg sm:text-2xl text-[#594B3C] leading-relaxed max-w-2xl mx-auto">
            &ldquo;The Earth is my Mother; I am the child of the Earth.&rdquo; Our dedication to eliminating unnecessary plastic waste is an inseparable expression of authentic Ayurvedic philosophy.
          </p>
          <div className="w-20 h-0.5 bg-[#8E6E45] mx-auto mt-3"></div>
        </div>

        {/* The Plastic Reality vs Our Stance */}
        <div className="bg-[#F4EDE2] border border-[#DECDB3] rounded-3xl p-8 sm:p-12 space-y-6 shadow-sm">
          <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#7D5A34] font-bold block">
            The Packaging Dilemma
          </span>
          <h2 className="font-brand text-2xl sm:text-3xl font-bold text-[#222E22]">
            Why Plastic-Free Matters More Than Ever
          </h2>
          <div className="font-editorial text-lg sm:text-xl text-[#453A2F] leading-relaxed space-y-4">
            <p>
              The modern cosmetics industry produces over 120 billion units of single-use plastic packaging each year — most of which lingers in landfills and oceans for 500 years. It is an insult to Ayurveda to place pure sacred herbs inside petrochemical plastics destined to pollute the sacred rivers.
            </p>
            <p>
              At <strong>SHRiTEJ AYURVED</strong>, we hold a simple guiding rule: <em>If it cannot return gently to the soil, it does not belong in our apothecary.</em>
            </p>
          </div>
        </div>

        {/* Our 4 Packaging Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#EBE0CD] flex items-center justify-center text-[#7D5A34]">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-brand text-lg font-bold tracking-wider text-[#222E22] uppercase">
              1. Unbleached Raw Kraft Pouches
            </h3>
            <p className="font-editorial text-base text-[#594B3C] leading-relaxed">
              Our signature herbal Ubtan and Lepa powders are housed in natural unbleached kraft paper stand-up pouches. They provide an oxygen-shield and moisture barrier while being fully biodegradable in commercial compost environments.
            </p>
          </div>

          <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#EBE0CD] flex items-center justify-center text-[#7D5A34]">
              <Feather className="w-6 h-6" />
            </div>
            <h3 className="font-brand text-lg font-bold tracking-wider text-[#222E22] uppercase">
              2. Handmade Cotton Paper &amp; Jute
            </h3>
            <p className="font-editorial text-base text-[#594B3C] leading-relaxed">
              Our artisan Mysore Sandalwood bath bars are wrapped by hand in tree-free cotton rag paper, handcrafted by rural Indian artisans, and bound with raw organic jute twine. Zero plastic film. Zero synthetic adhesives.
            </p>
          </div>

          <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#EBE0CD] flex items-center justify-center text-[#7D5A34]">
              <Recycle className="w-6 h-6" />
            </div>
            <h3 className="font-brand text-lg font-bold tracking-wider text-[#222E22] uppercase">
              3. Amber Recyclable Glass &amp; Aluminum
            </h3>
            <p className="font-editorial text-base text-[#594B3C] leading-relaxed">
              Our pure botanical waters and Kumkumadi Tailams are housed in UV-protective amber glass vessels that preserve natural phytocompounds indefinitely and can be endlessly recycled or repurposed at home.
            </p>
          </div>

          <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#EBE0CD] flex items-center justify-center text-[#7D5A34]">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="font-brand text-lg font-bold tracking-wider text-[#222E22] uppercase">
              4. Plastic-Free Shipping Boxes
            </h3>
            <p className="font-editorial text-base text-[#594B3C] leading-relaxed">
              When your order arrives at your doorstep, it comes in a 100% recycled corrugated kraft shipping carton cushioned with shredded paper and wood-wool, sealed with paper gummed tape. No bubble wrap.
            </p>
          </div>

        </div>

        {/* Circular Infographic Card */}
        <div className="p-8 sm:p-12 bg-[#2D3E2F] text-[#FAF7F2] rounded-3xl space-y-6 shadow-xl">
          <div className="max-w-2xl space-y-3">
            <span className="font-ui text-xs uppercase tracking-[0.3em] text-[#C9A24D] font-bold">
              Continuous Responsibility
            </span>
            <h3 className="font-brand text-2xl sm:text-3xl font-bold">
              Sustainability Beyond Packaging
            </h3>
            <p className="font-editorial text-base sm:text-lg text-[#EAE2D5] leading-relaxed">
              Sustainability is not only the outer wrapper — it is ethical wildcrafting, avoiding over-harvesting of endangered botanical roots, respecting seasonal rejuvenation cycles, and ensuring fair wages for rural Indian farmers and women artisans who hand-wrap every batch.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={onShopClick}
            className="px-8 py-4 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-[0.25em] font-semibold transition-all shadow-md inline-flex items-center gap-2"
          >
            Shop Earth-Conscious Formulations <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};