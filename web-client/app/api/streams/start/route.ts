import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-this';

export async function POST(req: Request) {
  try {
    // 1. Authenticate
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const token = authHeader.split(' ')[1];
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return NextResponse.json({ error: 'Session expired.' }, { status: 401 });
    }

    const userId = decoded.userId;

    // 2. Get Input
    const body = await req.json();
    const { title, sourceUrl, destinationId, pageId, loop = 0, resolution = '720p' } = body;

    // 3. Get Destination
    const dest = await prisma.destination.findUnique({
      where: { id: destinationId, userId }
    });

    if (!dest) return NextResponse.json({ error: 'Destination not found' }, { status: 404 });

    let finalRtmpUrl = dest.rtmpUrl;

    // --- FACEBOOK LOGIC ---
    if (dest.platform === 'facebook') {
      if (!dest.accessToken) return NextResponse.json({ error: 'Facebook token missing' }, { status: 400 });

      const targetId = pageId && pageId !== 'me' ? pageId : 'me';
      let broadcastToken = dest.accessToken;
      
      if (targetId !== 'me') {
        const pageRes = await fetch(`https://graph.facebook.com/v22.0/${targetId}?fields=access_token&access_token=${dest.accessToken}`);
        const pageData = await pageRes.json();
        if (pageData.access_token) broadcastToken = pageData.access_token;
      }

      const fbUrl = `https://graph.facebook.com/v22.0/${targetId}/live_videos?status=LIVE_NOW&title=${encodeURIComponent(title)}&description=${encodeURIComponent('Powered by GoLiveNG')}&access_token=${broadcastToken}`;
      const createRes = await fetch(fbUrl, { method: 'POST' });
      const createData = await createRes.json();

      if (createData.error) {
        return NextResponse.json({ error: `Facebook Error: ${createData.error.message}` }, { status: 502 });
      }
      finalRtmpUrl = createData.stream_url;
    }

    // 4. TRIGGER PYTHON ENGINE
    const ENGINE_URL = process.env.STREAM_ENGINE_URL || 'http://localhost:8000';
    
    console.log(`Triggering Python Engine at ${ENGINE_URL} with Quality: ${resolution}...`);
    
    const engineRes = await fetch(`${ENGINE_URL}/start_stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            source_url: sourceUrl,
            rtmp_url: finalRtmpUrl,
            loop_count: Number(loop),
            resolution: resolution // <--- PASSING RESOLUTION NOW
        })
    });

    if (!engineRes.ok) {
        const errText = await engineRes.text();
        throw new Error(`Stream Engine Failed: ${engineRes.statusText} (${errText})`);
    }

    // 5. Create Record
    const stream = await prisma.stream.create({
      data: {
        userId,
        title,
        sourceUrl,
        status: 'LIVE', 
        loopCount: Number(loop),
        resolution,
        destinationId: dest.id
      }
    });

    return NextResponse.json({ success: true, streamId: stream.id });

  } catch (error: any) {
    console.error("Critical Start Error:", error);
    return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
  }
}
