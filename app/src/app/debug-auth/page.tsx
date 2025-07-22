"use client"

import { useSession, getProviders, signIn } from "next-auth/react"
import { useEffect, useState } from "react"

export default function DebugAuth() {
  const { data: session, status } = useSession()
  const [providers, setProviders] = useState<any>(null)

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    fetchProviders()
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">NextAuth Debug Page</h1>
      
      <div className="space-y-6">
        {/* Session Status */}
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Session Status</h2>
          <p><strong>Status:</strong> {status}</p>
          {session && (
            <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          )}
        </div>

        {/* Providers */}
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Available Providers</h2>
          {providers && (
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
              {JSON.stringify(providers, null, 2)}
            </pre>
          )}
        </div>

        {/* Environment Variables */}
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Environment Check</h2>
          <p><strong>NEXTAUTH_URL:</strong> {process.env.NEXTAUTH_URL || "Not set"}</p>
          <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
        </div>

        {/* Manual Sign In */}
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Manual Sign In</h2>
          <button 
            onClick={() => signIn("google", { redirect: false })}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Sign In with Google (No Redirect)
          </button>
          <button 
            onClick={() => signIn("google")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Sign In with Google (With Redirect)
          </button>
        </div>
      </div>
    </div>
  )
}