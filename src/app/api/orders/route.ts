import { NextResponse } from 'next/server';
import { Order } from '@/types';
import { getStoredOrders, saveStoredOrder } from '@/lib/ordersStore';

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
    utrNumber: row.utr_number,
    paymentScreenshot: row.payment_screenshot,
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const orderId = searchParams.get('id');

  const localOrders = getStoredOrders().filter((ord) => {
    const name = (ord.customerName || '').toLowerCase();
    const em = (ord.customerEmail || '').toLowerCase();
    if (name.includes('mahesh') || em.includes('mahesh')) return false;
    if (orderId) return ord.id === orderId;
    if (email) return em === email.toLowerCase();
    return true;
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ success: true, orders: localOrders, source: 'local' });
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
      return NextResponse.json({ success: true, orders: localOrders, error: error.message });
    }

    const dbOrders = (data || [])
      .filter((r: any) => {
        const name = (r.customer_name || '').toLowerCase();
        const em = (r.customer_email || '').toLowerCase();
        if (email) {
          return em === email.toLowerCase();
        }
        return !name.includes('mahesh') && !em.includes('mahesh');
      })
      .map(mapDbToOrder);

    // Merge without duplicates (local orders take precedence for recent UTR data)
    const combinedMap = new Map<string, Order>();
    for (const o of dbOrders) combinedMap.set(o.id, o);
    for (const o of localOrders) combinedMap.set(o.id, o);

    return NextResponse.json({
      success: true,
      orders: Array.from(combinedMap.values()),
      source: 'database-and-local',
    });
  } catch (err: any) {
    return NextResponse.json({ success: true, orders: localOrders, fallbackError: err.message });
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
      discount = 0,
      shipping = 0,
      totalAmount,
      status = 'Processing',
      shippingAddress,
      paymentMethod = 'UPI',
      estimatedDelivery = '3 to 5 business days',
      utrNumber,
      paymentScreenshot,
    } = body;

    const orderObj: Order = {
      id: id || ('SHRITEJ-' + Math.floor(100000 + Math.random() * 900000)),
      date: new Date().toISOString(),
      customerName,
      customerEmail,
      customerPhone,
      items,
      subtotal: Number(subtotal) || 0,
      discount: Number(discount) || 0,
      shipping: Number(shipping) || 0,
      totalAmount: Number(totalAmount) || 0,
      status,
      shippingAddress,
      paymentMethod,
      estimatedDelivery,
      utrNumber,
      paymentScreenshot,
    };

    saveStoredOrder(orderObj);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    let dbSaved = false;

    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { error } = await supabase.from('orders').insert([
          {
            id: orderObj.id,
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone,
            items,
            subtotal: orderObj.subtotal,
            discount: orderObj.discount,
            shipping: orderObj.shipping,
            total_amount: orderObj.totalAmount,
            status,
            shipping_address: shippingAddress,
            payment_method: paymentMethod,
            estimated_delivery: estimatedDelivery,
          },
        ]);

        if (!error) {
          dbSaved = true;
        }
      } catch (dbErr) {
        console.warn('Supabase order insert note:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      savedToDb: dbSaved,
      order: orderObj,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
