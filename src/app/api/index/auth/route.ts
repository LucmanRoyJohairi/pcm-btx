// src/app/api/index/route.ts
import { cookies } from 'next/headers';

export async function GET(request: Request) {
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

    // Simulate fetching user data based on the authToken (e.g., from a database)
    const userData = await fetchUserData(authToken);

    return new Response(JSON.stringify({ userData }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    });
}

async function fetchUserData(authToken: string) {
  // Example logic to fetch user data
  // This can be an actual database query or external API request
  return { name: "John Doe", email: "john.doe@example.com" };  // Example user data
}
