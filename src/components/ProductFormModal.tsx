import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { Product } from '../types';
interface ProductFormModalProps { isOpen: boolean; onClose: () => void; editingProduct: Product | null; formData: any; setFormData: (f: any) => void; onSubmit: (e: React.FormEvent) => void; }
export const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, editingProduct, formData, setFormData, onSubmit }) => {
  if (!isOpen) return null;
  const CATEGORIES = ['Ubtan & Lepa', 'Combos & Kits', 'Facial Oils', 'Toners & Mists', 'Bathing Rituals'];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-stone-900 border border-amber-800/50 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
        <h2 className="text-2xl font-bold text-white mb-2">{editingProduct ? 'Edit Ayurvedic Product' : 'Add New Ayurvedic Product'}</h2>
        <p className="text-xs text-stone-400 mb-6">Enter the details of the Ayurvedic formulation to update the live Shivtej store catalog.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1">Formulation / Product Name</label>
            <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Shivtej Ayurvedic Ubtan" className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm focus:border-amber-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1">Short Subtitle / Tagline</label>
            <input required type="text" value={formData.tagline} onChange={(e) => setFormData({ ...formData, tagline: e.target.value })} placeholder="Traditional herbal pack for naturally glowing skin" className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm focus:border-amber-500 focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">Price (₹)</label>
              <input required type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="299" className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm focus:border-amber-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">Original MRP (₹)</label>
              <input type="number" value={formData.originalPrice} onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })} placeholder="449" className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm focus:border-amber-500 focus:outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">Ayurvedic Category</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm focus:border-amber-500 focus:outline-none">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">Stock Quantity</label>
              <input required type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} placeholder="50" className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm focus:border-amber-500 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1">Image URL</label>
            <input required type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="/images/shritej-ubtan.jpg" className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm focus:border-amber-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1">Herbal Description</label>
            <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Traditional Ayurvedic herbs blend for radiant skin..." className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm focus:border-amber-500 focus:outline-none" />
          </div>
          <div className="pt-2 flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl bg-stone-800 text-stone-300 hover:text-white text-xs font-medium">Cancel</button>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-all shadow-lg shadow-amber-600/30">{editingProduct ? 'Update Product' : 'Save & Publish Product'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};
