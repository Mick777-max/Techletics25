import { dbConnect } from '@/app/lib/db';
import { NextResponse, NextRequest } from 'next/server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const JWT_SECRET =
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Event Schema (same as in main events route)
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

// Interface for allowed updates
interface AllowedUpdates {
  isActive?: boolean;
  category?: 'technical' | 'cultural';
  branch?: 'cs' | 'me' | 'ec' | 'ce' | 'bsh' | 'ds' | 'eee';
  eventType?: 'competition' | 'workshop' | 'techtalk' | 'expo';
  description?: string;
  venue?: string;
  contactPersonName?: string;
  organizerContact?: string;
  startDate?: Date;
  endDate?: Date;
}

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

// PATCH - Update event (toggle active status)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Verify admin authentication
    const admin = verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized access' },
        { status: 401 },
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid event ID' },
        { status: 400 },
      );
    }

    await dbConnect();

    const body = await req.json();
    const allowedUpdates: AllowedUpdates = {};
    if (typeof body.isActive === 'boolean')
      allowedUpdates.isActive = body.isActive;
    if (body.category) allowedUpdates.category = body.category;
    if (body.branch) allowedUpdates.branch = body.branch;
    if (body.eventType) allowedUpdates.eventType = body.eventType;
    if (typeof body.description === 'string')
      allowedUpdates.description = body.description;
    if (typeof body.venue === 'string') allowedUpdates.venue = body.venue;
    if (typeof body.contactPersonName === 'string')
      allowedUpdates.contactPersonName = body.contactPersonName;
    if (typeof body.organizerContact === 'string')
      allowedUpdates.organizerContact = body.organizerContact;
    if (body.startDate) allowedUpdates.startDate = new Date(body.startDate);
    if (body.endDate) allowedUpdates.endDate = new Date(body.endDate);

    // Load current event to validate business rules
    const currentEvent = await Event.findById(id);
    if (!currentEvent) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 },
      );
    }

    const nextStartDate = allowedUpdates.startDate || currentEvent.startDate;
    const nextEndDate = allowedUpdates.endDate || currentEvent.endDate;

    // Validate date ordering if either is being updated
    if (
      (allowedUpdates.startDate || allowedUpdates.endDate) &&
      nextEndDate <= nextStartDate
    ) {
      return NextResponse.json(
        { success: false, error: 'End date must be after start date' },
        { status: 400 },
      );
    }

    const now = new Date();

    // Prevent activating an already expired event
    if (body.isActive === true) {
      const effectiveEndDate = allowedUpdates.endDate || currentEvent.endDate;
      if (effectiveEndDate < now) {
        return NextResponse.json(
          {
            success: false,
            error: 'Cannot activate an event whose end date has passed',
          },
          { status: 400 },
        );
      }
    }

    // If endDate is (being) set to past, force deactivate
    if (
      (allowedUpdates.endDate && allowedUpdates.endDate < now) ||
      nextEndDate < now
    ) {
      allowedUpdates.isActive = false;
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, allowedUpdates, {
      new: true,
    });

    if (!updatedEvent) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 },
      );
    }

    const isActive = updatedEvent.isActive;
    console.log(
      `Admin ${isActive ? 'activated' : 'deactivated'} event: ${updatedEvent.name}`,
    );

    return NextResponse.json({
      success: true,
      message: `Event ${isActive ? 'activated' : 'deactivated'} successfully`,
      event: updatedEvent,
    });
  } catch (error) {
    console.error('Update event error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update event' },
      { status: 500 },
    );
  }
}

// DELETE - Delete event
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Verify admin authentication
    const admin = verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized access' },
        { status: 401 },
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid event ID' },
        { status: 400 },
      );
    }

    await dbConnect();

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 },
      );
    }

    console.log(`Admin deleted event: ${deletedEvent.name}`);

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.error('Delete event error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete event' },
      { status: 500 },
    );
  }
}
