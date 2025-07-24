/**
 * Edge-compatible OAuth implementation for Cloudflare Workers
 * Replaces NextAuth.js to resolve Edge Runtime compatibility issues
 */

import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'fallback-secret-key'
)

export interface User {
  id: string
  email: string
  name: string
  image?: string
}

export interface Session {
  user: User
  expires: string
}

/**
 * Generate Google OAuth authorization URL
 */
export function getGoogleAuthUrl(redirectUri: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state: crypto.randomUUID(), // CSRF protection
  })
  
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`
}

/**
 * Exchange OAuth code for user data
 */
export async function exchangeCodeForUser(code: string, redirectUri: string): Promise<User> {
  // Exchange code for access token
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }),
  })

  if (!tokenResponse.ok) {
    throw new Error('Failed to exchange code for token')
  }

  const tokens = await tokenResponse.json() as { access_token: string }

  // Get user info
  const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  })

  if (!userResponse.ok) {
    throw new Error('Failed to fetch user info')
  }

  const googleUser = await userResponse.json() as {
    id: string
    email: string
    name: string
    picture?: string
  }

  return {
    id: googleUser.id,
    email: googleUser.email,
    name: googleUser.name,
    image: googleUser.picture,
  }
}

/**
 * Create JWT session token
 */
export async function createSession(user: User): Promise<string> {
  const session = {
    user,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
  }

  return await new SignJWT(session)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
}

/**
 * Verify and decode session token
 */
export async function verifySession(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    // Verify the payload has the expected structure
    if (payload && typeof payload === 'object' && 'user' in payload && 'expires' in payload) {
      return payload as unknown as Session
    }
    return null
  } catch {
    return null
  }
}

/**
 * Get session from request cookies
 */
export function getSessionFromCookies(cookieHeader?: string): string | null {
  if (!cookieHeader) return null
  
  const cookies = Object.fromEntries(
    cookieHeader.split('; ').map(c => c.split('='))
  )
  
  return cookies['session-token'] || null
}

/**
 * Create session cookie
 */
export function createSessionCookie(token: string): string {
  return `session-token=${token}; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}; Path=/`
}