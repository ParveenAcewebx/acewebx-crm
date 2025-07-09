import { NextResponse } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/register', '/about', '/', '/thankyou']

export function middleware(request) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('next-auth.session-token')?.value

  // Redirect authenticated users away from login/register
  if (token && (pathname === '/login' || pathname === '/register')) {
    const dashboardUrl = new URL('/admin/candidates/list', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next()
  }

  // Redirect unauthenticated users to login
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Allow authenticated users
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next|favicon.ico|images|.*\\.(?:js|css|png|jpg|jpeg|svg|webp|ico|woff|woff2|ttf|eot)).*)'
  ]
}

