import Link from 'next/link'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'
import { getMockMarketOverview } from '@/lib/market-data/mock-data'

function formatCrore(v: number) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(v / 10000000) + ' Cr'
}

export async function MarketOverviewSection() {
  const overview = getMockMarketOverview()
  const indices = [overview.nifty, overview.sensex, overview.bankNifty, overview.midcap]

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-primary">Market Overview</h2>
        <Link href="/dashboard" className="btn-ghost text-sm">View Full Dashboard →</Link>
      </div>

      {/* Index Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {indices.map(idx => (
          <div key={idx.name} className={`glass-card p-5 ${
            idx.changePercent >= 0 ? 'border-bull/20' : 'border-bear/20'
          }`}>
            <div className="text-xs text-text-muted mb-2 font-medium">{idx.name}</div>
            <div className="text-2xl font-black tabular-nums text-text-primary mb-1">
              {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(idx.value)}
            </div>
            <div className={`flex items-center gap-1.5 text-sm font-semibold ${
              idx.changePercent >= 0 ? 'text-bull' : 'text-bear'
            }`}>
              {idx.changePercent >= 0
                ? <TrendingUp className="w-3.5 h-3.5" />
                : <TrendingDown className="w-3.5 h-3.5" />}
              {idx.change >= 0 ? '+' : ''}{idx.change.toFixed(2)} ({idx.changePercent >= 0 ? '+' : ''}{idx.changePercent.toFixed(2)}%)
            </div>
          </div>
        ))}
      </div>

      {/* Breadth + VIX + FII */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Market Breadth */}
        <div className="glass-card p-5">
          <div className="section-title mb-4">
            <Activity className="w-4 h-4 text-brand-400" />
            Market Breadth
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-bull font-medium">▲ Advancing</span>
              <span className="font-bold tabular-nums">{overview.breadth.advancing.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-bear font-medium">▼ Declining</span>
              <span className="font-bold tabular-nums">{overview.breadth.declining.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">→ Unchanged</span>
              <span className="font-bold tabular-nums">{overview.breadth.unchanged}</span>
            </div>
            <div className="divider" />
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">A/D Ratio</span>
              <span className="font-bold text-bull">{overview.breadth.advanceDeclineRatio.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* VIX */}
        <div className="glass-card p-5">
          <div className="section-title mb-4">
            <Activity className="w-4 h-4 text-warn" />
            India VIX
          </div>
          <div className="text-4xl font-black mb-2 tabular-nums">{overview.indiaVix.toFixed(2)}</div>
          <div className={`text-sm font-semibold mb-3 ${
            overview.vixChange < 0 ? 'text-bull' : 'text-bear'
          }`}>
            {overview.vixChange >= 0 ? '+' : ''}{overview.vixChange.toFixed(2)} today
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            {overview.indiaVix < 15 ? 'Low volatility — market calm, confidence high.' :
             overview.indiaVix < 20 ? 'Moderate volatility — some uncertainty.' :
             'High volatility — exercise caution.'}
          </p>
        </div>

        {/* FII/DII */}
        <div className="glass-card p-5">
          <div className="section-title mb-4">
            <Activity className="w-4 h-4 text-info" />
            FII / DII Activity
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">FII Net</span>
                <span className={`font-bold tabular-nums ${
                  overview.fiiDii.fiiNetBuy >= 0 ? 'text-bull' : 'text-bear'
                }`}>
                  {overview.fiiDii.fiiNetBuy >= 0 ? '+' : ''}₹{overview.fiiDii.fiiNetBuy.toLocaleString()} Cr
                </span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-bull rounded-full" style={{ width: '70%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">DII Net</span>
                <span className={`font-bold tabular-nums ${
                  overview.fiiDii.diiNetBuy >= 0 ? 'text-bull' : 'text-bear'
                }`}>
                  {overview.fiiDii.diiNetBuy >= 0 ? '+' : ''}₹{overview.fiiDii.diiNetBuy.toLocaleString()} Cr
                </span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-bear rounded-full" style={{ width: '40%' }} />
              </div>
            </div>
          </div>
          <p className="text-xs text-text-muted mt-3">As of {overview.fiiDii.date}</p>
        </div>
      </div>
    </section>
  )
}
