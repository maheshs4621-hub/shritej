import { NextResponse } from 'next/server';
import { Order } from '@/types';
import { saveStoredOrder } from '@/lib/ordersStore';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      orderId,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      subtotal,
      shipping,
      discount = 0,
      totalAmount,
      utrNumber,
      paymentScreenshot,
      paymentMethod = 'UPI',
      upiId = '8888091910@ybl',
      notes,
    } = body;

    // Validate required fields
    if (!customerName || !customerPhone || !shippingAddress || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Please provide full customer details, delivery address, and items.' },
        { status: 400 }
      );
    }

    const cleanUtr = (utrNumber || '').trim();
    if (!cleanUtr || cleanUtr.length < 12) {
      return NextResponse.json(
        { success: false, error: 'A valid 12-digit UPI Reference / UTR Number is required for verification.' },
        { status: 400 }
      );
    }

    const calculatedSubtotal = Number(subtotal) || items.reduce((s: number, i: any) => s + (i.product?.price || 0) * (i.quantity || 1), 0);
    const calculatedShipping = calculatedSubtotal >= 499 ? 0 : 49;
    const calculatedTotal = Number(totalAmount) || Math.max(0, calculatedSubtotal + calculatedShipping - (Number(discount) || 0));

    const generatedOrderId = orderId || ('STA-ORD-' + Math.floor(100000 + Math.random() * 900000));
    const nowIso = new Date().toISOString();

    const newOrder: Order = {
      id: generatedOrderId,
      date: nowIso,
      customerName: customerName.trim(),
      customerEmail: (customerEmail || 'patron@shritejayurveda.com').trim(),
      customerPhone: customerPhone.trim(),
      items,
      subtotal: calculatedSubtotal,
      discount: Number(discount) || 0,
      shipping: calculatedShipping,
      totalAmount: calculatedTotal,
      status: 'Processing',
      shippingAddress: {
        address: shippingAddress.address || '',
        apartment: shippingAddress.apartment || '',
        city: shippingAddress.city || '',
        state: shippingAddress.state || '',
        pincode: shippingAddress.pincode || '',
      },
      paymentMethod: 'UPI',
      estimatedDelivery: '3 to 5 business days (Plastic-Free Express)',
      awbNumber: 'STA-' + generatedOrderId.replace(/\D/g, '').slice(-6),
      courier: 'Blue Dart Express',
      utrNumber: cleanUtr,
      paymentScreenshot: paymentScreenshot || undefined,
      upiId: '8888091910@ybl',
      notes: notes || 'Direct Manual UPI Payment verified with UTR: ' + cleanUtr,
    };

    // 1. Save to local persistent file store
    saveStoredOrder(newOrder);

    // 2. Sync to Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);

        await supabase.from('orders').insert([
          {
            id: newOrder.id,
            customer_name: newOrder.customerName,
            customer_email: newOrder.customerEmail,
            customer_phone: newOrder.customerPhone,
            items: newOrder.items,
            subtotal: newOrder.subtotal,
            discount: newOrder.discount,
            shipping: newOrder.shipping,
            total_amount: newOrder.totalAmount,
            status: newOrder.status,
            shipping_address: newOrder.shippingAddress,
            payment_method: 'UPI',
            estimated_delivery: newOrder.estimatedDelivery,
          },
        ]);

        // Deduct inventory
        for (const itm of items) {
          if (itm.product?.id && itm.quantity) {
            try {
              const { data: prod } = await supabase.from('products').select('stock').eq('id', itm.product.id).single();
              if (prod && typeof prod.stock === 'number') {
                const updatedStock = Math.max(0, prod.stock - itm.quantity);
                await supabase.from('products').update({ stock: updatedStock }).eq('id', itm.product.id);
              }
            } catch (stockErr) {}
          }
        }
      } catch (dbErr) {
        console.warn('Supabase sync note (order saved to local store):', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      orderId: newOrder.id,
      order: newOrder,
      message: 'Direct UPI order placed successfully. UPI verification pending.',
    });
  } catch (err: any) {
    console.error('Error in /api/place-order:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error while placing order.' },
      { status: 500 }
    );
  }
}
