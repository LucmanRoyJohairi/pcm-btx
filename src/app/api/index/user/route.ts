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
        `https://pcm-btx-app.vercel.app/rest/user.current?auth=${authToken}`
    );
    console.log("🚀 ~ GET ~ userInfoResponse:", userInfoResponse)

    const departmentInfoResponse = await fetch(
        `https://pcm-btx-app.vercel.app/rest/user.department?auth=${authToken}`
    );
    console.log("🚀 ~ GET ~ departmentInfoResponse:", departmentInfoResponse)


    const userInfo = await userInfoResponse.json();
    console.log("🚀 ~ GET ~ userInfo:", userInfo)

    return new Response(JSON.stringify({ userInfo }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
