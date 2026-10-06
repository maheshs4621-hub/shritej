import React from 'react';
export const TraditionalMethods: React.FC = () => {
  const steps = [
    { num: 'I', title: 'SELECTED NATURALLY', desc: 'Seasonal hand-harvesting of mature botanicals at peak potency according to solar and lunar cycles.' },
    { num: 'II', title: 'PREPARED WITH CARE', desc: 'Sun-dried in sterile shade, stone-pulverized slowly to avoid heat degradation of vital enzymes.' },
    { num: 'III', title: 'AUTHENTIC PRACTICES', desc: 'Classical oil decoction (Sneha Kalpana) and deg-bhapka steam hydro-distillation from centuries past.' },
    { num: 'IV', title: 'THOUGHTFULLY PACKED', desc: 'Sealed in unbleached biodegradable kraft pouches and handmade wraps without synthetic coatings.' },
    { num: 'V', title: 'DELIVERED TO YOU', desc: 'Directly to your daily bath ritual, reconnecting your modern routine with sacred Indian earth.' }
  ];
  return (
    <section id="methods" className="py-20 sm:py-28 bg-[#F8F5EE] border-b border-[#E3DAC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="font-ui text-xs uppercase tracking-[0.3em] text-[#7D5A34] font-bold block">Process &amp; Care</span>
          <h2 className="font-brand text-3xl sm:text-5xl font-bold tracking-[0.06em] text-[#202E22]">
            The Journey of an Ayurvedic Formulation
          </h2>
          <div className="w-16 h-0.5 bg-[#8E6E45] mx-auto mt-2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((st) => (
            <div key={st.num} className="p-7 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] flex flex-col justify-between space-y-4 hover:border-[#8E6E45] transition-all">
              <span className="font-editorial italic text-3xl text-[#8A6D47] font-bold">{st.num}</span>
              <div className="space-y-2">
                <h3 className="font-brand text-xs font-bold tracking-[0.18em] text-[#222E22] uppercase">{st.title}</h3>
                <p className="font-editorial text-base text-[#594B3C] leading-snug">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
