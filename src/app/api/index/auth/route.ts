import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export async function GET() {
  // Access cookies
    const cookieStorage = await cookies();
    const authToken = cookieStorage.get('auth_token')?.value;

    console.log("🚀 ~ getUserData ~ cookieStorage:", cookieStorage.getAll());
    console.log("🚀 ~ getUserData ~ authToken:", authToken);

    if (!authToken) {
    return new Response(JSON.stringify({ error: 'No auth token found' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
    });
    }

    return new Response(JSON.stringify({ authToken }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
}
