import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight, Mail, Phone, MessageSquare } from 'lucide-react';

interface FAQPageProps {
  onContactClick: () => void;
}

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  category: string;
  items: FAQItem[];
}

export const FAQPage: React.FC<FAQPageProps> = ({ onContactClick }) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({ '0-0': true });

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const faqData: FAQCategory[] = [
    {
      category: 'Orders & Tracking',
      items: [
        {
          q: 'How do I place an order on SHRITEJ AYURVED?',
          a: 'Browse our classical formulations catalogue, select your desired products and quantities, click "Add to Basket" or "Buy Now", and proceed to our secure, plastic-free checkout.'
        },
        {
          q: 'How can I track my shipment?',
          a: 'Once your order is hand-packed, you will receive an automated email confirmation with your unique Order ID. You can also reach our WhatsApp support desk anytime with your Order ID for real-time tracking.'
        },
        {
          q: 'Can I cancel or modify my order after placing it?',
          a: 'Orders can be modified or cancelled within 4 hours of placement prior to botanical packing. Please email care@shritejayurveda.com or contact our WhatsApp helpline immediately.'
        }
      ]
    },
    {
      category: 'Product Use & Storage',
      items: [
        {
          q: 'How should I activate and apply the Traditional Ubtan?',
          a: 'Mix 1-2 teaspoons of SHRITEJ Ubtan with pure Kannauj Rose Water (for normal/oily skin) or raw organic milk/curd (for dry skin) in a ceramic or wooden bowl. Apply evenly, let sit for 12-15 minutes until semi-dry, and rinse with cool water in circular movements.'
        },
        {
          q: 'How should Ayurvedic herbal products be stored?',
          a: 'Store all herbal powders and bath bars in a cool, dry place away from humid moisture. Ensure the resealable zipper pouch is tightly shut. Soap bars should rest on a well-draining natural soap dish between uses.'
        },
        {
          q: 'Are any synthetic preservatives, parabens, or artificial colors used?',
          a: 'Never. Every formulation from SHRITEJ AYURVED is 100% natural and pure herbal. We maintain full transparency in our ingredient disclosures.'
        }
      ]
    },
    {
      category: 'Shipping & Delivery',
      items: [
        {
          q: 'Where across India do you deliver?',
          a: 'We ship to over 19,000 PIN codes across all Indian states and Union Territories via express surface and air courier partners.'
        },
        {
          q: 'How long does delivery take?',
          a: 'Metro cities receive delivery within 2 to 4 business days. Regional and interior destinations typically take 4 to 6 business days from dispatch.'
        },
        {
          q: 'What are the shipping charges?',
          a: 'We offer FREE express plastic-free shipping on all orders across India without minimum spend barriers.'
        }
      ]
    },
    {
      category: 'Returns & Replacements',
      items: [
        {
          q: 'What is your return & exchange policy?',
          a: 'Due to strict Ayurvedic hygiene standards, opened cosmetic formulations cannot be returned. However, if your package arrives damaged or defective in transit, we will immediately issue a replacement or full refund upon photo verification within 48 hours of receipt.'
        },
        {
          q: 'What if I receive a damaged product?',
          a: 'Simply share a photo of the damaged outer box and product to care@shritejayurveda.com or WhatsApp within 48 hours. A fresh replacement formulation will be dispatched at zero additional charge.'
        }
      ]
    },
    {
      category: 'Payments & Security',
      items: [
        {
          q: 'What payment methods are supported?',
          a: 'We support all major Indian UPI options (Google Pay, PhonePe, Paytm, BHIM), Net Banking, Debit/Credit Cards, and Cash on Delivery (COD) for eligible pin codes.'
        },
        {
          q: 'Is online transaction processing secure?',
          a: 'Yes. All digital payment integrations are encrypted with bank-grade 256-bit SSL security through leading RBI-authorized Indian payment gateways.'
        }
      ]
    },
    {
      category: 'Ayurvedic Authenticity',
      items: [
        {
          q: 'What makes SHRITEJ AYURVED distinct from commercial cosmetics?',
          a: 'We reject industrial mass-marketing gimmicks. Our formulations are prepared strictly in accordance with traditional texts using authentic stone pulverization, slow oil infusion, and steam hydrosols — wrapped only in earth-conscious biodegradable kraft and handmade paper.'
        },
        {
          q: 'Can these products cure chronic medical skin diseases?',
          a: 'Ayurveda focuses on holistic balance. Our products are formulated to support natural skin vitality and satvik daily bathing rituals; they are not intended as medical drugs or cures for chronic dermatological illnesses.'
        }
      ]
    }
  ];

  return (
    <div className="py-12 sm:py-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE6D6] border border-[#D5C4A7] text-[#694F32] font-ui text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-[#8A6A42]" />
            <span>Help Center &amp; Inquiries</span>
          </div>
          <h1 className="font-brand text-3xl sm:text-5xl font-bold tracking-[0.06em] text-[#222E22]">
            Frequently Asked Questions
          </h1>
          <p className="font-editorial text-lg sm:text-xl text-[#594B3C] leading-relaxed">
            Clear, honest answers regarding our formulations, sustainable packaging, and shopping experience.
          </p>
          <div className="w-20 h-0.5 bg-[#8E6E45] mx-auto mt-3"></div>
        </div>

        {/* FAQ Accordion List categorized */}
        <div className="space-y-12">
          {faqData.map((cat, catIdx) => (
            <div key={cat.category} className="space-y-4">
              <h2 className="font-brand text-lg sm:text-xl font-bold text-[#222E22] tracking-wider uppercase border-b border-[#DECDB3] pb-2">
                {cat.category}
              </h2>
              <div className="space-y-3">
                {cat.items.map((item, itemIdx) => {
                  const key = `${catIdx}-${itemIdx}`;
                  const isOpen = !!openItems[key];
                  return (
                    <div
                      key={itemIdx}
                      className="bg-[#FAF7F2] border border-[#DECDB3] rounded-2xl overflow-hidden transition-all shadow-sm"
                    >
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#F3ECE0] transition-colors"
                      >
                        <span className="font-brand text-sm sm:text-base font-bold text-[#222E22]">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={'w-4 h-4 text-[#7D5A34] transition-transform duration-200 shrink-0 ' + (isOpen ? 'rotate-180' : '')}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-[#4C4033] font-editorial text-base sm:text-lg leading-relaxed border-t border-[#DECDB3]/50 pt-3 bg-[#FAF7F2]">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Need Help Banner */}
        <div className="p-8 sm:p-10 bg-[#F4EDE2] border border-[#DECDB3] rounded-3xl text-center space-y-4 shadow-sm">
          <h3 className="font-brand text-2xl font-bold text-[#222E22]">Still Have Questions?</h3>
          <p className="font-editorial text-base sm:text-lg text-[#594B3C] max-w-xl mx-auto">
            Our Ayurvedic care team is at your disposal to offer personalized formulation guidance and support.
          </p>
          <button
            onClick={onContactClick}
            className="px-8 py-3.5 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md inline-flex items-center gap-2"
          >
            Contact Our Care Team <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};