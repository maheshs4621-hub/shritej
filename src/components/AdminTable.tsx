import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Product } from '../types';
interface AdminTableProps { products: Product[]; onOpenAdd: () => void; onEdit: (p: Product) => void; onDelete: (id: string) => void; }
export const AdminTable: React.FC<AdminTableProps> = ({ products, onOpenAdd, onEdit, onDelete }) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-2xl font-bold text-white">Shivtej Catalog & Inventory Control</h2>
          <p className="text-stone-400 text-xs mt-1">Manage products, update prices, alter stock counts, or delete formulations.</p>
        </div>
        <button onClick={onOpenAdd} className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-all shadow-lg shadow-amber-600/30 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Ayurvedic Product
        </button>
      </div>
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-950 text-stone-400 uppercase tracking-wider text-[11px] border-b border-stone-800">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Inventory</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-stone-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-contain rounded-lg bg-stone-950 p-1 border border-stone-800 shrink-0" />
                      <div>
                        <div className="font-semibold text-white">{p.name}</div>
                        <div className="text-stone-400 text-[11px] truncate max-w-xs">{p.tagline}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-stone-800 text-amber-300 font-medium text-[11px]">{p.category}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-amber-300">₹{p.price}</td>
                  <td className="px-6 py-4">
                    <span className={'px-2 py-0.5 rounded text-[11px] font-semibold ' + (p.stock > 10 ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10')}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button onClick={() => onEdit(p)} className="p-2 rounded-lg bg-stone-800 text-amber-300 hover:text-white hover:bg-amber-600/30 transition-colors border border-stone-700/60" title="Edit Product" aria-label="Edit Product">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(p.id)} className="p-2 rounded-lg bg-stone-800 text-rose-400 hover:text-white hover:bg-rose-600/30 transition-colors border border-stone-700/60" title="Delete Product" aria-label="Delete Product">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
