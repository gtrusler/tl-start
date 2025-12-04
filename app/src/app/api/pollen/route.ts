import { NextResponse } from 'next/server'

// Open-Meteo Air Quality API - Free, no API key required
// https://open-meteo.com/en/docs/air-quality-api

interface OpenMeteoPollenResponse {
  current: {
    time: string
    alder_pollen: number
    birch_pollen: number
    grass_pollen: number
    mugwort_pollen: number
    olive_pollen: number
    ragweed_pollen: number
  }
  daily?: {
    time: string[]
    grass_pollen_max: number[]
    ragweed_pollen_max: number[]
    birch_pollen_max: number[]
    alder_pollen_max: number[]
    mugwort_pollen_max: number[]
    olive_pollen_max: number[]
  }
}

function getPollenLevel(index: number): { level: string; color: string } {
  if (index === 0) return { level: 'None', color: '#22C55E' }
  if (index < 20) return { level: 'Low', color: '#4ECDC4' }
  if (index < 50) return { level: 'Moderate', color: '#FFA500' }
  if (index < 100) return { level: 'High', color: '#FF6B6B' }
  return { level: 'Very High', color: '#DC2626' }
}

function getOverallLevel(allergens: Array<{ index: number }>): { level: string; index: number; color: string } {
  const maxIndex = Math.max(...allergens.map(a => a.index))
  const { level, color } = getPollenLevel(maxIndex)
  return { level, index: Math.round(maxIndex * 10) / 10, color }
}

function getDayName(dateString: string, index: number): string {
  if (index === 0) return 'Today'
  if (index === 1) return 'Tomorrow'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}

export async function GET() {
  try {
    // Austin, TX coordinates
    const AUSTIN_LAT = '30.2672'
    const AUSTIN_LON = '-97.7431'

    const response = await fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${AUSTIN_LAT}&longitude=${AUSTIN_LON}&current=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&daily=grass_pollen_max,ragweed_pollen_max,birch_pollen_max,alder_pollen_max,mugwort_pollen_max,olive_pollen_max&timezone=America%2FChicago&forecast_days=3`,
      {
        headers: {
          'User-Agent': 'TL-Practice-App/1.0'
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    )

    if (!response.ok) {
      throw new Error(`Pollen API failed: ${response.status}`)
    }

    const data: OpenMeteoPollenResponse = await response.json()

    // Build allergens list from current readings
    const allergens = [
      {
        name: 'Tree Pollen',
        level: getPollenLevel(Math.max(data.current.alder_pollen || 0, data.current.birch_pollen || 0, data.current.olive_pollen || 0)).level,
        index: Math.round(Math.max(data.current.alder_pollen || 0, data.current.birch_pollen || 0, data.current.olive_pollen || 0) * 10) / 10,
        color: getPollenLevel(Math.max(data.current.alder_pollen || 0, data.current.birch_pollen || 0, data.current.olive_pollen || 0)).color,
        sources: ['Oak', 'Cedar', 'Birch', 'Alder'].filter((_, i) => i < 3)
      },
      {
        name: 'Grass Pollen',
        level: getPollenLevel(data.current.grass_pollen || 0).level,
        index: Math.round((data.current.grass_pollen || 0) * 10) / 10,
        color: getPollenLevel(data.current.grass_pollen || 0).color,
        sources: ['Bermuda', 'Johnson Grass', 'Timothy']
      },
      {
        name: 'Weed Pollen',
        level: getPollenLevel(Math.max(data.current.ragweed_pollen || 0, data.current.mugwort_pollen || 0)).level,
        index: Math.round(Math.max(data.current.ragweed_pollen || 0, data.current.mugwort_pollen || 0) * 10) / 10,
        color: getPollenLevel(Math.max(data.current.ragweed_pollen || 0, data.current.mugwort_pollen || 0)).color,
        sources: ['Ragweed', 'Mugwort', 'Pigweed']
      }
    ].sort((a, b) => b.index - a.index)

    // Build forecast from daily data
    const forecast = data.daily?.time?.slice(0, 3).map((dateStr, i) => {
      const maxPollen = Math.max(
        data.daily?.grass_pollen_max?.[i] || 0,
        data.daily?.ragweed_pollen_max?.[i] || 0,
        data.daily?.birch_pollen_max?.[i] || 0,
        data.daily?.alder_pollen_max?.[i] || 0,
        data.daily?.mugwort_pollen_max?.[i] || 0,
        data.daily?.olive_pollen_max?.[i] || 0
      )
      return {
        day: getDayName(dateStr, i),
        level: getPollenLevel(maxPollen).level,
        index: Math.round(maxPollen * 10) / 10
      }
    }) || []

    // Generate recommendations based on pollen levels
    const recommendations: string[] = []
    const overall = getOverallLevel(allergens)

    if (overall.level === 'High' || overall.level === 'Very High') {
      recommendations.push('Consider staying indoors during peak pollen hours (5-10 AM)')
      recommendations.push('Take allergy medication before going outside')
      recommendations.push('Shower and change clothes after outdoor activities')
    } else if (overall.level === 'Moderate') {
      recommendations.push('Keep windows closed during high pollen hours')
      recommendations.push('Consider wearing sunglasses outdoors')
      recommendations.push('Check pollen levels before outdoor exercise')
    } else {
      recommendations.push('Good day for outdoor activities')
      recommendations.push('Pollen levels are manageable for most people')
      recommendations.push('Continue any regular allergy prevention routine')
    }

    const pollenData = {
      location: 'Austin, TX',
      date: new Date().toISOString(),
      overall,
      allergens,
      forecast,
      recommendations,
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json(pollenData)

  } catch (error) {
    console.error('Failed to fetch pollen data:', error)

    // Return fallback data if API fails
    return NextResponse.json({
      location: 'Austin, TX',
      date: new Date().toISOString(),
      overall: {
        level: 'Unavailable',
        index: 0,
        color: '#9CA3AF'
      },
      allergens: [],
      forecast: [],
      recommendations: ['Pollen data temporarily unavailable. Please try again later.'],
      lastUpdated: new Date().toISOString(),
      error: 'Unable to fetch current pollen data'
    })
  }
}
