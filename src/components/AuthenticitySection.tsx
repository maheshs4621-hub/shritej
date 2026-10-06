import React from 'react';
import { ShieldCheck, Eye, Sprout, Award } from 'lucide-react';
export const AuthenticitySection: React.FC = () => {
  return (
    <section id="authenticity" className="py-20 sm:py-28 bg-[#F3EDE1] border-b border-[#E3DAC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="font-ui text-xs uppercase tracking-[0.3em] text-[#7D5A34] font-bold block">Integrity &amp; Standards</span>
          <h2 className="font-brand text-3xl sm:text-5xl font-bold tracking-[0.06em] text-[#202E22]">
            Made with Intention, Not Mass Produced for Trends.
          </h2>
          <div className="w-16 h-0.5 bg-[#8E6E45] mx-auto mt-2"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-7 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] space-y-3">
            <Award className="w-6 h-6 text-[#7D5A34]" />
            <h3 className="font-brand text-xs font-bold tracking-[0.18em] text-[#222E22] uppercase">Classical Inspiration</h3>
            <p className="font-editorial text-base text-[#594B3C] leading-relaxed">Formulated strictly in adherence to documented classical Ayurvedic principles, not transient cosmetic fads.</p>
          </div>
          <div className="p-7 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] space-y-3">
            <Eye className="w-6 h-6 text-[#7D5A34]" />
            <h3 className="font-brand text-xs font-bold tracking-[0.18em] text-[#222E22] uppercase">Ingredient Transparency</h3>
            <p className="font-editorial text-base text-[#594B3C] leading-relaxed">Every botanical herb is clearly stated in common and classical Sanskrit names. Zero hidden synthetic perfumes.</p>
          </div>
          <div className="p-7 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] space-y-3">
            <Sprout className="w-6 h-6 text-[#7D5A34]" />
            <h3 className="font-brand text-xs font-bold tracking-[0.18em] text-[#222E22] uppercase">Small-Batch Freshness</h3>
            <p className="font-editorial text-base text-[#594B3C] leading-relaxed">Prepared in micro-batches to ensure essential aromatic oils and bio-active botanical enzymes remain active.</p>
          </div>
          <div className="p-7 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#7D5A34]" />
            <h3 className="font-brand text-xs font-bold tracking-[0.18em] text-[#222E22] uppercase">Biodegradable Living</h3>
            <p className="font-editorial text-base text-[#594B3C] leading-relaxed">Responsible earth stewardship guiding every packaging decision, from unbleached kraft to jute twine.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
