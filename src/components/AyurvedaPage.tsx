import React from 'react';
import { Sun, Moon, Wind, Droplets, Feather, ShieldCheck, ArrowRight, Clock, Utensils, AlertCircle, CheckCircle2, Coffee, Sparkles } from 'lucide-react';

interface AyurvedaPageProps {
  onShopClick: () => void;
  onBack?: () => void;
}

export const AyurvedaPage: React.FC<AyurvedaPageProps> = ({ onShopClick, onBack }) => {
  return (
    <div className="py-12 sm:py-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
                {onBack && (
          <div className="flex items-center justify-between pb-2">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 font-ui text-xs font-bold uppercase tracking-wider text-[#7D5A34] hover:text-[#523B22] px-4 py-2 rounded-full bg-[#EFE6D6] border border-[#DECDB3] transition-colors"
            >
              ← Back to Home
            </button>
            <span className="font-ui text-xs text-[#7A6B5B]">Ancient Indian Wellness Guide</span>
          </div>
        )}

        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE6D6] border border-[#D5C4A7] text-[#694F32] font-ui text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold">
            <Feather className="w-3.5 h-3.5 text-[#8A6A42]" />
            <span>Classical Science of Healthy Life</span>
          </div>
          <p className="font-deva text-lg sm:text-2xl text-[#7D5A34] tracking-wider">॥ दिनचर्या स्वास्थ्यस्य मूलम् ॥</p>
          <h1 className="font-brand text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.06em] text-[#222E22] leading-tight">
            Discover Ayurveda: Daily Routine &amp; Simple Living
          </h1>
          <p className="font-editorial text-lg sm:text-2xl text-[#594B3C] leading-relaxed max-w-2xl mx-auto">
            Ayurveda is not complicated theory. It is simple, practical wisdom about when to wake up, how to eat, when to sleep, and how to stay energized naturally every day.
          </p>
          <div className="w-20 h-0.5 bg-[#8E6E45] mx-auto mt-3"></div>
        </div>

        {/* 1. IDEAL WAKE UP & SLEEP TIMINGS (DINACHARYA) */}
        <div className="bg-[#F4EDE2] border border-[#DECDB3] rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm">
          <div className="space-y-2">
            <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#7D5A34] font-bold block">
              Time Rhythms • Dinacharya
            </span>
            <h2 className="font-brand text-2xl sm:text-3xl font-bold text-[#222E22]">
              Best Timings to Wake Up and Sleep
            </h2>
            <p className="font-editorial text-base sm:text-lg text-[#5C4D3E]">
              According to classical Ayurveda, aligning your body clock with the sun produces natural energy, balanced digestion, and radiant skin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Wake Up Card */}
            <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EBE0CD] flex items-center justify-center text-[#7D5A34]">
                  <Sun className="w-5 h-5 text-[#C9A24D]" />
                </div>
                <div>
                  <h3 className="font-brand text-base font-bold text-[#222E22]">Wake Up Time</h3>
                  <span className="font-ui text-xs font-bold text-[#7D5A34] uppercase tracking-wider">
                    5:30 AM – 6:30 AM (Brahma Muhurta)
                  </span>
                </div>
              </div>
              <p className="font-editorial text-sm sm:text-base text-[#4C4033] leading-relaxed">
                Waking up before or right around sunrise keeps you in the light, creative <strong>Vata</strong> energy zone. If you wake up after 7:00 AM, the heavy <strong>Kapha</strong> energy takes over, causing lethargy, sluggish digestion, and morning tiredness.
              </p>
              <div className="p-3 bg-[#F4EDE2] rounded-xl text-xs font-ui text-[#594B3C] space-y-1">
                <strong>First Morning Step:</strong> Drink a glass of warm or copper-vessel water (Ushapan) to gently wake up the gut and clear toxins.
              </div>
            </div>

            {/* Sleep Card */}
            <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EBE0CD] flex items-center justify-center text-[#2D3E2F]">
                  <Moon className="w-5 h-5 text-[#2D3E2F]" />
                </div>
                <div>
                  <h3 className="font-brand text-base font-bold text-[#222E22]">Sleep Time</h3>
                  <span className="font-ui text-xs font-bold text-[#2D3E2F] uppercase tracking-wider">
                    10:00 PM – 10:30 PM (Kapha Phase)
                  </span>
                </div>
              </div>
              <p className="font-editorial text-sm sm:text-base text-[#4C4033] leading-relaxed">
                Between 6:00 PM and 10:00 PM, earth energy brings natural heaviness. Going to sleep by 10:00 PM gives deep, restorative rest. After 10:00 PM, <strong>Pitta (fire)</strong> rises again, causing midnight hunger and sleeplessness.
              </p>
              <div className="p-3 bg-[#F4EDE2] rounded-xl text-xs font-ui text-[#594B3C] space-y-1">
                <strong>Night Ritual:</strong> Put digital screens away 45 minutes before bed; wash feet with warm water or massage soles with pure sesame oil.
              </div>
            </div>

          </div>
        </div>

        {/* 2. SIMPLE AYURVEDIC DAILY ROUTINE (STEP-BY-STEP) */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#7D5A34] font-bold">
              Step-by-Step Flow
            </span>
            <h2 className="font-brand text-2xl sm:text-4xl font-bold text-[#222E22]">
              The Daily Ayurvedic Flow Made Simple
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-6 space-y-3 shadow-sm flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-brand text-xs font-bold px-2.5 py-1 rounded-full bg-[#EBE0CE] text-[#7D5A34] inline-block">
                  01 • MORNING
                </span>
                <h3 className="font-brand text-base font-bold text-[#222E22]">Awaken &amp; Cleanse</h3>
                <p className="font-editorial text-sm text-[#544537] leading-relaxed">
                  Clean your tongue with a copper cleaner to remove toxins (Ama). Splash eyes with cool water. Drink warm water to stimulate digestion.
                </p>
              </div>
              <span className="font-ui text-[11px] text-[#7D6B58] font-semibold border-t border-[#DECDB3] pt-2">
                Duration: 10 mins
              </span>
            </div>

            <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-6 space-y-3 shadow-sm flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-brand text-xs font-bold px-2.5 py-1 rounded-full bg-[#EBE0CE] text-[#7D5A34] inline-block">
                  02 • SNANA (BATH)
                </span>
                <h3 className="font-brand text-base font-bold text-[#222E22]">Nourish &amp; Bathe</h3>
                <p className="font-editorial text-sm text-[#544537] leading-relaxed">
                  Apply botanical <strong>SHRITEJ Ubtan</strong> or Mysore Sandalwood soap. This stimulates lymphatic circulation and leaves skin naturally radiant.
                </p>
              </div>
              <span className="font-ui text-[11px] text-[#7D6B58] font-semibold border-t border-[#DECDB3] pt-2">
                Traditional Snana
              </span>
            </div>

            <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-6 space-y-3 shadow-sm flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-brand text-xs font-bold px-2.5 py-1 rounded-full bg-[#EBE0CE] text-[#7D5A34] inline-block">
                  03 • MID-DAY (12-2 PM)
                </span>
                <h3 className="font-brand text-base font-bold text-[#222E22]">Main Hearty Meal</h3>
                <p className="font-editorial text-sm text-[#544537] leading-relaxed">
                  Digestive fire (Agni) is at peak when the sun is highest. Eat your largest, most nourishing meal here. Sit calmly without mobile screens.
                </p>
              </div>
              <span className="font-ui text-[11px] text-[#7D6B58] font-semibold border-t border-[#DECDB3] pt-2">
                Peak Agni Time
              </span>
            </div>

            <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-6 space-y-3 shadow-sm flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-brand text-xs font-bold px-2.5 py-1 rounded-full bg-[#EBE0CE] text-[#7D5A34] inline-block">
                  04 • EVENING (7-8 PM)
                </span>
                <h3 className="font-brand text-base font-bold text-[#222E22]">Light Supper &amp; Wind Down</h3>
                <p className="font-editorial text-sm text-[#544537] leading-relaxed">
                  Eat a light, warm dinner before 8:00 PM (khichdi, vegetable soup). Take a quiet 100-step walk (Shatapawali) before sleeping.
                </p>
              </div>
              <span className="font-ui text-[11px] text-[#7D6B58] font-semibold border-t border-[#DECDB3] pt-2">
                Early Light Dinner
              </span>
            </div>

          </div>
        </div>

        {/* 3. WHAT TO EAT VS WHAT TO AVOID */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#7D5A34] font-bold">
              Food Wisdom • Ahara
            </span>
            <h2 className="font-brand text-2xl sm:text-4xl font-bold text-[#222E22]">
              What to Eat and What Not to Eat
            </h2>
            <p className="font-editorial text-base sm:text-lg text-[#615343] max-w-2xl mx-auto">
              Ayurveda considers food as pure medicine. Simple wholesome choices protect your gut, enhance natural immunity, and prevent chronic diseases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* What to Eat (Satvik & Nourishing) */}
            <div className="bg-[#FAF7F2] border-2 border-[#2D3E2F]/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E2EBDD] text-[#2D3E2F] flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-brand text-xl font-bold text-[#2D3E2F]">What to Eat (Nourish Your Body)</h3>
                  <span className="font-ui text-[10px] text-[#556957] uppercase font-bold tracking-wider">
                    Fresh • Warm • Seasonal • Naturally Cooked
                  </span>
                </div>
              </div>

              <ul className="space-y-3 font-editorial text-base sm:text-lg text-[#3D3328]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2D3E2F] font-bold mt-1">✓</span>
                  <span><strong>Freshly Cooked Warm Food:</strong> Always eat meals within 3-4 hours of preparation when vital prana is active.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2D3E2F] font-bold mt-1">✓</span>
                  <span><strong>Pure Desi Cow Ghee:</strong> 1 teaspoon of A2 Cow Ghee lubricates gut lining, aids nutrient absorption, and keeps skin supple.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2D3E2F] font-bold mt-1">✓</span>
                  <span><strong>Digestive Spices:</strong> Cumin (Jeera), Ginger (Adrak), Turmeric (Haldi), Fennel (Saunf), and Ajwain in cooking to prevent bloating.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2D3E2F] font-bold mt-1">✓</span>
                  <span><strong>Seasonal Fruits:</strong> Eat fruits separately (morning or mid-afternoon), never mixed with milk or immediately after heavy meals.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2D3E2F] font-bold mt-1">✓</span>
                  <span><strong>Warm Water:</strong> Sip lukewarm or room-temperature water. Avoid ice water that freezes digestive enzymes.</span>
                </li>
              </ul>
            </div>

            {/* What NOT to Eat (Toxins & Imbalance) */}
            <div className="bg-[#FAF7F2] border-2 border-rose-800/30 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-brand text-xl font-bold text-rose-900">What to Avoid (Reduces Toxins / Ama)</h3>
                  <span className="font-ui text-[10px] text-rose-700 uppercase font-bold tracking-wider">
                    Processed • Stale • Cold • Incompatible
                  </span>
                </div>
              </div>

              <ul className="space-y-3 font-editorial text-base sm:text-lg text-[#3D3328]">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-700 font-bold mt-1">✕</span>
                  <span><strong>Ice-Cold &amp; Refrigerated Water:</strong> Directly extinguishes digestive fire (Agni), leading to slow metabolism and belly fat.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-700 font-bold mt-1">✕</span>
                  <span><strong>Stale / Overnight Reheated Food:</strong> Loses prana energy and generates sticky metabolic toxins (Ama) that clog pores.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-700 font-bold mt-1">✕</span>
                  <span><strong>Incompatible Food Combinations (Viruddha Ahara):</strong> Never combine milk with citrus fruits, fish with milk, or heating honey.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-700 font-bold mt-1">✕</span>
                  <span><strong>Excess Refined White Sugar &amp; Maida:</strong> Causes heavy sluggishness, hormonal imbalance, and skin breakouts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-700 font-bold mt-1">✕</span>
                  <span><strong>Eating When Not Truly Hungry:</strong> Eating without true hunger forces the liver and stomach to store half-digested food as fat.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* 4. THE TRI-DOSHA PRINCIPLE (VATA, PITTA, KAPHA) */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#7D5A34] font-bold">Prakriti &amp; Elements</span>
            <h2 className="font-brand text-2xl sm:text-4xl font-bold text-[#222E22]">The Three Classical Energies (Doshas)</h2>
            <p className="font-editorial text-base sm:text-lg text-[#615343] max-w-2xl mx-auto">
              Every person is a unique blend of these three body principles. Understanding your primary dosha helps you balance your diet and lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vata */}
            <div className="p-8 bg-[#F4EDE2] rounded-3xl border border-[#DECDB3] space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#EBE0CD] flex items-center justify-center text-[#7D5A34]">
                <Wind className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="font-deva text-xl text-[#7D5A34] block">वात (Vata)</span>
                <h3 className="font-brand text-base font-bold tracking-wider text-[#222E22] uppercase">Air &amp; Ether (Wind)</h3>
              </div>
              <p className="font-editorial text-base text-[#594B3C] leading-relaxed">
                Controls body movement, blood flow, and thoughts. When out of balance: dry skin, anxiety, cold hands, constipation. Balanced by warm meals, sweet root vegetables, and regular oil massage.
              </p>
            </div>

            {/* Pitta */}
            <div className="p-8 bg-[#F4EDE2] rounded-3xl border border-[#DECDB3] space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#EBE0CD] flex items-center justify-center text-[#7D5A34]">
                <Sun className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="font-deva text-xl text-[#7D5A34] block">पित्त (Pitta)</span>
                <h3 className="font-brand text-base font-bold tracking-wider text-[#222E22] uppercase">Fire &amp; Water (Digestive Heat)</h3>
              </div>
              <p className="font-editorial text-base text-[#594B3C] leading-relaxed">
                Controls digestion, metabolism, and body temperature. When out of balance: acid reflux, red skin irritation, acne, anger. Balanced by cooling Kannauj Rose Water, Chandan, sweet fruits, and cucumber.
              </p>
            </div>

            {/* Kapha */}
            <div className="p-8 bg-[#F4EDE2] rounded-3xl border border-[#DECDB3] space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#EBE0CD] flex items-center justify-center text-[#7D5A34]">
                <Droplets className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="font-deva text-xl text-[#7D5A34] block">कफ (Kapha)</span>
                <h3 className="font-brand text-base font-bold tracking-wider text-[#222E22] uppercase">Water &amp; Earth (Structure)</h3>
              </div>
              <p className="font-editorial text-base text-[#594B3C] leading-relaxed">
                Provides physical stamina, joint lubrication, and immunity. When out of balance: heavy weight gain, excess mucus, oily pores, lethargy. Balanced by dry Ubtan scrubs, ginger, black pepper, and early rising.
              </p>
            </div>
          </div>
        </div>

        {/* 5. ETHICAL DISCLAIMER */}
        <div className="p-6 sm:p-8 bg-[#EFE6D6] rounded-3xl border border-[#D5C2A4] space-y-3">
          <div className="flex items-center gap-2 text-[#7D5A34] font-ui text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Honest &amp; Responsible Ayurvedic Communication
          </div>
          <p className="font-editorial text-sm sm:text-base text-[#524436] leading-relaxed">
            Ayurveda is a living journey of self-discipline and seasonal harmony, not an overnight pill. Our herbal formulations (Traditional Ubtan, Kannauj Rose Water, and Sandalwood Soap) are crafted to complement your daily bathing rituals. They are traditional lifestyle supports, not pharmaceutical cures. When combined with consistent sleep, fresh satvik food, and peace of mind, true vitality blossoms naturally.
          </p>
        </div>

        {/* 6. CTA BUTTON */}
        <div className="text-center pt-2">
          <button
            onClick={onShopClick}
            className="px-8 py-4 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-[0.25em] font-semibold transition-all shadow-md inline-flex items-center gap-2"
          >
            Explore Sacred Formulations <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
