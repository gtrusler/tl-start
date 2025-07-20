export interface WeatherData {
  temperature: number
  description: string
  icon: string
  location: string
  humidity: number
  windSpeed: number
  lastUpdated: string
}

export interface NewsArticle {
  title: string
  publishedAt: string
  url: string
}

export interface NewsResponse {
  articles: NewsArticle[]
}

export interface PollenAllergen {
  name: string
  level: string
  index: number
  color: string
  sources: string[]
}

export interface PollenForecast {
  day: string
  level: string
  index: number
}

export interface PollenData {
  location: string
  date: string
  overall: {
    level: string
    index: number
    color: string
  }
  allergens: PollenAllergen[]
  forecast: PollenForecast[]
  recommendations: string[]
  lastUpdated: string
  error?: string
}