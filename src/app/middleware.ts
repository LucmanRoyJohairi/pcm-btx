import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value;

    // Define the paths that require authentication
    const protectedPaths = ['/'];

    if (protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    if (!token) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }
    }

    return NextResponse.next();
}
