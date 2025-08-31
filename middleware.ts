import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Get the pathname
  const pathname = request.nextUrl.pathname
  
  // Set cache headers for static assets
  if (
    pathname.includes('/_next/static/') ||
    pathname.includes('/favicon') ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2|ttf|otf)$/)
  ) {
    // Cache static assets for 1 year
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    response.headers.set('Expires', new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString())
    return response
  }

  // Set cache headers for API routes
  if (pathname.startsWith('/api/')) {
    // Different cache strategies for different API endpoints
    if (pathname === '/api/stats' || pathname === '/api/test-cache') {
      // Cache API responses for 5 minutes
      response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=60')
    } else if (pathname === '/api/track') {
      // Don't cache tracking endpoints
      response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    } else {
      // Default API cache for 1 minute
      response.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=30')
    }
    return response
  }

  // Set cache headers for pages
  if (pathname === '/' || pathname === '/home') {
    // Cache main page for 10 minutes with stale-while-revalidate
    response.headers.set('Cache-Control', 'public, max-age=600, stale-while-revalidate=300')
    response.headers.set('Vary', 'Accept-Encoding, User-Agent')
  } else {
    // Cache other pages for 5 minutes
    response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=60')
  }

  // Add performance headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Add cache performance indicator
  response.headers.set('X-Cache-Strategy', 'middleware-optimized')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}