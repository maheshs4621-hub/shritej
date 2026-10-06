import { NextResponse } from 'next/server';
import { Order } from '@/types';

export const dynamic = 'force-dynamic';

function mapDbToOrder(row: any): Order {
  return {
    id: row.id,
    date: row.created_at || row.date || new Date().toISOString(),
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone || '',
    items: row.items || [],
    subtotal: Number(row.subtotal || row.total_amount || 0),
    discount: Number(row.discount || 0),
    shipping: Number(row.shipping || 0),
    totalAmount: Number(row.total_amount || 0),
    status: row.status || 'Processing',
    shippingAddress: typeof row.shipping_address === 'string'
      ? { address: row.shipping_address, city: '', state: '', pincode: '' }
      : row.shipping_address,
    paymentMethod: row.payment_method || 'UPI',
    estimatedDelivery: row.estimated_delivery || '3-5 business days',
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const orderId = searchParams.get('id');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ success: true, orders: [], source: 'local' });
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);

    let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (orderId) {
      query = query.eq('id', orderId);
    } else if (email) {
      query = query.eq('customer_email', email);
    } else {
      query = query.limit(50);
    }

    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ success: true, orders: [], error: error.message });
    }

    const orders = (data || []).map(mapDbToOrder);
    return NextResponse.json({ success: true, orders, source: 'database' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      customerName,
      customerEmail,
      customerPhone,
      items,
      subtotal,
      discount,
      shipping,
      totalAmount,
      status = 'Processing',
      shippingAddress,
      paymentMethod = 'UPI',
      estimatedDelivery = '3 to 5 business days',
    } = body;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    let dbSaved = false;

    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { error } = await supabase.from('orders').insert([
          {
            id: id || ('SHRITEJ-' + Math.floor(100000 + Math.random() * 900000)),
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone,
            items,
            subtotal,
            discount: discount || 0,
            shipping: shipping || 0,
            total_amount: totalAmount,
            status,
            shipping_address: shippingAddress,
            payment_method: paymentMethod,
            estimated_delivery: estimatedDelivery,
          },
        ]);

        if (!error) {
          dbSaved = true;

          // Deduct stock if possible
          if (Array.isArray(items)) {
            for (const itm of items) {
              if (itm.product?.id && itm.quantity) {
                try {
                  const { data: prod } = await supabase.from('products').select('stock').eq('id', itm.product.id).single();
                  if (prod && typeof prod.stock === 'number') {
                    const newStock = Math.max(0, prod.stock - itm.quantity);
                    await supabase.from('products').update({ stock: newStock }).eq('id', itm.product.id);
                  }
                } catch (stockErr) {}
              }
            }
          }
        }
      } catch (dbErr) {
        console.warn('Supabase order insert note:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      savedToDb: dbSaved,
      order: {
        id,
        date: new Date().toISOString(),
        customerName,
        customerEmail,
        customerPhone,
        items,
        subtotal,
        discount,
        shipping,
        totalAmount,
        status,
        shippingAddress,
        paymentMethod,
        estimatedDelivery,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}