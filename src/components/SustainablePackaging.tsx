import React from 'react';
import { Package, Recycle, Feather, Sparkles, CheckCircle2 } from 'lucide-react';
export const SustainablePackaging: React.FC = () => {
  return (
    <section id="sustainability" className="py-20 sm:py-28 bg-[#F3EDE1] border-b border-[#E3DAC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="font-ui text-xs uppercase tracking-[0.3em] text-[#7D5A34] font-bold block">Responsible Packaging</span>
          <h2 className="font-brand text-3xl sm:text-5xl font-bold tracking-[0.06em] text-[#202E22]">
            Good for You. Kinder to the Earth.
          </h2>
          <p className="font-editorial text-xl text-[#524436] leading-relaxed max-w-2xl mx-auto">
            We actively reject single-use non-recyclable plastics. Every vessel, pouch, and paper wrap is designed with biodegradable fibers and recyclable glass where possible.
          </p>
          <div className="w-16 h-0.5 bg-[#8E6E45] mx-auto mt-2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#EBE0CD] flex items-center justify-center text-[#7D5A34]">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-brand text-lg font-bold tracking-wider text-[#222E22] uppercase">Raw Kraft Stand-up Pouches</h3>
            <p className="font-editorial text-base text-[#594B3C] leading-relaxed">
              Our signature Ubtan comes in earthy unbleached kraft pouches with re-closable zip seals to protect botanical aromas without excessive plastic coatings.
            </p>
          </div>
          <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#EBE0CD] flex items-center justify-center text-[#7D5A34]">
              <Feather className="w-6 h-6" />
            </div>
            <h3 className="font-brand text-lg font-bold tracking-wider text-[#222E22] uppercase">Handmade Paper &amp; Jute Twine</h3>
            <p className="font-editorial text-base text-[#594B3C] leading-relaxed">
              Artisan bath bars are hand-wrapped in 100% natural biodegradable cotton-rag paper and tied with raw jute twine. No laminate, no vinyl.
            </p>
          </div>
          <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#EBE0CD] flex items-center justify-center text-[#7D5A34]">
              <Recycle className="w-6 h-6" />
            </div>
            <h3 className="font-brand text-lg font-bold tracking-wider text-[#222E22] uppercase">Recyclable Glass &amp; Eco Sprayers</h3>
            <p className="font-editorial text-base text-[#594B3C] leading-relaxed">
              Floral hydrosols and facial oils are packaged in amber recyclable bottles with minimalist timber caps, ensuring UV botanical stability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
