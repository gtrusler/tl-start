import { Theme } from '@/types/theme'

/**
 * Helper function to create a theme from tweakcn.com exported CSS
 * 
 * Usage:
 * 1. Go to tweakcn.com/editor/theme
 * 2. Select or customize a theme
 * 3. Copy the CSS custom properties from the :root block
 * 4. Use this function to create a theme object
 * 
 * @param id - Unique theme identifier
 * @param name - Display name for the theme
 * @param cssProperties - CSS custom properties object from tweakcn
 * @param fonts - Font configuration (optional, defaults to DM Sans theme fonts)
 * @returns Theme object compatible with the theme system
 */
export function createThemeFromTweakcn(
  id: string,
  name: string,
  cssProperties: Record<string, string>,
  fonts?: {
    sans?: string
    serif?: string
    mono?: string
  }
): Theme {
  return {
    id,
    name,
    colors: {
      primary: cssProperties['--primary'] || '#3b82f6',
      primaryForeground: cssProperties['--primary-foreground'] || '#ffffff',
      secondary: cssProperties['--secondary'] || '#f1f5f9',
      secondaryForeground: cssProperties['--secondary-foreground'] || '#0a0a0a',
      accent: cssProperties['--accent'] || '#f1f5f9',
      accentForeground: cssProperties['--accent-foreground'] || '#0a0a0a',
      background: cssProperties['--background'] || '#ffffff',
      foreground: cssProperties['--foreground'] || '#0a0a0a',
      card: cssProperties['--card'] || '#ffffff',
      cardForeground: cssProperties['--card-foreground'] || '#0a0a0a',
      popover: cssProperties['--popover'] || '#ffffff',
      popoverForeground: cssProperties['--popover-foreground'] || '#0a0a0a',
      muted: cssProperties['--muted'] || '#f1f5f9',
      mutedForeground: cssProperties['--muted-foreground'] || '#64748b',
      border: cssProperties['--border'] || '#e2e8f0',
      input: cssProperties['--input'] || '#e2e8f0',
      ring: cssProperties['--ring'] || '#3b82f6',
      destructive: cssProperties['--destructive'] || '#ef4444',
      destructiveForeground: cssProperties['--destructive-foreground'] || '#ffffff'
    },
    fonts: {
      sans: fonts?.sans || cssProperties['--font-sans'] || 'DM Sans, sans-serif',
      serif: fonts?.serif || cssProperties['--font-serif'] || 'Lora, serif',
      mono: fonts?.mono || cssProperties['--font-mono'] || 'IBM Plex Mono, monospace'
    },
    styling: {
      radius: cssProperties['--radius'] || '0.5rem'
    }
  }
}

/**
 * Example usage for Ocean Breeze theme from tweakcn:
 * 
 * const oceanBreezeTheme = createThemeFromTweakcn(
 *   'ocean-breeze',
 *   'Ocean Breeze',
 *   {
 *     '--background': 'oklch(0.9751 0.0127 244.2507)',
 *     '--foreground': 'oklch(0.3729 0.0306 259.7328)',
 *     '--primary': 'oklch(0.7227 0.1920 149.5793)',
 *     '--primary-foreground': 'oklch(1.0000 0 0)',
 *     // ... other CSS properties
 *   }
 * )
 */