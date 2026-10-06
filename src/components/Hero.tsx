import React from 'react';
import { ArrowRight, Feather } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../lib/translations';

interface HeroProps {
  onExplore: () => void;
  onStory: () => void;
  onAyurveda?: () => void;
  language?: Language;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onStory, onAyurveda, language = 'en' }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <section id="hero" className="relative overflow-hidden py-10 sm:py-24 border-b border-[#E7DFCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5 sm:space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE6D6] border border-[#D5C4A7] text-[#694F32] font-ui text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-bold">
              <Feather className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8A6A42]" />
              <span>{t.heroBadge}</span>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <p className="font-deva text-base sm:text-xl text-[#7D5A34] tracking-wide">{t.sanskritTag}</p>
              <h1 className="font-brand text-2xl sm:text-5xl lg:text-6xl font-bold tracking-[0.06em] text-[#222E22] leading-[1.2]">
                {t.heroTitle1}<br />
                <span className="text-[#7D5A34] italic font-editorial font-normal text-3xl sm:text-6xl lg:text-7xl block mt-1">
                  {t.heroTitle2}
                </span>
              </h1>
            </div>
            <p className="font-editorial text-base sm:text-2xl text-[#4A4036] leading-relaxed max-w-xl">
              {t.heroSubtitle}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onExplore}
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-[#F9F6F0] font-ui text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 sm:gap-3"
              >
                {t.exploreBtn} <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={onAyurveda || onStory}
                className="px-5 sm:px-7 py-3.5 sm:py-4 rounded-full border border-[#7D5A34] text-[#3D2F20] bg-[#EFE6D6] hover:bg-[#EAE0D0] font-ui text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-bold transition-all"
              >
                {t.ayurvedaBtn}
              </button>
              <button
                onClick={onStory}
                className="px-5 sm:px-7 py-3.5 sm:py-4 rounded-full border border-[#9A8162] hover:border-[#6B5336] text-[#423528] bg-transparent hover:bg-[#F0E6D5]/60 font-ui text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold transition-all"
              >
                {t.storyBtn}
              </button>
            </div>
            <div className="pt-6 sm:pt-8 border-t border-[#E3DAC8] grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 font-ui text-xs text-[#5C4F40]">
              <div className="space-y-1">
                <span className="block font-bold text-[#222E22] uppercase tracking-wider text-[10px] sm:text-[11px]">
                  {language === 'mr' ? 'नैसर्गिक घटक' : language === 'hi' ? 'प्राकृतिक घटक' : 'Botanical Actives'}
                </span>
                <span className="text-[#7A6B5B] text-[11px] sm:text-xs">
                  {language === 'mr' ? '१००% शुद्ध औषधी वनस्पती' : language === 'hi' ? 'शुद्ध, प्राकृतिक जड़ी-बूटियाँ' : 'Pure, unadulterated herbs'}
                </span>
              </div>
              <div className="space-y-1">
                <span className="block font-bold text-[#222E22] uppercase tracking-wider text-[10px] sm:text-[11px]">
                  {language === 'mr' ? 'पारंपरिक पद्धती' : language === 'hi' ? 'पारंपरिक विधियाँ' : 'Traditional Methods'}
                </span>
                <span className="text-[#7A6B5B] text-[11px] sm:text-xs">
                  {language === 'mr' ? 'हस्तनिर्मित व शुद्ध अर्क' : language === 'hi' ? 'हस्तनिर्मित व भाप अर्क' : 'Cold-cured & steam-distilled'}
                </span>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="block font-bold text-[#222E22] uppercase tracking-wider text-[10px] sm:text-[11px]">
                  {language === 'mr' ? 'पर्यावरण संवर्धन' : language === 'hi' ? 'पर्यावरण रक्षण' : 'Zero Excess'}
                </span>
                <span className="text-[#7A6B5B] text-[11px] sm:text-xs">
                  {language === 'mr' ? 'प्लॅस्टिक-मुक्त पॅकेजिंग' : language === 'hi' ? 'प्लास्टिक-मुक्त पैकेजिंग' : 'Earth-conscious packaging'}
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative p-4 sm:p-7 bg-[#EFE6D6] rounded-3xl sm:rounded-[2.5rem] border border-[#DACBB2] shadow-xl">
              <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 bg-[#7D5A34] text-white font-ui text-[9px] sm:text-[10px] uppercase tracking-[0.2em] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold shadow-md">
                {language === 'mr' ? 'अस्सल उत्पादन' : language === 'hi' ? 'प्रामाणिक उत्पाद' : 'Authentic Pouch'}
              </div>
              <img
                src="/images/shritej-ubtan.jpg"
                alt="Shritej Ayurveda Traditional Ayurvedic Ubtan"
                className="w-64 sm:w-80 rounded-2xl object-cover shadow-lg border border-[#D5C2A4]"
              />
              <div className="mt-3 sm:mt-4 text-center space-y-1">
                <p className="font-brand text-[11px] sm:text-xs tracking-[0.2em] text-[#2F3E30] uppercase font-bold">
                  {language === 'mr' ? 'पारंपरिक आयुर्वेदिक उटणे' : language === 'hi' ? 'पारंपरिक आयुर्वेदिक उबटन' : 'Traditional Ayurvedic Ubtan'}
                </p>
                <p className="font-editorial italic text-xs sm:text-sm text-[#735D43]">
                  {language === 'mr' ? 'मंजिष्ठा • चंदन • हळद • लोध्र • गुलाब' : language === 'hi' ? 'मंजिष्ठा • चंदन • हल्दी • लोध्र • गुलाब' : 'Manjishta • Chandan • Halad • Lodhra • Gulab'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
