"use client"

import { useAuth } from "@/hooks/use-auth"

export default function DebugAuth() {
  const { user, loading, error } = useAuth()

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edge Auth Debug Page</h1>
      
      <div className="space-y-6">
        {/* Session Status */}
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Authentication Status</h2>
          <p><strong>Loading:</strong> {loading ? "Yes" : "No"}</p>
          <p><strong>Authenticated:</strong> {user ? "Yes" : "No"}</p>
          <p><strong>Error:</strong> {error || "None"}</p>
          {user && (
            <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          )}
        </div>

        {/* Environment Variables */}
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Environment Check</h2>
          <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
          <p><strong>Auth System:</strong> Edge-compatible OAuth</p>
        </div>

        {/* Manual Sign In */}
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Manual Sign In</h2>
          <button 
            onClick={() => window.location.href = "/api/auth/google"}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Sign In with Google
          </button>
          {user && (
            <button 
              onClick={() => window.location.href = "/api/auth/signout"}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  )
}