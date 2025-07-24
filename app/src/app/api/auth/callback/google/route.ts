/**
 * Google OAuth callback handler
 * Edge Runtime compatible
 */

import { NextRequest, NextResponse } from 'next/server'
import { exchangeCodeForUser, createSession, createSessionCookie } from '@/lib/edge-auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')
    
    // Handle OAuth errors
    if (error || !code) {
      console.error('OAuth callback error:', error)
      return NextResponse.redirect(new URL('/auth/signin?error=OAuthCallback', request.url))
    }
    
    // Exchange code for user data
    const redirectUri = `${new URL(request.url).origin}/api/auth/callback/google`
    const user = await exchangeCodeForUser(code, redirectUri)
    
    // Create session
    const sessionToken = await createSession(user)
    
    // Get callback URL from cookie
    const callbackUrl = request.cookies.get('oauth-callback')?.value || '/dashboard'
    
    // Set session cookie and redirect
    const response = NextResponse.redirect(new URL(callbackUrl, request.url))
    response.cookies.set('session-token', sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })
    
    // Clear callback URL cookie
    response.cookies.delete('oauth-callback')
    
    return response
    
  } catch (error) {
    console.error('OAuth callback processing failed:', error)
    return NextResponse.redirect(new URL('/auth/signin?error=OAuthProcessing', request.url))
  }
}