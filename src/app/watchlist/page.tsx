import type { Metadata } from 'next'
import { WatchlistClient } from '@/components/watchlist/WatchlistClient'

export const metadata: Metadata = {
  title: 'Watchlist — StockLens AI',
  description: 'Save stocks, setup AI price & technical alerts, and track daily market movements.',
}

export default function WatchlistPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WatchlistClient />
      </div>
    </div>
  )
}
