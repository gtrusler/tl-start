"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { 
  Home, Bot, Folder, Briefcase, BarChart3, Settings, Plus, 
  Menu, Sun, Newspaper, Zap, Link, ClipboardList, Mail, 
  Calendar, CreditCard, BookOpen, Users, Search, FileText,
  PlusCircle, User, LogOut, Cloud, CloudRain, CloudSnow, CloudLightning,
  Flower2, AlertTriangle, TrendingUp, TrendingDown, Phone
} from "lucide-react"
import { WeatherData, NewsResponse, PollenData } from "@/types/api"
import { ThemeSettingsSelector } from "@/components/theme-settings-selector"
import { useTheme } from "@/hooks/use-theme"

export default function Dashboard() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const { currentTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentView, setCurrentView] = useState("dashboard")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [newsData, setNewsData] = useState<NewsResponse | null>(null)
  const [pollenData, setPollenData] = useState<PollenData | null>(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [newsLoading, setNewsLoading] = useState(true)
  const [pollenLoading, setPollenLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather')
        if (response.ok) {
          const data = await response.json() as WeatherData
          setWeatherData(data)
        }
      } catch (error) {
        console.error('Failed to fetch weather:', error)
      } finally {
        setWeatherLoading(false)
      }
    }

    fetchWeather()
  }, [])

  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news')
        if (response.ok) {
          const data = await response.json() as NewsResponse
          setNewsData(data)
        }
      } catch (error) {
        console.error('Failed to fetch news:', error)
      } finally {
        setNewsLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Fetch pollen data
  useEffect(() => {
    const fetchPollen = async () => {
      try {
        const response = await fetch('/api/pollen')
        if (response.ok) {
          const data = await response.json() as PollenData
          setPollenData(data)
        }
      } catch (error) {
        console.error('Failed to fetch pollen:', error)
      } finally {
        setPollenLoading(false)
      }
    }

    fetchPollen()
  }, [])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin")
    }
  }, [loading, user, router])

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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

  // Helper function to get dynamic greeting
  const getGreeting = (name: string) => {
    const hour = new Date().getHours()
    const firstName = name.split(" ")[0]
    
    const morningGreetings = [
      `Good morning, ${firstName}`,
      `Morning, ${firstName}`,
      `Rise and shine, ${firstName}!`,
      `Another beautiful day, ${firstName}`,
      `Ready to conquer the day, ${firstName}?`
    ]
    
    const afternoonGreetings = [
      `Good afternoon, ${firstName}`,
      `Afternoon, ${firstName}`,
      `Hope your day is going well, ${firstName}`,
      `Crushing it today, ${firstName}?`,
      `How's the hustle going, ${firstName}?`
    ]
    
    const eveningGreetings = [
      `Good evening, ${firstName}`,
      `Still grinding, ${firstName}?`,
      `Hope you had a productive day, ${firstName}`,
      `Working late again, ${firstName}?`,
      `Time to wrap up soon, ${firstName}?`
    ]
    
    const lateNightGreetings = [
      `Shouldn't you be asleep, ${firstName}?`,
      `Seriously, ${firstName}? Go to bed!`,
      `Burning the midnight oil again, ${firstName}?`,
      `Your pillow is calling, ${firstName}`,
      `This is getting ridiculous, ${firstName}`,
      `Coffee can't fix everything, ${firstName}`,
      `Even lawyers need sleep, ${firstName}!`
    ]
    
    let greetings
    if (hour >= 5 && hour < 12) {
      greetings = morningGreetings
    } else if (hour >= 12 && hour < 17) {
      greetings = afternoonGreetings  
    } else if (hour >= 17 && hour < 22) {
      greetings = eveningGreetings
    } else {
      greetings = lateNightGreetings
    }
    
    // Use a consistent but varied greeting based on the day
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
    return greetings[dayOfYear % greetings.length]
  }

  // Helper function to generate theme-aware avatar URL
  const getAvatarUrl = (name: string) => {
    // Convert oklch/hex color to hex for the avatar service
    let bgColor = 'primary'
    
    // Extract hex color from oklch or use as-is if already hex
    if (currentTheme.colors.primary.startsWith('#')) {
      bgColor = currentTheme.colors.primary.slice(1) // Remove #
    } else if (currentTheme.colors.primary.startsWith('oklch')) {
      // For oklch colors, use a default theme-appropriate color
      bgColor = currentTheme.id === 'ocean-breeze' ? '22c55e' :
                currentTheme.id === 'pastel-dreams' ? 'a855f7' :
                currentTheme.id === 'sunset-orange' ? 'f97316' :
                currentTheme.id === 'royal-purple' ? '8b5cf6' :
                currentTheme.id === 'forest-green' ? '059669' :
                currentTheme.id === 'dark-mode' ? '22c55e' : '3b82f6'
    }
    
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bgColor}&color=fff&bold=true&format=svg`
  }

  // Helper function to get weather icon component
  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case 'sun': return Sun
      case 'cloud': return Cloud
      case 'cloud-rain': return CloudRain
      case 'cloud-snow': return CloudSnow
      case 'cloud-lightning': return CloudLightning
      default: return Sun
    }
  }

  // Helper function to format time ago
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours === 0) return 'Just now'
    if (diffInHours === 1) return '1 hour ago'
    if (diffInHours < 24) return `${diffInHours} hours ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return '1 day ago'
    return `${diffInDays} days ago`
  }


  const navItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "ai-assistants", icon: Bot, label: "AI Assistants" },
    { id: "settings", icon: Settings, label: "Settings" },
  ]

  const resourceLinks = [
    { icon: ClipboardList, label: "Clio Manage", url: "https://account.clio.com/login?login_challenge=d8dcba209ddb4a97ad7e5ea9bcf18a65#/", description: "Case management, time tracking, and billing" },
    { icon: Users, label: "Clio Grow", url: "https://account.clio.com/login?login_challenge=7dc986778c264407b20d50825ff34762", description: "Client intake and CRM platform" },
    { icon: Phone, label: "Dialpad", url: "https://dialpad.com/app/", description: "Make and receive calls through our cloud phone system" },
    { icon: Users, label: "Google Contacts", url: "https://contacts.google.com", description: "Manage your contacts and address book" },
    { icon: Calendar, label: "Google Calendar", url: "https://calendar.google.com/", description: "View and manage your schedule and appointments" },
    { icon: Search, label: "Lexis AI", url: "https://signin.lexisnexis.com/", description: "Legal research and AI assistance" },
    { icon: Bot, label: "Claude AI", url: "https://webai.truslerlegal.com/", description: "Privacy Protected AI" },
    { icon: Search, label: "Perplexity AI", url: "https://www.perplexity.ai/", description: "AI‑powered 'ask‑the-web' engine that answers questions" },
    { icon: BookOpen, label: "Wiki", url: "https://tlwiki.gtrusler.workers.dev", description: "Firm knowledge base and documentation" },
    { icon: FileText, label: "Matters", url: "https://drive.google.com/drive/folders/0AMttBSOpkVihUk9PVA", description: "Google Drive online" },
    { icon: Zap, label: "Passphrase Generator", url: "https://claude.ai/public/artifacts/2a10bda6-54fd-4e29-a6b9-a32748733142", description: "Generate secure, memorable passphrases for your accounts" },
    { icon: FileText, label: "Child Support Calculator", url: "https://claude.ai/public/artifacts/72f8e198-0b85-4e3e-9151-691592910a2d", description: "Calculate child support amounts based on Texas guidelines" },
  ]

  const aiAssistants = [
    { icon: Users, label: "Texas Family Law Expert", url: "https://texasfamilylawexpert-25381.chipp.ai", description: "Specialized expertise in Texas family law matters" },
    { icon: FileText, label: "Texas Prenup Expert", url: "https://texasprenupexpert-25361.chipp.ai", description: "Prenuptial agreement guidance under Texas law" },
    { icon: Briefcase, label: "Collaborative Practice Coach", url: "https://chat.collaborativecoachai.com", description: "Collaborative law practice guidance and coaching" },
    { icon: FileText, label: "No Nonsense Writer", url: "https://nononsensewriter-33805.chipp.ai", description: "Clear, direct legal writing assistance" },
    { icon: Search, label: "Prompt Perfecter", url: "https://promptperfecter-28482.chipp.ai", description: "Optimize prompts for better AI interactions" },
    { icon: FileText, label: "Write It Better", url: "https://writeitbetter-33835.chipp.ai", description: "Improve and refine your legal writing" },
    { icon: User, label: "Hawkins Trial Bot", url: "https://flowise.lexpertcloud.com/chatbot/d54d2ccb-f93b-4303-b65e-8c17b28f7ebf", description: "Trial preparation and strategy assistance" },
    { icon: User, label: "Mylo Wilco Bot", url: "https://flowise.lexpertcloud.com/chatbot/ba935964-ddfd-4bf0-8485-d58f0a38c42e", description: "Williamson County specific legal guidance" },
    { icon: User, label: "Mylo Travis Bot", url: "https://mylotravisbot-44238.chipp.ai", description: "Travis County specific legal guidance" },
    { icon: User, label: "McDaniels Trial Bot", url: "https://mcdanieltrialbot-43426.chipp.ai", description: "Trial advocacy and courtroom strategy" },
    { icon: Briefcase, label: "Marx Case Assistant", url: "https://marxcaseassistant-62107.chipp.ai", description: "Case management and legal research assistance" },
    { icon: User, label: "Erwin Trial Bot", url: "https://flowise.lexpertcloud.com/chatbot/e9682ad6-c713-4f12-9b6e-06125279adb1", description: "Advanced trial strategy and courtroom advocacy assistance" },
  ]

  return (
    <div className="min-h-screen bg-background">

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
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
                setCurrentView(item.id)
                setSidebarOpen(false)
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
              <h1 className="text-2xl font-semibold">{getGreeting(user?.name || 'User')}</h1>
              <p className="text-muted-foreground">Here&apos;s your dashboard overview</p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="font-semibold">{currentTime.toLocaleDateString("en-US", { 
              weekday: "long", 
              year: "numeric", 
              month: "long", 
              day: "numeric" 
            })}</div>
            <div className="text-sm text-muted-foreground">{currentTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              second: "2-digit",
              hour12: true
            })}</div>
          </div>
        </header>

        {/* Dashboard Content */}
        {currentView === "dashboard" && (
          <div className="p-6 pt-0">
            {/* Widgets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Weather Widget */}
              <div className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 animate-in slide-in-from-bottom duration-500">
                <div className="text-center">
                  {weatherLoading ? (
                    <div className="w-16 h-16 mx-auto mb-4 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
                  ) : weatherData ? (
                    <>
                      {(() => {
                        const WeatherIcon = getWeatherIcon(weatherData.icon)
                        return <WeatherIcon className="w-16 h-16 text-primary mx-auto mb-4" />
                      })()}
                      <h3 className="text-lg font-semibold mb-2">Weather</h3>
                      <div className="text-3xl font-bold text-primary mb-1">{weatherData.temperature}°F</div>
                      <div className="text-muted-foreground">{weatherData.description}</div>
                      <div className="text-sm text-muted-foreground mt-2">{weatherData.location}</div>
                      <div className="text-xs text-muted-foreground/70 mt-1">
                        Humidity: {weatherData.humidity}% • Wind: {weatherData.windSpeed} mph
                      </div>
                    </>
                  ) : (
                    <>
                      <Sun className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Weather</h3>
                      <div className="text-muted-foreground">Unable to load weather</div>
                    </>
                  )}
                </div>
              </div>

              {/* News Headlines */}
              <div className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 animate-in slide-in-from-bottom duration-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-primary" />
                  Latest News
                </h3>
                {newsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border-b border-gray-100 pb-3">
                        <div className="h-4 bg-muted rounded animate-pulse mb-2"></div>
                        <div className="h-3 bg-muted/50 rounded animate-pulse w-20"></div>
                      </div>
                    ))}
                  </div>
                ) : newsData?.articles ? (
                  <div className="space-y-4">
                    {newsData.articles.map((article, index) => (
                      <div key={index} className={`${index < newsData.articles.length - 1 ? 'border-b border-gray-100 pb-3' : ''}`}>
                        <a 
                          href={article.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-sm hover:text-primary transition-colors line-clamp-2"
                        >
                          {article.title}
                        </a>
                        <div className="text-xs text-muted-foreground mt-1">
                          {formatTimeAgo(article.publishedAt)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-sm">Unable to load news</div>
                )}
              </div>

              {/* Allergies/Pollen */}
              <div className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 animate-in slide-in-from-bottom duration-900">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Flower2 className="w-5 h-5 text-primary" />
                  Austin Allergies
                </h3>
                {pollenLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="h-4 bg-muted rounded animate-pulse w-20"></div>
                        <div className="h-3 bg-muted rounded animate-pulse w-12"></div>
                      </div>
                    ))}
                  </div>
                ) : pollenData ? (
                  <div className="space-y-4">
                    {/* Overall Level */}
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="text-2xl font-bold text-primary mb-1">{pollenData.overall.level}</div>
                      <div className="text-sm text-muted-foreground">Overall Level</div>
                    </div>
                    
                    {/* Top Allergens */}
                    <div className="space-y-2">
                      {pollenData.allergens.slice(0, 3).map((allergen, index) => (
                        <div key={index} className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: allergen.color }}
                            />
                            <span className="text-sm font-medium">{allergen.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{allergen.level}</span>
                        </div>
                      ))}
                    </div>

                    {/* Quick Tip */}
                    {pollenData.recommendations.length > 0 && (
                      <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded-lg">
                        💡 {pollenData.recommendations[0]}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-sm">Unable to load allergy data</div>
                )}
              </div>
            </div>

            {/* Resource Links */}
            <div className="bg-card rounded-2xl p-6 shadow-lg animate-in slide-in-from-bottom duration-1100">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Link className="w-6 h-6 text-primary" />
                Resource Links
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {resourceLinks.map((link, index) => {
                  const Component = link.url ? 'a' : 'button'
                  const props = link.url ? { 
                    href: link.url, 
                    target: "_blank", 
                    rel: "noopener noreferrer" 
                  } : {}
                  
                  return (
                    <Component
                      key={index}
                      className="bg-muted hover:bg-primary/10 p-4 rounded-xl text-center transition-all hover:-translate-y-1 hover:shadow-md group block"
                      {...props}
                    >
                      <link.icon className="w-12 h-12 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-foreground group-hover:text-primary block">{link.label}</span>
                      {link.description && (
                        <span className="text-xs text-muted-foreground mt-1 block">{link.description}</span>
                      )}
                    </Component>
                  )
                })}
                
              </div>
            </div>
          </div>
        )}

        {/* AI Assistants Content */}
        {currentView === "ai-assistants" && (
          <div className="p-6 pt-0">
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Bot className="w-6 h-6 text-primary" />
                AI Assistants
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiAssistants.map((assistant, index) => (
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
        )}

        {/* Settings Content */}
        {currentView === "settings" && (
          <div className="p-6 pt-0">
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6 text-primary" />
                Settings
              </h2>
              
              {/* Theme Settings */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Appearance</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-3">Theme</label>
                    <ThemeSettingsSelector />
                  </div>
                </div>
              </div>

              {/* Other Settings Placeholder */}
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-4">Other Settings</h3>
                <p className="text-muted-foreground">Additional settings will be available here...</p>
              </div>
            </div>
          </div>
        )}

        {/* Other views placeholder */}
        {!["dashboard", "ai-assistants", "settings"].includes(currentView) && (
          <div className="p-6 pt-0">
            <div className="bg-card rounded-2xl p-12 shadow-lg text-center">
              <h2 className="text-2xl font-semibold mb-4 capitalize">{currentView.replace("-", " ")}</h2>
              <p className="text-muted-foreground">This section is coming soon...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}