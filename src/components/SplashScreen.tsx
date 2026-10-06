import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Prevent scrolling while splash screen is active
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5;
        if (next >= 100) {
          clearInterval(interval);
          setIsFading(true);
          setTimeout(() => {
            document.body.style.overflow = 'unset';
            onFinish();
          }, 450);
          return 100;
        }
        return next;
      });
    }, 70);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'unset';
    };
  }, [onFinish]);

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(() => {
      document.body.style.overflow = 'unset';
      onFinish();
    }, 200);
  };

  return (
    <div
      onClick={handleSkip}
      className={
        'fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FAF7F2] text-[#2C2723] transition-opacity duration-500 cursor-pointer select-none ' +
        (isFading ? 'opacity-0 pointer-events-none' : 'opacity-100')
      }
      style={{
        backgroundImage: 'radial-gradient(circle at center, #FFFFFF 0%, #F5ECE0 60%, #EFE4D3 100%)',
      }}
    >
      {/* Subtle Botanical Leaf Watermark Aura */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#E8DFC9]/40 blur-3xl pointer-events-none" />

      {/* Center Refreshing Sacred Emblem & Typography */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm mx-auto space-y-5">
        
        {/* Elegant Shritej Botanical Logo Badge */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#D4AF37]/70 flex items-center justify-center bg-[#2D3E2F] text-[#FAF7F2] shadow-xl shadow-[#7D5A34]/15 transition-transform duration-700 hover:scale-105">
          <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 fill-current text-[#FAF7F2]">
            <path
              d="M50 14 C45 34 28 44 18 50 C28 56 45 66 50 86 C55 66 72 56 82 50 C72 44 55 34 50 14 Z"
              fill="#C9A24D"
              opacity="0.95"
            />
            <path
              d="M50 28 C47 41 38 48 32 50 C38 52 47 59 50 72 C53 59 62 52 68 50 C62 48 53 41 50 28 Z"
              fill="#FAF7F2"
            />
            <circle cx="50" cy="50" r="4" fill="#C9A24D" />
          </svg>
        </div>

        {/* Minimal Sanskrit Mottos & Clean Typography */}
        <div className="space-y-1.5">
          <p className="font-deva text-xs sm:text-sm text-[#7D5A34] tracking-[0.2em] font-medium">
            ॥ प्रकृतिः रक्षितव्या नित्यम् ॥
          </p>

          <h1 className="font-brand text-2xl sm:text-4xl font-bold tracking-[0.22em] text-[#222E22] uppercase">
            SHRITEJ <span className="text-[#7D5A34] font-normal">AYURVED</span>
          </h1>

          <p className="font-editorial italic text-sm sm:text-base text-[#6B5A46] tracking-wide">
            Born from Nature • Rooted in Ayurveda
          </p>
        </div>

        {/* Minimalist Champagne Gold Progress Bar */}
        <div className="w-48 sm:w-56 space-y-2 pt-2">
          <div className="w-full h-1 bg-[#DECDB3] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#7D5A34] via-[#C9A24D] to-[#2D3E2F] rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] font-ui uppercase tracking-[0.25em] text-[#8C7A65]">
            Pure Botanical Sanctuary
          </p>
        </div>

      </div>
    </div>
  );
};
