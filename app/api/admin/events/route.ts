import { dbConnect } from '@/app/lib/db';
import { NextResponse, NextRequest } from 'next/server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const JWT_SECRET =
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Event Schema
const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    poster: { type: String }, // Base64 encoded image or file path
    description: { type: String },
    venue: { type: String },
    contactPersonName: { type: String },
    organizerContact: { type: String },
    // New fields
    category: {
      type: String,
      enum: ['technical', 'cultural'],
      required: true,
    },
    branch: {
      type: String,
      enum: ['cs', 'me', 'ec', 'ce', 'bsh', 'ds', 'eee'],
      required: true,
    },
    eventType: {
      type: String,
      enum: ['competition', 'workshop', 'techtalk', 'expo'],
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

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

// GET - Fetch all events
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

    await dbConnect();

    // Auto-deactivate events whose end date has passed
    await Event.updateMany(
      { isActive: true, endDate: { $lt: new Date() } },
      { $set: { isActive: false } },
    );

    const events = await Event.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      events,
      count: events.length,
    });
  } catch (error) {
    console.error('Fetch events error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 },
    );
  }
}

// POST - Create new event
export async function POST(req: NextRequest) {
  try {
    // Verify admin authentication
    const admin = verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized access' },
        { status: 401 },
      );
    }

    await dbConnect();

    // Parse form data
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const category = (formData.get('category') as string) || '';
    const branch = (formData.get('branch') as string) || '';
    const eventType = (formData.get('eventType') as string) || '';
    const startDateStr = (formData.get('startDate') as string) || '';
    const endDateStr = (formData.get('endDate') as string) || '';
    const description = (formData.get('description') as string) || '';
    const posterFile = formData.get('poster') as File;
    const venue = (formData.get('venue') as string) || '';
    const contactPersonName =
      (formData.get('contactPersonName') as string) || '';
    const organizerContact = (formData.get('organizerContact') as string) || '';

    if (
      !name ||
      !price ||
      !category ||
      !branch ||
      !eventType ||
      !startDateStr ||
      !endDateStr
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Required fields: name, price, category, branch, eventType, startDate, endDate',
        },
        { status: 400 },
      );
    }

    // Validate price
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid price format' },
        { status: 400 },
      );
    }

    // Validate enums
    const allowedCategories = ['technical', 'cultural'] as const;
    const allowedBranches = [
      'cs',
      'me',
      'ec',
      'ce',
      'bsh',
      'ds',
      'eee',
    ] as const;
    const allowedTypes = [
      'competition',
      'workshop',
      'techtalk',
      'expo',
    ] as const;

    if (
      !allowedCategories.includes(
        category as (typeof allowedCategories)[number],
      )
    ) {
      return NextResponse.json(
        { success: false, error: 'Invalid category' },
        { status: 400 },
      );
    }
    if (!allowedBranches.includes(branch as (typeof allowedBranches)[number])) {
      return NextResponse.json(
        { success: false, error: 'Invalid branch' },
        { status: 400 },
      );
    }
    if (!allowedTypes.includes(eventType as (typeof allowedTypes)[number])) {
      return NextResponse.json(
        { success: false, error: 'Invalid event type' },
        { status: 400 },
      );
    }

    // Validate dates
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        { success: false, error: 'Invalid start or end date' },
        { status: 400 },
      );
    }
    if (endDate <= startDate) {
      return NextResponse.json(
        { success: false, error: 'End date must be after start date' },
        { status: 400 },
      );
    }

    // Check if event name already exists
    const existingEvent = await Event.findOne({ name: name.trim() });
    if (existingEvent) {
      return NextResponse.json(
        { success: false, error: 'Event with this name already exists' },
        { status: 400 },
      );
    }

    let posterData = '';

    // Handle poster file if uploaded
    if (posterFile && posterFile.size > 0) {
      // Check file size (20MB limit)
      if (posterFile.size > 20 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: 'Poster file size must be less than 20MB' },
          { status: 400 },
        );
      }

      // Check file type
      if (!posterFile.type.startsWith('image/')) {
        return NextResponse.json(
          { success: false, error: 'Poster must be an image file' },
          { status: 400 },
        );
      }

      // Convert file to base64
      const bytes = await posterFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      posterData = `data:${posterFile.type};base64,${buffer.toString('base64')}`;
    }

    // Create new event
    const now = new Date();
    const newEvent = new Event({
      name: name.trim(),
      price: priceNum,
      poster: posterData,
      description: description?.trim() || undefined,
      venue: venue?.trim() || undefined,
      contactPersonName: contactPersonName?.trim() || undefined,
      organizerContact: organizerContact?.trim() || undefined,
      category,
      branch,
      eventType,
      startDate,
      endDate,
      // Auto deactivate if already ended; otherwise keep active (admin can toggle)
      isActive: endDate >= now,
    });

    await newEvent.save();

    console.log(`Admin created new event: ${name} - ₹${priceNum}`);

    return NextResponse.json({
      success: true,
      message: 'Event created successfully',
      event: newEvent,
    });
  } catch (error) {
    console.error('Create event error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 },
    );
  }
}
