"use client"

import { Check } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'

export function ThemeSettingsSelector() {
  const { currentTheme, themes, changeTheme } = useTheme()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => changeTheme(theme.id)}
          className={`
            relative p-4 rounded-lg border transition-all hover:shadow-md
            ${currentTheme.id === theme.id 
              ? 'border-primary bg-primary/5 shadow-sm' 
              : 'border-border hover:border-primary/50 bg-card'
            }
          `}
        >
          {/* Theme Preview */}
          <div className="mb-3">
            <div className="h-8 rounded-md overflow-hidden flex">
              <div 
                className="flex-1" 
                style={{ backgroundColor: theme.colors.background }}
              />
              <div 
                className="w-8" 
                style={{ backgroundColor: theme.colors.primary }}
              />
              <div 
                className="w-6" 
                style={{ backgroundColor: theme.colors.accent }}
              />
            </div>
          </div>

          {/* Theme Info */}
          <div className="text-left">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">{theme.name}</h4>
              {currentTheme.id === theme.id && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </div>
            <div className="flex gap-1 mt-2">
              <div 
                className="w-3 h-3 rounded-full border border-border/50"
                style={{ backgroundColor: theme.colors.primary }}
                title="Primary"
              />
              <div 
                className="w-3 h-3 rounded-full border border-border/50"
                style={{ backgroundColor: theme.colors.secondary }}
                title="Secondary"
              />
              <div 
                className="w-3 h-3 rounded-full border border-border/50"
                style={{ backgroundColor: theme.colors.accent }}
                title="Accent"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              {theme.fonts.sans.split(',')[0]}
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}