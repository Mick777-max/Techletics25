// import { dbConnect } from '@/app/lib/db';
// import { NextResponse } from 'next/server';
// import mongoose from 'mongoose';

// // Event Schema (same as in admin routes)
// const EventSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, unique: true },
//     price: { type: Number, required: true },
//     poster: { type: String },
//     description: { type: String },
//     venue: { type: String },
//     contactPersonName: { type: String },
//     organizerContact: { type: String },
//     category: { type: String, enum: ["technical", "cultural"], required: true },
//     branch: { type: String, enum: ["cs", "me", "ec", "ce", "bsh", "ds", "eee"], required: true },
//     eventType: { type: String, enum: ["competition", "workshop", "techtalk", "expo"], required: true },
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
//     isActive: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

// const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

// // GET - Fetch all active events (public endpoint)
// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);

//   // Check if these parameters are being properly extracted
//   const includeExpired = searchParams.get('includeExpired') === 'true';
//   const includeInactive = searchParams.get('includeInactive') === 'true';

//   try {
//     await dbConnect();

//     // Auto deactivate past events, and only fetch active events for public consumption
//     await Event.updateMany(
//       { isActive: true, endDate: { $lt: new Date() } },
//       { $set: { isActive: false } }
//     );

//     // Your MongoDB query might look something like this
//     let query: any = {};
//     if (!includeInactive) {
//       query.isActive = true;
//     }
//     // Make sure there's no hardcoded date filtering that would exclude expired events
//     // Check if you have code that's filtering by date regardless of the includeExpired parameter

//     const events = await Event.find(query)
//       .select('name price poster description venue contactPersonName organizerContact category branch eventType startDate endDate')
//       .sort({ name: 1 })
//       .lean();

//     return NextResponse.json({
//       success: true,
//       events,
//     });

//   } catch (error) {
//     console.error('Fetch public events error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch events' },
//       { status: 500 }
//     );
//   }
// }

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
    category: { type: String, enum: ['technical', 'cultural'], required: true },
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

// Define interface for MongoDB query
interface EventQuery {
  isActive?: boolean;
  endDate?: { $gte: Date } | { $lt: Date };
}

// GET - Fetch all active events (public endpoint)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Check if these parameters are being properly extracted
  const includeExpired = searchParams.get('includeExpired') === 'true';
  const includeInactive = searchParams.get('includeInactive') === 'true';

  try {
    await dbConnect();

    // Auto deactivate past events, and only fetch active events for public consumption
    await Event.updateMany(
      { isActive: true, endDate: { $lt: new Date() } },
      { $set: { isActive: false } },
    );

    // Build query object based on parameters
    const query: EventQuery = {};

    if (!includeInactive) {
      query.isActive = true;
    }

    if (!includeExpired) {
      query.endDate = { $gte: new Date() };
    }

    const events = await Event.find(query)
      .select(
        'name price poster description venue contactPersonName organizerContact category branch eventType startDate endDate',
      )
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
      { status: 500 },
    );
  }
}
