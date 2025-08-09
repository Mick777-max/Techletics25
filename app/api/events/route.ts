import { dbConnect } from '@/app/lib/db';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Event Schema (same as in admin routes)
const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    poster: { type: String },
    description: { type: String },
    venue: { type: String },
    contactPersonName: { type: String },
    organizerContact: { type: String },
    category: { type: String, enum: ["technical", "cultural"], required: true },
    branch: { type: String, enum: ["cs", "me", "ec", "ce", "bsh", "ds", "eee"], required: true },
    eventType: { type: String, enum: ["competition", "workshop", "techtalk", "expo"], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

// GET - Fetch all active events (public endpoint)
export async function GET() {
  try {
    await dbConnect();

    // Auto deactivate past events, and only fetch active events for public consumption
    await Event.updateMany(
      { isActive: true, endDate: { $lt: new Date() } },
      { $set: { isActive: false } }
    );

    const events = await Event.find({ isActive: true })
      .select('name price poster description venue contactPersonName organizerContact category branch eventType startDate endDate')
      .sort({ name: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      events,
    });

  } catch (error) {
    console.error('Fetch public events error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}