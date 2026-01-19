import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const FB_CLIENT_ID = process.env.FB_CLIENT_ID;
const FB_CLIENT_SECRET = process.env.FB_CLIENT_SECRET;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  // 1. Check for Errors from Facebook
  if (error || !code) {
    return NextResponse.redirect(`${BASE_URL}/dashboard/destinations?error=facebook_denied`);
  }

  // 2. Verify "State" (Security Check)
  // Ensure the user coming back is the same one who clicked the button
  const cookieStore = cookies();
  const stateToken = cookieStore.get('oauth_state')?.value;
  
  if (!stateToken) {
    return NextResponse.redirect(`${BASE_URL}/dashboard/destinations?error=session_expired`);
  }

  let userId = '';
  try {
    const decoded: any = jwt.verify(stateToken, JWT_SECRET);
    userId = decoded.userId;
  } catch (err) {
    return NextResponse.redirect(`${BASE_URL}/dashboard/destinations?error=invalid_state`);
  }

  try {
    // 3. Exchange Code for Access Token
    const tokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${FB_CLIENT_ID}&redirect_uri=${BASE_URL}/api/auth/callback/facebook&client_secret=${FB_CLIENT_SECRET}&code=${code}`;
    
    const tokenRes = await fetch(tokenUrl);
    const tokenData = await tokenRes.json();

    if (tokenData.error) throw new Error(tokenData.error.message);

    const shortLivedToken = tokenData.access_token;

    // 4. Exchange for Long-Lived Token (60 Days)
    const longTokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${FB_CLIENT_ID}&client_secret=${FB_CLIENT_SECRET}&fb_exchange_token=${shortLivedToken}`;
    
    const longTokenRes = await fetch(longTokenUrl);
    const longTokenData = await longTokenRes.json();
    const accessToken = longTokenData.access_token || shortLivedToken; // Fallback if exchange fails

    // 5. Fetch User Profile Name
    const meRes = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}`);
    const meData = await meRes.json();
    const nickname = meData.name ? `${meData.name} (Facebook)` : 'Facebook Account';

    // 6. Save to Database
    await prisma.destination.create({
      data: {
        userId,
        platform: 'facebook',
        nickname,
        accessToken: accessToken,
        // We don't get stream key yet. We get it when we go live.
      }
    });

    // 7. Cleanup & Redirect
    cookies().delete('oauth_state');
    return NextResponse.redirect(`${BASE_URL}/dashboard/destinations?success=facebook_connected`);

  } catch (error) {
    console.error('Facebook Connect Error:', error);
    return NextResponse.redirect(`${BASE_URL}/dashboard/destinations?error=connection_failed`);
  }
}
