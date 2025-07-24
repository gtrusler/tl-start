"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { UserCheck, LogIn } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"
import { useAuth } from "@/hooks/use-auth"

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { currentTheme } = useTheme()

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [loading, user, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent rounded-full transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-3/5 h-3/5 bg-gradient-to-tr from-secondary/3 to-transparent rounded-full transform -translate-x-1/3 translate-y-1/3" />
      
      <div className="bg-card rounded-2xl p-8 shadow-2xl w-full max-w-md relative z-10 animate-in slide-in-from-bottom-4 duration-500 border border-border">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
              <UserCheck className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Welcome to Trusler Legal</h1>
          <p className="text-muted-foreground text-sm">Professional legal practice management platform</p>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-6">
              Access your legal dashboard, manage cases, and streamline your practice with our comprehensive platform.
            </p>
          </div>

          <button
            onClick={() => router.push("/auth/signin")}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 focus:ring-4 focus:ring-ring transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            Get Started
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Secure • Professional • Efficient
          </p>
        </div>
      </div>
    </div>
  )
}
