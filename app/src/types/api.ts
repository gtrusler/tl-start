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