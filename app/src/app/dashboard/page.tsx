"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { 
  Home, Bot, Folder, Briefcase, BarChart3, Settings, Plus, 
  Menu, Sun, Newspaper, Zap, Link, ClipboardList, Mail, 
  Calendar, CreditCard, BookOpen, Users, Search, FileText,
  PlusCircle, User, LogOut
} from "lucide-react"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentView, setCurrentView] = useState("dashboard")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const navItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "ai-assistants", icon: Bot, label: "AI Assistants" },
    { id: "documents", icon: Folder, label: "Documents" },
    { id: "projects", icon: Briefcase, label: "Projects" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "settings", icon: Settings, label: "Settings" },
  ]

  const resourceLinks = [
    { icon: ClipboardList, label: "Project Management" },
    { icon: Mail, label: "Email" },
    { icon: Calendar, label: "Calendar" },
    { icon: CreditCard, label: "Billing" },
    { icon: BookOpen, label: "Documentation" },
    { icon: Users, label: "Team" },
    { icon: Search, label: "Search" },
    { icon: FileText, label: "Templates" },
    { icon: BarChart3, label: "Reports" },
    { icon: PlusCircle, label: "Add New" },
  ]

  const aiAssistants = [
    { icon: User, label: "Project Assistant" },
    { icon: FileText, label: "Document Helper" },
    { icon: Search, label: "Research Bot" },
    { icon: Briefcase, label: "Business Advisor" },
    { icon: BarChart3, label: "Analytics Helper" },
    { icon: PlusCircle, label: "Create New Bot" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* User Profile Fixed */}
      <div className="fixed top-6 right-6 z-50">
        <div className="bg-white rounded-2xl p-3 shadow-lg flex items-center gap-3">
          <img 
            src={session.user?.image || `https://ui-avatars.com/api/?name=${session.user?.name}&background=3b82f6&color=fff`}
            alt="User" 
            className="w-10 h-10 rounded-full border-2 border-blue-500"
          />
          <div className="hidden sm:block">
            <div className="text-sm font-medium">{session.user?.name}</div>
            <div className="text-xs text-gray-500">{session.user?.email}</div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            className="text-gray-500 hover:text-red-600 transition-colors p-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav className={`fixed left-0 top-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Professional Portal</h2>
          <p className="text-sm text-gray-600">Internal Dashboard</p>
        </div>
        
        <div className="px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id)
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                currentView === item.id
                  ? "bg-blue-600 text-white transform scale-105"
                  : "text-gray-600 hover:bg-gray-100 hover:transform hover:scale-102"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-8 px-4 pt-8 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
            <Plus className="w-6 h-6" />
            <span className="font-medium">Add New Page</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen">
        {/* Header */}
        <header className="bg-white rounded-2xl m-6 p-6 shadow-lg flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold">Good morning, {session.user?.name?.split(" ")[0]}</h1>
              <p className="text-gray-600">Here&apos;s your dashboard overview</p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-sm text-gray-600">Today</div>
            <div className="font-semibold">{new Date().toLocaleDateString("en-US", { 
              weekday: "long", 
              year: "numeric", 
              month: "long", 
              day: "numeric" 
            })}</div>
          </div>
        </header>

        {/* Dashboard Content */}
        {currentView === "dashboard" && (
          <div className="p-6 pt-0">
            {/* Widgets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Weather Widget */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 animate-in slide-in-from-bottom duration-500">
                <div className="text-center">
                  <Sun className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-lg font-semibold mb-2">Weather</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-1">72°F</div>
                  <div className="text-gray-600">Sunny, Perfect day</div>
                  <div className="text-sm text-gray-500 mt-2">San Francisco, CA</div>
                </div>
              </div>

              {/* News Headlines */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 animate-in slide-in-from-bottom duration-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-blue-600" />
                  Industry News
                </h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-3">
                    <div className="font-medium text-sm">Market Updates and Trends</div>
                    <div className="text-xs text-gray-500">2 hours ago</div>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <div className="font-medium text-sm">New Technology Advancements</div>
                    <div className="text-xs text-gray-500">4 hours ago</div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Industry Best Practices</div>
                    <div className="text-xs text-gray-500">6 hours ago</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 animate-in slide-in-from-bottom duration-900">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all hover:scale-105 flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" />
                    New Project
                  </button>
                  <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Schedule Meeting
                  </button>
                  <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                    <FileText className="w-5 h-5" />
                    Create Document
                  </button>
                </div>
              </div>
            </div>

            {/* Resource Links */}
            <div className="bg-white rounded-2xl p-6 shadow-lg animate-in slide-in-from-bottom duration-1100">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Link className="w-6 h-6 text-blue-600" />
                Resource Links
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {resourceLinks.map((link, index) => (
                  <button
                    key={index}
                    className="bg-gray-50 hover:bg-blue-50 p-4 rounded-xl text-center transition-all hover:-translate-y-1 hover:shadow-md group"
                  >
                    <link.icon className="w-12 h-12 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">{link.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Assistants Content */}
        {currentView === "ai-assistants" && (
          <div className="p-6 pt-0">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Bot className="w-6 h-6 text-blue-600" />
                AI Assistants
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiAssistants.map((assistant, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 hover:bg-blue-50 p-6 rounded-xl text-center transition-all hover:-translate-y-1 hover:shadow-md group"
                  >
                    <assistant.icon className="w-16 h-16 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <span className="text-lg font-medium text-gray-700 group-hover:text-blue-600 block mb-4">{assistant.label}</span>
                    <button className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      assistant.label === "Create New Bot" 
                        ? "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}>
                      {assistant.label === "Create New Bot" ? "Setup" : "Launch"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other views placeholder */}
        {!["dashboard", "ai-assistants"].includes(currentView) && (
          <div className="p-6 pt-0">
            <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
              <h2 className="text-2xl font-semibold mb-4 capitalize">{currentView.replace("-", " ")}</h2>
              <p className="text-gray-600">This section is coming soon...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}