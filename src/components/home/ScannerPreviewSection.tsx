import Link from 'next/link'
import { Zap, TrendingUp, ArrowUpRight } from 'lucide-react'
import { getMockScannerResults } from '@/lib/market-data/mock-data'

const SCANNER_TYPES = [
  { key: 'high-volume-breakout', label: 'Volume Breakout', icon: '🔥', color: 'text-warn' },
  { key: 'ema-crossover',        label: 'EMA Crossover',   icon: '📈', color: 'text-brand-400' },
  { key: 'golden-cross',         label: 'Golden Cross',    icon: '✨', color: 'text-yellow-400' },
  { key: 'supertrend-buy',       label: 'Supertrend Buy',  icon: '🚀', color: 'text-bull' },
]

export function ScannerPreviewSection() {
  const results = getMockScannerResults('high-volume-breakout').slice(0, 3)

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <Zap className="w-5 h-5 text-warn" />
          Stock Scanners
        </h2>
        <Link href="/scanners" className="btn-outline text-sm">View All Scanners →</Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {SCANNER_TYPES.map(s => (
          <Link
            key={s.key}
            href={`/scanners?type=${s.key}`}
            className="glass-card-hover p-4 text-center cursor-pointer"
          >
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className={`text-sm font-semibold ${s.color}`}>{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="section-title">
            <span className="text-xl">🔥</span> High Volume Breakout Today
          </div>
          <span className="text-xs text-text-muted">Live results</span>
        </div>
        <div className="space-y-3">
          {results.map(r => (
            <Link key={r.symbol} href={`/stock/${r.symbol}`}
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.04] hover:border-white/[0.08] transition-all group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm text-text-primary">{r.symbol}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    r.strength === 'strong' ? 'bg-bull/15 text-bull' :
                    r.strength === 'moderate' ? 'bg-warn/15 text-warn' : 'bg-white/10 text-text-muted'
                  }`}>{r.strength}</span>
                </div>
                <p className="text-xs text-text-muted truncate">{r.description}</p>
              </div>
              <div className="text-right ml-4">
                <div className="font-bold text-bull text-sm">+{r.change.toFixed(2)}%</div>
                <div className="text-xs text-text-muted">₹{r.price.toLocaleString('en-IN')}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
