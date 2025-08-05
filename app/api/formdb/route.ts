import { dbConnect } from '@/app/lib/db';
import { NextResponse, NextRequest } from 'next/server';
import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  college: String,
  event: String,
  gender: String,
  sem: String,
  branch: String,
  payment: {
    transactionId: String,
    amount: Number,
    status: { type: String, default: 'pending' },
  },
}, { timestamps: true });

const Registration = mongoose.models.Registration || mongoose.model('Registration', RegistrationSchema);

export async function GET() {
  const con = await dbConnect();
  return new NextResponse('connected');
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  try {
    const reg = await Registration.create(data);
    return NextResponse.json({ success: true, id: reg._id });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  await dbConnect();
  const { id, transactionId, amount } = await req.json();
  console.log("PATCH received:", { id, transactionId, amount });
  if (!id || !transactionId || !amount) {
    return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
  }
  try {
    const reg = await Registration.findByIdAndUpdate(
      id,
      { $set: { 'payment.transactionId': transactionId, 'payment.amount': amount, 'payment.status': 'paid' } },
      { new: true }
    );
    if (!reg) return NextResponse.json({ success: false, error: 'Registration not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    const error = err as Error;
    console.error("PATCH error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}