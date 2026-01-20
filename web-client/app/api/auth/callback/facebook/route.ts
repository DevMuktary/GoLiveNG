import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Force dynamic to prevent caching
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

  // 1. Handle User Cancelled / Error
  if (error || !code) {
    console.error("Facebook Login Error:", error);
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
    console.error("Invalid State Token");
    return NextResponse.redirect(`${BASE_URL}/dashboard/destinations?error=invalid_state`);
  }

  try {
    console.log("Exchanging code for token...");
    
    // 3. Exchange Code for Access Token
    const tokenUrl = `https://graph.facebook.com/v22.0/oauth/access_token?client_id=${FB_CLIENT_ID}&redirect_uri=${BASE_URL}/api/auth/callback/facebook&client_secret=${FB_CLIENT_SECRET}&code=${code}`;
    
    const tokenRes = await fetch(tokenUrl);
    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      console.error("Token Exchange Error:", tokenData.error);
      throw new Error(tokenData.error.message);
    }

    const shortLivedToken = tokenData.access_token;

    // 4. Exchange for Long-Lived Token (60 Days)
    console.log("Getting long-lived token...");
    const longTokenUrl = `https://graph.facebook.com/v22.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${FB_CLIENT_ID}&client_secret=${FB_CLIENT_SECRET}&fb_exchange_token=${shortLivedToken}`;
    
    const longTokenRes = await fetch(longTokenUrl);
    const longTokenData = await longTokenRes.json();
    const accessToken = longTokenData.access_token || shortLivedToken;

    // 5. Fetch User Profile (For "Profile" Streaming)
    console.log("Fetching user profile...");
    const meRes = await fetch(`https://graph.facebook.com/me?fields=id,name,picture&access_token=${accessToken}`);
    const meData = await meRes.json();
    
    if (!meData.id) {
        throw new Error("Failed to fetch user profile");
    }

    const nickname = meData.name || 'Facebook User';

    // 6. Save Profile as Destination
    console.log(`Saving destination for user: ${userId}`);
    
    // Check if exists first to avoid duplicates
    const existing = await prisma.destination.findFirst({
        where: {
            userId: userId,
            platform: 'facebook',
            nickname: nickname // Simple check, ideally use FB ID
        }
    });

    if (!existing) {
        await prisma.destination.create({
          data: {
            userId,
            nickname: `${nickname} (Profile)`,
            platform: 'facebook',
            accessToken: accessToken,
            // We store the FB ID in rtmpUrl temporarily or add a new field later
            // For now, we just need the token to stream
            streamKey: 'FETCH_ON_LIVE', 
          }
        });
    }

    // 7. Success Redirect
    console.log("Success! Redirecting...");
    cookies().delete('oauth_state');
    return NextResponse.redirect(`${BASE_URL}/dashboard/destinations?success=facebook_connected`);

  } catch (error) {
    console.error('Facebook Callback Fatal Error:', error);
    // Redirect to dashboard with error flag so it doesn't 502
    return NextResponse.redirect(`${BASE_URL}/dashboard/destinations?error=server_error`);
  }
}
