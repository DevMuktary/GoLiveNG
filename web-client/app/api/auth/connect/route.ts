import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const FB_CLIENT_ID = process.env.FB_CLIENT_ID;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-this';

export async function POST(req: Request) {
  try {
    // 1. Validate User
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    let decoded: any;

    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    const userId = decoded.userId;

    // 2. Determine Platform
    const body = await req.json();
    const { platform } = body;
    
    if (!platform || platform.toLowerCase() !== 'facebook') {
      return NextResponse.json({ error: 'Only Facebook is supported right now' }, { status: 400 });
    }

    // 3. Set a "State" Cookie
    const stateToken = jwt.sign({ userId, platform: 'facebook' }, JWT_SECRET, { expiresIn: '5m' });
    cookies().set('oauth_state', stateToken, { secure: true, httpOnly: true, path: '/' });

    // 4. Generate Official Facebook URL (CORRECTED SCOPES)
    const redirectUri = `${BASE_URL}/api/auth/callback/facebook`;
    
    // CHANGED: We removed 'pages_show_list'. 
    // 'pages_read_engagement' is the modern permission to List Pages.
    // 'pages_manage_posts' allows us to Create the Live Stream.
    const scope = 'pages_manage_posts,pages_read_engagement'; 
    
    const url = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FB_CLIENT_ID}&redirect_uri=${redirectUri}&state=${stateToken}&scope=${scope}`;

    return NextResponse.json({ url });

  } catch (error) {
    console.error("Connect Error:", error);
    return NextResponse.json({ error: 'Connection failed' }, { status: 500 });
  }
}
