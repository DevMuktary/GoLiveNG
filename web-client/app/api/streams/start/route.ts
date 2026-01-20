import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-this';

export async function POST(req: Request) {
  try {
    // 1. Authenticate (With Crash Protection)
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const token = authHeader.split(' ')[1];
    let decoded: any;
    
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      console.error("Token verification failed:", e);
      return NextResponse.json({ error: 'Session expired. Please Log Out and Log In again.' }, { status: 401 });
    }

    const userId = decoded.userId;

    // 2. Get Input
    const body = await req.json();
    const { title, sourceUrl, destinationId, pageId, loop = 0, resolution = '720p' } = body;

    console.log(`Starting Stream: ${title} (Loop: ${loop})`);

    // 3. Get Destination
    const dest = await prisma.destination.findUnique({
      where: { id: destinationId, userId }
    });

    if (!dest) return NextResponse.json({ error: 'Destination not found' }, { status: 404 });

    let finalRtmpUrl = dest.rtmpUrl;

    // --- FACEBOOK LOGIC ---
    if (dest.platform === 'facebook') {
      if (!dest.accessToken) {
        return NextResponse.json({ error: 'Facebook token missing' }, { status: 400 });
      }

      // Determine Target Page
      const targetId = pageId && pageId !== 'me' ? pageId : 'me';
      
      // Get Page Token if needed
      let broadcastToken = dest.accessToken;
      if (targetId !== 'me') {
        const pageRes = await fetch(`https://graph.facebook.com/v22.0/${targetId}?fields=access_token&access_token=${dest.accessToken}`);
        const pageData = await pageRes.json();
        if (pageData.access_token) broadcastToken = pageData.access_token;
      }

      // Create Live Video
      const fbUrl = `https://graph.facebook.com/v22.0/${targetId}/live_videos?status=LIVE_NOW&title=${encodeURIComponent(title)}&description=${encodeURIComponent('Powered by GoLiveNG')}&access_token=${broadcastToken}`;
      
      const createRes = await fetch(fbUrl, { method: 'POST' });
      const createData = await createRes.json();

      if (createData.error) {
        console.error("FB API Error:", createData.error);
        return NextResponse.json({ error: `Facebook Error: ${createData.error.message}` }, { status: 502 });
      }

      finalRtmpUrl = createData.stream_url;
    }

    // 4. Create Stream Record (With new Loop fields)
    const stream = await prisma.stream.create({
      data: {
        userId,
        title,
        sourceUrl,
        status: 'STARTING',
        loopCount: Number(loop),
        resolution,
        destinationId: dest.id
      }
    });

    console.log("Stream record created:", stream.id);

    return NextResponse.json({ 
      success: true, 
      streamId: stream.id,
      targetUrl: finalRtmpUrl 
    });

  } catch (error: any) {
    console.error("Critical Start Error:", error);
    return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
  }
}
