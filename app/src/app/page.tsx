"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { UserCheck, LogIn } from "lucide-react"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <UserCheck className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to TL Practice</h1>
        <p className="text-gray-600 mb-8">A professional dashboard application with authentication</p>
        <button
          onClick={() => router.push("/auth/signin")}
          className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto"
        >
          <LogIn className="w-5 h-5" />
          Get Started
        </button>
      </div>
    </div>
  )
}
