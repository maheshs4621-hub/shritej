import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, LogIn, CheckCircle2, ShieldCheck, Mail, Truck, ExternalLink, ArrowRight, LogOut } from 'lucide-react';
import { Order, UserProfile } from '../types';

interface AccountPageProps {
  orders: Order[];
  onBrowseCatalogue: () => void;
  onTrackOrder?: (orderId: string) => void;
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
  onLogout?: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  orders,
  onBrowseCatalogue,
  onTrackOrder,
  currentUser,
  onOpenAuth,
  onLogout,
}) => {
  const [liveOrders, setLiveOrders] = useState<Order[]>(orders);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  useEffect(() => {
    setLiveOrders(orders);
  }, [orders]);

  // Fetch live orders for current user email if available
  useEffect(() => {
    const fetchUserOrders = async () => {
      const email = currentUser?.email;
      if (!email) return;
      setIsLoadingOrders(true);
      try {
        const res = await fetch('/api/orders?email=' + encodeURIComponent(email));
        const data = await res.json();
        if (data?.success && Array.isArray(data.orders)) {
          const map = new Map<string, Order>();
          orders.forEach((o) => map.set(o.id, o));
          data.orders.forEach((o: Order) => map.set(o.id, o));
          setLiveOrders(Array.from(map.values()));
        }
      } catch (err) {
        console.warn('Order fetch note:', err);
      } finally {
        setIsLoadingOrders(false);
      }
    };
    fetchUserOrders();
  }, [currentUser, orders]);

  const isLoggedIn = !!currentUser;

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
            Track ongoing deliveries, review formulation history, and manage your delivery addresses.
          </p>
          <div className="w-16 h-0.5 bg-[#8E6E45] mx-auto mt-2"></div>
        </div>

        {!isLoggedIn ? (
          /* Sign-in Callout */
          <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-8 sm:p-12 max-w-md mx-auto shadow-sm text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#2D3E2F] text-white flex items-center justify-center mx-auto shadow-md">
              <User className="w-8 h-8 text-[#E8DFD0]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-brand text-2xl font-bold text-[#222E22]">Welcome to Patron Portal</h3>
              <p className="font-editorial text-sm text-[#6A5947]">
                Sign in with Google or your email to access your order history, track shipments in real-time, and manage addresses.
              </p>
            </div>
            <button
              onClick={onOpenAuth}
              className="w-full py-4 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-[0.25em] font-semibold transition-all shadow-md flex items-center justify-center gap-2"
            >
              Sign In or Register <LogIn className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Profile & Orders */
          <div className="space-y-8">
            {/* User Profile Card */}
            <div className="p-6 sm:p-8 bg-[#F4EDE2] rounded-3xl border border-[#DECDB3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#2D3E2F] text-[#E8DFD0] flex items-center justify-center font-brand font-bold text-xl shadow-inner">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    (currentUser.name || 'P').charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-brand text-lg sm:text-xl font-bold text-[#222E22]">{currentUser.name}</h3>
                    {currentUser.isAdmin && (
                      <span className="px-2 py-0.5 rounded-full bg-[#7D5A34] text-white font-ui text-[9px] uppercase font-bold tracking-wider">
                        Super Admin
                      </span>
                    )}
                  </div>
                  <p className="font-ui text-xs text-[#7A6B5B]">{currentUser.email}</p>
                  <span className="font-ui text-[10px] text-[#2D3E2F] inline-flex items-center gap-1 font-semibold mt-1">
                    <ShieldCheck className="w-3 h-3" /> Signed in via {currentUser.provider === 'google' ? 'Google Authenticated' : 'Email Account'}
                  </span>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="px-5 py-2.5 rounded-full border border-[#B5A187] text-xs font-ui uppercase font-semibold text-[#5A4A38] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>

            {/* Order History */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-brand text-xl font-bold text-[#222E22] uppercase tracking-wider">
                  Order History &amp; Dispatch Status
                </h2>
                <span className="font-ui text-xs text-[#7A6B5B]">
                  {liveOrders.length} {liveOrders.length === 1 ? 'Order' : 'Orders'} Found
                </span>
              </div>

              {liveOrders.length === 0 ? (
                <div className="p-12 text-center space-y-3 bg-[#FAF7F2] rounded-3xl border border-[#DECDB3]">
                  <Package className="w-10 h-10 text-[#9A8973] mx-auto" />
                  <h4 className="font-brand text-base font-bold text-[#222E22]">No Active Orders Placed Yet</h4>
                  <p className="font-editorial text-sm text-[#695A49]">
                    When you order our fresh hand-ground Ayurvedic formulations, real-time dispatch tracking will appear right here.
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
                  {liveOrders.map((ord) => (
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
                          <span className="font-ui text-[10px] uppercase tracking-wider text-[#8A7966] block">Shipment Status</span>
                          <span className="inline-flex items-center gap-1 font-ui text-xs font-bold text-[#2D3E2F] bg-[#E3EBDC] px-3 py-1 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" /> {ord.status}
                          </span>
                        </div>
                        <div>
                          <span className="font-ui text-[10px] uppercase tracking-wider text-[#8A7966] block">Amount Paid</span>
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

                      <div className="text-xs font-ui text-[#6A5A48] pt-2 border-t border-[#DECDB3]/60 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <span><strong>Destination:</strong> {typeof ord.shippingAddress === 'string' ? ord.shippingAddress : (ord.shippingAddress?.address + ', ' + ord.shippingAddress?.city)}</span>
                          {ord.awbNumber && (
                            <span className="block text-[11px] text-[#2D3E2F] font-semibold mt-0.5">
                              Carrier: {ord.courier || 'Blue Dart'} (AWB: {ord.awbNumber})
                            </span>
                          )}
                        </div>
                        {onTrackOrder && (
                          <button
                            onClick={() => onTrackOrder(ord.id)}
                            className="px-4 py-2 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
                          >
                            <Truck className="w-3.5 h-3.5" /> Live Shipment Status <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
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