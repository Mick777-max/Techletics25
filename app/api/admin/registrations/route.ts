import { dbConnect } from '@/app/lib/db';
import { NextResponse, NextRequest } from 'next/server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const JWT_SECRET =
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Updated Registration Schema to match the new structure
const RegistrationSchema = new mongoose.Schema(
  {
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
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'free'],
        default: 'pending',
      },
    },
  },
  { timestamps: true },
);

const Registration =
  mongoose.models.Registration ||
  mongoose.model('Registration', RegistrationSchema);

// Middleware to verify JWT token
function verifyAdminToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      username: string;
      role: string;
    };
    return decoded.role === 'admin' ? decoded : null;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    // Verify admin authentication
    const admin = verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized access' },
        { status: 401 },
      );
    }

    // Connect to database
    await dbConnect();

    // Fetch all registrations with enhanced filtering
    const { searchParams } = new URL(req.url);
    const paymentStatus = searchParams.get('paymentStatus');

    let query = {};
    if (paymentStatus && paymentStatus !== 'all') {
      query = { 'payment.status': paymentStatus };
    }

    const registrations = await Registration.find(query)
      .sort({ createdAt: -1 })
      .lean();

    // Add summary statistics
    const stats = {
      total: registrations.length,
      pending: registrations.filter((r) => r.payment?.status === 'pending')
        .length,
      completed: registrations.filter((r) => r.payment?.status === 'completed')
        .length,
      free: registrations.filter((r) => r.payment?.status === 'free').length,
      failed: registrations.filter((r) => r.payment?.status === 'failed')
        .length,
    };

    console.log(`Admin fetched ${registrations.length} registrations`, stats);

    return NextResponse.json({
      success: true,
      registrations,
      stats,
      count: registrations.length,
    });
  } catch (error) {
    console.error('Admin registrations fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch registrations' },
      { status: 500 },
    );
  }
}

// Optional: DELETE endpoint to remove registrations (use with caution)
export async function DELETE(req: NextRequest) {
  try {
    // Verify admin authentication
    const admin = verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized access' },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);
    const registrationId = searchParams.get('id');

    if (!registrationId) {
      return NextResponse.json(
        { success: false, error: 'Registration ID required' },
        { status: 400 },
      );
    }

    await dbConnect();

    const deletedRegistration =
      await Registration.findByIdAndDelete(registrationId);

    if (!deletedRegistration) {
      return NextResponse.json(
        { success: false, error: 'Registration not found' },
        { status: 404 },
      );
    }

    console.log(`Admin deleted registration: ${registrationId}`);

    return NextResponse.json({
      success: true,
      message: 'Registration deleted successfully',
    });
  } catch (error) {
    console.error('Admin registration delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete registration' },
      { status: 500 },
    );
  }
}
