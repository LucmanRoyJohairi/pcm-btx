import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value;

    // Define the paths that should bypass authentication
    const bypassRoutes = ['/login', '/register', '/api'];

    // Check if the current request URL matches any bypass route
    if (bypassRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // Redirect to login if token is not present
    if (!token) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Allow access to protected routes
    return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
    matcher: '/:path*', // Match all paths
};
