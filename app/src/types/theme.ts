export interface Theme {
  id: string
  name: string
  colors: {
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    accent: string
    accentForeground: string
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    muted: string
    mutedForeground: string
    border: string
    input: string
    ring: string
    destructive: string
    destructiveForeground: string
  }
  fonts: {
    sans: string
    serif: string
    mono: string
  }
  styling: {
    radius: string
  }
}

export const themes: Theme[] = [
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    colors: {
      primary: 'oklch(0.7227 0.1920 149.5793)',
      primaryForeground: 'oklch(1.0000 0 0)',
      secondary: 'oklch(0.9514 0.0250 236.8242)',
      secondaryForeground: 'oklch(0.4461 0.0263 256.8018)',
      accent: 'oklch(0.9505 0.0507 163.0508)',
      accentForeground: 'oklch(0.3729 0.0306 259.7328)',
      background: 'oklch(0.9751 0.0127 244.2507)',
      foreground: 'oklch(0.3729 0.0306 259.7328)',
      card: 'oklch(1.0000 0 0)',
      cardForeground: 'oklch(0.3729 0.0306 259.7328)',
      popover: 'oklch(1.0000 0 0)',
      popoverForeground: 'oklch(0.3729 0.0306 259.7328)',
      muted: 'oklch(0.9670 0.0029 264.5419)',
      mutedForeground: 'oklch(0.5510 0.0234 264.3637)',
      border: 'oklch(0.9276 0.0058 264.5313)',
      input: 'oklch(0.9276 0.0058 264.5313)',
      ring: 'oklch(0.7227 0.1920 149.5793)',
      destructive: 'oklch(0.6368 0.2078 25.3313)',
      destructiveForeground: 'oklch(1.0000 0 0)'
    },
    fonts: {
      sans: 'DM Sans, sans-serif',
      serif: 'Lora, serif',
      mono: 'IBM Plex Mono, monospace'
    },
    styling: {
      radius: '0.5rem'
    }
  },
  {
    id: 'professional-blue',
    name: 'Professional Blue',
    colors: {
      primary: '#3b82f6',
      primaryForeground: '#ffffff',
      secondary: '#f1f5f9',
      secondaryForeground: '#0a0a0a',
      accent: '#f1f5f9',
      accentForeground: '#0a0a0a',
      background: '#ffffff',
      foreground: '#0a0a0a',
      card: '#ffffff',
      cardForeground: '#0a0a0a',
      popover: '#ffffff',
      popoverForeground: '#0a0a0a',
      muted: '#f1f5f9',
      mutedForeground: '#64748b',
      border: '#e2e8f0',
      input: '#e2e8f0',
      ring: '#3b82f6',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff'
    },
    fonts: {
      sans: 'Inter, sans-serif',
      serif: 'Lora, serif',
      mono: 'JetBrains Mono, monospace'
    },
    styling: {
      radius: '0.5rem'
    }
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    colors: {
      primary: '#f97316',
      primaryForeground: '#ffffff',
      secondary: '#f1f5f9',
      secondaryForeground: '#0a0a0a',
      accent: '#f1f5f9',
      accentForeground: '#0a0a0a',
      background: '#ffffff',
      foreground: '#0a0a0a',
      card: '#ffffff',
      cardForeground: '#0a0a0a',
      popover: '#ffffff',
      popoverForeground: '#0a0a0a',
      muted: '#f1f5f9',
      mutedForeground: '#64748b',
      border: '#e2e8f0',
      input: '#e2e8f0',
      ring: '#f97316',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff'
    },
    fonts: {
      sans: 'Inter, sans-serif',
      serif: 'Playfair Display, serif',
      mono: 'Source Code Pro, monospace'
    },
    styling: {
      radius: '0.75rem'
    }
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    colors: {
      primary: '#8b5cf6',
      primaryForeground: '#ffffff',
      secondary: '#f1f5f9',
      secondaryForeground: '#0a0a0a',
      accent: '#f1f5f9',
      accentForeground: '#0a0a0a',
      background: '#ffffff',
      foreground: '#0a0a0a',
      card: '#ffffff',
      cardForeground: '#0a0a0a',
      popover: '#ffffff',
      popoverForeground: '#0a0a0a',
      muted: '#f1f5f9',
      mutedForeground: '#64748b',
      border: '#e2e8f0',
      input: '#e2e8f0',
      ring: '#8b5cf6',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff'
    },
    fonts: {
      sans: 'Plus Jakarta Sans, sans-serif',
      serif: 'Merriweather, serif',
      mono: 'Fira Code, monospace'
    },
    styling: {
      radius: '0.375rem'
    }
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    colors: {
      primary: '#059669',
      primaryForeground: '#ffffff',
      secondary: '#f1f5f9',
      secondaryForeground: '#0a0a0a',
      accent: '#f1f5f9',
      accentForeground: '#0a0a0a',
      background: '#ffffff',
      foreground: '#0a0a0a',
      card: '#ffffff',
      cardForeground: '#0a0a0a',
      popover: '#ffffff',
      popoverForeground: '#0a0a0a',
      muted: '#f1f5f9',
      mutedForeground: '#64748b',
      border: '#e2e8f0',
      input: '#e2e8f0',
      ring: '#059669',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff'
    },
    fonts: {
      sans: 'Outfit, sans-serif',
      serif: 'Source Serif Pro, serif',
      mono: 'Space Mono, monospace'
    },
    styling: {
      radius: '0.25rem'
    }
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    colors: {
      primary: '#22c55e',
      primaryForeground: '#ffffff',
      secondary: '#262626',
      secondaryForeground: '#fafafa',
      accent: '#262626',
      accentForeground: '#fafafa',
      background: '#0a0a0a',
      foreground: '#fafafa',
      card: '#1a1a1a',
      cardForeground: '#fafafa',
      popover: '#1a1a1a',
      popoverForeground: '#fafafa',
      muted: '#262626',
      mutedForeground: '#a3a3a3',
      border: '#404040',
      input: '#404040',
      ring: '#22c55e',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff'
    },
    fonts: {
      sans: 'Inter, sans-serif',
      serif: 'Libre Baskerville, serif',
      mono: 'JetBrains Mono, monospace'
    },
    styling: {
      radius: '0.5rem'
    }
  },
  {
    id: 'pastel-dreams',
    name: 'Pastel Dreams',
    colors: {
      primary: 'oklch(0.7090 0.1592 293.5412)',
      primaryForeground: 'oklch(1.0000 0 0)',
      secondary: 'oklch(0.9073 0.0530 306.0902)',
      secondaryForeground: 'oklch(0.4461 0.0263 256.8018)',
      accent: 'oklch(0.9376 0.0260 321.9388)',
      accentForeground: 'oklch(0.3729 0.0306 259.7328)',
      background: 'oklch(0.9689 0.0090 314.7819)',
      foreground: 'oklch(0.3729 0.0306 259.7328)',
      card: 'oklch(1.0000 0 0)',
      cardForeground: 'oklch(0.3729 0.0306 259.7328)',
      popover: 'oklch(1.0000 0 0)',
      popoverForeground: 'oklch(0.3729 0.0306 259.7328)',
      muted: 'oklch(0.9464 0.0327 307.1745)',
      mutedForeground: 'oklch(0.5510 0.0234 264.3637)',
      border: 'oklch(0.9073 0.0530 306.0902)',
      input: 'oklch(0.9073 0.0530 306.0902)',
      ring: 'oklch(0.7090 0.1592 293.5412)',
      destructive: 'oklch(0.8077 0.1035 19.5706)',
      destructiveForeground: 'oklch(1.0000 0 0)'
    },
    fonts: {
      sans: 'Open Sans, sans-serif',
      serif: 'Source Serif 4, serif',
      mono: 'IBM Plex Mono, monospace'
    },
    styling: {
      radius: '1.5rem'
    }
  }
]