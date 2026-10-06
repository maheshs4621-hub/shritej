import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      // In development / demo mode, accept verified transaction
      return NextResponse.json({
        success: true,
        verified: true,
        paymentId: razorpay_payment_id || ('pay_sim_' + Date.now()),
        mode: 'simulated',
      });
    }

    const body = (razorpay_order_id || '') + '|' + (razorpay_payment_id || '');
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      return NextResponse.json({
        success: true,
        verified: true,
        paymentId: razorpay_payment_id,
        mode: 'live',
      });
    } else {
      return NextResponse.json({
        success: false,
        verified: false,
        error: 'Invalid payment signature verification failed',
      }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
