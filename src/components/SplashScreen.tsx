import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsFading(true);
          setTimeout(onFinish, 600);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onFinish]);

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(onFinish, 300);
  };

  return (
    <div
      className={
        'fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1C2A1E] text-[#FDFBF7] transition-opacity duration-700 ' +
        (isFading ? 'opacity-0 pointer-events-none' : 'opacity-100')
      }
    >
      {/* Subtle Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,77,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Center Sacred Emblem */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg mx-auto space-y-6">
        
        {/* Golden Botanical Logo Emblem */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#C9A24D]/60 flex items-center justify-center bg-[#233526] shadow-[0_0_50px_rgba(201,162,77,0.35)] animate-pulse">
          <svg viewBox="0 0 100 100" className="w-16 h-16 fill-current text-[#EBE0CE]">
            <path
              d="M50 12 C45 34 28 44 18 50 C28 56 45 66 50 88 C55 66 72 56 82 50 C72 44 55 34 50 12 Z"
              fill="#C9A24D"
              opacity="0.95"
            />
            <path
              d="M50 28 C47 41 38 48 32 50 C38 52 47 59 50 72 C53 59 62 52 68 50 C62 48 53 41 50 28 Z"
              fill="#FDFBF7"
            />
            <circle cx="50" cy="50" r="4.5" fill="#C9A24D" />
          </svg>
        </div>

        {/* Sanskrit Inscription */}
        <div className="space-y-1">
          <span className="font-brand text-xs sm:text-sm text-[#C9A24D] tracking-[0.3em] uppercase block font-semibold">
            सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः
          </span>
          <h1 className="font-brand text-3xl sm:text-5xl font-extrabold tracking-[0.22em] text-[#FDFBF7] uppercase drop-shadow-md">
            SHRiTEJ AYURVED
          </h1>
          <p className="font-ui text-[10px] sm:text-[11px] tracking-[0.35em] text-[#C5A880] uppercase font-bold">
            Pure Vedic Botanical Formulations
          </p>
        </div>

        {/* Luxury Gold Progress Bar */}
        <div className="w-56 sm:w-72 space-y-2 pt-4">
          <div className="w-full h-1 bg-[#2D3E2F] rounded-full overflow-hidden border border-[#C9A24D]/20">
            <div
              className="h-full bg-gradient-to-r from-[#C9A24D] via-[#E5C07B] to-[#C9A24D] rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-ui tracking-wider text-[#A89885]">
            <span>Awakening Botanical Vitality</span>
            <span className="font-mono text-[#C9A24D] font-bold">{progress}%</span>
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="pt-2 text-xs font-ui uppercase tracking-[0.25em] text-[#C5A880] hover:text-[#FDFBF7] transition-colors flex items-center gap-1.5"
        >
          <span>Enter Sanctuary</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
};