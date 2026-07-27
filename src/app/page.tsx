import { Suspense } from 'react'
import { HeroSection } from '@/components/home/HeroSection'
import { TickerStrip } from '@/components/home/TickerStrip'
import { MarketOverviewSection } from '@/components/home/MarketOverviewSection'
import { FearGreedSection } from '@/components/home/FearGreedSection'
import { TrendingStocksSection } from '@/components/home/TrendingStocksSection'
import { AIMarketSummarySection } from '@/components/home/AIMarketSummarySection'
import { RecentAnalysesSection } from '@/components/home/RecentAnalysesSection'
import { ScannerPreviewSection } from '@/components/home/ScannerPreviewSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'StockLens AI — Understand WHY Every Stock Moves',
  description: 'AI-powered explanations for NSE/BSE stock movements. Search any stock and get instant AI analysis covering news, technicals, options, and fundamentals.',
}

export default async function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroSection />
      {/* Live Market Ticker */}
      <TickerStrip />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <Suspense fallback={<div className="h-32 skeleton rounded-2xl" />}>
          <MarketOverviewSection />
        </Suspense>
        <FearGreedSection />
        <TrendingStocksSection />
        <AIMarketSummarySection />
        <ScannerPreviewSection />
        <RecentAnalysesSection />
      </div>
    </div>
  )
}
