import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-this';

export async function GET(req: Request) {
  try {
    // 1. Authenticate User via Token
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    let decoded: any;
    
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // 2. Fetch Real Data from DB
    const [destinations, streams] = await Promise.all([
      prisma.destination.findMany({
        where: { userId: decoded.userId },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.stream.findMany({
        where: { userId: decoded.userId },
        orderBy: { createdAt: 'desc' },
        take: 5 // Only recent 5
      })
    ]);

    // 3. Return Clean JSON
    return NextResponse.json({
      destinations,
      recentStreams: streams,
      stats: {
        totalStreams: streams.length, // In a real app, use count()
        activeDestinations: destinations.length
      }
    });

  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
