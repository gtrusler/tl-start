import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // For now, we'll provide mock data similar to what might be available from Austin pollen sources
    // This can be replaced with actual API calls when available
    const mockPollenData = {
      location: "Austin, TX",
      date: new Date().toISOString(),
      overall: {
        level: "Moderate",
        index: 6.8,
        color: "#FFA500"
      },
      allergens: [
        {
          name: "Tree Pollen",
          level: "High", 
          index: 8.2,
          color: "#FF6B6B",
          sources: ["Oak", "Cedar", "Pecan"]
        },
        {
          name: "Grass Pollen",
          level: "Low",
          index: 2.1,
          color: "#4ECDC4",
          sources: ["Bermuda", "Johnson Grass"]
        },
        {
          name: "Weed Pollen", 
          level: "Moderate",
          index: 5.3,
          color: "#FFA500",
          sources: ["Ragweed", "Pigweed"]
        },
        {
          name: "Mold",
          level: "Low",
          index: 3.1,
          color: "#4ECDC4",
          sources: ["Alternaria", "Cladosporium"]
        }
      ],
      forecast: [
        { day: "Today", level: "Moderate", index: 6.8 },
        { day: "Tomorrow", level: "High", index: 8.1 },
        { day: "Sunday", level: "Moderate", index: 6.2 }
      ],
      recommendations: [
        "Keep windows closed during high pollen days",
        "Take allergy medication before going outside",
        "Shower after spending time outdoors"
      ],
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json(mockPollenData)
  } catch (error) {
    console.error('Failed to fetch pollen data:', error)
    
    // Return fallback data
    return NextResponse.json({
      location: "Austin, TX",
      date: new Date().toISOString(),
      overall: {
        level: "Unavailable",
        index: 0,
        color: "#9CA3AF"
      },
      allergens: [],
      forecast: [],
      recommendations: ["Pollen data temporarily unavailable"],
      lastUpdated: new Date().toISOString(),
      error: "Unable to fetch current pollen data"
    })
  }
}