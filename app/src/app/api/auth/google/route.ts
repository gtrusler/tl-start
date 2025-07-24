/**
 * Google OAuth initiation endpoint
 * Edge Runtime compatible
 */

import { NextRequest, NextResponse } from 'next/server'
import { getGoogleAuthUrl } from '@/lib/edge-auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
    
    // Store callback URL in session for post-auth redirect
    const redirectUri = `${new URL(request.url).origin}/api/auth/callback/google`
    const authUrl = getGoogleAuthUrl(redirectUri)
    
    // Store callback URL in a secure cookie
    const response = NextResponse.redirect(authUrl)
    response.cookies.set('oauth-callback', callbackUrl, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 600, // 10 minutes
      path: '/',
    })
    
    return response
  } catch (error) {
    console.error('Google auth initiation failed:', error)
    return NextResponse.redirect(new URL('/auth/signin?error=Configuration', request.url))
  }
}