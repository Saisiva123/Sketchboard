import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = ['/home'];
const publicPaths = ['/','/login', '/signup'];

export function middleware(request: NextRequest) {
    const { cookies } = request;
    const pathname = request.nextUrl.pathname;
    const searchParams = request.nextUrl.searchParams;

    const tokenFromCookie = cookies.get('token')?.value;
    const tokenFromUrl = searchParams.get('token') || '';
    const emailFromUrl = searchParams.get('email') || '';

    if (protectedPaths.includes(pathname)) {
        if (tokenFromCookie) {
            console.log("called 1")
            return NextResponse.next();
        }
        else if (tokenFromUrl) {
            console.log("called 2")
            const response = NextResponse.redirect(new URL('/home', request.url));
            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
            response.cookies.set('token', tokenFromUrl, { path: '/', expires: expires });
            response.cookies.set('email', emailFromUrl, { path: '/', expires: expires });
            return response;
        } else {
            console.log("called 3")
            return NextResponse.redirect(new URL('/login', request.url));
        }
    } else if (publicPaths.includes(pathname)) {
        if (!tokenFromCookie) {
            console.log("called 11")
            return NextResponse.next();
        }
        if (tokenFromCookie) {
            console.log("called 12")
            return NextResponse.redirect(new URL('/home', request.url));
        }
    }

    // return NextResponse.next();
}
