"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { 
  User, Briefcase, Menu, ArrowLeft, LogOut, Home, Bot, Settings, Plus, Mail
} from "lucide-react"

export default function CaseAssistants() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentView] = useState("case-assistants")

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
    { icon: Mail, label: "Consult Follow Up Email", url: "https://n8n.lexpertcloud.com/form/0c4d059e-8be4-479b-ba48-3b33f0a877e9", description: "Generate professional follow-up emails for client consultations" },
  ]


  // Helper function to generate avatar URL
  const getAvatarUrl = (name: string) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random&size=120&format=svg&rounded=true&bold=true`
  }

  const navItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", route: "/dashboard" },
    { id: "ai-assistants", icon: Bot, label: "AI Tools", route: "/dashboard" },
    { id: "case-assistants", icon: Briefcase, label: "Case Assistants" },
    { id: "settings", icon: Settings, label: "Settings", route: "/dashboard" },
  ]

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
      <nav className={`fixed left-0 top-0 h-full w-72 bg-card shadow-xl z-50 transform transition-transform lg:translate-x-0 flex flex-col ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-primary mb-2">Trusler Legal Portal</h2>
          <p className="text-sm text-muted-foreground">Internal Dashboard</p>
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.route) {
                  router.push(item.route)
                } else {
                  setSidebarOpen(false)
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                currentView === item.id
                  ? "bg-primary text-primary-foreground transform scale-105"
                  : "text-muted-foreground hover:bg-muted hover:transform hover:scale-102"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
          </div>
          
          <div className="mt-8 px-4 pt-8 border-t border-border">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted rounded-lg transition-all">
              <Plus className="w-6 h-6" />
              <span className="font-medium">Add New Page</span>
            </button>
          </div>
        </div>

        {/* User Profile - Bottom of Sidebar */}
        <div className="px-4 py-4 border-t border-border">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <img 
              src={user?.image || getAvatarUrl(user?.name || 'User')}
              alt="User" 
              className="w-10 h-10 rounded-full border-2 border-primary"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">{user?.name}</div>
              <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
            </div>
            <button
              onClick={() => signOut()}
              className="text-muted-foreground hover:text-red-600 transition-colors p-1 flex-shrink-0"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen">
        {/* Header */}
        <header className="bg-card rounded-2xl m-6 p-6 shadow-lg flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold">Case Assistants</h1>
              <p className="text-muted-foreground">Legal assistance tools</p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-sm text-muted-foreground">
              {user.email}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 pt-0">
          <div className="bg-card rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" />
              Case Assistants
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseAssistants.map((assistant, index) => (
                <div
                  key={index}
                  className="bg-muted hover:bg-primary/10 p-6 rounded-xl text-center transition-all hover:-translate-y-1 hover:shadow-md group"
                >
                  <assistant.icon className="w-16 h-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-medium text-foreground group-hover:text-primary block mb-2">{assistant.label}</span>
                  {assistant.description && (
                    <p className="text-sm text-muted-foreground mb-4 px-2">{assistant.description}</p>
                  )}
                  <a
                    href={assistant.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 rounded-lg font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Launch
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}