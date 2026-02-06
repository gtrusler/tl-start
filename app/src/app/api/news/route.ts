import { NextResponse } from 'next/server'

function parseRssDate(dateStr: string): string {
  const parsed = new Date(dateStr)
  return isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString()
}

function extractArticles(xml: string): Array<{ title: string; publishedAt: string; url: string }> {
  const articles: Array<{ title: string; publishedAt: string; url: string }> = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match

  while ((match = itemRegex.exec(xml)) !== null && articles.length < 5) {
    const item = match[1]
    const title = item.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim()
    const link = item.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim()
    const pubDate = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]?.trim()

    if (title && link) {
      articles.push({
        title,
        url: link,
        publishedAt: pubDate ? parseRssDate(pubDate) : new Date().toISOString(),
      })
    }
  }

  return articles
}

export async function GET() {
  try {
    const response = await fetch(
      'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en',
      {
        headers: { 'User-Agent': 'TL-Practice-App/1.0' },
        next: { revalidate: 300 },
      }
    )

    if (!response.ok) {
      throw new Error(`Google News RSS returned ${response.status}`)
    }

    const xml = await response.text()
    const articles = extractArticles(xml)

    if (articles.length === 0) {
      throw new Error('No articles parsed from RSS feed')
    }

    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json({ articles: [] })
  }
}