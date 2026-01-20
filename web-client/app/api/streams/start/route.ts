import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export async function POST(req: Request) {
  try {
    // 1. Authenticate
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    // 2. Get Input
    const { title, sourceUrl, destinationId, pageId } = await req.json();

    if (!sourceUrl || !destinationId) {
      return NextResponse.json({ error: 'Missing source or destination' }, { status: 400 });
    }

    // 3. Get Destination Details
    const dest = await prisma.destination.findUnique({
      where: { id: destinationId, userId }
    });

    if (!dest) return NextResponse.json({ error: 'Destination not found' }, { status: 404 });

    let finalRtmpUrl = dest.rtmpUrl; // Default for Custom RTMP

    // --- FACEBOOK LOGIC ---
    if (dest.platform === 'facebook') {
      if (!dest.accessToken) {
        return NextResponse.json({ error: 'Facebook token missing. Reconnect account.' }, { status: 400 });
      }

      console.log(`Creating Live Video on Facebook Target: ${pageId || 'me'}`);
      
      // A. Decide Target (Profile 'me' or specific Page ID)
      const targetId = pageId || 'me';
      
      // B. Fetch Page Token (If streaming to a Page, we need THAT page's specific token)
      let broadcastToken = dest.accessToken;
      if (pageId && pageId !== 'me') {
        const pageRes = await fetch(`https://graph.facebook.com/v22.0/${pageId}?fields=access_token&access_token=${dest.accessToken}`);
        const pageData = await pageRes.json();
        if (pageData.access_token) broadcastToken = pageData.access_token;
      }

      // C. Create Live Video Object
      const fbUrl = `https://graph.facebook.com/v22.0/${targetId}/live_videos?status=LIVE_NOW&title=${encodeURIComponent(title || 'Live Stream')}&description=${encodeURIComponent('Powered by GoLiveNG')}&access_token=${broadcastToken}`;
      
      const createRes = await fetch(fbUrl, { method: 'POST' });
      const createData = await createRes.json();

      if (createData.error) {
        console.error("FB Create Error:", createData.error);
        return NextResponse.json({ error: `Facebook Error: ${createData.error.message}` }, { status: 502 });
      }

      // D. Extract the secure upload URL (This contains the key)
      // Facebook returns: { id: '...', stream_url: 'rtmps://...' }
      finalRtmpUrl = createData.stream_url;
      console.log("Got Facebook Stream URL:", finalRtmpUrl);
    }

    // 4. Create Stream Record in DB
    const stream = await prisma.stream.create({
      data: {
        userId,
        title: title || 'Untitled Broadcast',
        sourceUrl,
        status: 'STARTING',
        // In a real app, we would store which destination this stream belongs to
      }
    });

    // 5. TODO: Send 'finalRtmpUrl' to Python Worker
    // await startPythonWorker(sourceUrl, finalRtmpUrl);

    return NextResponse.json({ 
      success: true, 
      streamId: stream.id,
      targetUrl: finalRtmpUrl,
      message: "Broadcast created successfully" 
    });

  } catch (error: any) {
    console.error("Start Stream Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
