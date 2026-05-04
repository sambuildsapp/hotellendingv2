import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Allow access to the gate page and static assets
    if (
        pathname.startsWith('/access-code') ||
        pathname.startsWith('/api/verify-access') ||
        pathname.startsWith('/_next') ||
        pathname.includes('.') // for favicon, images, etc.
    ) {
        return NextResponse.next();
    }

    // 2. Check for the access cookie
    const accessGranted = request.cookies.get('demo_access')?.value === 'true';

    // 3. Redirect to gate if not authenticated
    if (!accessGranted) {
        const url = request.nextUrl.clone();
        url.pathname = '/access-code';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// Ensure it runs on relevant paths
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
