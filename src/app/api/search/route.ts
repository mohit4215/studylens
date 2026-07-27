import { NextResponse } from 'next/server'
import { marketData } from '@/lib/market-data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') || ''

  if (!q.trim()) {
    return NextResponse.json({ results: [] })
  }

  const results = await marketData.searchSymbols(q)
  return NextResponse.json({ results })
}
