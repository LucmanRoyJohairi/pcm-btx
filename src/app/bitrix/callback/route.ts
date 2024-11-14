// app/api/bitrix/callback/route.ts
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

const CLIENT_ID = process.env.BITRIX_CLIENT_ID!;
const CLIENT_SECRET = process.env.BITRIX_CLIENT_SECRET!;
const REDIRECT_URI = 'https://bitrix-auth-api.vercel.app/bitrix/callback';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
    return NextResponse.json({ error: 'Authorization code missing' }, { status: 400 });
    }

    try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth.bitrix.info/oauth/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        code,
        grant_type: 'authorization_code',
        }),
    });

    const tokenData = await tokenResponse.json();
    if (tokenData.access_token) {
        // Fetch Bitrix user data
        const userInfoResponse = await fetch(`https://syntactics.bitrix24.com/rest/user.current?auth=${tokenData.access_token}`);
        const userInfo = await userInfoResponse.json();
        console.log("User Info:", userInfo);

        // Set token as an HTTP-only cookie in the response headers
        const response = NextResponse.redirect('http://206.189.147.71:54030/');
        response.cookies.set('auth_token', tokenData.access_token, {
        httpOnly: true,
        secure: true,
        maxAge: tokenData.expires_in,
        });

        return response;
    } else {
        return NextResponse.json({ error: 'Token exchange failed' }, { status: 400 });
    }
    } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: 'Server error during authentication' }, { status: 500 });
    }
}
