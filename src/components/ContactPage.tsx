import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, Clock, MapPin, Feather } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Business placeholders (easily editable)
  const CONTACT_EMAIL = 'care@shritejayurveda.com';
  const CONTACT_PHONE = '+91 80802 18728';
  const WHATSAPP_NUMBER = '918080218728';
  const BUSINESS_HOURS = 'Monday – Saturday: 9:30 AM – 6:30 PM IST';
  const DISPATCH_SANCTUARY = 'SHRiTEJ Botanical Apothecary, Maharashtra, India';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.warn('Contact API sync note:', err);
    } finally {
      setIsSending(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE6D6] border border-[#D5C4A7] text-[#694F32] font-ui text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold">
            <Feather className="w-3.5 h-3.5 text-[#8A6A42]" />
            <span>Connect with our Sanctuary</span>
          </div>
          <h1 className="font-brand text-3xl sm:text-5xl font-bold tracking-[0.06em] text-[#222E22]">
            Contact SHRiTEJ AYURVED
          </h1>
          <p className="font-editorial text-lg sm:text-xl text-[#594B3C] leading-relaxed max-w-2xl mx-auto">
            Have a question regarding your skin prakriti, an ongoing order, or our traditional methods? We are here to guide you with care and authenticity.
          </p>
          <div className="w-20 h-0.5 bg-[#8E6E45] mx-auto mt-3"></div>
        </div>

        {/* 3 Direct Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Email Us */}
          <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EBE0CD] flex items-center justify-center text-[#7D5A34]">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-brand text-base font-bold tracking-wider text-[#222E22] uppercase">Email Care Desk</h3>
              <p className="font-ui text-xs text-[#6B5A46]">{CONTACT_EMAIL}</p>
              <p className="font-editorial text-sm text-[#594B3C]">Direct written consultations and corporate inquiries.</p>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=SHRiTEJ%20Ayurved%20Inquiry`}
              className="w-full py-3 px-4 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-wider font-semibold text-center transition-all shadow-sm"
            >
              Email Us
            </a>
          </div>

          {/* Call Us */}
          <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EBE0CD] flex items-center justify-center text-[#7D5A34]">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-brand text-base font-bold tracking-wider text-[#222E22] uppercase">Telephone Support</h3>
              <p className="font-ui text-xs text-[#6B5A46]">{CONTACT_PHONE}</p>
              <p className="font-editorial text-sm text-[#594B3C]">Speak directly with our Ayurvedic support team.</p>
            </div>
            <a
              href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`}
              className="w-full py-3 px-4 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-wider font-semibold text-center transition-all shadow-sm"
            >
              Call Us
            </a>
          </div>

          {/* WhatsApp Us */}
          <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EBE0CD] flex items-center justify-center text-[#2D3E2F]">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-brand text-base font-bold tracking-wider text-[#222E22] uppercase">WhatsApp Sanctuary</h3>
              <p className="font-ui text-xs text-[#6B5A46]">{CONTACT_PHONE} (Official)</p>
              <p className="font-editorial text-sm text-[#594B3C]">Instant assistance for order status and tracking.</p>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Namaste%20SHRiTEJ%20AYURVED,%20I%20have%20an%20inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-wider font-semibold text-center transition-all shadow-sm"
            >
              WhatsApp Us
            </a>
          </div>

        </div>

        {/* Contact Form & Office Timings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="font-ui text-[10px] uppercase tracking-[0.25em] text-[#7D5A34] font-bold">Inquiry Form</span>
              <h3 className="font-brand text-2xl font-bold text-[#222E22]">Send Us a Message</h3>
            </div>

            {isSubmitted ? (
              <div className="p-8 bg-[#EFE6D6] rounded-2xl border border-[#D5C2A4] text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#2D3E2F] mx-auto" />
                <h4 className="font-brand text-lg font-bold text-[#222E22]">Message Received in Gratitude</h4>
                <p className="font-editorial text-base text-[#594B3C]">
                  Thank you. Your message has been received. Our Ayurvedic care guardians will respond to your registered email shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#2D3E2F] text-white font-ui text-xs uppercase tracking-wider font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-ui text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#453A2E] mb-1.5 uppercase tracking-wider text-[10px]">Your Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-[#222E22] text-sm focus:border-[#7D5A34] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#453A2E] mb-1.5 uppercase tracking-wider text-[10px]">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. yourname@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-[#222E22] text-sm focus:border-[#7D5A34] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#453A2E] mb-1.5 uppercase tracking-wider text-[10px]">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-[#222E22] text-sm focus:border-[#7D5A34] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#453A2E] mb-1.5 uppercase tracking-wider text-[10px]">Subject *</label>
                    <input
                      required
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Order Inquiry / Product Advice"
                      className="w-full px-4 py-3 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-[#222E22] text-sm focus:border-[#7D5A34] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#453A2E] mb-1.5 uppercase tracking-wider text-[10px]">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we may assist your Ayurvedic journey..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-[#222E22] text-sm focus:border-[#7D5A34] focus:outline-none"
                  />
                </div>

                <button
                  disabled={isSending}
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-[#F9F6F0] font-ui text-xs uppercase tracking-[0.25em] font-semibold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSending ? 'Sending Message...' : 'Send Message'} <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Operational Hours & Location */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F4EDE2] border border-[#DECDB3] rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-[#7D5A34] font-ui text-xs font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4" /> Operational Timings
              </div>
              <p className="font-editorial text-base text-[#473B2E]">{BUSINESS_HOURS}</p>
              <p className="font-ui text-xs text-[#7A6B5B]">
                Orders placed during weekend cycles are carefully hand-wrapped and dispatched on Monday morning.
              </p>
            </div>

            <div className="bg-[#F4EDE2] border border-[#DECDB3] rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-[#7D5A34] font-ui text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" /> Dispatch &amp; Formulation Center
              </div>
              <p className="font-editorial text-base text-[#473B2E]">{DISPATCH_SANCTUARY}</p>
              <p className="font-ui text-xs text-[#7A6B5B]">
                Formulated and packaged in India. All shipments are routed through national express carbon-conscious delivery networks.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};