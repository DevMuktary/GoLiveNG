import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-this';

export async function POST(req: Request) {
  try {
    // 1. Authenticate
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET); // Verify token

    // 2. Get Stream ID
    const { streamId } = await req.json();

    if (!streamId) {
      return NextResponse.json({ error: 'Stream ID required' }, { status: 400 });
    }

    // 3. Update Database to 'COMPLETED'
    const stream = await prisma.stream.update({
      where: { id: streamId },
      data: { 
        status: 'COMPLETED',
        // We calculate duration roughly based on start time vs now
        // In a real app, the worker sends the exact duration
      }
    });

    // 4. (Future) Send "Kill Signal" to Python Worker
    // await fetch('http://python-worker/stop', { body: { streamId } })

    return NextResponse.json({ success: true, status: 'COMPLETED' });

  } catch (error) {
    console.error("Stop Stream Error:", error);
    return NextResponse.json({ error: 'Failed to stop stream' }, { status: 500 });
  }
}
