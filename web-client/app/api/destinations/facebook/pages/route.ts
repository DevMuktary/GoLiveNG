import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic'; // Prevent caching

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-this';

export async function GET(req: Request) {
  try {
    // 1. Check Authorization
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header found' }, { status: 401 });
    }

    // 2. Decode User
    const token = authHeader.split(' ')[1];
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid session token' }, { status: 401 });
    }

    // 3. Find Connection in DB
    console.log(`Fetching Facebook connection for user: ${decoded.userId}`);
    const fbConnection = await prisma.destination.findFirst({
      where: { 
        userId: decoded.userId,
        platform: 'facebook' 
      }
    });

    if (!fbConnection) {
      return NextResponse.json({ error: 'No Facebook account found in database.' }, { status: 404 });
    }

    if (!fbConnection.accessToken) {
      return NextResponse.json({ error: 'Facebook connected, but Access Token is missing. Please disconnect and reconnect.' }, { status: 400 });
    }

    // 4. Call Facebook Graph API
    console.log("Calling Facebook API...");
    const fbUrl = `https://graph.facebook.com/v22.0/me/accounts?access_token=${fbConnection.accessToken}&fields=id,name,category,access_token`;
    
    const res = await fetch(fbUrl);
    const data = await res.json();

    // 5. Handle Facebook Errors
    if (data.error) {
      console.error("Facebook API Error:", data.error);
      return NextResponse.json({ 
        error: `Facebook Error: ${data.error.message}`,
        details: data.error
      }, { status: 502 });
    }

    // 6. Success
    return NextResponse.json({ 
      profile: { name: fbConnection.nickname, id: 'me' },
      pages: data.data || [] 
    });

  } catch (error: any) {
    console.error("Critical Server Error:", error);
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      message: error.message 
    }, { status: 500 });
  }
}
