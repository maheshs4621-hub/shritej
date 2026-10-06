export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  reviewsList?: Review[];
  category: string;
  image: string;
  stock: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  description: string;
  ingredients: string;
  ayurvedicBenefits: string[];
  howToUse: string;
  suitableFor: string;
  netQuantity: string;
  shelfLife: string;
  storage: string;
  packagingDetails: string;
  sustainabilityInfo: string;
  disclaimer: string;
  sku: string;
  weight: string;
  specs: { [key: string]: string };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  totalAmount: number;
  status: 'Processing' | 'Packed' | 'Shipped' | 'Delivered';
  shippingAddress: {
    address: string;
    apartment?: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
  estimatedDelivery: string;
}

export type ViewType = 
  | 'home'
  | 'products'
  | 'product-detail'
  | 'story'
  | 'ayurveda'
  | 'sustainability'
  | 'contact'
  | 'faq'
  | 'wishlist'
  | 'account'
  | 'privacy'
  | 'terms'
  | 'shipping-policy'
  | 'returns-policy'
  | 'disclaimer';