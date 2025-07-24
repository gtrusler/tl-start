/**
 * Session verification endpoint
 * Edge Runtime compatible
 */

import { NextRequest, NextResponse } from 'next/server'
import { verifySession, getSessionFromCookies } from '@/lib/edge-auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie')
    const sessionToken = getSessionFromCookies(cookieHeader || undefined)
    
    if (!sessionToken) {
      return NextResponse.json({ user: null }, { status: 401 })
    }
    
    const session = await verifySession(sessionToken)
    
    if (!session) {
      return NextResponse.json({ user: null }, { status: 401 })
    }
    
    return NextResponse.json({ user: session.user })
    
  } catch (error) {
    console.error('Session verification failed:', error)
    return NextResponse.json({ user: null }, { status: 401 })
  }
}