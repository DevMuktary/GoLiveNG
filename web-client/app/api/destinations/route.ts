import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-this';

// Middleware helper to get User ID
const getUserId = (req: Request) => {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return null;
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded.userId;
  } catch (e) {
    return null;
  }
};

export async function POST(req: Request) {
  try {
    const userId = getUserId(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { nickname, platform, rtmpUrl, streamKey } = body;

    if (!nickname || !platform || !streamKey) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const destination = await prisma.destination.create({
      data: {
        userId,
        nickname,
        platform: platform.toLowerCase(),
        rtmpUrl: rtmpUrl || getDefaultRtmpUrl(platform),
        streamKey,
      }
    });

    return NextResponse.json(destination, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to add destination' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const dests = await prisma.destination.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json(dests);
}

export async function DELETE(req: Request) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

  // Verify ownership before deleting
  const count = await prisma.destination.count({ where: { id, userId } });
  if (count === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await prisma.destination.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

// Helper: Standard RTMP URLs
function getDefaultRtmpUrl(platform: string) {
  switch (platform.toLowerCase()) {
    case 'facebook': return 'rtmps://live-api-s.facebook.com:443/rtmp/';
    case 'youtube': return 'rtmp://a.rtmp.youtube.com/live2';
    case 'twitch': return 'rtmp://live.twitch.tv/app/';
    default: return '';
  }
}
