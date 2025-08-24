import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Admin credentials - In production, store these in environment variables
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'techletics2024',
};

const JWT_SECRET =
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Validate credentials
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // Generate JWT token
      const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, {
        expiresIn: '24h',
      });

      return NextResponse.json({
        success: true,
        token,
        message: 'Authentication successful',
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password' },
        { status: 401 },
      );
    }
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 },
    );
  }
}
