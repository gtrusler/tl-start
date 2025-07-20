import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Using OpenWeatherMap API for Austin, TX
    // You can get a free API key from https://openweathermap.org/api
    const API_KEY = process.env.OPENWEATHER_API_KEY || 'demo'
    const AUSTIN_LAT = '30.2672'
    const AUSTIN_LON = '-97.7431'
    
    if (API_KEY === 'demo') {
      // Return mock Austin weather data when no API key
      return NextResponse.json({
        temperature: Math.floor(Math.random() * 20 + 65), // Random temp between 65-85°F
        description: 'Sunny',
        icon: 'sun',
        location: 'Austin, TX',
        humidity: Math.floor(Math.random() * 30 + 40), // 40-70%
        windSpeed: Math.floor(Math.random() * 10 + 5), // 5-15 mph
        lastUpdated: new Date().toISOString()
      })
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${AUSTIN_LAT}&lon=${AUSTIN_LON}&appid=${API_KEY}&units=imperial`,
      {
        headers: {
          'User-Agent': 'TL-Practice-App/1.0'
        },
        next: { revalidate: 600 } // Cache for 10 minutes
      }
    )

    if (!response.ok) {
      throw new Error('Weather API failed')
    }

    const data = await response.json() as {
      main: { temp: number; humidity: number };
      weather: Array<{ main: string; description: string }>;
      wind: { speed: number };
    }
    
    // Map weather conditions to our icons
    const getWeatherIcon = (weatherMain: string, weatherDescription: string) => {
      const main = weatherMain.toLowerCase()
      const desc = weatherDescription.toLowerCase()
      
      if (main.includes('clear') || desc.includes('sunny')) return 'sun'
      if (main.includes('clouds')) return 'cloud'
      if (main.includes('rain') || main.includes('drizzle')) return 'cloud-rain'
      if (main.includes('snow')) return 'cloud-snow'
      if (main.includes('thunderstorm')) return 'cloud-lightning'
      if (main.includes('mist') || main.includes('fog')) return 'cloud'
      return 'sun'
    }
    
    const weatherData = {
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
      icon: getWeatherIcon(data.weather[0].main, data.weather[0].description),
      location: 'Austin, TX',
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed),
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json(weatherData)

  } catch (error) {
    console.error('Error fetching weather:', error)
    
    // Return fallback weather data for Austin
    return NextResponse.json({
      temperature: 78,
      description: 'Partly Cloudy',
      icon: 'cloud',
      location: 'Austin, TX',
      humidity: 65,
      windSpeed: 8,
      lastUpdated: new Date().toISOString()
    })
  }
}