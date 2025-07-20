import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // For demo purposes, we'll use a free news API
    // You can replace this with actual news scraping or a paid API
    const response = await fetch(
      'https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=demo', // You'd need a real API key
      {
        headers: {
          'User-Agent': 'TL-Practice-App/1.0'
        },
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    )

    if (!response.ok) {
      // Fallback to mock data if API fails
      return NextResponse.json({
        articles: [
          {
            title: "Tech Industry Sees Major Growth",
            publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            url: "#"
          },
          {
            title: "Austin Becomes Tech Hub Capital",
            publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            url: "#"
          },
          {
            title: "Legal Tech Innovation Trends",
            publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            url: "#"
          }
        ]
      })
    }

    const data = await response.json() as { articles?: Array<{title: string; publishedAt: string; url: string}> }
    
    // Filter and format the news data
    const formattedNews = data.articles?.slice(0, 3).map((article) => ({
      title: article.title,
      publishedAt: article.publishedAt,
      url: article.url
    })) || []

    return NextResponse.json({ articles: formattedNews })

  } catch (error) {
    console.error('Error fetching news:', error)
    
    // Return fallback news data
    return NextResponse.json({
      articles: [
        {
          title: "Market Updates and Industry Trends",
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          url: "#"
        },
        {
          title: "Austin Business Growth Continues",
          publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          url: "#"
        },
        {
          title: "Technology Sector Developments",
          publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          url: "#"
        }
      ]
    })
  }
}