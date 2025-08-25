"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { 
  User, Briefcase, Menu, ArrowLeft, LogOut
} from "lucide-react"
import { ThemeSettingsSelector } from "@/components/theme-settings-selector"
import { useTheme } from "@/hooks/use-theme"

export default function CaseAssistants() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const { currentTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin")
    }
  }, [loading, user, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const caseAssistants = [
    { icon: User, label: "Erwin Trial Bot", url: "https://flowise.lexpertcloud.com/chatbot/e9682ad6-c713-4f12-9b6e-06125279adb1", description: "Advanced trial strategy and courtroom advocacy assistance" },
    { icon: Briefcase, label: "Marx Case Assistant", url: "https://marxcaseassistant-62107.chipp.ai", description: "Case management and legal research assistance" },
    { icon: User, label: "McDaniels Trial Bot", url: "https://mcdanieltrialbot-43426.chipp.ai", description: "Trial advocacy and courtroom strategy" },
    { icon: User, label: "Mylo Travis Bot", url: "https://mylotravisbot-44238.chipp.ai", description: "Travis County specific legal guidance" },
    { icon: User, label: "Mylo Wilco Bot", url: "https://flowise.lexpertcloud.com/chatbot/ba935964-ddfd-4bf0-8485-d58f0a38c42e", description: "Williamson County specific legal guidance" },
    { icon: User, label: "Hawkins Trial Bot", url: "https://flowise.lexpertcloud.com/chatbot/d54d2ccb-f93b-4303-b65e-8c17b28f7ebf", description: "Trial preparation and strategy assistance" },
  ]

  const handleSignOut = async () => {
    await signOut()
    router.push("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-background">
      
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out z-50 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary">Dashboard</h2>
        </div>
        
        <nav className="px-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors mb-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <button
            onClick={handleSignOut}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <ThemeSettingsSelector />
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-30">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold">Case Assistants</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              {user.email}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Case Management & Trial Assistants</h2>
            <p className="text-muted-foreground">Specialized AI assistants for case management, trial preparation, and county-specific legal guidance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {caseAssistants.map((assistant, index) => {
              const IconComponent = assistant.icon
              return (
                <a
                  key={index}
                  href={assistant.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{assistant.label}</h3>
                      <p className="text-sm text-muted-foreground">{assistant.description}</p>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}