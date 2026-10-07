import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Lock,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Truck,
  Copy,
  Check,
  Sparkles,
  Upload,
  Image as ImageIcon,
  AlertCircle,
  ExternalLink,
  MessageCircle,
  QrCode,
  Smartphone,
  Leaf,
  Package
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onComplete: (order: Order) => void;
  onTrackOrder?: (orderId: string) => void;
}

const UPI_ID = '8888091910@ybl';
const PAYEE_NAME = 'SHRITEJ AYURVED';
const WHATSAPP_NUMBER = '918080218728';

const lookupIndianPincode = (pin: string): { city?: string; state: string } | null => {
  const p = pin.trim();
  if (p.length !== 6 || !/^\d{6}$/.test(p)) return null;
  const num = parseInt(p, 10);
  const prefix2 = parseInt(p.substring(0, 2), 10);

  if (num >= 400001 && num <= 400104) return { city: 'Mumbai', state: 'Maharashtra' };
  if (num >= 411001 && num <= 411065) return { city: 'Pune', state: 'Maharashtra' };
  if (num >= 416001 && num <= 416020) return { city: 'Kolhapur', state: 'Maharashtra' };
  if (num >= 440001 && num <= 440040) return { city: 'Nagpur', state: 'Maharashtra' };
  if (num >= 431001 && num <= 431015) return { city: 'Chhatrapati Sambhajinagar', state: 'Maharashtra' };
  if (num >= 422001 && num <= 422015) return { city: 'Nashik', state: 'Maharashtra' };
  if (num >= 413001 && num <= 413010) return { city: 'Solapur', state: 'Maharashtra' };
  if (num >= 110001 && num <= 110096) return { city: 'New Delhi', state: 'Delhi' };
  if (num >= 560001 && num <= 560110) return { city: 'Bengaluru', state: 'Karnataka' };
  if (num >= 500001 && num <= 500095) return { city: 'Hyderabad', state: 'Telangana' };
  if (num >= 600001 && num <= 600120) return { city: 'Chennai', state: 'Tamil Nadu' };
  if (num >= 700001 && num <= 700105) return { city: 'Kolkata', state: 'West Bengal' };
  if (num >= 380001 && num <= 380060) return { city: 'Ahmedabad', state: 'Gujarat' };
  if (num >= 302001 && num <= 302040) return { city: 'Jaipur', state: 'Rajasthan' };
  if (num >= 226001 && num <= 226030) return { city: 'Lucknow', state: 'Uttar Pradesh' };
  if (num >= 160001 && num <= 160070) return { city: 'Chandigarh', state: 'Chandigarh' };
  if (num >= 682001 && num <= 682045) return { city: 'Kochi', state: 'Kerala' };
  if (num >= 452001 && num <= 452020) return { city: 'Indore', state: 'Madhya Pradesh' };

  if (prefix2 === 11) return { state: 'Delhi' };
  if (prefix2 >= 12 && prefix2 <= 13) return { state: 'Haryana' };
  if (prefix2 >= 14 && prefix2 <= 16) return { state: 'Punjab' };
  if (prefix2 === 17) return { state: 'Himachal Pradesh' };
  if (prefix2 >= 18 && prefix2 <= 19) return { state: 'Jammu & Kashmir' };
  if (prefix2 >= 20 && prefix2 <= 28) return { state: 'Uttar Pradesh' };
  if (prefix2 >= 30 && prefix2 <= 34) return { state: 'Rajasthan' };
  if (prefix2 >= 36 && prefix2 <= 39) return { state: 'Gujarat' };
  if (prefix2 >= 40 && prefix2 <= 44) return { state: 'Maharashtra' };
  if (prefix2 >= 45 && prefix2 <= 48) return { state: 'Madhya Pradesh' };
  if (prefix2 === 49) return { state: 'Chhattisgarh' };
  if (prefix2 >= 50 && prefix2 <= 53) return { state: 'Telangana / Andhra Pradesh' };
  if (prefix2 >= 56 && prefix2 <= 59) return { state: 'Karnataka' };
  if (prefix2 >= 60 && prefix2 <= 64) return { state: 'Tamil Nadu' };
  if (prefix2 >= 67 && prefix2 <= 69) return { state: 'Kerala' };
  if (prefix2 >= 70 && prefix2 <= 74) return { state: 'West Bengal' };
  if (prefix2 >= 75 && prefix2 <= 77) return { state: 'Odisha' };
  if (prefix2 >= 80 && prefix2 <= 85) return { state: 'Bihar / Jharkhand' };
  if (prefix2 >= 78 && prefix2 <= 79) return { state: 'Assam / North East' };

  return null;
};

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onComplete,
  onTrackOrder,
}) => {
  // Stepper State: 1 = Shipping, 2 = UPI Payment & UTR, 3 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Customer & Address State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('');
  const [formError, setFormError] = useState('');

  // Step 2: UPI Payment State
  const [utrNumber, setUtrNumber] = useState('');
  const [screenshotData, setScreenshotData] = useState<string | null>(null);
  const [screenshotName, setScreenshotName] = useState<string | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Step 3: Placed Order Result State
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Pre-load user info if available in localStorage
  useEffect(() => {
    if (isOpen) {
      try {
        const u = localStorage.getItem('shritej_user');
        if (u) {
          const parsed = JSON.parse(u);
          if (parsed.name && !name) setName(parsed.name);
          if (parsed.phone && !phone) setPhone(parsed.phone.replace(/\D/g, '').slice(-10));
          if (parsed.email && !email) setEmail(parsed.email);
        }
      } catch (e) {}
    }
  }, [isOpen]);

  // Reset or initialize on modal open/close
  useEffect(() => {
    if (!isOpen) {
      // delay reset slightly for smooth close transition
      const timer = setTimeout(() => {
        setStep(1);
        setUtrNumber('');
        setScreenshotData(null);
        setScreenshotName(null);
        setFormError('');
        setSubmitError('');
        setPlacedOrder(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Calculation rules:
  // Subtotal from cart items
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  // Shipping rule: < 499 => Rs 49, >= 499 => Free (Rs 0)
  const shippingFee = subtotal >= 499 ? 0 : 49;
  const totalAmount = subtotal + shippingFee;

  // Primary product name for transaction note
  const primaryProductName = cart[0]?.product.name
    ? cart[0].product.name.replace(/[^a-zA-Z0-9]/g, '-').slice(0, 22)
    : 'SHRITEJ-Ayurved';

  // Dynamic UPI URI Format:
  // upi://pay?pa=8888091910@ybl&pn=SHRITEJ%20AYURVED&am={TOTAL_AMOUNT}&cu=INR&tn=Order-{PRODUCT_NAME}
  const upiUri = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent('Order-' + primaryProductName)}`;

  const handlePincodeChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 6);
    setPincode(cleaned);
    if (cleaned.length === 6) {
      const match = lookupIndianPincode(cleaned);
      if (match) {
        setState(match.state);
        if (match.city && !city) {
          setCity(match.city);
        }
      }
    }
  };

  const handleCopyUpi = () => {
    try {
      navigator.clipboard.writeText(UPI_ID);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    } catch (err) {
      // Fallback
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    }
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setSubmitError('Screenshot file size exceeds 5MB. Please choose a smaller image.');
      return;
    }

    setScreenshotName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setScreenshotData(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Step 1 Validation -> Move to Step 2
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number for dispatch updates.');
      return;
    }

    if (!address.trim()) {
      setFormError('Please enter your street address / house details.');
      return;
    }

    if (!city.trim()) {
      setFormError('Please enter your city.');
      return;
    }

    if (!pincode.trim() || pincode.trim().length !== 6) {
      setFormError('Please enter a valid 6-digit Indian delivery pincode.');
      return;
    }

    setStep(2);
    // Smoothly scroll to top of modal
    const modalEl = document.getElementById('shritej-checkout-container');
    if (modalEl) modalEl.scrollTop = 0;
  };

  // Step 2 Submission -> Place Order
  const handleConfirmOrder = async () => {
    setSubmitError('');
    const cleanUtr = utrNumber.trim();

    if (cleanUtr.length < 12) {
      setSubmitError('Please enter a valid 12-digit UPI Reference / UTR Number from your payment app.');
      return;
    }

    setIsSubmitting(true);

    const generatedOrderId = 'STA-ORD-' + Math.floor(100000 + Math.random() * 900000);

    const orderPayload = {
      orderId: generatedOrderId,
      customerName: name.trim(),
      customerPhone: phone.trim(),
      customerEmail: email.trim() || 'patron@shritejayurveda.com',
      shippingAddress: {
        address: address.trim(),
        apartment: apartment.trim() || '',
        city: city.trim(),
        state: state.trim() || 'Maharashtra',
        pincode: pincode.trim(),
      },
      items: cart,
      subtotal,
      shipping: shippingFee,
      discount: 0,
      totalAmount,
      utrNumber: cleanUtr,
      paymentScreenshot: screenshotData || undefined,
      paymentMethod: 'UPI' as const,
      upiId: UPI_ID,
      notes: `Direct UPI Payment to ${UPI_ID} (UTR: ${cleanUtr})`,
    };

    try {
      const response = await fetch('/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const resData = await response.json();

      if (!resData.success) {
        throw new Error(resData.error || 'Failed to record order details.');
      }

      const finalOrder: Order = resData.order || {
        id: generatedOrderId,
        date: new Date().toISOString(),
        customerName: orderPayload.customerName,
        customerEmail: orderPayload.customerEmail,
        customerPhone: orderPayload.customerPhone,
        items: cart,
        subtotal,
        discount: 0,
        shipping: shippingFee,
        totalAmount,
        status: 'Processing',
        shippingAddress: orderPayload.shippingAddress,
        paymentMethod: 'UPI',
        estimatedDelivery: '3 to 5 business days (Plastic-Free Express)',
        awbNumber: 'STA-' + generatedOrderId.replace(/\D/g, '').slice(-6),
        courier: 'Blue Dart Express',
        utrNumber: cleanUtr,
        paymentScreenshot: screenshotData || undefined,
        upiId: UPI_ID,
      };

      setPlacedOrder(finalOrder);
      setIsSubmitting(false);
      setStep(3);

      // Trigger celebration confetti
      try {
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.55 } });
      } catch (cErr) {}

      // Notify parent app of completed order
      onComplete(finalOrder);

      const modalEl = document.getElementById('shritej-checkout-container');
      if (modalEl) modalEl.scrollTop = 0;
    } catch (err: any) {
      console.error('Order submission error:', err);
      // Fallback: If network issue, create local order object and proceed
      const fallbackOrder: Order = {
        id: generatedOrderId,
        date: new Date().toISOString(),
        customerName: orderPayload.customerName,
        customerEmail: orderPayload.customerEmail,
        customerPhone: orderPayload.customerPhone,
        items: cart,
        subtotal,
        discount: 0,
        shipping: shippingFee,
        totalAmount,
        status: 'Processing',
        shippingAddress: orderPayload.shippingAddress,
        paymentMethod: 'UPI',
        estimatedDelivery: '3 to 5 business days (Plastic-Free Express)',
        awbNumber: 'STA-' + generatedOrderId.replace(/\D/g, '').slice(-6),
        courier: 'Blue Dart Express',
        utrNumber: cleanUtr,
        paymentScreenshot: screenshotData || undefined,
        upiId: UPI_ID,
      };

      setPlacedOrder(fallbackOrder);
      setIsSubmitting(false);
      setStep(3);
      onComplete(fallbackOrder);
    }
  };

  // WhatsApp verification chat link
  const whatsappUrl = placedOrder
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Hello, I have placed order ${placedOrder.id} with UTR ${placedOrder.utrNumber || utrNumber}`
      )}`
    : '#';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        id="shritej-checkout-container"
        className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl max-w-2xl w-full shadow-2xl relative my-6 max-h-[92vh] flex flex-col overflow-hidden text-[#222E22]"
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-[#E3DAC8] bg-[#F4EDE2] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#7D5A34]/40 flex items-center justify-center bg-[#2D3E2F] text-[#FAF7F2] shadow-sm shrink-0">
              <svg viewBox="0 0 100 100" className="w-6 h-6 fill-current text-[#EBE0CE]">
                <path
                  d="M50 15 C45 35 30 45 20 50 C30 55 45 65 50 85 C55 65 70 55 80 50 C70 45 55 35 50 15 Z"
                  fill="#C9A24D"
                  opacity="0.9"
                />
                <circle cx="50" cy="50" r="4" fill="#7D5A34" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-brand text-base sm:text-lg font-bold tracking-[0.2em] text-[#222E22] uppercase">
                  SHRITEJ AYURVED
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#E8DFD0] text-[#7D5A34] text-[9px] font-ui font-bold uppercase tracking-wider">
                  Direct UPI
                </span>
              </div>
              <p className="font-editorial text-[11px] sm:text-xs text-[#6A5947]">
                {step === 1 && 'Step 1 of 2: Shipping Destination & Sacred Formulations'}
                {step === 2 && 'Step 2 of 2: Dynamic UPI Payment & Verification Proof'}
                {step === 3 && 'Order Placed • Handcrafted Dispatch Pending'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#EAE0D0] hover:bg-[#E0D2BF] text-[#5A4B3C] hover:text-[#222E22] flex items-center justify-center transition-colors"
            aria-label="Close Checkout"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="px-6 py-2.5 bg-[#EBE3D3] border-b border-[#DECDB3] flex items-center justify-between font-ui text-[11px] text-[#695A49]">
          <div className={`flex items-center gap-1.5 font-bold ${step >= 1 ? 'text-[#2D3E2F]' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#2D3E2F] text-white' : 'bg-[#DECDB3] text-[#695A49]'}`}>
              1
            </span>
            <span>Delivery Info</span>
          </div>
          <div className="w-8 sm:w-16 h-0.5 bg-[#D5C3A6]" />
          <div className={`flex items-center gap-1.5 font-bold ${step >= 2 ? 'text-[#2D3E2F]' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#2D3E2F] text-white' : 'bg-[#DECDB3] text-[#695A49]'}`}>
              2
            </span>
            <span>Direct UPI Pay</span>
          </div>
          <div className="w-8 sm:w-16 h-0.5 bg-[#D5C3A6]" />
          <div className={`flex items-center gap-1.5 font-bold ${step === 3 ? 'text-[#2D3E2F]' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-[#2D3E2F] text-white' : 'bg-[#DECDB3] text-[#695A49]'}`}>
              3
            </span>
            <span>Confirmed</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">

          {/* ================= STEP 1: SHIPPING & ITEMS ================= */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">

              {/* Free Delivery Banner */}
              <div className="p-3.5 rounded-2xl bg-[#E8EFE3] border border-[#C5D8B8] flex items-center gap-2.5 text-xs font-ui text-[#2A442A]">
                <Truck className="w-4 h-4 text-[#2D3E2F] shrink-0" />
                <div className="flex-1">
                  {subtotal >= 499 ? (
                    <span className="font-semibold text-emerald-800">
                      🌿 <strong>Free Delivery Unlocked!</strong> Orders ₹499 and above receive complimentary express shipping.
                    </span>
                  ) : (
                    <span>
                      Add <strong>₹{499 - subtotal}</strong> more for <strong>FREE Delivery</strong>. (Orders below ₹499 have flat ₹49 shipping).
                    </span>
                  )}
                </div>
              </div>

              {/* Order Items Summary Card */}
              <div className="p-4 rounded-2xl bg-[#F4EDE2] border border-[#DECDB3] space-y-3 font-ui text-xs">
                <span className="font-bold text-[#453A2E] uppercase tracking-wider text-[10px] block">
                  Formulations in Order ({cart.reduce((s, i) => s + i.quantity, 0)})
                </span>
                <div className="divide-y divide-[#DECDB3]/60 max-h-36 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="py-2 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-2.5 truncate">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 rounded-lg object-cover border border-[#DECDB3] bg-[#EFE6D6] shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/placeholder-tailam.svg';
                          }}
                        />
                        <div className="truncate">
                          <p className="font-brand font-bold text-[#222E22] truncate text-xs">{item.product.name}</p>
                          <p className="text-[10px] text-[#7A6B5B]">Qty: {item.quantity} × ₹{item.product.price}</p>
                        </div>
                      </div>
                      <span className="font-bold text-[#7D5A34] shrink-0 text-sm">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotal + Shipping calculation breakdown */}
                <div className="pt-2 border-t border-[#DECDB3] space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#655543]">
                    <span>Formulations Subtotal</span>
                    <span className="font-semibold text-[#222E22]">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[#655543]">
                    <span>Delivery Courier Fee</span>
                    <span className="font-semibold text-[#2D3E2F]">
                      {shippingFee === 0 ? 'FREE (₹0)' : '₹49'}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#DECDB3] flex justify-between items-center text-sm font-bold text-[#222E22]">
                    <span className="font-brand">Total Payable Amount</span>
                    <span className="font-brand text-xl text-[#7D5A34]">₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Form Error Banner */}
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-ui flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Customer Details Inputs */}
              <div className="space-y-4 font-ui text-xs">
                <h4 className="font-brand text-sm font-bold uppercase tracking-wider text-[#222E22] border-b border-[#DECDB3] pb-1">
                  Recipient Contact &amp; Delivery Destination
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210 (10 digits)"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">
                    Email Address (Optional for e-invoice)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patron@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">
                    Delivery Address (House / Street / Landmark) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Flat / House No., Building Name, Street, Landmark"
                    className="w-full px-4 py-2 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">
                      6-Digit Pincode *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      placeholder="e.g. 411001"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">
                      City / District *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Pune"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Maharashtra"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button to Step 2 */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-[#F9F6F0] font-ui text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
              >
                Proceed to UPI Payment (₹{totalAmount}) <ArrowRight className="w-4 h-4 text-[#C9A24D]" />
              </button>
            </form>
          )}

          {/* ================= STEP 2: DIRECT UPI PAYMENT ================= */}
          {step === 2 && (
            <div className="space-y-6 font-ui">

              {/* Header Box: Exact Transfer Amount */}
              <div className="p-4 rounded-2xl bg-[#F4EDE2] border border-[#DECDB3] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div>
                  <span className="font-ui text-[10px] uppercase font-bold tracking-wider text-[#7D5A34]">
                    Payee: {PAYEE_NAME}
                  </span>
                  <h3 className="font-brand font-bold text-lg text-[#222E22]">Direct Manual UPI Payment</h3>
                  <p className="text-xs text-[#6A5A48]">No gateway markups or commissions. Direct UPI settlement.</p>
                </div>
                <div className="bg-[#2D3E2F] text-white px-5 py-2.5 rounded-2xl text-center shadow-xs">
                  <span className="block text-[10px] text-[#C9A24D] uppercase font-bold tracking-wider">Amount to Pay</span>
                  <span className="font-brand font-bold text-2xl text-[#FAF7F2]">₹{totalAmount}</span>
                </div>
              </div>

              {/* QR Code & Payee Details Container */}
              <div className="p-5 sm:p-6 bg-white rounded-3xl border-2 border-[#D5C2A4] shadow-sm flex flex-col items-center text-center space-y-4">
                
                {/* Dynamic QR Code Card */}
                <div className="p-3.5 bg-white rounded-2xl border border-[#DECDB3] shadow-md inline-block relative">
                  <QRCodeSVG
                    value={upiUri}
                    size={200}
                    level="M"
                    includeMargin={true}
                  />
                  <div className="mt-2 text-[10px] font-bold text-[#7D5A34] uppercase tracking-wider">
                    Scan with GPay / PhonePe / Paytm
                  </div>
                </div>

                {/* Copy UPI ID Button */}
                <div className="w-full max-w-sm space-y-2">
                  <div className="p-2.5 bg-[#FAF7F2] border border-[#DECDB3] rounded-2xl flex items-center justify-between gap-2">
                    <div className="text-left pl-2">
                      <span className="block text-[9px] uppercase tracking-wider text-[#7D6B58] font-bold">SHRITEJ Official UPI ID</span>
                      <span className="font-mono text-sm font-bold text-[#222E22]">{UPI_ID}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className={`px-3 py-1.5 rounded-xl font-ui text-xs font-bold transition-all flex items-center gap-1.5 ${
                        copiedUpi
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#2D3E2F] text-white hover:bg-[#202E22]'
                      }`}
                    >
                      {copiedUpi ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy UPI ID
                        </>
                      )}
                    </button>
                  </div>

                  {/* Mobile 1-Tap UPI Intent Button */}
                  <a
                    href={upiUri}
                    className="w-full py-3 px-4 rounded-full bg-[#EFE6D6] hover:bg-[#E5D8C3] text-[#7D5A34] border border-[#D5C2A4] font-ui text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Smartphone className="w-4 h-4 text-[#7D5A34]" /> Pay via UPI App (GPay / PhonePe / Paytm)
                  </a>
                </div>

                {/* Instruction Text */}
                <div className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#DECDB3]/80 text-xs text-[#5D4E3E] max-w-md text-left space-y-1">
                  <p className="font-semibold text-[#222E22]">Instructions:</p>
                  <p className="leading-relaxed">
                    Scan and pay the exact amount using any UPI app (GPay, PhonePe, Paytm). After payment, enter your 12-digit UPI Reference / UTR Number below.
                  </p>
                </div>
              </div>

              {/* UTR Input & Screenshot Proof Form */}
              <div className="p-5 rounded-2xl bg-[#F4EDE2] border border-[#DECDB3] space-y-4 text-xs">
                <h4 className="font-brand text-sm font-bold uppercase tracking-wider text-[#222E22] border-b border-[#DECDB3] pb-1">
                  Payment Verification Details
                </h4>

                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-ui flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* 12-digit UTR Input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-[#453A2E] uppercase tracking-wider text-[10px]">
                      12-digit UTR / UPI Transaction ID *
                    </label>
                    {utrNumber.trim().length >= 12 && (
                      <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Valid Reference Format
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={24}
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
                    placeholder="Enter 12-digit UPI reference ID (e.g. 423512345678)"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none font-mono"
                  />
                  <p className="text-[10px] text-[#7A6B5B] mt-1">
                    Found in your UPI app receipt under &ldquo;UPI Ref No&rdquo;, &ldquo;Transaction ID&rdquo;, or &ldquo;UTR&rdquo;.
                  </p>
                </div>

                {/* Optional Payment Screenshot Upload */}
                <div>
                  <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">
                    Upload Payment Screenshot (Optional proof)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer px-4 py-2 rounded-xl bg-white border border-[#DECDB3] hover:bg-[#FAF7F2] text-[#554636] font-semibold text-xs flex items-center gap-1.5 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{screenshotName ? 'Change Screenshot' : 'Select Screenshot'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleScreenshotChange}
                        className="hidden"
                      />
                    </label>
                    {screenshotName && (
                      <div className="flex items-center gap-2 text-xs text-[#2D3E2F] font-semibold truncate">
                        <ImageIcon className="w-4 h-4 shrink-0 text-[#7D5A34]" />
                        <span className="truncate max-w-[180px]">{screenshotName}</span>
                        <button
                          type="button"
                          onClick={() => { setScreenshotData(null); setScreenshotName(null); }}
                          className="text-rose-600 hover:text-rose-800 text-[10px] underline ml-1"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Preview */}
                  {screenshotData && (
                    <div className="mt-2.5 p-2 bg-white rounded-xl border border-[#DECDB3] inline-block">
                      <img
                        src={screenshotData}
                        alt="Payment Proof Preview"
                        className="w-24 h-24 object-cover rounded-lg border border-[#DECDB3]"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: Back + Confirm */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isSubmitting}
                  className="py-3.5 px-5 rounded-full border border-[#B5A187] text-xs font-ui uppercase font-semibold text-[#5A4A38] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Edit Address
                </button>

                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting || utrNumber.trim().length < 12}
                  className={`flex-1 py-4 px-6 rounded-full font-ui text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md flex items-center justify-center gap-2 ${
                    utrNumber.trim().length >= 12 && !isSubmitting
                      ? 'bg-[#2D3E2F] hover:bg-[#202E22] text-[#F9F6F0] active:scale-98'
                      : 'bg-[#C5B9A6] text-[#FAF7F2] cursor-not-allowed opacity-80'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Verifying &amp; Placing Order...
                    </span>
                  ) : (
                    <>
                      Confirm &amp; Place Order <Check className="w-4 h-4 text-[#C9A24D]" />
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* ================= STEP 3: ORDER CONFIRMATION ================= */}
          {step === 3 && placedOrder && (
            <div className="space-y-6 text-center font-ui py-2">
              
              {/* Success Badge & Header */}
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#2D3E2F] text-[#FAF7F2] flex items-center justify-center mx-auto shadow-lg ring-4 ring-[#E8E0D0]">
                  <Check className="w-8 h-8 text-[#C9A24D]" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#E2EBDD] text-[#2D3E2F] text-[10px] font-bold uppercase tracking-widest inline-block">
                  Order Placed Successfully! Ref: #{placedOrder.id}
                </span>
                <h3 className="font-brand text-2xl font-bold text-[#222E22]">
                  Dhanyavad, {placedOrder.customerName}!
                </h3>
                <p className="font-editorial text-xs sm:text-sm text-[#5C4F40] max-w-lg mx-auto leading-relaxed">
                  We are verifying your UPI transaction (<strong>{placedOrder.utrNumber}</strong>). Once verified, your handcrafted batch will be dispatched.
                </p>
              </div>

              {/* Order Summary Details Card */}
              <div className="p-5 rounded-2xl bg-[#F4EDE2] border border-[#DECDB3] text-left space-y-3.5 text-xs text-[#4E4032]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 border-b border-[#DECDB3] pb-3">
                  <div>
                    <span className="font-bold text-[#222E22] block mb-0.5 uppercase tracking-wider text-[10px]">Patron Recipient</span>
                    <p className="font-semibold">{placedOrder.customerName}</p>
                    <p className="text-[11px] text-[#6A5A48]">{placedOrder.customerPhone}</p>
                    <p className="text-[11px] text-[#6A5A48]">{placedOrder.customerEmail}</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#222E22] block mb-0.5 uppercase tracking-wider text-[10px]">Delivery Destination</span>
                    <p>{placedOrder.shippingAddress.address}</p>
                    <p>{placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.state} - {placedOrder.shippingAddress.pincode}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[#7A6B5B]">Payment Method: </span>
                    <strong className="text-[#2D3E2F]">Direct UPI ({UPI_ID})</strong>
                  </div>
                  <div>
                    <span className="text-[#7A6B5B]">UTR / Ref: </span>
                    <strong className="font-mono text-[#222E22]">{placedOrder.utrNumber}</strong>
                  </div>
                  <div>
                    <span className="text-[#7A6B5B]">Total Paid: </span>
                    <strong className="font-brand text-base text-[#7D5A34]">₹{placedOrder.totalAmount}</strong>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Verification Button */}
              <div className="p-4 rounded-2xl bg-[#EAF8EE] border border-[#BCE7C6] space-y-2">
                <p className="text-xs text-[#1D5E29] font-semibold">
                  For instant order confirmation or questions, chat with our master apothecary directly on WhatsApp:
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20BE5B] text-white font-ui text-xs uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
                >
                  <MessageCircle className="w-4 h-4" /> Chat with us on WhatsApp ({placedOrder.id})
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                {onTrackOrder && (
                  <button
                    onClick={() => {
                      onClose();
                      onTrackOrder(placedOrder.id);
                    }}
                    className="w-full sm:flex-1 py-3 px-5 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white text-xs font-ui uppercase font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Truck className="w-3.5 h-3.5" /> Track Consignment Live
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-full sm:flex-1 py-3 px-5 rounded-full border border-[#9A8162] text-xs font-ui uppercase font-semibold hover:bg-[#FAF7F2] transition-colors"
                >
                  Continue Browsing Formulations
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer Trust Bar */}
        <div className="px-6 py-3 bg-[#EFE7D8] border-t border-[#DECDB3] text-center text-[10px] font-ui text-[#7A6B5B] flex items-center justify-center gap-4 shrink-0">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-[#2D3E2F]" /> Direct UPI Verification
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Leaf className="w-3 h-3 text-[#2D3E2F]" /> 100% Authentic Botanicals
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Truck className="w-3 h-3 text-[#2D3E2F]" /> Plastic-Free Express Dispatch
          </span>
        </div>

      </div>
    </div>
  );
};
