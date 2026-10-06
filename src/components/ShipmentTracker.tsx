import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, ArrowRight, ShieldCheck, MessageSquare, AlertCircle, RefreshCw } from 'lucide-react';
import { Order } from '../types';

interface ShipmentTrackerProps {
  orders: Order[];
  onBrowse: () => void;
  onClose?: () => void;
  initialOrderId?: string;
}

export const ShipmentTracker: React.FC<ShipmentTrackerProps> = ({ orders, onBrowse, onClose, initialOrderId }) => {
  const [searchQuery, setSearchQuery] = useState(initialOrderId || '');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(() => {
    if (initialOrderId) {
      const found = orders.find((o) => o.id.toUpperCase() === initialOrderId.toUpperCase());
      if (found) return found;
    }
    return orders.length > 0 ? orders[0] : null;
  });
  const [hasSearched, setHasSearched] = useState(!!initialOrderId);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const q = searchQuery.trim().toUpperCase();
    if (!q) return;

    // 1. Search in memory
    const foundLocal = orders.find(
      (o) =>
        o.id.toUpperCase() === q ||
        o.customerEmail.toUpperCase() === q ||
        o.customerPhone.replace(/\D/g, '') === q.replace(/\D/g, '')
    );

    if (foundLocal) {
      setSearchedOrder(foundLocal);
      return;
    }

    // 2. Fetch from Supabase API /api/orders
    setIsLoading(true);
    try {
      const res = await fetch('/api/orders?email=' + encodeURIComponent(q));
      const data = await res.json();
      if (data?.success && Array.isArray(data.orders) && data.orders.length > 0) {
        setSearchedOrder(data.orders[0]);
      } else {
        setSearchedOrder(null);
      }
    } catch (err) {
      console.warn('Order search API note:', err);
      setSearchedOrder(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStepStatus = (orderStatus: string, stepIndex: number) => {
    // 0: Placed, 1: Packed, 2: Shipped, 3: Delivered
    const statusMap: { [key: string]: number } = {
      'Processing': 1,
      'Packed': 2,
      'Shipped': 3,
      'Delivered': 4,
    };
    const current = statusMap[orderStatus] || 1;
    if (stepIndex < current) return 'completed';
    if (stepIndex === current) return 'active';
    return 'pending';
  };

  const orderDate = searchedOrder ? new Date(searchedOrder.date) : new Date();
  const formatTime = (d: Date, addDays: number) => {
    const next = new Date(d);
    next.setDate(next.getDate() + addDays);
    return next.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const awb = searchedOrder?.awbNumber || ('STA-' + (searchedOrder ? searchedOrder.id.replace(/\D/g, '').slice(-6) || '829471' : '829471'));
  const courierName = searchedOrder?.courier || 'Blue Dart Express';

  const steps = [
    {
      title: 'Order Placed & Confirmed',
      desc: searchedOrder ? ('Received at sanctuary on ' + formatTime(orderDate, 0)) : 'Payment verified',
      icon: Clock,
    },
    {
      title: 'Artisan Packed in Biodegradable Wrap',
      desc: searchedOrder ? ('Hand-sealed in unbleached raw kraft on ' + formatTime(orderDate, 1)) : 'Zero plastic packaging',
      icon: Package,
    },
    {
      title: 'In Transit with Express Courier',
      desc: 'Carrier: ' + courierName + ' (AWB: ' + awb + ')',
      icon: Truck,
    },
    {
      title: 'Delivered at Doorstep',
      desc: searchedOrder ? ('Estimated Arrival: ' + (searchedOrder.estimatedDelivery || formatTime(orderDate, 4))) : 'Standard 3-5 days delivery',
      icon: CheckCircle2,
    },
  ];

  const addressString = searchedOrder
    ? (typeof searchedOrder.shippingAddress === 'string'
        ? searchedOrder.shippingAddress
        : ((searchedOrder.shippingAddress?.address || '') + ', ' + (searchedOrder.shippingAddress?.city || '') + ' - ' + (searchedOrder.shippingAddress?.pincode || '')))
    : '';

  const waHref = 'https://wa.me/918080218728?text=' + encodeURIComponent(
    'Namaste SHRiTEJ AYURVED, Please provide live courier location for Order #' + (searchedOrder?.id || 'STA-') + ' (AWB: ' + awb + ')'
  );

  return (
    <div className="py-10 sm:py-16 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE6D6] border border-[#D5C4A7] text-[#694F32] font-ui text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold">
            <Truck className="w-3.5 h-3.5 text-[#7D5A34]" />
            <span>National Express Logistics</span>
          </div>
          <h1 className="font-brand text-3xl sm:text-5xl font-bold tracking-[0.06em] text-[#222E22]">
            Track Your Consignment
          </h1>
          <p className="font-editorial text-base sm:text-lg text-[#594B3C]">
            Live tracking for your Ayurvedic botanical formulations from our sanctuary to your doorstep.
          </p>
          <div className="w-16 h-0.5 bg-[#8E6E45] mx-auto mt-2"></div>
        </div>

        {/* Search Bar */}
        <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-4 sm:p-6 shadow-sm max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-[#8A7966] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. ORD-1791), Phone or Email"
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] font-ui focus:border-[#7D5A34] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-7 py-3 rounded-2xl bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-wider font-semibold transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Track Status</span>}
            </button>
          </form>
        </div>

        {/* Search Results Display */}
        {searchedOrder ? (
          <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 animate-in fade-in duration-300">
            
            {/* Top Order Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#DECDB3]">
              <div>
                <span className="font-ui text-[10px] uppercase tracking-wider text-[#8A7966] block">Consignment Number</span>
                <span className="font-brand text-2xl font-bold text-[#222E22]">{searchedOrder.id}</span>
                <span className="font-ui text-xs text-[#7A6B5B] block mt-0.5">AWB: <strong className="text-[#2D3E2F]">{awb}</strong> • {courierName}</span>
              </div>
              <div className="text-right">
                <span className="font-ui text-[10px] uppercase tracking-wider text-[#8A7966] block">Estimated Delivery</span>
                <span className="font-brand text-lg sm:text-xl font-bold text-[#7D5A34] block">
                  {searchedOrder.estimatedDelivery || formatTime(orderDate, 4)}
                </span>
                <span className="inline-flex items-center gap-1 font-ui text-[10px] font-bold text-[#2D3E2F] bg-[#E2EBDC] px-2.5 py-0.5 rounded-full mt-1">
                  <CheckCircle2 className="w-3 h-3" /> On Schedule
                </span>
              </div>
            </div>

            {/* Stepper Progress Bar (Flipkart Style) */}
            <div className="py-4">
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-5 left-6 right-6 h-1 bg-[#E3DAC8] -z-0 hidden md:block"></div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                  {steps.map((st, i) => {
                    const status = getStepStatus(searchedOrder.status, i);
                    return (
                      <div key={i} className="flex md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-3">
                        <div
                          className={
                            'w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-all ' +
                            (status === 'completed'
                              ? 'bg-[#2D3E2F] text-white ring-4 ring-[#E2EBDC]'
                              : status === 'active'
                              ? 'bg-[#7D5A34] text-white ring-4 ring-[#F2E8D7] animate-pulse'
                              : 'bg-[#EFE6D6] text-[#8A7966]')
                          }
                        >
                          <st.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 md:flex-initial">
                          <h4 className="font-brand text-sm font-bold text-[#222E22]">{st.title}</h4>
                          <p className="font-ui text-[11px] text-[#7A6B5B] mt-0.5">{st.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Consignment Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#DECDB3] text-xs font-ui">
              <div className="p-4 bg-[#F4EDE2] rounded-2xl border border-[#DECDB3] space-y-1">
                <span className="font-bold uppercase tracking-wider text-[#7D5A34] text-[10px] block">Shipping Destination</span>
                <p className="font-semibold text-[#222E22]">{searchedOrder.customerName}</p>
                <p className="text-[#594B3C]">{addressString || 'Registered Address'}</p>
                <p className="text-[#7A6B5B]">Phone: {searchedOrder.customerPhone || '+91 80802 18728'}</p>
                <p className="text-[#7A6B5B]">Payment Method: <strong>{searchedOrder.paymentMethod}</strong></p>
              </div>

              <div className="p-4 bg-[#F4EDE2] rounded-2xl border border-[#DECDB3] space-y-1">
                <span className="font-bold uppercase tracking-wider text-[#7D5A34] text-[10px] block">Package Inclusions</span>
                <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                  {searchedOrder.items.map((itm, i) => (
                    <div key={i} className="flex justify-between text-[#473B2E] items-center">
                      <span className="truncate max-w-[180px] font-medium">{itm.product.name}</span>
                      <span className="font-bold text-[#7D5A34]">Qty: {itm.quantity} × ₹{itm.product.price}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-[#DECDB3] flex justify-between font-bold text-[#222E22]">
                  <span>Total Paid (Eco Delivery Included)</span>
                  <span className="font-brand text-base text-[#7D5A34]">₹{searchedOrder.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Need Live Support Button */}
            <div className="p-4 bg-[#EFE6D6] rounded-2xl border border-[#D5C2A4] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-ui text-[#524436]">
                <ShieldCheck className="w-4 h-4 text-[#2D3E2F]" />
                <span>Need real-time carrier location updates? Connect directly on WhatsApp.</span>
              </div>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-[11px] uppercase tracking-wider font-semibold transition-all shadow-sm shrink-0 flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Support
              </a>
            </div>

          </div>
        ) : hasSearched ? (
          <div className="p-12 text-center space-y-3 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-[#7D5A34] mx-auto" />
            <h3 className="font-brand text-lg font-bold text-[#222E22]">No Order Found</h3>
            <p className="font-editorial text-sm text-[#6E5E4D]">
              Please verify your Order ID (e.g. ORD-1791) or search using your registered contact email or phone number.
            </p>
            <button
              onClick={onBrowse}
              className="mt-2 px-6 py-2.5 rounded-full bg-[#2D3E2F] text-white font-ui text-xs uppercase tracking-wider font-semibold"
            >
              Browse Products Catalogue
            </button>
          </div>
        ) : (
          <div className="p-12 text-center space-y-3 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3] max-w-lg mx-auto">
            <Package className="w-10 h-10 text-[#9A8973] mx-auto" />
            <h3 className="font-brand text-base font-bold text-[#222E22]">No Active Order Selected</h3>
            <p className="font-editorial text-sm text-[#6E5E4D]">
              Enter your Order ID in the box above or place an order to trace your authentic Ayurvedic formulations live.
            </p>
            <button
              onClick={onBrowse}
              className="mt-2 px-6 py-2.5 rounded-full bg-[#2D3E2F] text-white font-ui text-xs uppercase tracking-wider font-semibold"
            >
              Explore Apothecary
            </button>
          </div>
        )}

      </div>
    </div>
  );
};