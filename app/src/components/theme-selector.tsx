"use client"

import { useState } from 'react'
import { Palette, Check } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'

export function ThemeSelector() {
  const { currentTheme, themes, changeTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
        title="Change Theme"
      >
        <Palette className="w-5 h-5" />
        <span className="hidden sm:inline">{currentTheme.name}</span>
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Theme Menu */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-50 p-2">
            <h3 className="text-sm font-medium px-2 py-1 mb-2">Choose Theme</h3>
            <div className="space-y-1">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    changeTheme(theme.id)
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full border border-border"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <span className="text-sm">{theme.name}</span>
                  </div>
                  {currentTheme.id === theme.id && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}