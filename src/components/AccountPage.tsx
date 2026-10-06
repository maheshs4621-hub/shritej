import React, { useState } from 'react';
import { User, Package, MapPin, LogIn, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import { Order } from '../types';

interface AccountPageProps {
  orders: Order[];
  onBrowseCatalogue: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ orders, onBrowseCatalogue }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="py-12 sm:py-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE6D6] border border-[#D5C4A7] text-[#694F32] font-ui text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold">
            <User className="w-3.5 h-3.5 text-[#8A6A42]" />
            <span>Patron Portal</span>
          </div>
          <h1 className="font-brand text-3xl sm:text-5xl font-bold tracking-[0.06em] text-[#222E22]">
            My Ayurvedic Account
          </h1>
          <p className="font-editorial text-base sm:text-lg text-[#594B3C]">
            Track ongoing deliveries, review formulation history, and manage your delivery address.
          </p>
          <div className="w-16 h-0.5 bg-[#8E6E45] mx-auto mt-2"></div>
        </div>

        {!isLoggedIn ? (
          /* Sign-in / Guest Form */
          <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-6 sm:p-10 max-w-md mx-auto shadow-sm space-y-6">
            <div className="text-center space-y-1">
              <h3 className="font-brand text-xl font-bold text-[#222E22]">Sign In or Register</h3>
              <p className="font-editorial text-sm text-[#6A5947]">Access order tracking with your registered phone or email.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4 font-ui text-xs">
              <div>
                <label className="block font-bold text-[#453A2E] mb-1.5 uppercase tracking-wider text-[10px]">Full Name</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mahesh Swami"
                  className="w-full px-4 py-3 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-[#222E22] text-sm focus:border-[#7D5A34] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-[#453A2E] mb-1.5 uppercase tracking-wider text-[10px]">Email Address</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. mahesh@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-[#222E22] text-sm focus:border-[#7D5A34] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-[#453A2E] mb-1.5 uppercase tracking-wider text-[10px]">Mobile Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 80802 18728"
                  className="w-full px-4 py-3 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-[#222E22] text-sm focus:border-[#7D5A34] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-[0.25em] font-semibold transition-all shadow-md flex items-center justify-center gap-2"
              >
                Access Account <LogIn className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Profile & Orders */
          <div className="space-y-8">
            <div className="p-6 bg-[#F4EDE2] rounded-3xl border border-[#DECDB3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#2D3E2F] text-white flex items-center justify-center font-brand font-bold text-xl">
                  {name ? name.charAt(0).toUpperCase() : 'M'}
                </div>
                <div>
                  <h3 className="font-brand text-lg font-bold text-[#222E22]">{name || 'Ayurvedic Patron'}</h3>
                  <p className="font-ui text-xs text-[#7A6B5B]">{email || 'patron@shritejayurveda.com'}</p>
                  {phone && <p className="font-ui text-xs text-[#7A6B5B]">{phone}</p>}
                </div>
              </div>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="px-4 py-2 rounded-full border border-[#B5A187] text-xs font-ui uppercase font-semibold text-[#5A4A38] hover:bg-[#FAF7F2]"
              >
                Sign Out
              </button>
            </div>

            {/* Order History */}
            <div className="space-y-4">
              <h2 className="font-brand text-xl font-bold text-[#222E22] uppercase tracking-wider">
                Order History &amp; Dispatch Status
              </h2>

              {orders.length === 0 ? (
                <div className="p-12 text-center space-y-3 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3]">
                  <Package className="w-10 h-10 text-[#9A8973] mx-auto" />
                  <h4 className="font-brand text-base font-bold text-[#222E22]">No Active Orders Yet</h4>
                  <p className="font-editorial text-sm text-[#695A49]">
                    When you place an order, the dispatch tracking and courier status will appear here.
                  </p>
                  <button
                    onClick={onBrowseCatalogue}
                    className="mt-2 px-6 py-2.5 rounded-full bg-[#2D3E2F] text-white font-ui text-xs uppercase tracking-wider font-semibold"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-6 space-y-4 shadow-sm"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DECDB3] pb-3">
                        <div>
                          <span className="font-ui text-[10px] uppercase tracking-wider text-[#8A7966] block">Order Identifier</span>
                          <strong className="font-brand text-base text-[#222E22]">{ord.id}</strong>
                        </div>
                        <div>
                          <span className="font-ui text-[10px] uppercase tracking-wider text-[#8A7966] block">Date Placed</span>
                          <span className="font-ui text-xs text-[#453A2D]">{new Date(ord.date).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="font-ui text-[10px] uppercase tracking-wider text-[#8A7966] block">Status</span>
                          <span className="inline-flex items-center gap-1 font-ui text-xs font-bold text-[#2D3E2F] bg-[#E3EBDC] px-3 py-1 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" /> {ord.status}
                          </span>
                        </div>
                        <div>
                          <span className="font-ui text-[10px] uppercase tracking-wider text-[#8A7966] block">Total</span>
                          <strong className="font-brand text-lg text-[#7D5A34]">₹{ord.totalAmount}</strong>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="font-ui text-[10px] font-bold uppercase tracking-wider text-[#7D5A34]">Items Handcrafted:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-2.5 bg-[#F4EDE2] rounded-xl text-xs">
                              <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-contain rounded-lg bg-white p-0.5" />
                              <div className="flex-1 truncate">
                                <p className="font-brand font-bold text-[#222E22] truncate">{item.product.name}</p>
                                <p className="text-[#7A6B5B]">Qty: {item.quantity} × ₹{item.product.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-xs font-ui text-[#6A5A48] pt-2 border-t border-[#DECDB3]/60 flex items-center justify-between">
                        <span><strong>Shipping to:</strong> {ord.shippingAddress?.address || 'Registered Address'}, {ord.shippingAddress?.city || ''}</span>
                        <span className="text-[#2D3E2F] font-semibold">Est. Delivery: {ord.estimatedDelivery || '3-5 Business Days'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};