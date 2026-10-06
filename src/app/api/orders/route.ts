import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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

    const { data, error } = await supabase.from('orders').insert([
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

    if (error) {
      console.warn('Supabase order insert note:', error.message);
      // Return success with note if table not yet migrated so checkout doesn't fail
      return NextResponse.json({ success: true, savedToDb: false, message: error.message });
    }

    return NextResponse.json({ success: true, savedToDb: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}