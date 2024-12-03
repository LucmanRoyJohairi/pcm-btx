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

    const userInfoResponse = await fetch(
        `https://syntactics.bitrix24.com/rest/user.current?auth=${authToken}`
        );
    const userInfo = await userInfoResponse.json();

    return new Response(JSON.stringify({ userInfo }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
