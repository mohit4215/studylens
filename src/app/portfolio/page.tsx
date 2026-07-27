import type { Metadata } from 'next'
import { PortfolioClient } from '@/components/portfolio/PortfolioClient'

export const metadata: Metadata = {
  title: 'AI Portfolio Analysis — StockLens AI',
  description: 'AI continuously analyzes your portfolio holdings for diversification, risk, sector exposure, and weak/strong holdings.',
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortfolioClient />
      </div>
    </div>
  )
}
