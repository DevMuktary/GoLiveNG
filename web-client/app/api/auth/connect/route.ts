import { NextResponse } from 'next/server';

// You will need to get these from the Facebook/Google Developer Console later
const FB_CLIENT_ID = process.env.FB_CLIENT_ID;
const FB_REDIRECT_URI = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/callback/facebook`;

const YT_CLIENT_ID = process.env.YT_CLIENT_ID;
const YT_REDIRECT_URI = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/callback/youtube`;

export async function POST(req: Request) {
  const { platform } = await req.json();

  let url = '';

  if (platform === 'facebook') {
    // Official Facebook OAuth URL
    url = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FB_CLIENT_ID}&redirect_uri=${FB_REDIRECT_URI}&scope=pages_manage_posts,publish_video,pages_read_engagement`;
  } 
  else if (platform === 'youtube') {
    // Official Google OAuth URL
    url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${YT_CLIENT_ID}&redirect_uri=${YT_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/youtube.force-ssl&access_type=offline`;
  }

  return NextResponse.json({ url });
}
