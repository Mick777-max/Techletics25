// app/api/payment/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export const runtime = 'nodejs';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const amount = Number(body.amount);
    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }
    const payment = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: 'receipt_' + Math.random().toString(36).substring(2, 10),
    });

    return NextResponse.json({ paymentId: payment.id });
  } catch (err) {
    console.error('Error creating Razorpay order:', err);
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 },
    );
  }
}
