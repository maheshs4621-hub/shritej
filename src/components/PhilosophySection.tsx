import React from 'react';
import { Sprout, Sun, FlaskConical, PackageOpen, Globe2 } from 'lucide-react';
export const PhilosophySection: React.FC = () => {
  const steps = [
    { deva: 'प्रकृति', label: 'NATURE', desc: 'Sacred fertile soils & pristine rain-fed botanical sanctuaries' },
    { deva: 'ओषधि', label: 'INGREDIENTS', desc: 'Wildcrafted Manjishta, Chandan, Halad, Lodhra & Damask rose' },
    { deva: 'विधि', label: 'TRADITIONAL METHODS', desc: 'Stone-grinding, slow-curing & wood-fired steam distillation' },
    { deva: 'उत्पाद', label: 'PRODUCT', desc: 'Potent Ayurvedic formulations preserving live botanical essence' },
    { deva: 'वसुन्धरा', label: 'EARTH', desc: 'Biodegradable wrap returning harmlessly to the living soil' }
  ];
  return (
    <section id="philosophy" className="py-20 sm:py-28 bg-[#F8F5EE] border-b border-[#E3DAC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="font-deva text-base text-[#7D5A34] tracking-widest">॥ परम्परा न विकारः ॥</span>
          <h2 className="font-brand text-3xl sm:text-5xl font-bold tracking-[0.06em] text-[#222E22]">
            Ayurveda is Not a Trend. It is a Tradition.
          </h2>
          <p className="font-editorial text-xl text-[#594B3C] max-w-2xl mx-auto leading-relaxed">
            A continuous, harmonious loop where what comes from the soil returns to nourish the soil.
          </p>
          <div className="w-16 h-0.5 bg-[#8E6E45] mx-auto mt-2"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((st, i) => (
            <div key={st.label} className="relative p-6 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] flex flex-col justify-between text-center space-y-4 group hover:border-[#8E6E45] transition-all">
              <div className="w-8 h-8 rounded-full bg-[#EFE6D6] text-[#7D5A34] font-ui text-xs font-bold flex items-center justify-center mx-auto">
                0{i + 1}
              </div>
              <div className="space-y-1">
                <span className="font-deva text-2xl text-[#7D5A34] block font-semibold">{st.deva}</span>
                <h3 className="font-brand text-xs font-bold tracking-[0.2em] text-[#222E22] uppercase">{st.label}</h3>
              </div>
              <p className="font-editorial text-base text-[#615343] leading-snug">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
