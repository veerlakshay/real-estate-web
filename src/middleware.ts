import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    // If there's no session and the user is trying to access admin routes
    if (!session && req.nextUrl.pathname.startsWith('/admin')) {
        const redirectUrl = new URL('/login', req.url);
        redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }

    return res;
}

export const config = {
    matcher: ['/admin/:path*'],
}; 