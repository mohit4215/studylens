import Link from 'next/link'
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react'
import { getMockMarketOverview } from '@/lib/market-data/mock-data'
import { TRENDING_STOCKS } from '@/lib/market-data/mock-data'

function StockCard({ symbol, name, price, change, changePercent }: {
  symbol: string; name: string; price: number; change: number; changePercent: number
}) {
  const up = changePercent >= 0
  return (
    <Link href={`/stock/${symbol}`}
      className="glass-card-hover p-4 flex items-center justify-between group cursor-pointer"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-text-primary">{symbol}</span>
          <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
            up ? 'bg-bull/15 text-bull' : 'bg-bear/15 text-bear'
          }`}>{up ? '+' : ''}{changePercent.toFixed(2)}%</span>
        </div>
        <p className="text-xs text-text-muted truncate mt-0.5">{name}</p>
      </div>
      <div className="text-right">
        <div className="font-bold tabular-nums text-text-primary">₹{price.toLocaleString('en-IN')}</div>
        <div className={`text-xs tabular-nums flex items-center justify-end gap-0.5 ${
          up ? 'text-bull' : 'text-bear'
        }`}>
          {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change >= 0 ? '+' : ''}{change.toFixed(2)}
        </div>
      </div>
    </Link>
  )
}

export function TrendingStocksSection() {
  const overview = getMockMarketOverview()
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Gainers */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-bull" /> Top Gainers
            </h2>
            <Link href="/dashboard" className="text-sm text-brand-400 hover:text-brand-300">See all →</Link>
          </div>
          <div className="space-y-2">
            {overview.topGainers.slice(0, 5).map(s => (
              <StockCard key={s.symbol} symbol={s.symbol} name={s.name} price={s.price} change={s.change} changePercent={s.changePercent} />
            ))}
          </div>
        </div>
        {/* Top Losers */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-bear" /> Top Losers
            </h2>
            <Link href="/dashboard" className="text-sm text-brand-400 hover:text-brand-300">See all →</Link>
          </div>
          <div className="space-y-2">
            {overview.topLosers.map(s => (
              <StockCard key={s.symbol} symbol={s.symbol} name={s.name} price={s.price} change={s.change} changePercent={s.changePercent} />
            ))}
            {/* Pad with trending */}
            {TRENDING_STOCKS.filter(t => t.change < 0).slice(0, 2).map(t => (
              <StockCard key={t.symbol} symbol={t.symbol} name={t.name} price={Math.random() > 0.5 ? 800 : 500} change={-Math.abs(t.change * 10)} changePercent={t.change} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
