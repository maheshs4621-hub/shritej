import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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
      status,
      shippingAddress,
      paymentMethod,
      estimatedDelivery,
    } = body;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from('orders').insert([
          {
            id,
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone,
            items,
            subtotal,
            discount,
            shipping,
            total_amount: totalAmount,
            status,
            shipping_address: shippingAddress,
            payment_method: paymentMethod,
            estimated_delivery: estimatedDelivery,
          },
        ]);
      } catch (dbErr) {
        console.warn('Supabase order note:', dbErr);
      }
    }

    return NextResponse.json({ success: true, orderId: id });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}