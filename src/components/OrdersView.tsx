import React from 'react';
import { Package, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Order } from '../types';

interface OrdersViewProps {
  orders: Order[];
  onExplore: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ orders, onExplore }) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b border-[#DECDB3]">
        <div>
          <h2 className="text-2xl font-bold text-[#222E22] flex items-center gap-2">
            <Package className="w-6 h-6 text-[#7D5A34]" /> Your SHRITEJ Orders
          </h2>
          <p className="text-[#6D5D4C] text-xs mt-1">
            Track your dispatch, order details, and historical Ayurvedic purchases.
          </p>
        </div>
      </div>
      {orders.length === 0 ? (
        <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl p-12 text-center space-y-4">
          <ShoppingBag className="w-12 h-12 text-[#9A8973] mx-auto" />
          <h3 className="text-lg font-bold text-[#222E22]">No orders placed yet</h3>
          <p className="text-[#6D5D4C] text-xs max-w-sm mx-auto">
            Experience our flagship Traditional Ayurvedic Ubtan or herbal wellness formulations today.
          </p>
          <button
            onClick={onExplore}
            className="px-6 py-2.5 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui font-semibold text-xs transition-all shadow-md"
          >
            Explore SHRITEJ Formulations
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-[#FAF7F2] border border-[#DECDB3] rounded-2xl p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#DECDB3] text-xs">
                <div>
                  <span className="text-[#7A6B5B]">Order ID: </span>
                  <span className="text-[#222E22] font-mono font-bold">{order.id}</span>
                </div>
                <div className="text-[#7A6B5B]">{new Date(order.date).toLocaleDateString()}</div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2EBDD] text-[#2D3E2F] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {order.status}
                </div>
                <div className="text-base font-bold text-[#7D5A34]">₹{order.totalAmount}</div>
              </div>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-contain rounded-lg bg-[#FAF7F2] p-1 border border-[#DECDB3]"
                    />
                    <div className="flex-1 text-xs">
                      <h4 className="font-semibold text-[#222E22]">{item.product.name}</h4>
                      <p className="text-[#7A6B5B]">Qty: {item.quantity} × ₹{item.product.price}</p>
                    </div>
                    <span className="text-xs font-bold text-[#222E22]">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-[#DECDB3] text-xs text-[#7A6B5B]">
                <span>
                  Deliver to: <strong className="text-[#222E22]">{order.customerName}</strong> ({typeof order.shippingAddress === 'string' ? order.shippingAddress : `${order.shippingAddress.address}, ${order.shippingAddress.city}`})
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};