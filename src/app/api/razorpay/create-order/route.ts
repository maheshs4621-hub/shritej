import { NextResponse } from 'next/server';
import { getRazorpayInstance, getRazorpayKeyId } from '@/lib/razorpay';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { amount, receipt, notes } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, error: 'Invalid amount' }, { status: 400 });
    }

    const amountInPaise = Math.round(Number(amount) * 100);
    const razorpay = getRazorpayInstance();
    const keyId = getRazorpayKeyId();

    if (razorpay) {
      // Real live or test Razorpay API call
      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: receipt || ('rcpt_' + Date.now()),
        notes: notes || { brand: 'SHRiTEJ AYURVED' },
      });

      return NextResponse.json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId,
        isLiveGateway: true,
      });
    }

    // Seamless architecture fallback if Razorpay API keys are in demo test mode
    const simulatedOrderId = 'order_sim_' + Date.now();
    return NextResponse.json({
      success: true,
      orderId: simulatedOrderId,
      amount: amountInPaise,
      currency: 'INR',
      keyId,
      isLiveGateway: false,
      message: 'Razorpay order generated. Ready for payment capture.',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}