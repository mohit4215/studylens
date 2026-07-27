import type { Metadata } from 'next'
import { getMockMarketOverview, getMockSectorHeatmap } from '@/lib/market-data/mock-data'
import { TrendingUp, TrendingDown, Activity, Zap, Layers } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Market Dashboard — StockLens AI',
  description: 'Real-time overview of Nifty, Sensex, FII/DII activity, Sector Heatmap, Top Gainers, and Top Losers.',
}

export default function DashboardPage() {
  const overview = getMockMarketOverview()
  const sectors = getMockSectorHeatmap()

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-text-primary tracking-tight">Market Dashboard</h1>
            <p className="text-text-muted text-sm mt-1">Live market overview, institutional flows &amp; sector performance</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-xl bg-bull/10 text-bull border border-bull/20 text-xs font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-bull animate-pulse" /> Live Market Data
            </span>
          </div>
        </div>

        {/* Major Indices */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[overview.nifty, overview.sensex, overview.bankNifty, overview.midcap].map(idx => (
            <div key={idx.name} className={`glass-card p-5 ${
              idx.changePercent >= 0 ? 'border-bull/20' : 'border-bear/20'
            }`}>
              <div className="text-xs text-text-muted mb-2 font-medium">{idx.name}</div>
              <div className="text-2xl font-black tabular-nums text-text-primary mb-1">
                {idx.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${
                idx.changePercent >= 0 ? 'text-bull' : 'text-bear'
              }`}>
                {idx.changePercent >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {idx.change >= 0 ? '+' : ''}{idx.change.toFixed(2)} ({idx.changePercent >= 0 ? '+' : ''}{idx.changePercent.toFixed(2)}%)
              </div>
            </div>
          ))}
        </div>

        {/* Sector Heatmap */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="section-title">
              <Layers className="w-5 h-5 text-brand-400" /> Sector Heatmap
            </div>
            <span className="text-xs text-text-muted">Today&apos;s Performance</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {sectors.map(s => {
              const up = s.change >= 0
              return (
                <div
                  key={s.sector}
                  className={`p-4 rounded-xl border transition-all ${
                    up
                      ? 'border-bull/30 bg-bull/[0.08] hover:bg-bull/[0.12]'
                      : 'border-bear/30 bg-bear/[0.08] hover:bg-bear/[0.12]'
                  }`}
                >
                  <div className="text-xs text-text-muted mb-1 font-medium">{s.sector}</div>
                  <div className={`text-xl font-black tabular-nums ${up ? 'text-bull' : 'text-bear'}`}>
                    {up ? '+' : ''}{s.change.toFixed(2)}%
                  </div>
                  <div className="text-[11px] text-text-muted mt-2">
                    Top: <Link href={`/stock/${s.topStock}`} className="text-text-secondary hover:text-brand-400 font-semibold">{s.topStock}</Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Gainers & Losers Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Gainers */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-bull" /> Top Gainers
              </h2>
              <span className="text-xs text-text-muted">NSE / BSE</span>
            </div>
            <div className="space-y-3">
              {overview.topGainers.map(s => (
                <Link key={s.symbol} href={`/stock/${s.symbol}`} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] transition-colors">
                  <div>
                    <div className="font-bold text-sm text-text-primary">{s.symbol}</div>
                    <div className="text-xs text-text-muted">{s.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-bull text-sm">+{s.changePercent.toFixed(2)}%</div>
                    <div className="text-xs text-text-muted">₹{s.price.toLocaleString('en-IN')}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Top Losers */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-bear" /> Top Losers
              </h2>
              <span className="text-xs text-text-muted">NSE / BSE</span>
            </div>
            <div className="space-y-3">
              {overview.topLosers.map(s => (
                <Link key={s.symbol} href={`/stock/${s.symbol}`} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] transition-colors">
                  <div>
                    <div className="font-bold text-sm text-text-primary">{s.symbol}</div>
                    <div className="text-xs text-text-muted">{s.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-bear text-sm">{s.changePercent.toFixed(2)}%</div>
                    <div className="text-xs text-text-muted">₹{s.price.toLocaleString('en-IN')}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
