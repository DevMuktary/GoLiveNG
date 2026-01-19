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
    const body = await req.json();
    const { platform } = body;

    // 2. Set State Cookie
    const stateToken = jwt.sign({ userId, platform: 'facebook' }, JWT_SECRET, { expiresIn: '5m' });
    cookies().set('oauth_state', stateToken, { secure: true, httpOnly: true, path: '/' });

    // 3. Generate URL (FIXED SCOPES)
    const redirectUri = `${BASE_URL}/api/auth/callback/facebook`;
    
    // We REMOVED 'pages_show_list' because it was causing the error.
    // We only ask for exactly what you have approved:
    const scope = 'public_profile,pages_manage_posts,pages_read_engagement,publish_video';
    
    const url = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FB_CLIENT_ID}&redirect_uri=${redirectUri}&state=${stateToken}&scope=${scope}`;

    return NextResponse.json({ url });

  } catch (error) {
    console.error("Connect Error:", error);
    return NextResponse.json({ error: 'Connection failed' }, { status: 500 });
  }
}
