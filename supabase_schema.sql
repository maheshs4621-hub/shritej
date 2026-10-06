-- ========================================================
-- SHRiTEJ AYURVED Database Schema for Supabase
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/dkiniypyxuarcjtmjnop/sql/new
-- ========================================================

-- 1. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  rating NUMERIC DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  stock INTEGER DEFAULT 50,
  is_featured BOOLEAN DEFAULT false,
  is_new_arrival BOOLEAN DEFAULT false,
  description TEXT,
  ingredients TEXT,
  ayurvedic_benefits JSONB DEFAULT '[]'::jsonb,
  how_to_use TEXT,
  suitable_for TEXT,
  net_quantity TEXT,
  shelf_life TEXT,
  storage TEXT,
  packaging_details TEXT,
  sustainability_info TEXT,
  disclaimer TEXT,
  sku TEXT,
  weight TEXT,
  specs JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL,
  discount NUMERIC DEFAULT 0,
  shipping NUMERIC DEFAULT 0,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'Processing',
  shipping_address JSONB NOT NULL,
  payment_method TEXT NOT NULL,
  estimated_delivery TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Inquiries / Contact Form Table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS public.subscribers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Public products are viewable by everyone" 
  ON public.products FOR SELECT USING (true);

-- Allow public insert access for inquiries, subscribers, and orders
CREATE POLICY "Anyone can submit contact inquiries" 
  ON public.inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can subscribe to newsletter" 
  ON public.subscribers FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can place an order" 
  ON public.orders FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their orders" 
  ON public.orders FOR SELECT USING (true);