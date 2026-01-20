import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export async function GET(req: Request) {
  try {
    // 1. Authenticate User
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    
    // 2. Find the Connected Facebook Account
    const fbConnection = await prisma.destination.findFirst({
      where: { 
        userId: decoded.userId,
        platform: 'facebook' 
      }
    });

    if (!fbConnection || !fbConnection.accessToken) {
      return NextResponse.json({ error: 'Facebook not connected' }, { status: 404 });
    }

    // 3. Call Facebook to get Pages
    // We request the ID, Name, and Category of every page you manage
    const fbUrl = `https://graph.facebook.com/v22.0/me/accounts?access_token=${fbConnection.accessToken}&fields=id,name,category,access_token`;
    
    const res = await fetch(fbUrl);
    const data = await res.json();

    if (data.error) {
      console.error("FB Graph Error:", data.error);
      return NextResponse.json({ error: 'Failed to fetch pages from Facebook' }, { status: 502 });
    }

    // 4. Return the list (We verify we found them)
    return NextResponse.json({ 
      profile: { name: fbConnection.nickname, id: 'me' }, // Option to stream to Profile
      pages: data.data || [] // List of Pages
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
