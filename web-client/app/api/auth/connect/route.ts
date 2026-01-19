import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const FB_CLIENT_ID = process.env.FB_CLIENT_ID;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // e.g. https://your-app.railway.app
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export async function POST(req: Request) {
  try {
    // 1. Validate User
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    // 2. Determine Platform
    const { platform } = await req.json();
    if (platform.toLowerCase() !== 'facebook') {
      return NextResponse.json({ error: 'Only Facebook is supported right now' }, { status: 400 });
    }

    // 3. Set a "State" Cookie (To remember this user during the redirect)
    // We sign the userId into a cookie that expires in 5 minutes
    const stateToken = jwt.sign({ userId, platform: 'facebook' }, JWT_SECRET, { expiresIn: '5m' });
    cookies().set('oauth_state', stateToken, { secure: true, httpOnly: true, path: '/' });

    // 4. Generate Official Facebook URL
    const redirectUri = `${BASE_URL}/api/auth/callback/facebook`;
    const scope = 'pages_manage_posts,pages_read_engagement,publish_video'; // Permissions we need
    
    const url = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FB_CLIENT_ID}&redirect_uri=${redirectUri}&state=${stateToken}&scope=${scope}`;

    return NextResponse.json({ url });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Connection failed' }, { status: 500 });
  }
}
