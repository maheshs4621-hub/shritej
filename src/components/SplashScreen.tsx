import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [milestone, setMilestone] = useState('हस्तसंगृहीत वनौषधी संकलन • Handcrafting Pure Botanical Extracts...');

  useEffect(() => {
    // Disable body scroll while splash screen is active
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 3;
        if (next >= 100) {
          clearInterval(interval);
          setMilestone('आरोग्यम सर्वसंपदा • Welcome to SHRiTEJ Sanctuary...');
          setIsFading(true);
          setTimeout(() => {
            document.body.style.overflow = 'unset';
            onFinish();
          }, 700);
          return 100;
        }

        if (next >= 75) {
          setMilestone('सिद्ध तैल व उटणे संस्कार • Cold-Infusing Artisanal Ayurvedic Formulations...');
        } else if (next >= 45) {
          setMilestone('कन्नौज गुलाब वाष्प आसवन • Steam-Distilling Pure Kannauj Hydrosols...');
        } else if (next >= 20) {
          setMilestone('हस्तसंगृहीत वनौषधी संकलन • Gathering Sacred Organic Botanicals...');
        }

        return next;
      });
    }, 65);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'unset';
    };
  }, [onFinish]);

  const handleEnter = () => {
    setIsFading(true);
    setTimeout(() => {
      document.body.style.overflow = 'unset';
      onFinish();
    }, 350);
  };

  return (
    <div
      className={
        'fixed inset-0 z-[99999] flex flex-col justify-between items-center bg-[#0E1A11] text-[#FAF7F2] transition-all duration-700 select-none overflow-hidden ' +
        (isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100')
      }
      style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.12) 0%, rgba(14, 26, 17, 0.98) 75%)',
      }}
    >
      {/* Traditional Indian Palace Filigree Corner Ornaments */}
      {/* Top Left */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-16 h-16 sm:w-24 sm:h-24 pointer-events-none opacity-60">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#D4AF37]" strokeWidth="1.5">
          <path d="M 0 0 L 70 0 C 40 10 10 40 0 70 Z" fill="rgba(212, 175, 55, 0.08)" />
          <path d="M 0 25 C 20 25 25 20 25 0" />
          <path d="M 0 50 C 35 45 45 35 50 0" />
          <circle cx="20" cy="20" r="3" fill="#D4AF37" />
          <circle cx="8" cy="8" r="2" fill="#D4AF37" />
        </svg>
      </div>

      {/* Top Right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-16 h-16 sm:w-24 sm:h-24 pointer-events-none opacity-60 scale-x-[-1]">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#D4AF37]" strokeWidth="1.5">
          <path d="M 0 0 L 70 0 C 40 10 10 40 0 70 Z" fill="rgba(212, 175, 55, 0.08)" />
          <path d="M 0 25 C 20 25 25 20 25 0" />
          <path d="M 0 50 C 35 45 45 35 50 0" />
          <circle cx="20" cy="20" r="3" fill="#D4AF37" />
          <circle cx="8" cy="8" r="2" fill="#D4AF37" />
        </svg>
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-16 h-16 sm:w-24 sm:h-24 pointer-events-none opacity-60 scale-y-[-1]">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#D4AF37]" strokeWidth="1.5">
          <path d="M 0 0 L 70 0 C 40 10 10 40 0 70 Z" fill="rgba(212, 175, 55, 0.08)" />
          <path d="M 0 25 C 20 25 25 20 25 0" />
          <path d="M 0 50 C 35 45 45 35 50 0" />
          <circle cx="20" cy="20" r="3" fill="#D4AF37" />
          <circle cx="8" cy="8" r="2" fill="#D4AF37" />
        </svg>
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-16 h-16 sm:w-24 sm:h-24 pointer-events-none opacity-60 scale-[-1]">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#D4AF37]" strokeWidth="1.5">
          <path d="M 0 0 L 70 0 C 40 10 10 40 0 70 Z" fill="rgba(212, 175, 55, 0.08)" />
          <path d="M 0 25 C 20 25 25 20 25 0" />
          <path d="M 0 50 C 35 45 45 35 50 0" />
          <circle cx="20" cy="20" r="3" fill="#D4AF37" />
          <circle cx="8" cy="8" r="2" fill="#D4AF37" />
        </svg>
      </div>

      {/* Top Auspicious Inscription */}
      <div className="pt-6 sm:pt-8 text-center z-10 space-y-1">
        <div className="flex items-center justify-center gap-2 text-[#D4AF37] opacity-80 text-xs sm:text-sm">
          <span>❖</span>
          <span className="font-deva font-medium tracking-[0.25em] text-xs sm:text-sm">
            ॥ ॐ श्री धन्वन्तरये नमः ॥
          </span>
          <span>❖</span>
        </div>
        <p className="font-ui text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#A89885]">
          Ancient Ayurvedic Sanctuary
        </p>
      </div>

      {/* Centerpiece: Sacred Rotating Mandala + Glowing Diya / Botanical Emblem */}
      <div className="relative flex flex-col items-center justify-center my-auto z-10 px-4 text-center">
        
        {/* Sacred Concentric Rotating Mandala */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
          
          {/* Rotating Outer Sacred Mandala SVG */}
          <div className="absolute inset-0 animate-spin-slow opacity-35 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full stroke-[#D4AF37] fill-none" strokeWidth="0.8">
              {/* Outer Ring */}
              <circle cx="100" cy="100" r="92" strokeDasharray="3 3" />
              <circle cx="100" cy="100" r="82" />
              
              {/* 12 Petal Lotus Geometric Construction */}
              {[...Array(12)].map((_, i) => (
                <path
                  key={i}
                  d="M 100 100 C 90 40, 110 40, 100 18 C 90 40, 110 40, 100 100"
                  transform={`rotate(${i * 30} 100 100)`}
                  fill="rgba(212, 175, 55, 0.04)"
                />
              ))}

              {/* Middle Floral Star */}
              {[...Array(8)].map((_, i) => (
                <polygon
                  key={i}
                  points="100,50 110,85 100,100 90,85"
                  transform={`rotate(${i * 45} 100 100)`}
                  fill="rgba(212, 175, 55, 0.06)"
                />
              ))}

              <circle cx="100" cy="100" r="48" strokeDasharray="2 4" />
              <circle cx="100" cy="100" r="32" />
            </svg>
          </div>

          {/* Central Sacred Aura Glow */}
          <div className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.3)_0%,rgba(45,62,47,0.1)_60%,transparent_80%)] animate-pulse-glow" />

          {/* Traditional Brass Diya & Sacred Botanical Leaf Badge */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            
            {/* Flickering Diya Flame (दिव्याची ज्योत) */}
            <div className="relative -mb-1 animate-flicker flex items-center justify-center">
              <svg viewBox="0 0 40 60" className="w-8 h-12 sm:w-10 sm:h-14">
                {/* Outer Golden Aura */}
                <path
                  d="M 20 5 C 10 25, 4 35, 7 48 C 10 56, 30 56, 33 48 C 36 35, 30 25, 20 5 Z"
                  fill="url(#outerFlame)"
                />
                {/* Inner Sacred Light */}
                <path
                  d="M 20 18 C 14 30, 12 36, 14 44 C 16 50, 24 50, 26 44 C 28 36, 26 30, 20 18 Z"
                  fill="#FFF7D6"
                />
                <defs>
                  <linearGradient id="outerFlame" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFF2A3" />
                    <stop offset="35%" stopColor="#FFB703" />
                    <stop offset="85%" stopColor="#FB8500" />
                    <stop offset="100%" stopColor="#D9381E" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Traditional Handcrafted Brass Diya (समई / पणती) Container */}
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-[#1A2A1D] shadow-[0_0_30px_rgba(212,175,55,0.4)]">
              <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 fill-current text-[#FAF7F2]">
                <path
                  d="M50 12 C45 34 28 44 18 50 C28 56 45 66 50 88 C55 66 72 56 82 50 C72 44 55 34 50 12 Z"
                  fill="#D4AF37"
                  opacity="0.95"
                />
                <path
                  d="M50 28 C47 41 38 48 32 50 C38 52 47 59 50 72 C53 59 62 52 68 50 C62 48 53 41 50 28 Z"
                  fill="#FAF7F2"
                />
                <circle cx="50" cy="50" r="4.5" fill="#D4AF37" />
              </svg>
            </div>

          </div>
        </div>

        {/* Brand Name & Traditional Inscriptions */}
        <div className="space-y-2 mt-4 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#1F2F22] border border-[#D4AF37]/40 text-[#D4AF37] font-ui text-[9px] uppercase tracking-[0.25em]">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>॥ विशुद्ध आयुर्वेदिक परंपरा ॥</span>
          </div>

          <h1 className="font-brand text-3xl sm:text-5xl font-extrabold tracking-[0.25em] text-[#FAF7F2] uppercase drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)]">
            <span className="gold-shimmer-text">SHRiTEJ</span>
            <span className="block text-xl sm:text-2xl tracking-[0.45em] text-[#E0D1B5] font-normal mt-1">
              AYURVED
            </span>
          </h1>

          <p className="font-deva text-sm sm:text-base text-[#D4AF37] tracking-wider font-semibold">
            ॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥
          </p>

          <p className="font-editorial italic text-xs sm:text-sm text-[#B8A793] max-w-xs mx-auto leading-relaxed">
            Handcrafted Ayurvedic Formulations Born from Sacred Classical Traditions
          </p>
        </div>

      </div>

      {/* Bottom Loading Progress & Milestones */}
      <div className="pb-8 sm:pb-12 w-full max-w-sm px-6 flex flex-col items-center space-y-4 z-10 text-center">
        
        {/* Dynamic Ayurvedic Milestone Message */}
        <p className="font-ui text-[11px] sm:text-xs text-[#E6D4B8] tracking-wider transition-all duration-300 min-h-[32px] flex items-center justify-center">
          {milestone}
        </p>

        {/* Luxury Gold Filigree Progress Bar */}
        <div className="w-full space-y-1.5">
          <div className="w-full h-2 bg-[#1B281D] rounded-full overflow-hidden border border-[#D4AF37]/35 p-[2px] shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#997300] via-[#FFD700] to-[#FFF3B0] rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(255,215,0,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center text-[10px] font-ui tracking-widest text-[#9C8B76] uppercase">
            <span>प्रकृतिः रक्षितव्या नित्यम्</span>
            <span className="font-mono text-[#D4AF37] font-bold text-xs">{progress}%</span>
          </div>
        </div>

        {/* Quick Enter Action Button */}
        <button
          onClick={handleEnter}
          className="mt-2 group px-5 py-2 rounded-full border border-[#D4AF37]/50 bg-[#162518]/80 hover:bg-[#203322] text-[#E6D4B8] hover:text-white font-ui text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold transition-all shadow-md flex items-center gap-2"
        >
          <span>Enter Sanctuary • प्रवेश करा</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#D4AF37]" />
        </button>

      </div>
    </div>
  );
};
