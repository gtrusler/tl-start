"use client"

import { useState, useEffect } from 'react'
import { Theme, themes } from '@/types/theme'

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0])

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedThemeId = localStorage.getItem('selectedTheme')
    if (savedThemeId) {
      const theme = themes.find(t => t.id === savedThemeId)
      if (theme) {
        setCurrentTheme(theme)
      }
    }
  }, [])

  // Apply theme colors to CSS variables
  useEffect(() => {
    const root = document.documentElement
    
    // Apply all theme colors to CSS custom properties
    root.style.setProperty('--primary', currentTheme.colors.primary)
    root.style.setProperty('--primary-foreground', currentTheme.colors.primaryForeground)
    root.style.setProperty('--secondary', currentTheme.colors.secondary)
    root.style.setProperty('--secondary-foreground', currentTheme.colors.secondaryForeground)
    root.style.setProperty('--accent', currentTheme.colors.accent)
    root.style.setProperty('--accent-foreground', currentTheme.colors.accentForeground)
    root.style.setProperty('--background', currentTheme.colors.background)
    root.style.setProperty('--foreground', currentTheme.colors.foreground)
    root.style.setProperty('--card', currentTheme.colors.card)
    root.style.setProperty('--card-foreground', currentTheme.colors.cardForeground)
    root.style.setProperty('--popover', currentTheme.colors.popover)
    root.style.setProperty('--popover-foreground', currentTheme.colors.popoverForeground)
    root.style.setProperty('--muted', currentTheme.colors.muted)
    root.style.setProperty('--muted-foreground', currentTheme.colors.mutedForeground)
    root.style.setProperty('--border', currentTheme.colors.border)
    root.style.setProperty('--input', currentTheme.colors.input)
    root.style.setProperty('--ring', currentTheme.colors.ring)
    root.style.setProperty('--destructive', currentTheme.colors.destructive)
    root.style.setProperty('--destructive-foreground', currentTheme.colors.destructiveForeground)
    
    // Also update sidebar colors to match
    root.style.setProperty('--sidebar', currentTheme.colors.secondary)
    root.style.setProperty('--sidebar-foreground', currentTheme.colors.foreground)
    root.style.setProperty('--sidebar-primary', currentTheme.colors.primary)
    root.style.setProperty('--sidebar-primary-foreground', currentTheme.colors.primaryForeground)
    root.style.setProperty('--sidebar-accent', currentTheme.colors.accent)
    root.style.setProperty('--sidebar-accent-foreground', currentTheme.colors.accentForeground)
    root.style.setProperty('--sidebar-border', currentTheme.colors.border)
    root.style.setProperty('--sidebar-ring', currentTheme.colors.ring)
    
    // Apply fonts
    root.style.setProperty('--font-sans', currentTheme.fonts.sans)
    root.style.setProperty('--font-serif', currentTheme.fonts.serif)
    root.style.setProperty('--font-mono', currentTheme.fonts.mono)
    
    // Apply styling
    root.style.setProperty('--radius', currentTheme.styling.radius)
  }, [currentTheme])

  const changeTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId)
    if (theme) {
      setCurrentTheme(theme)
      localStorage.setItem('selectedTheme', themeId)
    }
  }

  return {
    currentTheme,
    themes,
    changeTheme
  }
}