/**
 * Edge-compatible authentication hook
 * Replaces NextAuth useSession
 */

'use client'

import { useState, useEffect } from 'react'

export interface User {
  id: string
  email: string
  name: string
  image?: string
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export function useAuth(): AuthState & {
  signOut: () => Promise<void>
  checkSession: () => Promise<void>
} {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  const checkSession = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      
      const response = await fetch('/api/auth/session', {
        credentials: 'include',
      })
      
      if (response.ok) {
        const data = await response.json() as { user: User | null }
        setState({ user: data.user, loading: false, error: null })
      } else {
        setState({ user: null, loading: false, error: null })
      }
    } catch (error) {
      setState({ 
        user: null, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Session check failed'
      })
    }
  }

  const signOut = async () => {
    try {
      await fetch('/api/auth/signout', {
        method: 'POST',
        credentials: 'include',
      })
      setState({ user: null, loading: false, error: null })
      window.location.href = '/auth/signin'
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Sign out failed'
      }))
    }
  }

  useEffect(() => {
    checkSession()
  }, [])

  return {
    ...state,
    signOut,
    checkSession,
  }
}