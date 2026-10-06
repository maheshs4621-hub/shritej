import React from 'react';
import { Compass, Leaf, HeartHandshake, ShieldCheck } from 'lucide-react';
export const BrandStory: React.FC = () => {
  return (
    <section id="story" className="py-20 sm:py-28 bg-[#F5EFE3] border-b border-[#E3DAC8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="font-ui text-xs uppercase tracking-[0.3em] text-[#7D5A34] font-bold block">Heritage &amp; Purpose</span>
          <h2 className="font-brand text-3xl sm:text-5xl font-bold tracking-[0.06em] text-[#202E22]">
            Where Ancient Wisdom Meets Responsible Living
          </h2>
          <div className="w-16 h-0.5 bg-[#8E6E45] mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center font-editorial text-lg sm:text-xl text-[#453A2F] leading-relaxed">
          <div className="space-y-6 bg-[#FAF7F2] p-8 sm:p-10 rounded-3xl border border-[#DECDB3] shadow-sm">
            <p>
              <strong className="font-brand text-[#222E22] font-semibold text-base tracking-wider block mb-2">ANCIENT ROOTS, GENTLE HANDS</strong>
              SHRITEJ AYURVEDA was founded on an enduring reverence for sacred Indian herbal knowledge. Rather than manufacturing for rapid commercial cycles, our formulations emerge from time-honoured Ayurvedic traditions and centuries of passed-down wisdom.
            </p>
            <p>
              Every batch is sourced from trusted ethical botanical growers and prepared with traditional mindfulness — without unnecessary synthetic additives, artificial fragrances, or aggressive foaming agents.
            </p>
          </div>
          <div className="space-y-6 bg-[#FAF7F2] p-8 sm:p-10 rounded-3xl border border-[#DECDB3] shadow-sm">
            <p>
              <strong className="font-brand text-[#222E22] font-semibold text-base tracking-wider block mb-2">RESPECT FOR MOTHER EARTH</strong>
              Authentic Ayurveda has never separated human skin wellness from planetary balance. We carry this sacred thread forward through plastic-conscious, biodegradable, and recyclable kraft presentation.
            </p>
            <p>
              When you open a pouch or unwrap an embossed bar, you experience earth returning to earth. A modern Indian wellness sanctuary that honors timeless simplicity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
