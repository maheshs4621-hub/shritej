import React, { useState } from 'react';
import { Leaf, Droplets, Package, ShieldCheck, ArrowRight, Sparkles, Feather } from 'lucide-react';

interface HeritageShowcaseProps {
  onExplore: () => void;
  onDiscoverAyurveda: () => void;
}

export const HeritageShowcase: React.FC<HeritageShowcaseProps> = ({
  onExplore,
  onDiscoverAyurveda,
}) => {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'methods' | 'earth' | 'authenticity'>('philosophy');

  const tabs = [
    {
      id: 'philosophy' as const,
      label: 'Vedic Philosophy',
      deva: '॥ प्रकृति धर्म ॥',
      icon: Leaf,
      title: 'Rooted in the Living Wisdom of Tridoshas',
      subtitle: 'Harmonizing Vata, Pitta, and Kapha with pure plant energetics.',
      content:
        'In classical Ayurveda, skin is not a surface to be bleached or masked with synthetics; it is a living organ reflecting internal equilibrium (Dhatu Samya). Every SHRiTEJ formulation is handcrafted to pacify Pitta inflammation, detoxify Kapha congestion, and deeply nourish Vata dryness using centuries-tested botanical synergies.',
      highlights: [
        'Classical Ashtanga Hridaya taila paka recipes',
        'Pure cooling Manjishta, Chandan, and Lodhra actives',
        'Holistic cellular radiance (Varnya) without harsh abrasives',
      ],
      image: '/images/shritej-ubtan.jpg',
      badge: 'Holistic Tridosha Care',
    },
    {
      id: 'methods' as const,
      label: 'Classical Methods',
      deva: '॥ सिद्ध निर्माण विधि ॥',
      icon: Droplets,
      title: 'Slow Cold-Cured Infusions & Steam Hydrosols',
      subtitle: 'Patience over industrial chemistry. Small-batch authenticity.',
      content:
        'We reject accelerated chemical emulsifiers and artificial preservatives. Our Mysore Sandalwood bath bars cure for six weeks in traditional wooden trays. Our Pure Gulab Jal is slowly extracted using traditional copper Deg-Bhapka hydro-distillation in Kannauj to capture the full botanical soul of Indian Damask rose petals.',
      highlights: [
        'Pure steam-distilled floral hydrosols (Zero alcohol)',
        'Cold-pressed seed and virgin coconut lipid bases',
        'Stone-pulverized raw roots preserving vital plant prana',
      ],
      image: '/images/shritej-soap.jpg',
      badge: 'Artisan Micro-Batch',
    },
    {
      id: 'earth' as const,
      label: 'Earth Stewardship',
      deva: '॥ प्रकृतिः रक्षितव्या नित्यम् ॥',
      icon: Package,
      title: 'Zero Plastic & 100% Biodegradable Packaging',
      subtitle: 'Preserving Mother Nature just as we preserve ancient recipes.',
      content:
        'True Ayurveda worships the Earth. We package our formulations exclusively in unbleached compostable kraft paper, recyclable glass flasks, and aluminum jars. Our shipments are cushioned with shredded recycled paper and sealed with plant-based water-activated tapes—guaranteeing 100% plastic-free express transit pan-India.',
      highlights: [
        'Zero virgin single-use plastic across our catalog',
        'Unbleached breathable kraft stand-up pouches',
        'Fully compostable and plastic-free parcel packaging',
      ],
      image: '/images/shritej-ubtan.jpg',
      badge: 'Plastic-Free Transit',
    },
    {
      id: 'authenticity' as const,
      label: 'Sacred Lineage',
      deva: '॥ विशुद्ध परंपरा ॥',
      icon: ShieldCheck,
      title: 'Handcrafted in Small Batches in India',
      subtitle: 'Honest ingredients, verified provenance, zero hidden chemicals.',
      content:
        'SHRiTEJ AYURVED was founded on an unwavering commitment: no synthetic fragrance oils, no artificial foaming agents, and no parabens. What is written on our labels is exactly what is inside our formulations. Every batch is individually handcrafted with devotion, integrity, and reverence for Indian wellness heritage.',
      highlights: [
        '100% Botanical ingredients with full label transparency',
        'Cruelty-free, vegetarian, and ethically wildcrafted',
        'Laboratory-verified purity and safety standards',
      ],
      image: '/images/shritej-soap.jpg',
      badge: 'Certified Purity',
    },
  ];

  const current = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="py-20 sm:py-28 bg-[#F6F0E6] border-b border-[#E3DAC8] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE0CF] border border-[#D5C2A4] text-[#7D5A34] font-ui text-[10px] uppercase tracking-[0.25em] font-bold">
            <Feather className="w-3.5 h-3.5 text-[#7D5A34]" />
            <span>Sacred Craftsmanship &amp; Heritage</span>
          </div>
          <h2 className="font-brand text-3xl sm:text-5xl font-bold tracking-[0.06em] text-[#222E22]">
            The Pillars of SHRiTEJ
          </h2>
          <p className="font-editorial text-lg sm:text-xl text-[#594B3C] max-w-2xl mx-auto leading-relaxed">
            Where classical Ayurvedic wisdom meets uncompromising purity and mindful environmental stewardship.
          </p>
          <div className="w-16 h-0.5 bg-[#8E6E45] mx-auto mt-2"></div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-full bg-[#EAE0CF] border border-[#DECDB3] max-w-full overflow-x-auto shadow-inner">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={
                      'px-4 sm:px-6 py-2.5 rounded-full font-ui text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ' +
                      (isActive
                        ? 'bg-[#2D3E2F] text-white shadow-md'
                        : 'text-[#5C4A38] hover:text-[#222E22] hover:bg-[#F2E8DC]')
                    }
                  >
                    <Icon className={'w-3.5 h-3.5 ' + (isActive ? 'text-[#C9A24D]' : 'text-[#7D5A34]')} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Showcase Stage */}
        <div className="bg-[#FAF7F2] rounded-3xl sm:rounded-[2.5rem] border border-[#DECDB3] p-6 sm:p-12 shadow-xl shadow-[#7D5A34]/5 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="font-deva text-base sm:text-lg text-[#7D5A34] tracking-wide block">
                {current.deva}
              </span>
              <h3 className="font-brand text-2xl sm:text-4xl font-bold text-[#222E22] leading-tight">
                {current.title}
              </h3>
              <p className="font-editorial italic text-base sm:text-lg text-[#7D5A34]">
                {current.subtitle}
              </p>
            </div>

            <p className="font-editorial text-base sm:text-lg text-[#4E4133] leading-relaxed">
              {current.content}
            </p>

            {/* Bullet Highlights */}
            <div className="space-y-3 pt-2">
              {current.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm font-ui text-[#443729]">
                  <div className="w-5 h-5 rounded-full bg-[#EAE0CF] text-[#2D3E2F] flex items-center justify-center shrink-0 mt-0.5 border border-[#DACBB2]">
                    <Sparkles className="w-3 h-3 text-[#7D5A34]" />
                  </div>
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onExplore}
                className="px-6 py-3.5 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md flex items-center gap-2"
              >
                Shop Formulations <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onDiscoverAyurveda}
                className="px-6 py-3.5 rounded-full border border-[#7D5A34] text-[#473521] hover:bg-[#F0E6D5] font-ui text-xs uppercase tracking-[0.2em] font-bold transition-all"
              >
                Explore Ayurveda Wisdom
              </button>
            </div>
          </div>

          {/* Right Column: Visual Stage */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-4 sm:p-6 bg-[#F4EDE2] rounded-3xl border border-[#DECDB3] shadow-lg max-w-sm w-full">
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 rounded-full bg-[#2D3E2F] text-white font-ui text-[9px] uppercase tracking-wider font-bold shadow-sm">
                  {current.badge}
                </span>
              </div>
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-64 sm:h-80 object-cover rounded-2xl border border-[#DACBB2] shadow-sm"
              />
              <div className="mt-4 text-center space-y-1">
                <p className="font-brand text-xs uppercase tracking-[0.2em] text-[#2D3E2F] font-bold">
                  SHRiTEJ Pure Apothecary
                </p>
                <p className="font-editorial italic text-xs text-[#735D43]">
                  100% Botanical Actives • Cold-Cured • Made in India
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Pillar Trust Ribbon (Luxury D2C Standard) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#DECDB3] flex items-center gap-3.5 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#2D3E2F] text-white flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 text-[#C9A24D]" />
            </div>
            <div>
              <h4 className="font-brand font-bold text-xs uppercase tracking-wider text-[#222E22]">100% Botanical</h4>
              <p className="font-ui text-[11px] text-[#7A6B5B]">Raw, unadulterated herbs</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#DECDB3] flex items-center gap-3.5 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#2D3E2F] text-white flex items-center justify-center shrink-0">
              <Droplets className="w-5 h-5 text-[#C9A24D]" />
            </div>
            <div>
              <h4 className="font-brand font-bold text-xs uppercase tracking-wider text-[#222E22]">Steam Extracted</h4>
              <p className="font-ui text-[11px] text-[#7A6B5B]">Traditional copper distillation</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#DECDB3] flex items-center gap-3.5 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#2D3E2F] text-white flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-[#C9A24D]" />
            </div>
            <div>
              <h4 className="font-brand font-bold text-xs uppercase tracking-wider text-[#222E22]">Plastic-Free</h4>
              <p className="font-ui text-[11px] text-[#7A6B5B]">Compostable kraft packaging</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#DECDB3] flex items-center gap-3.5 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#2D3E2F] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#C9A24D]" />
            </div>
            <div>
              <h4 className="font-brand font-bold text-xs uppercase tracking-wider text-[#222E22]">Classical Recipes</h4>
              <p className="font-ui text-[11px] text-[#7A6B5B]">Authentic Ayurvedic lineage</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
