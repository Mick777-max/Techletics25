import { dbConnect } from '@/app/lib/db';
import { NextResponse, NextRequest } from 'next/server';
import mongoose from 'mongoose';

// Updated Registration Schema to handle free events
const RegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  college: { type: String, required: true },
  event: { type: String, required: true },
  gender: { type: String, required: true },
  sem: { type: String, required: true },
  branch: { type: String, required: true },
  payment: {
    transactionId: { type: String, default: null },
    amount: { type: Number, default: 0 },
    status: { 
      type: String, 
      enum: ['pending', 'completed', 'failed', 'free'], 
      default: 'pending' 
    },
  },
}, { timestamps: true });

const Registration = mongoose.models.Registration || mongoose.model('Registration', RegistrationSchema);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, college, event, gender, sem, branch, payment } = body;

    // Validate required fields
    if (!name || !email || !phone || !college || !event || !gender || !sem || !branch) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Create registration with payment info
    const registrationData = {
      name,
      email,
      phone,
      college,
      event,
      gender,
      sem,
      branch,
      payment: {
        status: payment?.status || 'pending',
        amount: payment?.amount || 0,
        transactionId: payment?.transactionId || null,
      }
    };

    const registration = new Registration(registrationData);
    const savedRegistration = await registration.save();

    console.log('Registration created:', {
      id: savedRegistration._id,
      event,
      paymentStatus: payment?.status,
      amount: payment?.amount
    });

    return NextResponse.json({
      success: true,
      id: savedRegistration._id.toString(),
      message: 'Registration saved successfully',
      paymentStatus: payment?.status
    });

  } catch (error) {
    console.error('Registration creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save registration' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, transactionId, amount } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Registration ID is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const updateData = {
      'payment.transactionId': transactionId,
      'payment.amount': amount,
      'payment.status': 'completed'
    };

    const updatedRegistration = await Registration.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedRegistration) {
      return NextResponse.json(
        { success: false, error: 'Registration not found' },
        { status: 404 }
      );
    }

    console.log('Payment updated for registration:', id);

    return NextResponse.json({
      success: true,
      message: 'Payment information updated successfully'
    });

  } catch (error) {
    console.error('Payment update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update payment information' },
      { status: 500 }
    );
  }
}