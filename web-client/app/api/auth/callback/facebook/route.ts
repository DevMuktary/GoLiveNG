import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Force dynamic to ensure we don't cache the result
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();
const FB_CLIENT_ID = process.env.FB_CLIENT_ID;
const FB_CLIENT_SECRET = process.env.FB_CLIENT_SECRET;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-this';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  // 1. Log the attempt (Check Railway Logs if 502 happens)
  console.log("Facebook Callback Triggered. Code present:", !!code);

  if (error || !code) {
    console.error("Facebook returned error:", error);
    return NextResponse.redirect(`${BASE_URL}/dashboard/destinations?error=facebook_denied`);
  }

  // 2. Verify State (Security)
  const cookieStore = cookies();
  const stateToken = cookieStore.get('oauth_state')?.value;
  
  if (!stateToken) {
    console.error("State cookie missing");
    return NextResponse.redirect(`${BASE_URL}/dashboard/destinations?error=session_expired`);
  }

  let userId = '';
  try {
    const decoded: any = jwt.verify(stateToken, JWT_SECRET);
    userId = decoded.userId;
  } catch (err) {
    console.error("State token invalid");
    return NextResponse.redirect(`${BASE_URL}/dashboard/destinations?error=invalid_state`);
  }

  try {
    // 3. Exchange Code for Access Token
    const redirectUri = `${BASE_URL}/api/auth/callback/facebook`;
    const tokenUrl = `https://graph.facebook.com/v22.0/oauth/access_token?client_id=${FB_CLIENT_ID}&redirect_uri=${redirectUri}&client_secret=${FB_CLIENT_SECRET}&code=${code}`;
    
    console.log("Exchanging token...");
    const tokenRes = await fetch(tokenUrl);
    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      console.error("Token Exchange Failed:", tokenData.error);
      throw new Error(tokenData.error.message);
    }

    const shortLivedToken = tokenData.access_token;

    // 4. Exchange for Long-Lived Token (60 Days)
    const longTokenUrl = `https://graph.facebook.com/v22.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${FB_CLIENT_ID}&client_secret=${FB_CLIENT_SECRET}&fb_exchange_token=${shortLivedToken}`;
    
    const longTokenRes = await fetch(longTokenUrl);
    const longTokenData = await longTokenRes.json();
    const accessToken = longTokenData.access_token || shortLivedToken;

    // 5. Fetch User Profile (To Name the Connection)
    const meRes = await fetch(`https://graph.facebook.com/v22.0/me?access_token=${accessToken}&fields=id,name`);
    const meData = await meRes.json();
    
    // We name it "User Name (Profile)" so they know it's their main account
    const nickname = meData.name ? `${meData.name} (Profile)` : 'Facebook Profile';

    console.log(`Saving connection for ${nickname}...`);

    // 6. Save to Database
    // We check if it exists first to update token instead of failing
    const existing = await prisma.destination.findFirst({
        where: { 
            userId, 
            platform: 'facebook', 
            nickname // Simple check to avoid duplicates, though ID check is better
        }
    });

    if (existing) {
        await prisma.destination.update({
            where: { id: existing.id },
            data: { accessToken }
        });
    } else {
        await prisma.destination.create({
            data: {
                userId,
                platform: 'facebook',
                nickname,
                accessToken,
                rtmpUrl: 'rtmps://live-api-s.facebook.com:443/rtmp/', // Default for Profiles
                // streamKey is fetched later when going live
            }
        });
    }

    // 7. Cleanup & Redirect to Dashboard
    cookies().delete('oauth_state');
    console.log("Success! Redirecting to dashboard.");
    return NextResponse.redirect(`${BASE_URL}/dashboard/destinations?success=facebook_connected`);

  } catch (error) {
    console.error('Facebook Connect Fatal Error:', error);
    // Redirect with error query param so user sees it in UI
    return NextResponse.redirect(`${BASE_URL}/dashboard/destinations?error=connection_failed`);
  }
}
