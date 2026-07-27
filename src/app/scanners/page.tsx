import type { Metadata } from 'next'
import { getMockScannerResults } from '@/lib/market-data/mock-data'
import { ScannersClient } from '@/components/scanners/ScannersClient'

export const metadata: Metadata = {
  title: 'AI Stock Scanners — StockLens AI',
  description: 'Scan NSE/BSE stocks for Volume Breakouts, Golden Cross, Supertrend Buy, RSI Oversold, and MACD signals.',
}

const SCANNERS = [
  { key: 'high-volume-breakout', title: 'High Volume Breakout', desc: 'Volume 2x+ above average with price breakout', icon: '🔥', tag: 'High Conviction' },
  { key: 'ema-crossover',        title: 'EMA 20/50 Crossover', desc: 'Short-term EMA crosses long-term EMA upward', icon: '📈', tag: 'Momentum' },
  { key: 'golden-cross',         title: 'Golden Cross (50/200)',desc: 'Major 50-day EMA crosses 200-day EMA upward', icon: '✨', tag: 'Bullish Trend' },
  { key: 'supertrend-buy',       title: 'Supertrend Buy',      desc: 'Supertrend indicator flipped to buy mode', icon: '🚀', tag: 'Trend Following' },
  { key: 'rsi-oversold',         title: 'RSI Oversold (<30)',   desc: 'RSI below 30 — potential bounce candidates', icon: '📉', tag: 'Mean Reversion' },
  { key: 'macd-bullish',         title: 'MACD Bullish Crossover',desc: 'MACD line crossed above signal line', icon: '⚡', tag: 'Momentum' },
]

export default async function ScannersPage({ searchParams }: { searchParams: { type?: string } }) {
  const activeType = searchParams.type || 'high-volume-breakout'
  const results = getMockScannerResults(activeType)

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScannersClient
          scanners={SCANNERS}
          initialType={activeType}
          initialResults={results}
        />
      </div>
    </div>
  )
}
