/**
 * Sign out endpoint
 * Edge Runtime compatible
 */

import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/auth/signin', request.url))
  
  // Clear session cookie
  response.cookies.set('session-token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
  
  return response
}

export async function GET(request: NextRequest) {
  return POST(request)
}