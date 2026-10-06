import React from 'react';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';

interface PolicyPageProps {
  type: 'privacy' | 'terms' | 'shipping-policy' | 'returns-policy' | 'disclaimer';
  onBack: () => void;
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ type, onBack }) => {
  const contentMap = {
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'Commitment to Patron Confidentiality & Data Protection',
      sections: [
        {
          heading: '1. Information We Collect',
          body: 'We collect strictly essential personal details such as customer full name, postal delivery address, contact email, and mobile telephone number necessary solely to dispatch physical orders and deliver shipping tracking updates.'
        },
        {
          heading: '2. Payment Security & Integrity',
          body: 'SHRiTEJ AYURVED does not store, process, or view full payment card numbers, UPI PINs, or net-banking passwords. All payment transactions are encrypted and processed by RBI-licensed payment aggregators.'
        },
        {
          heading: '3. Non-Disclosure Commitment',
          body: 'We never sell, rent, or distribute customer details to third-party marketing brokers. Your information remains strictly confined to our order fulfillment ecosystem.'
        },
        {
          heading: '4. Contact for Data Privacy',
          body: 'For questions regarding your saved data, contact care@shritejayurveda.com.'
        }
      ]
    },
    terms: {
      title: 'Terms & Conditions',
      subtitle: 'Guidelines Governing Use of the SHRiTEJ AYURVED Platform',
      sections: [
        {
          heading: '1. Acceptance of Terms',
          body: 'By accessing and ordering formulations from this platform, you agree to comply with our authentic fair-use terms, dispatch procedures, and responsible usage guidelines.'
        },
        {
          heading: '2. Formulation Disclosures & Accuracy',
          body: 'We endeavor to present accurate product photographs, weights, and descriptions. As our formulations utilize 100% natural, seasonal botanicals without artificial color stabilizers, slight batch variations in herbal scent and natural color are standard.'
        },
        {
          heading: '3. Orders & Pricing',
          body: 'Prices are listed in Indian Rupees (INR) inclusive of applicable taxes. We reserve the right to cancel or amend orders in the event of unforeseen inventory shortages with full immediate refund.'
        },
        {
          heading: '4. Intellectual Property',
          body: 'All brand graphics, text, sacred formulation rituals, and imagery are proprietary property of SHRiTEJ AYURVED.'
        }
      ]
    },
    'shipping-policy': {
      title: 'Shipping & Delivery Policy',
      subtitle: 'Careful Dispatch in Earth-Conscious Packaging',
      sections: [
        {
          heading: '1. Free Eco-Friendly Shipping',
          body: 'We provide complimentary shipping across India for all our authentic Ayurvedic formulations. All orders are hand-packed in plastic-free recycled corrugated boxes and biodegradable cushioning.'
        },
        {
          heading: '2. Dispatch Timelines',
          body: 'Orders are prepared and handed over to reputable national courier partners within 24 to 48 hours of order placement (excluding Sundays and national holidays).'
        },
        {
          heading: '3. Estimated Delivery Durations',
          body: 'Metro cities receive consignments in 2 to 4 business days. Non-metro and regional locations typically require 4 to 6 business days.'
        },
        {
          heading: '4. Courier Tracking',
          body: 'Automated tracking links are generated upon carrier pickup and communicated via email and WhatsApp.'
        }
      ]
    },
    'returns-policy': {
      title: 'Returns & Refund Policy',
      subtitle: 'Hygiene Standards & Replacement Guarantees',
      sections: [
        {
          heading: '1. Ayurvedic Hygiene Consideration',
          body: 'Due to intimate hygiene standards and strict adherence to pure herbal safety, opened botanical formulations cannot be returned once the inner protective seals are breached.'
        },
        {
          heading: '2. Damaged or Defective Consignments',
          body: 'In the rare event that a package is compromised or damaged during courier transit, please notify care@shritejayurveda.com or message us on WhatsApp with photos within 48 hours of delivery.'
        },
        {
          heading: '3. Replacement & Refund Dispatch',
          body: 'Upon verification of transit damage, a replacement formulation is immediately dispatched at zero cost, or a full refund is credited back to the original payment source within 5 to 7 business days.'
        }
      ]
    },
    disclaimer: {
      title: 'Ayurvedic & Product Disclaimer',
      subtitle: 'Responsible Transparency & Traditional Wellness Context',
      sections: [
        {
          heading: '1. Traditional Ayurvedic Context',
          body: 'Statements and descriptions regarding our botanicals (such as Manjishta, Chandan, Halad, Lodhra, and Gulab) are derived from documented classical Ayurvedic texts and traditional Indian usage. They are intended for educational and wellness awareness.'
        },
        {
          heading: '2. No Medical or Cure Claims',
          body: 'Our formulations are Ayurvedic cosmetics and bathing rituals. They are not intended to diagnose, cure, mitigate, or treat chronic dermatological or systemic diseases.'
        },
        {
          heading: '3. Recommended Patch Test',
          body: 'While all our ingredients are 100% natural and free from synthetic chemicals, individual skin types may exhibit sensitivities to potent natural botanicals. A patch test on a small area of the inner arm is recommended prior to full facial application.'
        }
      ]
    }
  };

  const current = contentMap[type] || contentMap.disclaimer;

  return (
    <div className="py-12 sm:py-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-wider text-[#7D5A34] hover:text-[#523B22] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Previous View
        </button>

        {/* Header */}
        <div className="space-y-3 border-b border-[#DECDB3] pb-6">
          <div className="inline-flex items-center gap-2 text-[#7D5A34] font-ui text-[10px] font-bold uppercase tracking-[0.2em]">
            <FileText className="w-3.5 h-3.5" /> Official Brand Documentation
          </div>
          <h1 className="font-brand text-3xl sm:text-4xl font-bold text-[#222E22]">
            {current.title}
          </h1>
          <p className="font-editorial text-lg text-[#665544]">
            {current.subtitle}
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-8 bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-6 sm:p-10 shadow-sm">
          {current.sections.map((sec, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-brand text-base sm:text-lg font-bold text-[#222E22]">{sec.heading}</h3>
              <p className="font-editorial text-base sm:text-lg text-[#4E4133] leading-relaxed">{sec.body}</p>
            </div>
          ))}
        </div>

        <div className="p-6 bg-[#F4EDE2] rounded-2xl border border-[#DECDB3] text-xs font-ui text-[#7A6B5B] flex items-center justify-between">
          <span>Effective Date: 2026. SHRiTEJ AYURVED.</span>
          <span>Inquiries: care@shritejayurveda.com</span>
        </div>

      </div>
    </div>
  );
};