import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dkiniypyxuarcjtmjnop.supabase.co';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseKey) {
    return NextResponse.json({
      connected: false,
      message: 'Supabase service role secret not set',
    });
  }

  const tables = {
    products: false,
    orders: false,
    inquiries: false,
    subscribers: false,
    reviews: false,
  };

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);

    const checkTable = async (name: string) => {
      try {
        const { error } = await supabase.from(name).select('id').limit(1);
        return !error;
      } catch {
        return false;
      }
    };

    tables.products = await checkTable('products');
    tables.orders = await checkTable('orders');
    tables.inquiries = await checkTable('inquiries');
    tables.subscribers = await checkTable('subscribers');
    tables.reviews = await checkTable('reviews');

    const allConfigured = Object.values(tables).every(Boolean);

    return NextResponse.json({
      connected: true,
      projectUrl: supabaseUrl,
      allConfigured,
      tables,
    });
  } catch (err: any) {
    return NextResponse.json({
      connected: false,
      error: err.message,
    });
  }
}